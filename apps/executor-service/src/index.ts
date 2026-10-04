/**
 * Code Execution Service — HTTP Server
 * Exposes sandboxed code execution endpoints for interview workspaces.
 */
import express from 'express';
import { z } from 'zod';
import { CodeRunner, SupportedLanguage } from './runners';

const app = express();
app.use(express.json({ limit: '1mb' }));

const port = process.env.PORT || 5002;

const executeSchema = z.object({
  language: z.enum(['python', 'javascript', 'typescript', 'java', 'cpp', 'go']),
  code: z.string().min(1, 'Code cannot be empty'),
  stdin: z.string().optional(),
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'executor-service', timestamp: new Date().toISOString() });
});

app.post('/execute', async (req, res) => {
  const parsed = executeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid execution request', details: parsed.error.issues });
  }

  try {
    const result = await CodeRunner.execute({
      language: parsed.data.language as SupportedLanguage,
      code: parsed.data.code,
      stdin: parsed.data.stdin,
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: 'Execution failed',
      details: error instanceof Error ? error.message : 'Unknown execution failure',
    });
  }
});

app.listen(port, () => {
  console.log(`[executor-service] Sandboxed execution service running on port ${port}`);
});
