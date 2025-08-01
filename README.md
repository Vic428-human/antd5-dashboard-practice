## 前言

> 後台 基於 React + TypeScript + Vite + antd v5 + tailwindcss v4 + nodejs + mongodb + TanStack Query + redux toolkit
> 該項目已於 2025/0623 開始製作，預計會使用 redux toolkit 但尚未引入

### 7/16 ~ 7/18 目標

1.

### 目前專案進度

#### 後端功能:

- [實現用戶註冊與登入驗證流程，並透過 JWT 與 OTP 郵件驗證保障安全性](https://github.com/Vic428-human/antd5-dashboard-practice/tree/main/backend/routes)
- [x] 登入
- [x] 登出
- [x] 註冊
- [x] nodemailer 發送郵件
- [x] 用 OTP 驗證信箱身份
- [x] 重新發送 OTP 驗證碼
- [x] JWT 機制引用
- [x] 中間件獲取 cookies 配合 cookie-parser 使用
- [x] 重置密碼
- [x] 獲取使用者資訊(基於 cookies 有存過 jwt 為前提，默認先前已經登入過，除非駭客知道你本地端 cookies 的資訊，不然無法得知使用者個人資料)

---

- [其他](https://github.com/Vic428-human/antd5-dashboard-practice/blob/main/src/routes/MainContent.tsx)

#### 前端功能：

- [x] 二級菜單
- [x] 路由切換

```
npm i
nvm use 18
npm run dev

```

## CODEBASE

#### 其他功能

- [後端相關的路由](https://github.com/Vic428-human/antd5-dashboard-practice/blob/main/src/routes/MainContent.tsx)
- [useHook 基礎的 tanstack-query 基本用法](https://github.com/Vic428-human/redux-toolkit-and-tanstack-query-demo/blob/main/src/hooks/useApplimittation.ts)
- [QueryClient 獨立出來](https://github.com/Vic428-human/redux-toolkit-and-tanstack-query-demo/blob/main/src/hooks/useApplimittation.ts)

####

#### 全局預設的主要配色

- [ConfigProvider](https://ant.design/docs/react/customize-theme#seed-token)

```
<ConfigProvider
    theme={{
        token: {
            colorPrimary: "#fcba03",
        },
    }}
>
```

#### 該專案建置方式

```js
npm create vite@latest my-app -- --template react-ts

```

### 備份

### 菜單本體

> 這版不需要用到 先隱藏

```
      {/* <Sider
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
        <div className="demo-logo-vertical">
          <img src={assets.logo} alt="" className="w-28 sm:w-32" />
          <h1 className="text-red-500">後台管理系統</h1>
        </div>
        <SidebarMenu onMenuClick={({ key }) => navigate(key as string)} />
      </Sider> */}
```

### 漢堡 ICON

> 菜單在這板不存在，但未來或許會用到

```
   <div>
            {/* <Button
              type="primary"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((prev) => !prev)}
              style={{ marginLeft: "-50px" }} // className="-ml-[50px]" 沒效，可能  Ant Design 的 Button 元件預設會覆蓋掉部分外部樣式
            /> */}
          </div>

```

### 原先 Swithc btn 切版

> 但 7/16 跟 UIUX 討論後，改用 antd 的 switch btn

```
import React from "react";
import { assets } from "../assets/assets.ts";

const LuckyExchangeButton = ({ isActive = false, children = "" }) => {
  const activeStyles = {
    wrapper: "bg-green-500 text-[#3A3B3E]",
    text: "text-[#3A3B3E]",
    icon: assets.on,
  };

  const inactiveStyles = {
    wrapper: "bg-[#F9FAFC] text-[#CCCDD1]",
    text: "text-[#3A3B3E]",
    icon: assets.off,
  };

  const currentStyle = isActive ? activeStyles : inactiveStyles;

  return (
    <div className="flex items-center mb-2">
      <div
        className={`flex items-center w-full h-8 rounded-full shadow ${currentStyle.wrapper}`}
      >
        <span className="w-7 h-7 rounded-full border-2 border-gray-300 bg-white cursor-pointer flex items-center justify-center font-bold text-xs">
          <img src={currentStyle.icon} alt="" className="w-28 sm:w-28" />
        </span>

        <span
          className={`${currentStyle.text} flex items-center justify-center w-full text-base font-['Roboto']`}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

export default LuckyExchangeButton;
```
