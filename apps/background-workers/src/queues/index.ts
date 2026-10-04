/**
 * BullMQ Redis Queue Setup & Retry Configuration
 */
import { Queue, QueueOptions } from 'bullmq';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

export const defaultQueueOptions: QueueOptions = {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
};

export const matchmakingQueue = new Queue('matchmaking-queue', defaultQueueOptions);
export const penaltyQueue = new Queue('penalty-queue', defaultQueueOptions);
export const emailAlertQueue = new Queue('email-alert-queue', defaultQueueOptions);
