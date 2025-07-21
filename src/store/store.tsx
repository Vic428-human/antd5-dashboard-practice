import { create } from "zustand";

export interface CountState {
  count: number;
  mode: "mobile" | "pc"; // 狀態從 boolean 改成 union 字串型別
  increase: (by: number) => void;
  resetCount: () => void;
  setMode: (mode: "mobile" | "pc") => void; // 設定目前模式的方法
}

export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  mode: "pc", // 依預設設為PC，可根據需求調整
  increase: (by) => set((state) => ({ count: state.count + by })),
  resetCount: () => set({ count: 0 }),
  setMode: (mode) => set({ mode }), // 切換模式
}));
