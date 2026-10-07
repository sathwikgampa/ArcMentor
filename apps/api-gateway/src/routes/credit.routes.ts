import { Router } from 'express';
import { db } from '@p2p/db';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// GET /api/credits/balance
router.get('/balance', authenticateJWT, async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user!.userId },
      select: { creditBalance: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ creditBalance: user.creditBalance });
  } catch (error) {
    next(error);
  }
});

// GET /api/credits/history
router.get('/history', authenticateJWT, async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string, 10) || 10));
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      db.creditLedger.findMany({
        where: { userId: req.user!.userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.creditLedger.count({
        where: { userId: req.user!.userId },
      }),
    ]);

    return res.json({
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

export { router as creditRouter };
export default router;
