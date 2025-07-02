import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
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
  getItem("首頁", "/", <AssetIcon name="person_icon" alt="首頁" />),
  getItem(
    "測試菜單",
    "/menu-1",
    <AssetIcon name="mail_icon" alt="測試菜單" />,
    [
      getItem("Tom", "/menu-1/tom"),
      getItem("Bill", "/menu-1/bill"),
      getItem("Alex", "/menu-1/alex"),
    ]
  ),
  getItem("Team", "/team", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "/file", <FileOutlined />),
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
