import React from "react";
import { Switch } from "antd";
import { useSettingsStore } from "../store/store";

export default function ROSetting() {
  const { initialSettings, toggleSetting } = useSettingsStore();
  return (
    <div>
      {initialSettings.map((setting, index) => (
        <div
          key={index}
          className="min-w-[260px] shadow-lg overflow-hidden text-white"
        >
          <div className="h-12 bg-[#424242] p-4 font-semibold text-zinc-900 flex justify-center items-center">
            <div className="">{setting.title}</div>
          </div>
          <div className="p-4 flex gap-3 bg-[#000000] h-16">
            <div className="flex items-center justify-center space-x-2">
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
                checked={setting.checked}
                onChange={() => {
                  toggleSetting(setting.title);
                }}
              />
              <span className="font-medium">
                {setting.checked ? setting.onText : setting.offText}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ColorBlockProps {
  topColor: string;
  bottomColor: string;
  onClick?: () => void;
}

export const ColorBlock: React.FC<ColorBlockProps> = ({
  topColor,
  bottomColor,
  onClick,
}) => {
  const setColor = useColorStore((state) => state.setColor);
  const handleClick = () => {
    setColor("primary", topColor);
    setColor("secondary", bottomColor);
  };

  return (
    <div
      className="w-7 h-8 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm 
                 border-2 border-solid border-black/50 flex flex-col"
      onClick={handleClick}
    >
      <div
        className="h-1/2 flex items-center justify-center text-center w-full relative"
        style={{ backgroundColor: topColor }}
      />
      <div
        className="h-1/2 flex items-center justify-center text-center w-full relative"
        style={{ backgroundColor: bottomColor }}
      />
    </div>
  );
};
