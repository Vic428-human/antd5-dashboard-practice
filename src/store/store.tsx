import { create } from "zustand";

export interface CountState {
  count: number;
  isToggled: boolean; // 新增的 toggle 狀態
  increase: (by: number) => void;
  resetCount: () => void;
  toggle: () => void; // 新增的切換方法
}

export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  isToggled: false, // 初始值為關閉
  increase: (by) => set((state) => ({ count: state.count + by })),
  resetCount: () => set({ count: 0 }),
  toggle: () => set((state) => ({ isToggled: !state.isToggled })), // 切換 true/false
}));
