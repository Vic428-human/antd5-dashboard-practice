import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../Menu/SidebarMenu";
import LuckySports from "../../components/LuckySports.tsx";
import type { LuckySportsInstance } from "https://widget-dev-v3.ckex.xyz/mock/LuckySports.es.js";
import { useCountStore } from "../../store/store";
const { Sider } = Layout;

const ContainerLayout = () => {
  const count = useCountStore((state) => state.count);
  console.log({ count });
  const lsDisplayRef = useRef<LuckySportsInstance | null>(null);
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
        <div></div>
        <SidebarMenu onMenuClick={({ key }) => navigate(key as string)} />
      </Sider>
      {/* demo   */}
      <Outlet />
      <div className="flex items-center justify-center w-[100%] p-2 text-center relative">
        <div
          className={`relative h-[90%] w-[1100px] overflow-auto transition-all duration-300 ease-in-out ${
            true ? "w-full" : "w-[375px]"
          }`}
        >
          <div>
            <span>右邊</span>
            <p>Count:{count}</p>
          </div>

          <LuckySports ref={lsDisplayRef} />
        </div>
      </div>
    </div>
  );
};

export default ContainerLayout;
