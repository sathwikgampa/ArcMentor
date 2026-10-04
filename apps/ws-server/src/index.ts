/**
 * WebSocket Server — Entry Point
 * Socket.IO server for real-time code sync, whiteboard state, and signaling.
 */
import { Server } from 'socket.io';
import { createServer } from 'http';
import { setupYjsHandlers } from './handlers/yjs-sync';
import { setupWhiteboardHandlers } from './handlers/whiteboard';
import { verifyRoomTokenMiddleware } from './middleware/room-auth';

const httpServer = createServer();
const PORT = parseInt(process.env.WS_PORT || '4001', 10);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Middleware: verify room token before allowing connection
io.use(verifyRoomTokenMiddleware);

io.on('connection', (socket) => {
  const { sessionId, userId, role } = socket.data;
  console.warn(`User ${userId} (${role}) connected to session ${sessionId}`);

  // Join session room
  socket.join(`session:${sessionId}`);

  // Setup handlers
  setupYjsHandlers(io, socket);
  setupWhiteboardHandlers(io, socket);

  socket.on('disconnect', () => {
    console.warn(`User ${userId} disconnected from session ${sessionId}`);
  });
});

httpServer.listen(PORT, () => {
  console.warn(`🔌 WebSocket server running on ws://localhost:${PORT}`);
});
