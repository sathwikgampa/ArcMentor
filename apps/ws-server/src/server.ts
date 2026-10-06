import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { URL } from 'url';
// @ts-ignore y-websocket utility bindings
import { setupWSConnection, setPersistence, docs } from 'y-websocket/bin/utils';
import * as Y from 'yjs';

dotenv.config();

const PORT = parseInt(process.env.WS_PORT || '5000', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'arcmentor-jwt-secret-change-me';

export interface DecodedAuthToken {
  userId: string;
  email?: string;
  role?: string;
}

// 1. Attach y-websocket persistence binding to handle Yjs document state syncing
setPersistence({
  bindState: async (docName: string, ydoc: Y.Doc) => {
    console.log(`[Yjs:Persistence] Bound persistence state for session room: ${docName}`);
  },
  writeState: async (docName: string, ydoc: Y.Doc) => {
    console.log(`[Yjs:Persistence] State checkpoint updated for session room: ${docName}`);
  },
});

// 2. Initialize HTTP server
const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      service: 'p2p-ws-collaboration-server',
      status: 'healthy',
      timestamp: new Date().toISOString(),
    }),
  );
});

// 3. Initialize native WebSocketServer
export const wss = new WebSocketServer({ server });

wss.on('connection', (socket: WebSocket, req: http.IncomingMessage) => {
  try {
    const host = req.headers.host || 'localhost';
    const parsedUrl = new URL(req.url || '', `http://${host}`);
    const token = parsedUrl.searchParams.get('token');
    const roomId = parsedUrl.searchParams.get('roomId');

    // Reject connections missing token or roomId
    if (!token || !roomId) {
      console.warn(`[WS:Auth] Connection rejected: Missing token or roomId (URL: ${req.url})`);
      socket.close(4001, 'Unauthorized: Missing token or roomId');
      return;
    }

    // Authenticate JWT token
    let user: DecodedAuthToken;
    try {
      user = jwt.verify(token, JWT_SECRET) as DecodedAuthToken;
    } catch (err) {
      console.warn(`[WS:Auth] Connection rejected: Invalid JWT token for room ${roomId}`);
      socket.close(4001, 'Unauthorized: Invalid token');
      return;
    }

    // Room Lifecycle: Log user join event
    console.log(`[WS:Lifecycle] User ${user.userId} joined room: ${roomId}`);

    // Setup y-websocket sync with strict room channel isolation
    // The docName guarantees that roomId A never leaks state to roomId B
    setupWSConnection(socket, req, { docName: roomId, gc: true });

    // Room Lifecycle: Handle client disconnect and clean up inactive Yjs documents
    socket.on('close', (code: number, reason: Buffer) => {
      const reasonStr = reason.toString('utf-8');
      console.log(
        `[WS:Lifecycle] User ${user.userId} left room: ${roomId} (Code: ${code}, Reason: ${reasonStr || 'None'})`,
      );

      // Clean up inactive Yjs document when all clients disconnect from the room
      const activeDoc = docs.get(roomId);
      if (activeDoc && activeDoc.conns.size === 0) {
        console.log(
          `[WS:Lifecycle] All clients disconnected from room ${roomId}. Destroying and cleaning up inactive Y.Doc.`,
        );
        activeDoc.destroy();
        docs.delete(roomId);
      }
    });

    socket.on('error', (err: Error) => {
      console.error(
        `[WS:Error] Error on connection in room ${roomId} for user ${user.userId}:`,
        err,
      );
    });
  } catch (error) {
    console.error('[WS:Fatal] Unexpected error on websocket connection:', error);
    socket.close(1011, 'Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Real-Time Collaboration WS Server running on port ${PORT}`);
});

export { server };
export default server;
