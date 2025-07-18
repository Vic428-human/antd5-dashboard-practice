import { create } from "zustand";

export interface CountState {
  count: number;
  increase: (by: number) => void;
  resetCount: () => void;
}

export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  increase: (by) => set((state) => ({ count: state.count + by })),
  resetCount: () => set({ count: 0 }),
}));
