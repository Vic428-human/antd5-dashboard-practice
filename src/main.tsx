// 从 v4 到 v5
// 弃用 less，采用 CSS-in-JS
// antd/dist/antd.css 也已经移除
// 移除 css variables 以及在此之上构筑的动态主题方案。
// 在 5.x 里彻底移除了相关目录 antd/es/locale-provider、antd/lib/locale-provider
// 内置的时间库使用 Dayjs 替代 Moment.js
// 不再支持 babel-plugin-import，CSS-in-JS 本身具有按需加载的能力，不再需要插件支持
// https://ant.design/docs/react/migration-v5-cn
import "antd/dist/reset.css"; // 引入 Ant Design 的重置样式  antd 规范样式
import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
