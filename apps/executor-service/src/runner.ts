import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export type SupportedLanguage = 'python' | 'javascript' | 'java' | 'cpp';

export interface SandboxExecutionOptions {
  language: SupportedLanguage;
  code: string;
  timeoutMs?: number;
}

export interface SandboxExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs?: number;
}

interface LanguageSpec {
  filename: string;
  image: string;
  command: string;
}

const LANGUAGE_SPECS: Record<SupportedLanguage, LanguageSpec> = {
  python: {
    filename: 'solution.py',
    image: 'python:3.11-alpine',
    command: 'python /app/solution.py',
  },
  javascript: {
    filename: 'solution.js',
    image: 'node:20-alpine',
    command: 'node /app/solution.js',
  },
  java: {
    filename: 'Main.java',
    image: 'eclipse-temurin:17-alpine',
    command: 'java /app/Main.java',
  },
  cpp: {
    filename: 'solution.cpp',
    image: 'gcc:alpine',
    command: 'sh -c "g++ -O2 -o /tmp/solution /app/solution.cpp && /tmp/solution"',
  },
};

/**
 * Executes user-submitted code in an isolated, resource-constrained Docker container.
 */
export async function executeCodeInSandbox({
  language,
  code,
  timeoutMs = 2000,
}: SandboxExecutionOptions): Promise<SandboxExecutionResult> {
  const spec = LANGUAGE_SPECS[language];
  if (!spec) {
    return {
      success: false,
      output: '',
      error: `Unsupported language: ${language}. Supported: python, javascript, java, cpp`,
    };
  }

  // Write incoming code to a temporary directory under tmp/${Date.now()}
  const tempDirName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const tempDir = path.resolve(process.cwd(), 'tmp', tempDirName);
  const filePath = path.join(tempDir, spec.filename);

  const startTime = Date.now();

  try {
    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(filePath, code, 'utf-8');

    // Docker volume binding path formatted for Windows/Linux hosts
    const normalizedMountPath = tempDir.replace(/\\/g, '/');

    // Ephemeral Docker container flags:
    // --rm: remove container upon exit
    // --network none: block all egress/ingress network access for security
    // --memory=512m: constrain RAM
    // --cpus=2.0: constrain CPU compute limits
    const dockerCmd = `docker run --rm --network none --memory=512m --cpus=2.0 -v "${normalizedMountPath}:/app" ${spec.image} ${spec.command}`;

    return await new Promise<SandboxExecutionResult>((resolve) => {
      exec(
        dockerCmd,
        {
          timeout: timeoutMs,
          maxBuffer: 1024 * 1024, // 1MB buffer limit
        },
        (error, stdout, stderr) => {
          const executionTimeMs = Date.now() - startTime;

          if (error) {
            // Handle timeout
            if (error.killed || error.signal === 'SIGTERM') {
              resolve({
                success: false,
                output: stdout.toString().trim(),
                error: `Execution timed out: Exceeded ${timeoutMs / 1000}s limit`,
                executionTimeMs,
              });
              return;
            }

            resolve({
              success: false,
              output: stdout.toString().trim(),
              error: (stderr || error.message).toString().trim(),
              executionTimeMs,
            });
            return;
          }

          resolve({
            success: true,
            output: stdout.toString().trim(),
            error: stderr ? stderr.toString().trim() : undefined,
            executionTimeMs,
          });
        },
      );
    });
  } catch (err) {
    return {
      success: false,
      output: '',
      error: err instanceof Error ? err.message : 'Unknown sandbox failure',
      executionTimeMs: Date.now() - startTime,
    };
  } finally {
    // Clean up temporary files in a finally block
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupErr) {
      console.error(`[Sandbox] Failed to clean up temp directory ${tempDir}:`, cleanupErr);
    }
  }
}
