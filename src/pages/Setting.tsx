import { useState } from "react";
import { Layout } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { useCountStore } from "../store/store";
const { Sider } = Layout;

const Setting = ({ params }) => {
  const { increase } = useCountStore((state) => state);
  const [showDesktop, setShowDesktop] = useState(true);
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
        width={200}
        style={{
          position: "relative",
          backgroundColor: "green", // Add this line
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
        <div className="demo-logo-vertical">{params.other}</div>
        <div className="demo-logo-vertical">
          <div
            onClick={() => {
              setShowDesktop(false);
            }} // 點 button1 顯示 Desktop
            className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full min-w-[35%] ${
              showDesktop ? "bg-yellow-500" : "bg-gray-500"
            }`}
          >
            電腦版
          </div>
          <div onClick={() => increase(1)}>increase</div>
        </div>
        <div>
          <span>中間區域:</span>
        </div>
      </Sider>
    </div>
  );
};

export default Setting;
