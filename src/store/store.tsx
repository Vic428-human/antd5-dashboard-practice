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

type SportsCategory = {
  title: string;
  value: string;
  checked: boolean;
};

type SettingItem = {
  title: string;
  checked: boolean;
  onText: string;
  offText: string;
  btn?: boolean;
};

type SettingsState = {
  sportsCategories: SportsCategory[];
  initialSettings: SettingItem[];
  toggleCategory: (value: string) => void;
  toggleSetting: (title: string) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  sportsCategories: [
    { title: "All", value: "all", checked: false },
    { title: "Aussie rules", value: "aussie_rules", checked: true },
  ],
  initialSettings: [
    {
      title: "displayPCBanner",
      checked: true,
      onText: "Lucky Exchange",
      offText: "Lucky Sport",
    },
    {
      title: "AA222",
      checked: true,
      onText: "AAA",
      offText: "VVV",
    },
    {
      title: "Sports Categories",
      checked: false,
      onText: "BBB",
      offText: "CCC",
      btn: true,
    },
  ],
  toggleCategory: (value) =>
    set((state) => ({
      sportsCategories: state.sportsCategories.map((cat) =>
        cat.value === value ? { ...cat, checked: !cat.checked } : cat
      ),
    })),
  toggleSetting: (title) =>
    set((state) => ({
      initialSettings: state.initialSettings.map((setting) =>
        setting.title === title
          ? { ...setting, checked: !setting.checked }
          : setting
      ),
    })),
}));
