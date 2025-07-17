import React, { useState } from "react";
import { assets } from "../assets/assets.ts";
import { Switch } from "antd";
import { SketchPicker } from "react-color";

const initialSettings = [
  {
    title: "Template",
    checked: true,
    onText: "Lucky Exchange",
    offText: "Lucky Sport",
    btn: false,
    btnText: "",
  },
  {
    title: "Sports Priority",
    checked: false,
    onText: "Cricket First",
    offText: "Soccer First",
    btn: false,
    btnText: "",
  },
  {
    title: "Sports Categories",
    checked: false,
    onText: "",
    offText: "",
    btn: true,
    btnText: "Categories",
  },
];
const Home = () => {
  const [settingList, setSettingList] = useState(initialSettings);
  const [checked, setChecked] = useState({
    switch1: false,
    switch2: false,
    // add more switches as needed
  });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const colorBlocks = [
    // 第一個色塊 - 橙色/黑色
    {
      topColor: "bg-orange-400",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第二個色塊 - 青綠色/黑色 + 勾選
    {
      topColor: "bg-teal-400",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第三個色塊 - 藍色/黑色
    {
      topColor: "bg-blue-500",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第四個色塊 - 綠色/黑色
    {
      topColor: "bg-green-500",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第五個色塊 - 橙紅色/黑色
    {
      topColor: "bg-orange-600",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第六個色塊 - 紫色/黑色
    {
      topColor: "bg-purple-400",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第七個色塊 - 綠色/黑色
    {
      topColor: "bg-green-600",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第八個色塊 - 淺紫色/灰色
    {
      topColor: "bg-purple-300",
      bottomColor: "bg-gray-300",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第九個色塊 - 黃色/深紫色
    {
      topColor: "bg-yellow-400",
      bottomColor: "bg-purple-900",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第十個色塊 - 紅色/黑色
    {
      topColor: "bg-red-500",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第十一個色塊 - 紅色/白色
    {
      topColor: "bg-red-400",
      bottomColor: "bg-white",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第十二個色塊 - 青綠色/黑色
    {
      topColor: "bg-teal-500",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第十三個色塊 - 深藍色/白色
    {
      topColor: "bg-blue-900",
      bottomColor: "bg-white",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第十四個色塊 - 黃色/黑色
    {
      topColor: "bg-yellow-500",
      bottomColor: "bg-black",
      iconPrimary: false,
      iconSecondary: false,
    },
    // 第十五個色塊 - 橙色/黑色 + 調色盤圖示
    {
      topColor: "bg-orange-500",
      bottomColor: "bg-black",
      iconPrimary: true,
      iconSecondary: false,
    },
  ];

  const handleChange = (checked: boolean, index: number) => {
    const newList = [...settingList];
    newList[index] = { ...newList[index], checked };
    setSettingList(newList);
  };
  console.log({ settingList });
  return (
    <div className="flex flex-col max-h-auto h-[100vh] mt-2">
      <div className="flex flex-wrap justify-start gap-2 bg-content-container">
        {settingList.map((item, index) => (
          <div
            key={index}
            className="min-w-[220px] shadow-lg overflow-hidden text-white"
          >
            {/* flex items-center justify-center */}
            <div className="h-12 bg-yellow-400 p-4 font-semibold text-zinc-900 flex justify-center items-center">
              <div className="">{item.title}</div>
            </div>

            <div className="p-4 flex flex-col gap-3 items-center justify-center bg-red-500 h-16">
              <div className="flex items-center gap-3 ">
                {!item.btn ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Switch
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      checked={item.checked}
                      onChange={(checked) => handleChange(checked, index)}
                    />
                    <span className="font-medium">
                      {item.checked ? item.onText : item.offText}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-1">
                    <div className="flex items-center justify-center bg-yellow-500 cursor-pointer text-black px-12 py-2 rounded-full">
                      {item.btnText}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <ColorPicker onSelect={handleColorChange} /> */}
      <div className="flex flex-col items-center text-center justify-center">
        <div className="flex flex-col items-center justify-center w-[50%]">
          {/* color picker */}
          <div className="bg-content-container">
            <div className="m-2 p-8 h-20px">
              <div className="flex gap-2 p-6 bg-gray-50 ">
                <div className="flex gap-2 ">
                  <div className="flex flex-col justify-around ">
                    <div className="">Primary</div>
                    <div className="">Secondary</div>
                  </div>

                  {colorBlocks.map((block, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={`w-12 h-auto rounded cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm 
            border-2 border-solid ${
              selectedIndex === index ? "border-red-400" : "border-black/30"
            }`}
                    >
                      {/* 上半部分 */}
                      <div
                        className={`flex items-center justify-center text-center ${block.topColor} h-6 w-full relative`}
                      >
                        {block.iconPrimary && 1}
                      </div>
                      {/* 下半部分 */}
                      <div
                        className={`flex items-center justify-center text-center ${block.bottomColor} h-6 w-full relative`}
                      >
                        {block.iconPrimary && 2}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="flex flex-wrap gap-2 p-6 bg-gray-50 rounded-lg"></div> */}
            </div>
            <div className="absolute top-0 right-0 z-50">
              {/* <SketchPicker /> */}
            </div>
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
        <div className="flex-1 h-full">
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            // src="https://sprodm.uni247.xyz/#/"
          ></iframe>
        </div>
        <div className="w-[400px] h-full">
          <iframe
            title="Inline Frame Example"
            // src="https://sprodm.uni247.xyz/#/"
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
