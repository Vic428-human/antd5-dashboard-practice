import React, { useState } from "react";
// https://ant.design/docs/spec/layout
// Layout => https://ant.design/components/layout
import "./styles/dashboard.css";
import { Button, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import MainContent from "./routes/MainContent.tsx";
import SidebarMenu from "./components/Menu/SidebarMenu.tsx";

const { Header, Sider, Content, Footer } = Layout;

function App() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="container">
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
      >
        <div className="demo-logo-vertical">Logo</div>
        <SidebarMenu onMenuClick={({ key }) => navigate(key as string)} />
      </Sider>

      <Layout>
        <Header>
          <div>
            <Button
              type="primary"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((prev) => !prev)}
              style={{ marginLeft: "-50px" }} // className="-ml-[50px]" 沒效，可能  Ant Design 的 Button 元件預設會覆蓋掉部分外部樣式
            />
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <MainContent />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

// function MainContent() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<div>Home</div>} />
//         <Route path="/menu-1/:other" element={<Menu1Detail />} />
//         <Route path="/usersList" element={<div>Users</div>} />
//         <Route path="/file" element={<div>file</div>} />
//       </Routes>
//     </div>
//   );
// }

// function Menu1Detail() {
//   const params = useParams();
//   return <div>menu-1: {params.other}</div>;
// }

export default App;
