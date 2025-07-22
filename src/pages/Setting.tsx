import { useState, useEffect } from "react";
import { Layout, Switch } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { useSettingsStore } from "../store/store";
import { useOutletContext } from "react-router-dom";
import { assets } from "../assets/assets.ts";
// import { onLiveDot } from "../assets/assets.ts";
const { Sider } = Layout;

const Setting = ({ params }) => {
  const { isDisplay } = useOutletContext();
  const { sportsCategories, initialSettings, toggleCategory, toggleSetting } =
    useSettingsStore();
  const [collapsed, setCollapsed] = useState(false);
  console.log("sportsCategories", sportsCategories);
  const RequirementRow = ({
    text,
    checked,
    onClick,
  }: {
    text: string;
    checked: boolean;
    onClick: () => void;
  }) => {
    const iconSrc = checked ? assets.function_succes : assets.onLiveDot;

    return (
      <div onClick={onClick} className="flex items-center gap-2 cursor-pointer">
        <img src={iconSrc} alt="" className="w-[12px] sm:w-[12px]" />
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "green", // Add this line
      }}
      className="h-screen overflow-auto"
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
          // minHeight: "800px",
        }}
      >
        <div
          className="text-white h-[30px] w-[30px] bg-red-600 flex items-center justify-center absolute bottom-[50px] z-[1000]"
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
          {initialSettings.map((setting, index) => (
            <div
              key={index}
              className="min-w-[260px] shadow-lg overflow-hidden text-white"
            >
              <div className="h-12 bg-[#424242] p-4 font-semibold text-zinc-900 flex justify-center items-center">
                <div className="">{setting.title}</div>
              </div>
              <div className="p-4 flex gap-3 bg-[#000000] h-16">
                {!setting.btn ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Switch
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      checked={setting.checked}
                      onChange={() => {
                        toggleSetting(setting.title);
                        isDisplay({
                          title: setting.title,
                          value: !setting.checked,
                        });
                      }}
                    />
                    <span className="font-medium">
                      {setting.checked ? setting.onText : setting.offText}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center ">
                    {sportsCategories.map((cat) => (
                      <RequirementRow
                        key={cat.value}
                        text={cat.title}
                        checked={cat.checked}
                        onClick={() => toggleCategory(cat.value)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Sider>
    </div>
  );
};

export default Setting;
