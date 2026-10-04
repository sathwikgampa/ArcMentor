/**
 * Session & Workspace Types
 * Defines workspace state, room tokens, and phase timings for live interview sessions.
 */

export type SessionPhase = 'intro' | 'practice' | 'qna' | 'feedback';

export interface PhaseConfig {
  name: SessionPhase;
  label: string;
  durationSeconds: number;
}

export const SESSION_PHASES: PhaseConfig[] = [
  { name: 'intro', label: 'Introduction', durationSeconds: 300 },       // 5 minutes
  { name: 'practice', label: 'Practice', durationSeconds: 2100 },       // 35 minutes
  { name: 'qna', label: 'Q&A', durationSeconds: 300 },                  // 5 minutes
  { name: 'feedback', label: 'Feedback', durationSeconds: 900 },         // 15 minutes
];

export const TOTAL_SESSION_DURATION_SECONDS = SESSION_PHASES.reduce(
  (sum, phase) => sum + phase.durationSeconds,
  0,
); // 60 minutes

export interface RoomToken {
  sessionId: string;
  userId: string;
  role: 'interviewer' | 'interviewee';
  expiresAt: number; // Unix timestamp
}

export interface WorkspaceState {
  sessionId: string;
  currentPhase: SessionPhase;
  phaseStartedAt: number;
  codeContent: string;
  language: string;
  whiteboardData: string | null;
  participants: WorkspaceParticipant[];
}

export interface WorkspaceParticipant {
  userId: string;
  name: string;
  role: 'interviewer' | 'interviewee';
  isMicOn: boolean;
  isCameraOn: boolean;
  joinedAt: number;
}
