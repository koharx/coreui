import { create } from 'zustand';

export type AppState = {
  count: number;
  inc: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
})); 