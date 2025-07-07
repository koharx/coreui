import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type DevtoolsState = {
  count: number;
  inc: () => void;
};

export const useDevtoolsStore = create<DevtoolsState>()(
  devtools((set) => ({
    count: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
  }), { name: 'DevtoolsStore' })
); 