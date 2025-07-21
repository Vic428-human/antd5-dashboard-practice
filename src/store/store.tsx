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

type Option = { label: string; active: boolean };
type Setting = {
  title: string;
  ryanSetting: string;
  options: readonly Option[];
};

type Store = {
  settings: Setting[];
  toggleOption: (settingTitle: string, label: string) => void;
};

export const useSettingsStore = create<Store>((set) => ({
  settings: [
    {
      title: "displayPCScoreboard",
      ryanSetting: "displayPCScoreboard",
      options: [
        { label: "顯示", active: true },
        { label: "關閉", active: false },
      ],
    },
    {
      title: "Template",
      options: [
        { label: "Lucky Exchange", active: true },
        { label: "Lucky Sport", active: false },
      ],
    },
    {
      title: "Sports Priority",
      options: [
        { label: "Cricket First", active: false },
        { label: "Soccer First", active: true },
      ],
    },
  ],
  toggleOption: (settingTitle, label) =>
    set((state) => ({
      settings: state.settings.map((setting) =>
        setting.title === settingTitle
          ? {
              ...setting,
              options: setting.options.map((option) => ({
                ...option,
                active: option.label === label,
              })),
            }
          : setting
      ),
    })),
}));
