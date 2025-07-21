import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../Menu/SidebarMenu";
import LuckySports from "../../components/LuckySports.tsx";
import LuckySportsMb from "../../components/LuckySportsMb.tsx";
import type { LuckySportsInstance } from "https://widget-dev-v3.ckex.xyz/mock/LuckySports.es.js";
import { useCountStore } from "../../store/store";
const { Sider } = Layout;

const ContainerLayout = () => {
  const { mode, setMode } = useCountStore();

  const lsDisplayRef = useRef<LuckySportsInstance | null>(null);
  const npnDisplayRef = useRef<LuckySportsInstance | null>(null);
  const navigate = useNavigate();

  const containerWidthClass = mode === "pc" ? "w-full" : "w-[375px]";
  const DisplayComponent = mode === "pc" ? LuckySports : LuckySportsMb;
  const displayRef = mode === "pc" ? lsDisplayRef : npnDisplayRef;

  const isDisplay = (props) => {
    const { title, value } = props;
    const options = {
      [title]: value,
    };
    console.log("====>options", options);
    lsDisplayRef.current?.updateOptions({
      options: options,
    });
  };
  return (
    <div className="flex h-screen">
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
      <Outlet />
      <div className="flex flex-col w-[100%]">
        <div className="flex ">
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
      </div>
    </div>
  );
};

export default ContainerLayout;
