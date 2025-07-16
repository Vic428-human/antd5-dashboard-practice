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
    <div className="flex flex-col max-h-auto h-[100vh]">
      <div className="flex flex-wrap items-center justify-start gap-2 bg-content-container">
        {settingList.map((item, index) => (
          <div
            key={index}
            className="min-width-[200px] rounded-md shadow-lg overflow-hidden text-white"
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
      <div className="flex flex-col items-center text-center justify-center h-[180px]">
        <div className="flex flex-col items-center justify-center w-[50%] h-[230px] ">
          {/* color picker */}
          <div className="h-[45%] w-[70%] bg-content-container">
            <div className="m-2 p-8 bg-white h-20px">123</div>
          </div>
          <div className="flex items-center justify-center h-[30%] w-[70%] space-x-2 bg-content-container pt-6">
            <div className="flex items-center justify-center bg-yellow-500 h-8 cursor-pointer text-black px-4 py-2 rounded-full min-w-[35%]">
              button1
            </div>
            <div className="flex w-[25%] items-center justify-center bg-gray-500 h-8 cursor-pointer text-black px-4 py-2 rounded-full min-w-[35%]">
              button2
            </div>
          </div>
        </div>
      </div>
      {/* js */}
      <div className=" flex items-center text-center justify-center h-[100%] p-2 space-x-1">
        <div className="flex-1  h-full">
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            src="https://sprodm.uni247.xyz/#/"
          ></iframe>
        </div>
        <div className="w-[400px] bg-slate-700 h-full">
          <iframe
            title="Inline Frame Example"
            src="https://sprodm.uni247.xyz/#/"
            width="400px"
            height="100%"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE & Edge
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
