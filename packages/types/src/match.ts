/**
 * Matchmaking Types
 * Defines filter matrices for domain, tier, seniority, and language matching.
 */

export type InterviewDomain =
  | 'BACKEND'
  | 'FRONTEND'
  | 'SYSTEM_DESIGN'
  | 'DSA'
  | 'BEHAVIORAL'
  | 'PM_TEARDOWN';

export type Seniority = 'ENTRY' | 'MID' | 'SENIOR' | 'STAFF_PLUS';

export type CompanyTier = 'FAANG' | 'HIGH_GROWTH_STARTUP' | 'ENTERPRISE';

export type ProgrammingLanguage = 'JAVA' | 'PYTHON' | 'CPP' | 'TYPESCRIPT' | 'GO';

export type MatchStatus = 'PENDING' | 'MATCHED' | 'EXPIRED' | 'CANCELLED';

export interface MatchFilter {
  domain: InterviewDomain;
  seniority: Seniority;
  targetTier: CompanyTier;
  language: ProgrammingLanguage;
}

export interface MatchRequest {
  id: string;
  userId: string;
  filter: MatchFilter;
  status: MatchStatus;
  createdAt: string;
  matchedAt: string | null;
  sessionId: string | null;
  estimatedWaitMinutes: number | null;
}

export interface MatchResult {
  sessionId: string;
  intervieweeId: string;
  interviewerId: string;
  domain: InterviewDomain;
  seniority: Seniority;
  language: ProgrammingLanguage;
  scheduledAt: string;
}

export const DOMAIN_LABELS: Record<InterviewDomain, string> = {
  BACKEND: 'Backend Engineering',
  FRONTEND: 'Frontend Engineering',
  SYSTEM_DESIGN: 'System Design',
  DSA: 'Data Structures & Algorithms',
  BEHAVIORAL: 'Behavioral (STAR)',
  PM_TEARDOWN: 'Product Management Teardown',
};

export const SENIORITY_LABELS: Record<Seniority, string> = {
  ENTRY: 'Entry Level',
  MID: 'Mid Level',
  SENIOR: 'Senior',
  STAFF_PLUS: 'Staff+',
};

export const TIER_LABELS: Record<CompanyTier, string> = {
  FAANG: 'FAANG',
  HIGH_GROWTH_STARTUP: 'High-Growth Startup',
  ENTERPRISE: 'Enterprise',
};

export const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
  JAVA: 'Java',
  PYTHON: 'Python',
  CPP: 'C++',
  TYPESCRIPT: 'TypeScript / JavaScript',
  GO: 'Go',
};
