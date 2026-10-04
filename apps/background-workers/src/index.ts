/**
 * Background Workers — Entry Point
 * Spins up BullMQ Workers for matchmaking, penalty deductions, and email alerts.
 */
import { Worker } from 'bullmq';
import { connection } from './queues';
import { processMatchmakingJob } from './jobs/matchmaking';
import { processPenaltyJob } from './jobs/penalties';
import { processEmailAlertJob } from './jobs/email-alerts';

console.log('[background-workers] Initializing async queue workers...');

const matchmakingWorker = new Worker(
  'matchmaking-queue',
  async (job) => processMatchmakingJob(job),
  { connection }
);

const penaltyWorker = new Worker(
  'penalty-queue',
  async (job) => processPenaltyJob(job),
  { connection }
);

const emailAlertWorker = new Worker(
  'email-alert-queue',
  async (job) => processEmailAlertJob(job),
  { connection }
);

matchmakingWorker.on('completed', (job) => {
  console.log(`[matchmaking-worker] Job ${job.id} completed.`);
});

penaltyWorker.on('completed', (job) => {
  console.log(`[penalty-worker] Job ${job.id} completed.`);
});

emailAlertWorker.on('completed', (job) => {
  console.log(`[email-worker] Job ${job.id} completed.`);
});

console.log('[background-workers] All workers listening for incoming jobs.');
