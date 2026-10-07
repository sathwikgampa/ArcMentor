import { Router } from 'express';
import { z } from 'zod';
import { db } from '@p2p/db';
import { getRedis } from '../config';
import { authenticateJWT } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = Router();

export const createSlotSchema = z
  .object({
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    domain: z.string().min(1),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime).getTime();
      const end = new Date(data.endTime).getTime();
      const diffMinutes = (end - start) / (1000 * 60);
      // Allow a flexible range (e.g., 55 to 65 minutes)
      return diffMinutes >= 55 && diffMinutes <= 65;
    },
    {
      message: 'endTime must be approximately 1 hour (60 mins) after startTime',
      path: ['endTime'],
    },
  );

// POST /api/slots
router.post('/', authenticateJWT, validateRequest(createSlotSchema), async (req, res, next) => {
  try {
    const userId = req.user!.userId;
    const { startTime, endTime, domain } = req.body;

    // Verify user has creditBalance >= 1
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { creditBalance: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.creditBalance < 1) {
      return res.status(403).json({
        error:
          'Forbidden: Insufficient credits. A minimum of 1 credit is required to schedule a slot.',
      });
    }

    // Insert new slot into SlotAvailability table
    const slot = await db.slotAvailability.create({
      data: {
        userId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        domain,
        isBooked: false,
      },
    });

    // Push slot ID into Redis Sorted Set key indexed by startTime Unix timestamp
    const redis = getRedis();
    const score = Math.floor(new Date(startTime).getTime() / 1000);
    await redis.zadd(`matchmaking_queue:${domain}`, score, slot.id);

    return res.status(201).json({
      message: 'Slot created successfully',
      slot,
      ...slot,
    });
  } catch (error) {
    next(error);
  }
});

export { router as slotRouter };
export default router;
