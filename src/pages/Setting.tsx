import { useState } from "react";
import { Layout } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
const { Sider } = Layout;
const Setting = ({ params }) => {
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
        <div className="demo-logo-vertical">其他組件擺放位置</div>
        <CaretRightFilled />
      </Sider>
    </div>
  );
};

export default Setting;
