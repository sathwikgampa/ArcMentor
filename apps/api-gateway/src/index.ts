/**
 * API Gateway — Entry Point
 * Express server with route registration, middleware, and error handling.
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { creditRoutes } from './routes/credits';
import { matchRoutes } from './routes/matching';
import { feedbackRoutes } from './routes/feedback';
import { rubricRoutes } from './routes/rubrics';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'arcmentor-api', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/rubrics', rubricRoutes);

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.warn(`🚀 API Gateway running on http://localhost:${PORT}`);
});

export default app;
