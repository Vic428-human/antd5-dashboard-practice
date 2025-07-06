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
    "驗證菜單",
    "/verify-menu",
    <AssetIcon name="mail_icon" alt="測試菜單" />,
    [
      getItem("信箱驗證", "/verify-menu/email-verify"),
      getItem("密碼重置", "/verify-menu/reset-password"),
    ]
  ),
  getItem("Team", "/team", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("登入", "/login", <FileOutlined />),
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
