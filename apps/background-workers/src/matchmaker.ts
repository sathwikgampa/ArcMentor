import { Worker, Job, Queue } from 'bullmq';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';
import { db, TransactionType, SessionStatus, Prisma } from '@p2p/db';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Redis connection for BullMQ and Pub/Sub
export const redisConnection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

export const redisPublisher = new Redis(redisUrl);

export interface MatchResult {
  sessionId: string;
  sessionRoomToken: string;
  candidateAId: string;
  candidateBId: string;
  domain: string;
  scheduledAt: Date;
}

/**
 * Embedded Credit Service to execute transactional credit deductions within db transactions.
 */
export class CreditService {
  static async processTransaction(
    userId: string,
    amount: number,
    type: TransactionType,
    description: string,
    txClient: Prisma.TransactionClient | typeof db = db,
  ) {
    const user = await txClient.user.findUnique({
      where: { id: userId },
      select: { creditBalance: true },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    if (amount < 0 && user.creditBalance + amount < 0) {
      throw new Error(`Insufficient credit balance for user ${userId}`);
    }

    const updatedUser = await txClient.user.update({
      where: { id: userId },
      data: {
        creditBalance: {
          increment: amount,
        },
      },
      select: { creditBalance: true },
    });

    const ledgerEntry = await txClient.creditLedger.create({
      data: {
        userId,
        amount,
        type,
        description,
      },
      select: { id: true },
    });

    return {
      success: true,
      newBalance: updatedUser.creditBalance,
      transactionId: ledgerEntry.id,
    };
  }
}

/**
 * Core Matching Logic:
 * 1. Distributed Redis lock ensures thread-safety across concurrent workers.
 * 2. Queries open, unbooked SlotAvailability records.
 * 3. Groups by domain and overlapping time windows (startTime).
 * 4. Filters out candidates who have previously interviewed each other.
 * 5. Pairs candidates transactionally, updates slots, deducts credit, and broadcasts event.
 */
export async function findAndPairCandidates(): Promise<MatchResult[]> {
  const lockKey = 'lock:matchmaker:engine';
  const lockToken = randomUUID();
  const lockTtlMs = 15000;

  // 1. Thread-safety: acquire distributed mutex to prevent concurrent matching collisions
  const acquired = await redisPublisher.set(lockKey, lockToken, 'PX', lockTtlMs, 'NX');
  if (!acquired) {
    console.log('[Matchmaker] Concurrency lock active. Skipping this cycle.');
    return [];
  }

  const matches: MatchResult[] = [];

  try {
    // 2. Query open, unbooked slots
    const openSlots = await db.slotAvailability.findMany({
      where: {
        isBooked: false,
        startTime: {
          gte: new Date(),
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    if (openSlots.length < 2) {
      return [];
    }

    // Group open slots by domain and startTime
    const groups = new Map<string, typeof openSlots>();
    for (const slot of openSlots) {
      const groupKey = `${slot.domain}::${slot.startTime.toISOString()}`;
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(slot);
    }

    const pairedSlotIds = new Set<string>();

    for (const [, slotsInGroup] of groups.entries()) {
      if (slotsInGroup.length < 2) continue;

      for (let i = 0; i < slotsInGroup.length; i++) {
        const slotA = slotsInGroup[i]!;
        if (pairedSlotIds.has(slotA.id)) continue;

        for (let j = i + 1; j < slotsInGroup.length; j++) {
          const slotB = slotsInGroup[j]!;
          if (pairedSlotIds.has(slotB.id)) continue;

          // Rule: Candidate A != Candidate B
          if (slotA.userId === slotB.userId) continue;

          // Rule: Filter out candidates who have previously interviewed each other
          const previousInterview = await db.interviewSession.findFirst({
            where: {
              OR: [
                { interviewerId: slotA.userId, intervieweeId: slotB.userId },
                { interviewerId: slotB.userId, intervieweeId: slotA.userId },
              ],
            },
            select: { id: true },
          });

          if (previousInterview) {
            console.log(
              `[Matchmaker] Skipping pair (${slotA.userId}, ${slotB.userId}): previously interviewed in session ${previousInterview.id}`,
            );
            continue;
          }

          // Matched pair found! Perform transactional session initialization
          const sessionRoomToken = randomUUID();

          try {
            const session = await db.$transaction(async (tx) => {
              // Concurrency check: Ensure neither slot was booked concurrently
              const freshA = await tx.slotAvailability.findUnique({
                where: { id: slotA.id },
                select: { isBooked: true },
              });
              const freshB = await tx.slotAvailability.findUnique({
                where: { id: slotB.id },
                select: { isBooked: true },
              });

              if (!freshA || freshA.isBooked || !freshB || freshB.isBooked) {
                throw new Error('Slot was booked concurrently by another process');
              }

              // a. Mark both SlotAvailability records as isBooked = true
              await tx.slotAvailability.update({
                where: { id: slotA.id },
                data: { isBooked: true },
              });
              await tx.slotAvailability.update({
                where: { id: slotB.id },
                data: { isBooked: true },
              });

              // b. Deduct -1 credit from candidate via CreditService.processTransaction (type: SPENT)
              await CreditService.processTransaction(
                slotB.userId,
                -1,
                TransactionType.SPENT,
                `Booking fee for interview session: ${sessionRoomToken}`,
                tx,
              );

              // c. Create an InterviewSession with status SCHEDULED and a unique roomToken
              return tx.interviewSession.create({
                data: {
                  interviewerId: slotA.userId,
                  intervieweeId: slotB.userId,
                  domain: slotA.domain,
                  scheduledAt: slotA.startTime,
                  status: SessionStatus.SCHEDULED,
                  roomToken: sessionRoomToken,
                },
              });
            });

            // d. Publish a Redis Pub/Sub event to channel session_matched
            await redisPublisher.publish(
              'session_matched',
              JSON.stringify({
                sessionRoomToken,
                candidateAId: slotA.userId,
                candidateBId: slotB.userId,
              }),
            );

            pairedSlotIds.add(slotA.id);
            pairedSlotIds.add(slotB.id);

            matches.push({
              sessionId: session.id,
              sessionRoomToken,
              candidateAId: slotA.userId,
              candidateBId: slotB.userId,
              domain: slotA.domain,
              scheduledAt: slotA.startTime,
            });

            console.log(
              `[Matchmaker] Successfully paired candidates ${slotA.userId} and ${slotB.userId} for session ${session.id}`,
            );
            break; // Break inner loop to search next candidate
          } catch (txError) {
            console.error('[Matchmaker] Transactional pairing failed for slots:', txError);
          }
        }
      }
    }
  } finally {
    // Release distributed lock with atomic Lua script
    const releaseLua = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    await redisPublisher.eval(releaseLua, 1, lockKey, lockToken);
  }

  return matches;
}

/**
 * BullMQ Queue definition for matchmaking jobs
 */
export const matchmakerQueue = new Queue('matchmaking-queue', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
});

/**
 * BullMQ Worker: MatchmakerWorker
 */
export const MatchmakerWorker = new Worker(
  'matchmaking-queue',
  async (job: Job) => {
    console.log(`[MatchmakerWorker] Executing matchmaking run (Job ID: ${job.id})`);
    const results = await findAndPairCandidates();
    return { matchedPairs: results.length, matches: results };
  },
  {
    connection: redisConnection,
    concurrency: 1, // Single active processor per worker instance for thread safety
  },
);

MatchmakerWorker.on('completed', (job) => {
  console.log(`[MatchmakerWorker] Job ${job.id} completed.`);
});

MatchmakerWorker.on('failed', (job, err) => {
  console.error(`[MatchmakerWorker] Job ${job?.id} failed with error:`, err);
});

/**
 * Redis Poller fallback for interval-based execution
 */
export function startMatchmakerPoller(intervalMs: number = 5000): NodeJS.Timeout {
  console.log(`[MatchmakerWorker] Started background poller interval: ${intervalMs}ms`);
  return setInterval(async () => {
    try {
      await findAndPairCandidates();
    } catch (error) {
      console.error('[MatchmakerWorker] Poller encountered an error:', error);
    }
  }, intervalMs);
}
