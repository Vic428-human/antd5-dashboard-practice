## 前言

> 後台 基於 React + TypeScript + Vite + antd v5 + tailwindcss v4 + nodejs + mongodb + TanStack Query + redux toolkit
> 該項目已於 2025/0623 開始製作，預計會使用 redux toolkit 但尚未引入

### 目前專案進度

#### 後端功能:

- [實現用戶註冊與登入驗證流程，並透過 JWT 與 OTP 郵件驗證保障安全性](https://github.com/Vic428-human/antd5-dashboard-practice/blob/main/src/routes/MainContent.tsx)
- [x] 登入
- [x] 登出
- [x] 註冊
- [x] nodemailer 發送郵件
- [x] 用 OTP 驗證信箱身份
- [x] 重新發送 OTP 驗證碼
- [x] JWT 機制引用
- [x] 中間件獲取 cookies 配合 cookie-parser 使用

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

> 暫時沒用到，只是預先建置

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
