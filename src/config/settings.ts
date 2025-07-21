export interface SettingItem {
  title: string;
  checked: boolean;
  onText: string;
  offText: string;
  btn: boolean;
  btnText: string;
}

export const initialSettings: SettingItem[] = [
  {
    title: "displayPCBanner",
    checked: true,
    onText: "Lucky Exchange",
    offText: "Lucky Sport",
    btn: false,
    btnText: "",
  },
  // 你可以再加入其他設定項目
];
