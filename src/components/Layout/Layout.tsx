import { useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../Menu/SidebarMenu";
import LuckySports from "../../components/LuckySports.tsx";
import { useSettingsStore } from "../../store/store";

const { Sider } = Layout;

const ContainerLayout = () => {
  const { initialSettings } = useSettingsStore();
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (divRef.current) {
      const newDiv = document.createElement("div");
      newDiv.textContent = "我是一個用 ref 動態新增的區塊";
      newDiv.style.color = "red";
      divRef.current.appendChild(newDiv);
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#272221]">
      <Sider
        trigger={null}
        collapsible
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={150}
        style={{
          position: "relative",
        }}
      >
        <div className="demo-logo-vertical"></div>
        <SidebarMenu onMenuClick={({ key }) => navigate(key as string)} />
      </Sider>
      {/* demo   */}
      <Outlet context={{}} />
      {/* 這邊放實際顯示與否的面板 */}
      <LuckySports ref={divRef} defalut={initialSettings} />
      {/* TODO: 下面只是當時在實驗串接別的網頁 */}
      {/* <div className="flex flex-col w-[100%]">
        <div className="flex justify-between p-4">
          <div className="flex">
            <div
              onClick={() => setMode("mobile")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "mobile" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              Mobile
            </div>
            <div
              onClick={() => setMode("pc")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "pc" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              PC
            </div>
          </div>
          <div className="flex">
            <div
              onClick={() => setMode("mobile")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "mobile" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              Reset
            </div>
            <div
              onClick={() => setMode("pc")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "pc" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              save
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <div className="flex items-center justify-center w-[100%] p-8  text-center relative">
            <div
              className={`
      relative h-[80%] max-w-[1100px] overflow-auto
      transition-all duration-300 ease-in-out
      ${containerWidthClass} 
    `}
            >
              <div className="h-[calc(100vh-120px)] overflow-y-auto">
                <DisplayComponent ref={displayRef} />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ContainerLayout;
