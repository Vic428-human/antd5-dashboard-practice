import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import EmailVerify from "../pages/EmailVerify.tsx";
import ResetPassword from "../pages/ResetPassword.tsx";

function Menu1Detail() {
  const params = useParams<{ other: string }>();

  // 根據 params.other 的值來切換元件
  switch (params.other) {
    case "email-verify":
      return <EmailVerify />;
    case "reset-password":
      return <ResetPassword />;
    default:
      // 如果沒有匹配的，可以顯示預設內容
      return <div>menu-1: {params.other}</div>;
  }
}

export default function MainContent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-menu/:other" element={<Menu1Detail />} />
      </Routes>
    </div>
  );
}
