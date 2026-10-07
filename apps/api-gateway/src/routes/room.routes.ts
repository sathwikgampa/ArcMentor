import { Router } from 'express';
import { AccessToken } from 'livekit-server-sdk';
import { db } from '@p2p/db';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// GET /api/rooms/:roomToken/token
router.get('/:roomToken/token', authenticateJWT, async (req, res, next) => {
  try {
    const rawRoomToken = req.params.roomToken;

    if (!rawRoomToken) {
      return res.status(400).json({ error: 'Missing roomToken parameter' });
    }

    const roomToken = Array.isArray(rawRoomToken) ? rawRoomToken[0] : rawRoomToken;

    // Find the session associated with the roomToken
    const session = await db.interviewSession.findUnique({
      where: { roomToken },
      include: {
        interviewer: {
          select: { id: true, fullName: true },
        },
        interviewee: {
          select: { id: true, fullName: true },
        },
      },
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found for the provided room token' });
    }

    const userId = req.user!.userId;

    // Verify authenticated user is either the interviewer or interviewee
    const isInterviewer = session.interviewerId === userId;
    const isInterviewee = session.intervieweeId === userId;

    if (!isInterviewer && !isInterviewee) {
      return res.status(403).json({
        error: 'Forbidden: You are not an authorized participant for this interview session',
      });
    }

    const sessionWithRelations = session as typeof session & {
      interviewer?: { id: string; fullName: string };
      interviewee?: { id: string; fullName: string };
    };

    const participantName = isInterviewer
      ? sessionWithRelations.interviewer?.fullName || 'Interviewer'
      : sessionWithRelations.interviewee?.fullName || 'Interviewee';

    const apiKey = process.env.LIVEKIT_API_KEY || 'devkey';
    const apiSecret = process.env.LIVEKIT_API_SECRET || 'secret';
    const livekitUrl = process.env.LIVEKIT_URL || 'ws://localhost:7880';

    // Generate short-lived LiveKit AccessToken
    const at = new AccessToken(apiKey, apiSecret, {
      identity: userId,
      name: participantName,
      ttl: '2h', // Expiry: 2 hours
    });

    at.addGrant({
      roomJoin: true,
      room: roomToken,
      canPublish: true,
      canSubscribe: true,
    });

    const accessToken = await at.toJwt();

    return res.json({
      token: accessToken,
      livekitUrl,
    });
  } catch (error) {
    next(error);
  }
});

export { router as roomRouter };
export default router;
