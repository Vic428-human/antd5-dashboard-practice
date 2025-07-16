import React, { useState } from "react";
import { assets } from "../assets/assets.ts";
import ColorPicker from "../components/ColorPicker.tsx";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";

const COLOR_LIST = ["#7A5C5C", "#3EBE9F"];

const Home = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  const handleColorChange = (color) => {
    console.log("Selected Color:", color);
  };
  const settingList = [
    "Template",
    "Template2",
    "Template3",
    "Template4",
    "Template5",
    "Template",
    "Template2",
    "Template3",
    "Template4",
    "Template5",
  ];

  return (
    <div className="flex flex-col max-h-auto bg-brand-dark">
      <div className="flex flex-wrap items-center justify-start gap-2 bg-blue-500">
        {settingList.map((item, index) => (
          <div
            key={index}
            className=" min-width-[200px] rounded-md shadow-lg overflow-hidden text-white"
          >
            <div className="bg-yellow-400 text-center py-2 font-semibold text-zinc-900">
              {item}
            </div>

            <div className="bg-zinc-800 p-4 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Switch
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                  checked={checked}
                  onChange={handleChange}
                />
                <span className="font-medium">
                  {checked ? "Lucky Exchange" : "DSADSADAS"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <ColorPicker onSelect={handleColorChange} /> */}
      <div className="flex flex-col items-center text-center justify-center bg-red-200 h-[300px] p-2">
        <div className="bg-white w-[50%] h-[120px]">color picker</div>
        <div className="flex space-x-20 w-[50%]">
          <div className="flex flex-1 items-center justify-center bg-white h-8 cursor-pointer">
            button1
          </div>
          <div className="flex flex-1 items-center justify-center  bg-white h-8 cursor-pointer">
            button2
          </div>
        </div>
      </div>
      {/* js */}
      <div className=" flex items-center text-center justify-center bg-blue-50 h-[300px] p-2 space-x-1">
        <div className="flex-1 bg-slate-500 h-full">Pc web</div>
        <div className="w-[400px] bg-slate-700 h-full">Mobile</div>
      </div>
    </div>
  );
};

export default Home;
