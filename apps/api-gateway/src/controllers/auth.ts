/**
 * Auth Controller
 * HTTP request/response handler for authentication operations.
 */
import type { Request, Response } from 'express';

// TODO: Implement auth controller methods
// - handleRegister: validate body, hash password, create user, issue tokens
// - handleLogin: validate credentials, verify hash, issue tokens
// - handleRefresh: verify refresh token, issue new access token
// - handleGetProfile: extract user from JWT, return profile data

export class AuthController {
  static async handleRegister(_req: Request, res: Response) {
    res.status(501).json({ error: 'Not implemented' });
  }

  static async handleLogin(_req: Request, res: Response) {
    res.status(501).json({ error: 'Not implemented' });
  }
}
