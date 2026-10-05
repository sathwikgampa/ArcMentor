import { create } from 'zustand';

export type ActiveView = 'code' | 'whiteboard';
export type WorkspaceRole = 'interviewer' | 'interviewee';

export interface WorkspaceState {
  activeView: ActiveView;
  role: WorkspaceRole;
  timeRemaining: number;
  setActiveView: (view: ActiveView) => void;
  toggleRole: () => void;
  decrementTime: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeView: 'code',
  role: 'interviewee',
  timeRemaining: 300,

  setActiveView: (view) => set({ activeView: view }),

  toggleRole: () =>
    set((state) => ({
      role: state.role === 'interviewee' ? 'interviewer' : 'interviewee',
    })),

  decrementTime: () =>
    set((state) => ({
      timeRemaining: state.timeRemaining > 0 ? state.timeRemaining - 1 : 0,
    })),
}));

export default useWorkspaceStore;
