import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Setting from "../pages/Setting.tsx";
import ContainerLayout from "../components/Layout/layout.tsx";

function Menu1Detail() {
  const params = useParams<{ other: string }>();

  // 根據 params.other 的值來切換元件
  switch (params.other) {
    case "devices":
      return <Setting params={params} />;
    case "settings":
      return <Setting params={params} />;
    case "styling":
      return <Setting params={params} />;
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
        {/* <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-menu/:other" element={<Menu1Detail />} /> */}
      </Routes>
    </Router>
  );
}
