/**
 * Whiteboard State Broadcast Handler
 * Syncs interactive system design whiteboard state across session participants.
 */
import type { Server, Socket } from 'socket.io';

export function setupWhiteboardHandlers(_io: Server, socket: Socket) {
  const sessionId = socket.data.sessionId;

  // TODO: Implement whiteboard state sync
  // - Handle Excalidraw scene updates
  // - Broadcast incremental changes (not full scene) for performance
  // - Support undo/redo per user

  socket.on('whiteboard:update', (sceneData: string) => {
    socket.to(`session:${sessionId}`).emit('whiteboard:update', sceneData);
  });

  socket.on('whiteboard:cursor', (cursorData: { x: number; y: number; userId: string }) => {
    socket.to(`session:${sessionId}`).emit('whiteboard:cursor', cursorData);
  });
}
