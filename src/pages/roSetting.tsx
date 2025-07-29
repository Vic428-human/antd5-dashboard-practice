import React, { useEffect, useState, useRef } from "react";

export default function ROSetting() {
  return (
    <div className="flex flex-col">
      <div
        className={`h-full flex flex-col border-r shadow-sm bg-white ${
          true ? "w-fit max-w-[300px] " : "w-0"
        }`}
      >
        <div className="overflow-y-auto flex-1">
          <div
            className={`
              justify-between items-center
              overflow-hidden transition-all 
          `}
          >
            這邊放SWTICH btn
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColorBlockProps {
  topColor: string;
  bottomColor: string;
  onClick?: () => void;
}

export const ColorBlock: React.FC<ColorBlockProps> = ({
  topColor,
  bottomColor,
  onClick,
}) => {
  const setColor = useColorStore((state) => state.setColor);
  const handleClick = () => {
    setColor("primary", topColor);
    setColor("secondary", bottomColor);
  };

  return (
    <div
      className="w-7 h-8 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm 
                 border-2 border-solid border-black/50 flex flex-col"
      onClick={handleClick}
    >
      <div
        className="h-1/2 flex items-center justify-center text-center w-full relative"
        style={{ backgroundColor: topColor }}
      />
      <div
        className="h-1/2 flex items-center justify-center text-center w-full relative"
        style={{ backgroundColor: bottomColor }}
      />
    </div>
  );
};
