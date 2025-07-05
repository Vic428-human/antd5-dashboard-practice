/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  //   Tailwind默认样式会把 button 背景色设置为透明，会影响到antd的Button组件。
  // 禁止tailwind默认属性
  corePlugins: {
    preflight: false,
  },
};
