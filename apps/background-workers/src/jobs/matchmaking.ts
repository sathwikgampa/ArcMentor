/**
 * Automated Matchmaking Job
 * Scans pending match requests, evaluates bilateral compatibility scores, and provisions sessions.
 */
import { Job } from 'bullmq';
import { findAndPairCandidates } from '../matchmaker';

export interface MatchmakingJobPayload {
  domain?: string;
  tier?: string;
  batchTimestamp?: number;
}

export async function processMatchmakingJob(
  job: Job<MatchmakingJobPayload>,
): Promise<{ matchedPairs: number }> {
  console.log(
    `[Job: Matchmaking] Processing match pool for domain=${job.data?.domain ?? 'ALL'}, tier=${job.data?.tier ?? 'ALL'} (Job: ${job.id})`,
  );

  const results = await findAndPairCandidates();
  return { matchedPairs: results.length };
}
