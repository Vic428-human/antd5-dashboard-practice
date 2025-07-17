// https://ant.design/docs/spec/layout
// Layout => https://ant.design/components/layout
import React, { useState } from "react";
import SidebarMenu from "./components/Menu/SidebarMenu.tsx";
import MainContent from "./routes/MainContent.tsx";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  CaretLeftFilled,
  CaretRightFilled,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout className=" w-screen" style={{ margin: "" }}>
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
        }}
      >
        <div
          className="text-white h-[30px] w-[30px] bg-red-600 flex items-center justify-center absolute top-[600px] right-[-40px] z-[1000]"
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

          {/* <Button
            type="primary"
            icon={collapsed ? <CaretRightFilled /> : <CaretRightFilled />}
            onClick={() => setCollapsed((prev) => !prev)}
            style={{ position: "absolute", top: 200, right: -50 }} // className="-ml-[50px]" 沒效，可能  Ant Design 的 Button 元件預設會覆蓋掉部分外部樣式
          /> */}
        </div>
        {/* <div className="demo-logo-vertical">
          <h1 className="text-red-500">後台管理系統</h1>
        </div> */}
        {/* <SidebarMenu onMenuClick={({ key }) => navigate(key as string)} /> */}
      </Sider>

      <Layout>
        {/* <Header></Header> */}
        <>
          <div
            className="relative w-full px-24 py-0.5 bg-yellow-600  shadow-md
 outline-offset-[-1px] "
          >
            {/* 中間文字置中 */}
            <div className="flex justify-center items-center">
              <div className="text-center text-secondary-950 text-base font-medium font-['Roboto'] leading-normal tracking-tight">
                SETTINGS
              </div>
            </div>
            {/* Reset 按鈕定位在右上角 */}
            <div className="w-44 h-6 py-1 absolute top-[2px] right-0 bg-yellow-500 rounded-md flex justify-center items-center gap-1 overflow-hidden">
              <div className="flex-1 py-0.5 flex flex-col justify-center items-center">
                <div className="text-center text-secondary-950 text-base font-medium font-['Roboto'] leading-none">
                  Reset
                </div>
              </div>
            </div>
          </div>
        </>
        <Content className="bg-content-container" style={{ margin: "" }}>
          <div>
            {/* 不同路由會在這裡切換 */}
            <MainContent />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
