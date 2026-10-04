/**
 * Room Authorization Middleware
 * Verifies short-lived room tokens before allowing WebSocket connections.
 */
import type { Socket } from 'socket.io';
import { verifyRoomToken } from '@arcmentor/security/room-tokens';

export function verifyRoomTokenMiddleware(socket: Socket, next: (err?: Error) => void) {
  const token = socket.handshake.auth?.token as string;

  if (!token) {
    return next(new Error('Room token required'));
  }

  const decoded = verifyRoomToken(token);

  if (!decoded) {
    return next(new Error('Invalid or expired room token'));
  }

  // Attach decoded token data to socket for downstream handlers
  socket.data.sessionId = decoded.sessionId;
  socket.data.userId = decoded.userId;
  socket.data.role = decoded.role;

  next();
}
