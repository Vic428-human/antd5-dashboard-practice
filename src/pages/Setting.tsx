import { useState } from "react";
import { Layout } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { useCountStore } from "../store/store";
import { initialSettings } from "../config/settings";
const { Sider } = Layout;

const Setting = ({ params }) => {
  const { isToggled, toggle } = useCountStore((state) => state);
  const [settingList, setSettingList] = useState(initialSettings);
  const [showDesktop, setShowDesktop] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  console.log({ settingList });
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
        <div className="demo-logo-vertical">
          <button onClick={toggle}>
            {isToggled ? "開啟中 ✅" : "關閉中 ❌"}
          </button>
        </div>
        <div>
          {settingList.map((item, index) => (
            <div
              key={index}
              className="min-w-[260px] shadow-lg overflow-hidden text-white"
            >
              <div className="h-12 bg-[#424242] p-4 font-semibold text-zinc-900 flex justify-center items-center">
                <div className="">{item.title}</div>
              </div>
              <div className="p-4 flex flex-col gap-3 items-center justify-center bg-[#000000] h-16">
                <div className="flex items-center gap-3 ">
                  {!item.btn ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-medium">
                        {item.checked ? item.onText : item.offText}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-1">
                      <div className="flex items-center justify-center bg-yellow-500 cursor-pointer text-black px-12 py-2 rounded-full">
                        {item.btnText}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sider>
    </div>
  );
};

export default Setting;
