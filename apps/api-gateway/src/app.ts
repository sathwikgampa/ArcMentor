import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { standardRateLimiter, authRateLimiter } from './middleware/rateLimiter';
import { authRouter } from './routes/auth.routes';
import { creditRouter } from './routes/credit.routes';
import { slotRouter } from './routes/slot.routes';
import { roomRouter } from './routes/room.routes';

const app = express();

// 1. Helmet Security Policies for REST APIs
app.use(
  helmet({
    contentSecurityPolicy: false, // REST APIs do not render HTML
    crossOriginEmbedderPolicy: false,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
  }),
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  }),
);

// 2. Restrict JSON body parsing payload limit to 100kb
app.use(express.json({ limit: '100kb' }));

// Health Check Endpoint (excluded from restrictive rate limits)
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'p2p-api-gateway',
    timestamp: new Date().toISOString(),
  });
});

// 3. Attach standard rate limiter to all /api routes
app.use('/api', standardRateLimiter);

// 4. Attach strict auth rate limiter specifically for /api/auth endpoints
app.use('/api/auth', authRateLimiter, authRouter);

// Other API Routes
app.use('/api/credits', creditRouter);
app.use('/api/slots', slotRouter);
app.use('/api/rooms', roomRouter);

// Global Error Handler Middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export { app };
export default app;
