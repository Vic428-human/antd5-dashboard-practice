## 前言

> 後台 基於 React + TypeScript + Vite + antd v5 + tailwindcss v4 + nodejs + mongodb + TanStack Query + redux toolkit
> 該項目已於 2025/0623 開始製作，預計會使用 redux toolkit 但尚未引入

### 目前專案進度

- 後端功能 登入/登出/註冊/發送郵件/otp 驗證/jwt 引用/中間件
- 前端功能 菜單/路由

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

#### 該專案建置方式

```js
npm create vite@latest my-app -- --template react-ts
```
