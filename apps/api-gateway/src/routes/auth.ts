/**
 * Auth Routes
 * Login, registration, and OAuth callback endpoints.
 */
import { Router } from 'express';

export const authRoutes = Router();

// POST /api/auth/register
authRoutes.post('/register', async (req, res) => {
  // TODO: Validate input with Zod, hash password, create user, return JWT
  res.status(501).json({ error: 'Not implemented' });
});

// POST /api/auth/login
authRoutes.post('/login', async (req, res) => {
  // TODO: Validate credentials, verify password, issue JWT
  res.status(501).json({ error: 'Not implemented' });
});

// POST /api/auth/refresh
authRoutes.post('/refresh', async (req, res) => {
  // TODO: Verify refresh token, issue new access token
  res.status(501).json({ error: 'Not implemented' });
});

// GET /api/auth/me
authRoutes.get('/me', async (req, res) => {
  // TODO: Verify JWT from Authorization header, return user profile
  res.status(501).json({ error: 'Not implemented' });
});
