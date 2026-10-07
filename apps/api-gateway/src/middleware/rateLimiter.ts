import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { getRedis } from '../config';

const redis = getRedis();

/**
 * Standard API rate limiter:
 * 100 requests per 15-minute window per IP address for standard endpoints.
 */
export const standardRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // 100 requests per 15 minutes
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error ioredis sendCommand compatibility
    sendCommand: (...args: string[]) => redis.call(...args),
    prefix: 'rl:std:',
  }),
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

/**
 * Strict Auth rate limiter:
 * 5 requests per 15-minute window specifically for /api/auth routes
 * to mitigate credential stuffing and brute-force attacks.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 requests per 15 minutes
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error ioredis sendCommand compatibility
    sendCommand: (...args: string[]) => redis.call(...args),
    prefix: 'rl:auth:',
  }),
  message: {
    error: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});
