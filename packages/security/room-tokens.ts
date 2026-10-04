/**
 * Room Token Generator
 * Generates signed JWT room access tokens with expiry claims for secure session access.
 */

import jwt from 'jsonwebtoken';
import type { RoomToken } from '@arcmentor/types';

const ROOM_TOKEN_SECRET = process.env.ROOM_TOKEN_SECRET || 'arcmentor-room-secret-change-me';
const ROOM_TOKEN_EXPIRY_SECONDS = 7200; // 2 hours

/**
 * Generate a signed room access token for a session participant.
 */
export function generateRoomToken(payload: Omit<RoomToken, 'expiresAt'>): string {
  const expiresAt = Math.floor(Date.now() / 1000) + ROOM_TOKEN_EXPIRY_SECONDS;

  return jwt.sign(
    {
      sessionId: payload.sessionId,
      userId: payload.userId,
      role: payload.role,
      expiresAt,
    } satisfies RoomToken,
    ROOM_TOKEN_SECRET,
    { expiresIn: ROOM_TOKEN_EXPIRY_SECONDS },
  );
}

/**
 * Verify and decode a room access token.
 * Returns null if the token is invalid or expired.
 */
export function verifyRoomToken(token: string): RoomToken | null {
  try {
    const decoded = jwt.verify(token, ROOM_TOKEN_SECRET) as RoomToken;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Check if a room token is expired.
 */
export function isRoomTokenExpired(token: RoomToken): boolean {
  return Date.now() / 1000 > token.expiresAt;
}
