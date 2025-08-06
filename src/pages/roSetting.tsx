import { Switch } from "antd";
import { useSettingsStore } from "../store/store";
import { useOutletContext } from "react-router-dom";
import { initialSettings } from "../config/settings";
import SidebarWrapper from "../components/SidebarWrapper";

type OutletCtx = {
  expanded: boolean;
};

export default function ROSetting() {
  const { expanded } = useOutletContext<OutletCtx>();
  useSettingsStore();
  return (
    // 展開的時候固定寬度，閉合的時候消失
    <SidebarWrapper isOpen={expanded}>
      <div className="h-8 bg-[#212121] px-4 text-white flex justify-between items-center text-[14px] font-semibold overflow-y-auto">
        <span>全部展開區域</span>
      </div>

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
    </SidebarWrapper>
  );
}
