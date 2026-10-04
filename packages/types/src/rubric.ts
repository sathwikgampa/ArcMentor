/**
 * Rubric & Feedback Types
 * Defines the 1-5 evaluation criteria and diagnostic feedback structures.
 */

export interface RubricDimension {
  key: RubricKey;
  label: string;
  description: string;
  min: 1;
  max: 5;
}

export type RubricKey =
  | 'technicalCorrectness'
  | 'problemClarification'
  | 'communication'
  | 'behavioralExecution';

export const RUBRIC_DIMENSIONS: RubricDimension[] = [
  {
    key: 'technicalCorrectness',
    label: 'Technical Correctness & Efficiency',
    description: 'Accuracy of solution, optimal time/space complexity, clean code structure.',
    min: 1,
    max: 5,
  },
  {
    key: 'problemClarification',
    label: 'Problem Clarification & Edge-Case Handling',
    description: 'Asks clarifying questions, identifies edge cases, validates constraints.',
    min: 1,
    max: 5,
  },
  {
    key: 'communication',
    label: 'Communication & Thought Process',
    description: 'Articulates approach clearly, explains trade-offs, thinks aloud effectively.',
    min: 1,
    max: 5,
  },
  {
    key: 'behavioralExecution',
    label: 'Behavioral / STAR Framework Execution',
    description: 'Structures behavioral answers using Situation, Task, Action, Result.',
    min: 1,
    max: 5,
  },
];

export interface FeedbackSubmission {
  sessionId: string;
  recipientId: string;
  scores: Record<RubricKey, number>;
  keyStrengths: string;
  areasForGrowth: string;
}

export interface FeedbackResponse {
  id: string;
  sessionId: string;
  authorId: string;
  authorName: string;
  recipientId: string;
  scores: Record<RubricKey, number>;
  overallScore: number;
  keyStrengths: string;
  areasForGrowth: string;
  createdAt: string;
}

export interface SkillRadarData {
  dimension: string;
  score: number;     // Average across all sessions
  trend: 'up' | 'down' | 'stable';
  sessionCount: number;
}
