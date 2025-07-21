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
  const { isToggled, toggle } = useCountStore();

  const lsDisplayRef = useRef<LuckySportsInstance | null>(null);
  const npnDisplayRef = useRef<LuckySportsInstance | null>(null);
  const navigate = useNavigate();

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
      <div className="flex items-center justify-center w-[100%] p-2 text-center relative">
        <div
          className={`relative h-[90%] w-[1100px] overflow-auto transition-all duration-300 ease-in-out ${
            isToggled ? "w-full" : "w-[375px]"
          }`}
        >
          <div>
            <span>右邊</span>
            <h3>切換狀態: {isToggled ? "開啟" : "關閉"}</h3>
          </div>

          {isToggled ? (
            <LuckySports ref={lsDisplayRef} />
          ) : (
            // TODO: 手機錨定的時候有些問題。 之後再研究 先專心處理 桌面板的
            <LuckySportsMb ref={npnDisplayRef} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContainerLayout;
