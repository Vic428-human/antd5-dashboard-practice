import React from "react";

interface SidebarWrapperProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function SidebarWrapper({
  isOpen,
  children,
}: SidebarWrapperProps) {
  return (
    <div
      className={`h-full flex flex-col bg-red-400 overflow-hidden transition-all duration-300 ease-in-out w-[260px] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="justify-between items-center overflow-hidden transition-all text-[12px]">
        {children}
      </div>
    </div>
  );
}
