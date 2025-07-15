import React, { useState } from "react";

const COLOR_LIST = [
  "#212121",
  "#2A2A2A",
  "#313131",
  "#757575",
  "#AFAFAF",
  "#BDBDBD",
  "#D7D7D7",
  "#E57373",
  "#F44336",
  "#F25C19",
  "#FF9800",
  "#F57C00",
  "#FFC107",
  "#FFEB3B",
  "#FEEA00",
  "#FFEE00",
  "#D0E066",
  "#8BC34A",
  "#689F38",
  "#009688",
  "#4DD0E1",
  "#00BCD4",
  "#2196F3",
  "#1976D2",
  "#7E57C2",
  "#512DA8",
  "#424242",
];

// Hex 轉 RGB 工具
function hexToRGB(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

const ColorPicker = ({ onSelect }) => {
  const [selectedColor, setSelectedColor] = useState("#9A8B02");

  const handleColorClick = (hex) => {
    setSelectedColor(hex);
    if (onSelect) onSelect(hex);
  };

  // 動態計算 RGB 數值
  const rgbValue = hexToRGB(selectedColor);
  const matches = rgbValue.match(/\d+/g); // 取得所有數字
  const R = matches ? parseInt(matches[0]) : null;
  const G = matches ? parseInt(matches[1]) : null;
  const B = matches ? parseInt(matches[2]) : null;

  return (
    <div className="w-full space-x-7 mx-auto space-y-4 px-8">
      <div
        className="flex gap-3 py-2 px-2 items-center rounded-lg"
        style={{ backgroundColor: "#FFF" }}
      >
        <div className="flex w-auto gap-3">
          {COLOR_LIST.map((color) => (
            <div
              key={color}
              onClick={() => handleColorClick(color)}
              className={`
              w-[50px] h-[60px] 
              border border-gray-300 cursor-pointer
              ${selectedColor === color ? "ring-2 ring-blue-400" : ""}
            `}
              style={{ backgroundColor: color }}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>

        <div className="flex w-[30%]">
          <div className="flex-1 text-sm flex flex-col text-center items-center">
            <span className="font-semibold">{selectedColor}</span>
            HEX
          </div>
          <div className="flex-1 text-sm flex flex-col text-center items-center">
            <span>{R}</span>R
          </div>
          <div className="flex-1 text-sm flex flex-col text-center items-center">
            <span>{G}</span>G
          </div>
          <div className="flex-1 text-sm flex flex-col text-center items-center">
            <span>{B}</span>B
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div
          className="w-full h-12 rounded-md mt-2"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
