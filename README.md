## 前言

> 後台 基於 antd v5 + tailwindcss v4 + nodejs + mongodb
> 該項目已於 2025/0623 開始製作

### 目前專案進度

- 後端功能 登入/登出/註冊/發送郵件/otp 驗證/jwt 引用/中間件
- 前端功能 菜單/路由

### 專案啟用 React + TypeScript + Vite + redux toolkit

```
npm i
nvm use 18
npm run dev

```

- [useHook 基礎的 tanstack-query 基本用法](https://github.com/Vic428-human/redux-toolkit-and-tanstack-query-demo/blob/main/src/hooks/useApplimittation.ts)
- [QueryClient 獨立出來](https://github.com/Vic428-human/redux-toolkit-and-tanstack-query-demo/blob/main/src/hooks/useApplimittation.ts)

### CODEBASE

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

### 專案用途

> 結合 TanStack Query (React Query) + vite + tailwindcss v4 + antd v5

#### 一開始建置 vite + react + typescript 專案

```js
npm create vite@latest my-app -- --template react-ts
```
