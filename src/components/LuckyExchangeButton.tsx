import React from "react";
import { assets } from "../assets/assets.ts";

const LuckyExchangeButton = ({ isActive = false, children = "" }) => {
  const baseStyles = {
    container: {
      border: "1.5px solid #B6B6B6",
    },
    button: {
      width: "28px",
      height: "28px",
      background: "#fff",
      borderRadius: "50%",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      border:
        "linear-gradient(#FFFFFF, #FBFBFB, #F0EFF0, #DEDCEF, #CECCD0) border-box, #fff padding-box",
    },
  };

  const activeStyles = {
    wrapper: "bg-green-500 text-[#3A3B3E]",
    text: "#3A3B3E",
    icon: assets.on,
  };

  const inactiveStyles = {
    wrapper: "bg-[#F9FAFC] text-[#CCCDD1]",
    text: "#CCCDD1",
    icon: assets.off,
  };

  const currentStyle = isActive ? activeStyles : inactiveStyles;

  return (
    <div className="flex items-center mb-2">
      <div
        className={`flex items-center w-full h-8 rounded-full shadow ${currentStyle.wrapper}`}
        style={baseStyles.container}
      >
        <span
          className="flex items-center justify-center font-bold text-xs"
          style={baseStyles.button}
        >
          <img src={currentStyle.icon} alt="" className="w-28 sm:w-28" />
        </span>

        <span
          className="flex items-center justify-center w-full text-base font-['Roboto']"
          style={{ color: currentStyle.text }}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

export default LuckyExchangeButton;
