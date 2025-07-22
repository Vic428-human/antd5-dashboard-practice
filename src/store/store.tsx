import { create } from "zustand";

export interface CountState {
  count: number;
  mode: "mobile" | "pc";
  increase: (by: number) => void;
  resetCount: () => void;
  setMode: (mode: "mobile" | "pc") => void;
}

export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  mode: "pc",
  increase: (by) => set((state) => ({ count: state.count + by })),
  resetCount: () => set({ count: 0 }),
  setMode: (mode) => set({ mode }),
}));

type SportsCategory = {
  title: string;
  value: string;
  checked: boolean;
  id: string;
};

type SettingItem = {
  title: string;
  checked: boolean;
  onText: string;
  offText: string;
  btn?: boolean;
  [key: string]: any; // 支援額外動態屬性如 displayPCNavHome
};

type SettingsState = {
  displaySportsRaw: string; // ← 後端傳來 "2,4"
  sportsCategories: SportsCategory[];
  initialSettings: SettingItem[];
  toggleCategory: (value: string) => void;
  toggleSetting: (title: string) => void;
  checkAllCategories: () => void;
  uncheckAllCategories: () => void;
  initializeCategories: () => void;
  setDisplaySportsRaw: (value: string) => void;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  // 後端只會傳 string，格式為 "2,4"
  displaySportsRaw: "2,4",
  setDisplaySportsRaw: (value) => set({ displaySportsRaw: value }),
  sportsCategories: [
    {
      title: "displaySports",
      value: "tennis",
      checked: false,
      id: "2",
    },
    {
      title: "displaySports",
      value: "Cricket",
      checked: false,
      id: "4",
    },
  ],
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
  checkAllCategories: () =>
    set((state) => ({
      sportsCategories: state.sportsCategories.map((cat) => ({
        ...cat,
        checked: true,
      })),
    })),
  uncheckAllCategories: () =>
    set((state) => ({
      sportsCategories: state.sportsCategories.map((cat) => ({
        ...cat,
        checked: false,
      })),
    })),
  initializeCategories: () => {
    const { displaySportsRaw, sportsCategories } = get();
    const displaySports = displaySportsRaw.split(",");

    const updatedCategories = sportsCategories.map((category) => ({
      ...category,
      checked: displaySports.includes(category.id),
    }));

    set({ sportsCategories: updatedCategories });
  },
}));
