import { useState, useEffect } from "react";
import { Layout } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { useSettingsStore } from "../store/store";
import { useOutletContext } from "react-router-dom";
const { Sider } = Layout;

const Setting = ({ params }) => {
  const { isDisplay } = useOutletContext();
  const {
    settings,
    toggleOption,
    toggleSwitch, // 若你也要控制 switch 變化
  } = useSettingsStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "green", // Add this line
      }}
      className="h-screen"
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={"100%"}
        style={{
          position: "relative",
          backgroundColor: "#000000", // Add this line
          minHeight: "100%",
        }}
      >
        <div
          className="text-white h-[30px] w-[30px] bg-red-600 flex items-center justify-center absolute bottom-[0px]  z-[1000]"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div
            style={{
              transition: "transform 0.3s ease",
              transform: collapsed ? "rotate(-180deg)" : "none",
            }}
          >
            <CaretRightFilled />
          </div>
        </div>
        <div>
          {settings.map((setting, index) => (
            <div
              key={index}
              className="min-w-[260px] shadow-lg overflow-hidden text-white"
            >
              <div className="h-12 bg-[#424242] p-4 font-semibold text-zinc-900 flex justify-center items-center">
                <div className="">{setting.title}</div>
              </div>
              <div className="p-4 flex gap-3 items-center justify-center bg-[#000000] h-16">
                {setting.options.map((option) => (
                  <div
                    key={option.label}
                    className={`flex items-center justify-center max-w-[120px] h-8 cursor-pointer text-black px-4 py-2 rounded-md w-[140px] transition-all duration-200 bg-gray-300 whitespace-nowrap ${
                      option.active
                        ? "bg-red-500 font-medium font-['Roboto'] leading-none"
                        : "bg-[#c6c6c6] font-medium font-['Roboto'] leading-none"
                    }`}
                    // option.active 不能直接拿原本的
                    onClick={() => {
                      // ✅ 1. 取得舊值
                      const currentSetting = settings.find(
                        (s) => s.title === setting.title
                      );
                      const currentChecked = currentSetting?.switch ?? false;
                      console.log("currentChecked===>", currentChecked);
                      // ✅ 2. 執行邏輯
                      toggleOption(setting.title, option.label);
                      // ✅ 3. 如果你也想切換 switch 值，加這行
                      toggleSwitch(setting.title);
                      // ✅ 4. 使用舊狀態做你的 callback
                      isDisplay({
                        title: setting.title,
                        value: currentChecked,
                      });
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Sider>
    </div>
  );
};

export default Setting;
