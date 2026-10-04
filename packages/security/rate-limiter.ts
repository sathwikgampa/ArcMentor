/**
 * Redis Sliding-Window Rate Limiter
 * Implements a sliding window algorithm using Redis sorted sets for API protection.
 */

import type { Redis } from 'ioredis';

export interface RateLimitConfig {
  windowMs: number;       // Window size in milliseconds
  maxRequests: number;    // Max requests per window
  keyPrefix: string;      // Redis key prefix (e.g., 'rl:api', 'rl:auth')
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;        // Unix timestamp when window resets
  retryAfterMs: number;   // Milliseconds until next allowed request (0 if allowed)
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60_000,       // 1 minute
  maxRequests: 100,
  keyPrefix: 'rl:default',
};

/**
 * Check if a request is allowed under the rate limit.
 * Uses Redis sorted sets with timestamp scores for sliding window accuracy.
 */
export async function checkRateLimit(
  redis: Redis,
  identifier: string,
  config: Partial<RateLimitConfig> = {},
): Promise<RateLimitResult> {
  const { windowMs, maxRequests, keyPrefix } = { ...DEFAULT_CONFIG, ...config };
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  // Pipeline: remove expired entries, count current entries, add new entry, set expiry
  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, windowStart);
  pipeline.zcard(key);
  pipeline.zadd(key, now.toString(), `${now}-${Math.random().toString(36).slice(2)}`);
  pipeline.pexpire(key, windowMs);

  const results = await pipeline.exec();
  const currentCount = (results?.[1]?.[1] as number) ?? 0;

  const allowed = currentCount < maxRequests;
  const remaining = Math.max(0, maxRequests - currentCount - (allowed ? 1 : 0));
  const resetAt = now + windowMs;

  // If not allowed, remove the entry we just added
  if (!allowed) {
    await redis.zremrangebyscore(key, now, now);
  }

  return {
    allowed,
    remaining,
    resetAt,
    retryAfterMs: allowed ? 0 : windowMs - (now - windowStart),
  };
}

/**
 * Pre-configured rate limit configurations for different API tiers.
 */
export const RATE_LIMITS = {
  /** General API routes: 100 req/min */
  api: { windowMs: 60_000, maxRequests: 100, keyPrefix: 'rl:api' },
  /** Authentication routes: 10 req/min */
  auth: { windowMs: 60_000, maxRequests: 10, keyPrefix: 'rl:auth' },
  /** Code execution: 5 req/min */
  executor: { windowMs: 60_000, maxRequests: 5, keyPrefix: 'rl:exec' },
  /** Matchmaking requests: 20 req/min */
  match: { windowMs: 60_000, maxRequests: 20, keyPrefix: 'rl:match' },
} satisfies Record<string, RateLimitConfig>;
