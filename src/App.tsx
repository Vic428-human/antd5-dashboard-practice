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
import { assets } from "./assets/assets.ts";

const { Header, Sider, Content, Footer } = Layout;

function App() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="container">
      <Layout>
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
        <Content style={{ margin: "" }}>
          <div
            style={
              {
                // padding: 24,
                // minHeight: 360,
                // background: colorBgContainer,
                // borderRadius: borderRadiusLG,
              }
            }
          >
            <MainContent />
          </div>
        </Content>
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
