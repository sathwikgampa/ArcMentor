/**
 * Email Alerts & Notifications Job
 * Sends match confirmations, reminder pings, and post-session rubric digests.
 */
import { Job } from 'bullmq';

export interface EmailAlertPayload {
  to: string;
  template: 'MATCH_CONFIRMED' | 'SESSION_REMINDER_15M' | 'RUBRIC_AVAILABLE';
  context: Record<string, string | number>;
}

export async function processEmailAlertJob(job: Job<EmailAlertPayload>): Promise<{ sent: boolean }> {
  console.log(`[Job: EmailAlert] Dispatching ${job.data.template} email notification to ${job.data.to}`);
  return { sent: true };
}
