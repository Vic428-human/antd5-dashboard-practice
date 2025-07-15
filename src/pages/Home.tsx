import React from "react";
import { assets } from "../assets/assets.ts";
import LuckyExchangeButton from "../components/LuckyExchangeButton.tsx";
import ColorPicker from "../components/ColorPicker.jsx";

const COLOR_LIST = ["#7A5C5C", "#3EBE9F"];

const Home = () => {
  const handleColorChange = (color) => {
    console.log("Selected Color:", color);
  };
  return (
    <div className="flex flex-col max-h-auto bg-[#302200] mx-10">
      <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7">
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
        <div className="min-h-40 w-72 rounded-xl overflow-hidden shadow p-4">
          <div
            className="text-center bg-[#8A4F0E] text-white text-lg font-semibold mb-3"
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            Template
          </div>
          <LuckyExchangeButton isActive={true}>
            Lucky Exchange
          </LuckyExchangeButton>
          <LuckyExchangeButton isActive={false}>
            Lucky Exchange
          </LuckyExchangeButton>
        </div>
      </div>
      <ColorPicker onSelect={handleColorChange} />
    </div>
  );
};

export default Home;
