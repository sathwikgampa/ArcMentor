import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { z } from 'zod';
import { executeCodeInSandbox, SupportedLanguage } from './runner';

const app = express();
const PORT = parseInt(process.env.EXECUTOR_PORT || '6000', 10);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'p2p-executor-service',
    timestamp: new Date().toISOString(),
  });
});

const executeRequestSchema = z.object({
  language: z.enum(['python', 'javascript', 'java', 'cpp'], {
    errorMap: () => ({
      message: 'language must be one of: python, javascript, java, cpp',
    }),
  }),
  code: z.string().min(1, 'Code cannot be empty'),
  timeoutMs: z.number().int().positive().max(10000).optional().default(2000),
});

// POST /api/execute
app.post('/api/execute', async (req, res) => {
  const parsed = executeRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      output: '',
      error: 'Validation failed',
      details: parsed.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  const { language, code, timeoutMs } = parsed.data;

  try {
    const result = await executeCodeInSandbox({
      language: language as SupportedLanguage,
      code,
      timeoutMs,
    });

    return res.status(result.success ? 200 : 422).json({
      success: result.success,
      output: result.output,
      error: result.error,
      executionTimeMs: result.executionTimeMs,
    });
  } catch (error) {
    console.error('[Executor] Unexpected error during code execution:', error);
    return res.status(500).json({
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Internal execution error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Isolated Code Executor running on port ${PORT}`);
});

export { app };
export default app;
