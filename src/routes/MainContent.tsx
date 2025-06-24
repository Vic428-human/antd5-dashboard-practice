import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

function Menu1Detail() {
  const params = useParams();
  return <div>menu-1: {params.other}</div>;
}

export default function MainContent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/menu-1/:other" element={<Menu1Detail />} />
        <Route path="/usersList" element={<div>Users</div>} />
        <Route path="/file" element={<div>file</div>} />
      </Routes>
    </div>
  );
}
