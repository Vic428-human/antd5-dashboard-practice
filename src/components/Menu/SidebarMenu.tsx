import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import AssetIcon from "./AssetIcon.tsx";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem(
    "DEVICES",
    "/devices",
    <AssetIcon name="person_icon" alt="DEVICES" />
  ),
  getItem(
    "SETTINGS",
    "/settings",
    <AssetIcon name="person_icon" alt="SETTINGS" />
  ),
  getItem(
    "RO計算機",
    "/ro-setting",
    <AssetIcon name="person_icon" alt="STYLING" />
  ),
];

interface SidebarMenuProps {
  onMenuClick: MenuProps["onClick"];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onMenuClick }) => (
  <Menu
    theme="dark"
    defaultSelectedKeys={["1"]}
    mode="inline"
    items={items}
    onClick={onMenuClick}
  />
);

export default SidebarMenu;
