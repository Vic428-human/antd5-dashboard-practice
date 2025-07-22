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
  //TODO: 數值代表有量的，其餘都是沒量的
  XXsportsCategories: [1, 4, 6],
  initialSettings: [
    {
      title: "is9WLayout",
      checked: false,
      onText: "Lucky Exchange",
      offText: "Lucky Sport",
      is9WLayout: true,
    },
    {
      title: "isSouthAsia",
      checked: true,
      onText: "Lucky Exchange",
      offText: "Lucky Sport",
      isSouthAsia: true,
    },
    // TODO: offsetTop 要是數字
    {
      title: "offsetTop",
      checked: false,
      onText: "Enable Top Offset",
      offText: "Disable Top Offset",
      offsetTop: 0,
    },
    {
      title: "offsetBottom",
      checked: false,
      onText: "Enable Bottom Offset",
      offText: "Disable Bottom Offset",
      offsetBottom: 0,
    },
    {
      title: "displayHeader",
      checked: true,
      onText: "Show Header",
      offText: "Hide Header",
      displayHeader: true,
    },
    {
      title: "displayBalance",
      checked: true,
      onText: "Show Balance",
      offText: "Hide Balance",
      displayBalance: true,
    },
    {
      title: "displayPCLeftSidebar",
      checked: true,
      onText: "Show Left Sidebar",
      offText: "Hide Left Sidebar",
      displayPCLeftSidebar: true,
    },
    {
      title: "displayPCNavHome",
      checked: true,
      onText: "Show Home Nav",
      offText: "Hide Home Nav",
      displayPCNavHome: true,
    },
    {
      title: "displayPCNavSearch",
      checked: true,
      onText: "Show Search Nav",
      offText: "Hide Search Nav",
      displayPCNavSearch: true,
    },
    {
      title: "displayPCBanner",
      checked: true,
      onText: "Show Banner",
      offText: "Hide Banner",
      displayPCBanner: true,
    },
    {
      title: "displayPCScoreboard",
      checked: true,
      onText: "Show Scoreboard",
      offText: "Hide Scoreboard",
      displayPCScoreboard: true,
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
