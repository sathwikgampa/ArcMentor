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
  { connection },
);

const penaltyWorker = new Worker('penalty-queue', async (job) => processPenaltyJob(job), {
  connection,
});

const emailAlertWorker = new Worker('email-alert-queue', async (job) => processEmailAlertJob(job), {
  connection,
});

matchmakingWorker.on('completed', (job) => {
  console.log(`[matchmaking-worker] Job ${job.id} completed.`);
});

matchmakingWorker.on('failed', (job, err) => {
  console.error(`[matchmaking-worker] Job ${job?.id} failed:`, err);
});

matchmakingWorker.on('error', (err) => {
  console.error('[matchmaking-worker] Worker error:', err);
});

penaltyWorker.on('completed', (job) => {
  console.log(`[penalty-worker] Job ${job.id} completed.`);
});

penaltyWorker.on('failed', (job, err) => {
  console.error(`[penalty-worker] Job ${job?.id} failed:`, err);
});

penaltyWorker.on('error', (err) => {
  console.error('[penalty-worker] Worker error:', err);
});

emailAlertWorker.on('completed', (job) => {
  console.log(`[email-worker] Job ${job.id} completed.`);
});

emailAlertWorker.on('failed', (job, err) => {
  console.error(`[email-worker] Job ${job?.id} failed:`, err);
});

emailAlertWorker.on('error', (err) => {
  console.error('[email-worker] Worker error:', err);
});

console.log('[background-workers] All workers listening for incoming jobs.');

const shutdown = async () => {
  console.log('[background-workers] Gracefully shutting down workers...');
  await Promise.allSettled([
    matchmakingWorker.close(),
    penaltyWorker.close(),
    emailAlertWorker.close(),
    connection.quit(),
  ]);
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
