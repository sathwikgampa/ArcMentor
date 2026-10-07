import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db, TargetTier, TransactionType } from '@p2p/db';
import { authenticateJWT } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { CreditService } from '../services/credit.service';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'arcmentor-jwt-secret-change-me';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(1, 'Full name is required'),
  preferredLang: z.string().optional().default('Java'),
  targetTier: z.nativeEnum(TargetTier).optional().default(TargetTier.FAANG),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

// POST /api/auth/register
router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { email, password, fullName, preferredLang, targetTier } = req.body;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        preferredLang,
        targetTier,
        creditBalance: 0,
      },
    });

    // Award +2 STARTER_GRANT credits via CreditService
    await CreditService.processTransaction(
      user.id,
      2,
      TransactionType.STARTER_GRANT,
      'Starter credit grant awarded on registration',
    );

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        creditBalance: 2,
        preferredLang: user.preferredLang,
        targetTier: user.targetTier,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        creditBalance: user.creditBalance,
        preferredLang: user.preferredLang,
        targetTier: user.targetTier,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me
router.get('/me', authenticateJWT, async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        karmaScore: true,
        creditBalance: true,
        preferredLang: true,
        targetTier: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

export { router as authRouter };
export default router;
