import React from "react";
import { assets } from "../assets/assets.ts";

const LuckyExchangeButton = ({ isActive = false, children = "" }) => {
  const activeStyles = {
    wrapper: "bg-green-500 text-[#3A3B3E]",
    text: "text-[#3A3B3E]",
    icon: assets.on,
  };

  const inactiveStyles = {
    wrapper: "bg-[#F9FAFC] text-[#CCCDD1]",
    text: "text-[#3A3B3E]",
    icon: assets.off,
  };

  const currentStyle = isActive ? activeStyles : inactiveStyles;

  return (
    <div className="flex items-center mb-2">
      <div
        className={`flex items-center w-full h-8 rounded-full shadow ${currentStyle.wrapper}`}
      >
        <span className="w-7 h-7 rounded-full border-2 border-gray-300 bg-white cursor-pointer flex items-center justify-center font-bold text-xs">
          <img src={currentStyle.icon} alt="" className="w-28 sm:w-28" />
        </span>

        <span
          className={`${currentStyle.text} flex items-center justify-center w-full text-base font-['Roboto']`}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

export default LuckyExchangeButton;
