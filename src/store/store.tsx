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
  displayPCNavHome?: boolean;
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
  displaySportsRaw: "",
  // setDisplaySportsRaw: (value) => set({ displaySportsRaw: value }),
  setDisplaySportsRaw: (newRaw: string) => set({ displaySportsRaw: newRaw }),
  sportsCategories: [
    {
      // Tennis不曉得為什麼沒顯示
      title: "displaySports",
      value: "Basketball",
      checked: false,
      id: "sr:sport:2",
    },
    // {
    //   title: "displaySports",
    //   value: "Badminton",
    //   checked: false,
    //   id: "sr:sport:31",
    // },
    // {
    //   title: "displaySports",
    //   value: "Aussie Rules",
    //   checked: false,
    //   id: "sr:sport:13",
    // },
    {
      title: "displaySports",
      value: "soccer",
      checked: false,
      id: "1",
    },
    // {
    //   title: "displaySports",
    //   value: "Cricket",
    //   checked: false,
    //   id: "4",
    // },
  ],
  initialSettings: [
    {
      title: "spCalculator",
      checked: true,
      onText: "開啟",
      offText: "關閉",
      is9WLayout: true,
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
