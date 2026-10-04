/**
 * Sandbox Configuration & Security Constraints (cgroups & limits)
 * Defines execution time limits, RAM caps, PID ceilings, and network isolation policies.
 */

export interface SandboxPolicy {
  maxCpuMs: number;          // Wall-clock and CPU time limit
  maxMemoryBytes: number;    // Hard memory limit in bytes (e.g. 256MB)
  maxPidCount: number;       // Process fork-bomb prevention
  allowNetwork: boolean;     // Whether outbound networking is permitted
  readOnlyRoot: boolean;     // Mount root filesystem as read-only
}

export const DEFAULT_SANDBOX_POLICY: SandboxPolicy = {
  maxCpuMs: 5000,                      // 5 seconds max runtime
  maxMemoryBytes: 256 * 1024 * 1024,  // 256 MB RAM
  maxPidCount: 32,                    // max 32 spawned child processes
  allowNetwork: false,                // completely airgapped network isolation
  readOnlyRoot: true,
};

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  durationMs: number;
  memoryUsedBytes: number;
  timedOut: boolean;
  status: 'SUCCESS' | 'RUNTIME_ERROR' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED';
}
