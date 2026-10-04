/**
 * Environment & Connection Configuration
 * Loads environment variables and creates database/Redis connection pools.
 */
import Redis from 'ioredis';

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'arcmentor-jwt-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://arcmentor:arcmentor@localhost:5432/arcmentor',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
};

// Redis client singleton
let redisClient: Redis | null = null;

export function getRedis(): Redis {
  if (!redisClient) {
    redisClient = new Redis(config.redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        return Math.min(times * 200, 2000);
      },
    });
  }
  return redisClient;
}
