import { create } from 'zustand';

export type ActiveView = 'interview-pro' | 'code' | 'whiteboard';
export type WorkspaceRole = 'interviewer' | 'interviewee';

export interface ReactionItem {
  id: string;
  emoji: string;
  sender: string;
}

export interface WorkspaceState {
  activeView: ActiveView;
  role: WorkspaceRole;
  timeRemaining: number;
  activePhase: number;
  currentLanguage: string;
  executionStatus: 'idle' | 'running' | 'success' | 'error';
  executionOutput: string | null;
  activeRightTab: 'rubric' | 'chat';
  reactions: ReactionItem[];
  
  // Actions
  setActiveView: (view: ActiveView) => void;
  toggleRole: () => void;
  decrementTime: () => void;
  setActivePhase: (phase: number) => void;
  setCurrentLanguage: (lang: string) => void;
  setExecutionStatus: (status: 'idle' | 'running' | 'success' | 'error') => void;
  setActiveRightTab: (tab: 'rubric' | 'chat') => void;
  addReaction: (emoji: string, sender?: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeView: 'interview-pro',
  role: 'interviewee',
  timeRemaining: 1800, // 30 minutes mock interview
  activePhase: 2,
  currentLanguage: 'typescript',
  executionStatus: 'idle',
  executionOutput: null,
  activeRightTab: 'rubric',
  reactions: [],

  setActiveView: (view) => set({ activeView: view }),

  toggleRole: () =>
    set((state) => ({
      role: state.role === 'interviewee' ? 'interviewer' : 'interviewee',
    })),

  decrementTime: () =>
    set((state) => ({
      timeRemaining: state.timeRemaining > 0 ? state.timeRemaining - 1 : 0,
    })),

  setActivePhase: (phase) => set({ activePhase: phase }),

  setCurrentLanguage: (currentLanguage) => set({ currentLanguage }),

  setExecutionStatus: (executionStatus) => set({ executionStatus }),

  setActiveRightTab: (activeRightTab) => set({ activeRightTab }),

  addReaction: (emoji, sender = 'You') => {
    const newReaction: ReactionItem = {
      id: Math.random().toString(),
      emoji,
      sender,
    };
    set((state) => ({ reactions: [...state.reactions.slice(-6), newReaction] }));
  },
}));

export default useWorkspaceStore;

