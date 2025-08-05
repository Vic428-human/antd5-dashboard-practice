import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import ROSetting from "../pages/roSetting.tsx";
import ContainerLayout from "../components/Layout/Layout.tsx";

function Menu1Detail() {
  const params = useParams<{ other: string }>();

  // 根據 params.other 的值來切換元件
  switch (params.other) {
    case "ro-setting":
      return <ROSetting />;
    default:
      // 如果沒有匹配的，可以顯示預設內容
      return <div>menu-1: {params.other}</div>;
  }
}

export default function MainContent() {
  const Router = BrowserRouter;
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<ContainerLayout />}>
          <Route path="/:other" element={<Menu1Detail />} />
        </Route>
      </Routes>
    </Router>
  );
}
