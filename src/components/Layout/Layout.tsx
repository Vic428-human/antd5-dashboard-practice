import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "../../store/store";
import ManaRecoveryCalculator from "../spComp.tsx";
import GearEffectiveness from "../GearEffectiveness.tsx";

const ContainerLayout = () => {
  const navigate = useNavigate();
  const [enabledMap, setEnabledMap] = useState({
    gear: true,
    mana: true,
  });

  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { label: "SPORTS", path: "/sports", Icon: "🏠", navigate },
    { label: "SETTINGS", path: "/setting", Icon: "⚙️", navigate },
    { label: "RO", path: "/ro-setting", Icon: "👤", navigate },
  ];

  const toggle = (key: keyof typeof enabledMap) => {
    setEnabledMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggle = (nextExpanded?: boolean) => {
    if (typeof nextExpanded === "boolean") {
      setExpanded(nextExpanded);
    } else {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* 第一欄位菜單 */}
      <div
        className="relative w-[80px] h-screen bg-gray-800 max-w-[
      80px] min-w-[80px]"
      >
        {/* 側邊欄邊框線 */}
        <div className="absolute top-0 right-0 h-full w-[2px] bg-gray-600" />

        {/* 菜單項目 */}
        <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-4 space-y-6">
          {menuItems.map((item, index) => (
            <MenuItem
              icon={item.Icon}
              key={index}
              label={item.label}
              path={item.path}
              navigate={item.navigate}
              handleToggle={handleToggle}
            />
          ))}
        </div>

        {/* 展開/收合按鈕 */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer">
          <button
            className="text-white text-xl"
            onClick={() => handleToggle(!expanded)}
          >
            ⇆
          </button>
        </div>
        <button
          onClick={() => toggle("gear")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle GearEffectiveness
        </button>
        <button
          onClick={() => toggle("mana")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Toggle ManaRecoveryCalculator
        </button>
      </div>
      <div className="flex flex-row min-w-[800px]">
        <Outlet context={{ expanded }} />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <FixedWrapper>
          {enabledMap.gear && (
            <div className="p-4 bg-gray-100 rounded">
              <GearEffectiveness />
            </div>
          )}
          {enabledMap.mana && (
            <div className="p-4 bg-gray-100 rounded">
              <ManaRecoveryCalculator />
            </div>
          )}
          {enabledMap.mana && (
            <div className="p-4 bg-gray-100 rounded">
              <ManaRecoveryCalculator />
            </div>
          )}
        </FixedWrapper>
      </div>

      {/* 這邊放實際顯示與否的面板 */}

      {/* <LuckySports ref={divRef} defalut={initialSettings} /> */}
      {/* <RenderContext expanded={expanded} /> */}

      {/* 第三欄位渲染顯示的內容 */}
    </div>
  );
};

export default ContainerLayout;

interface FixedWrapperProps {
  children: React.ReactNode;
}

export const FixedWrapper: React.FC<FixedWrapperProps> = ({ children }) => {
  return (
    <div className="overflow-y-auto">
      <div className="max-h-[900px] w-auto border border-gray-300 rounded-lg shadow-md bg-white">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

const MenuItem = ({
  icon,
  label,
  path,
  navigate,
  handleToggle,
}: {
  icon: string;
  label: string;
  path: string;
  navigate: (path: string) => void;
  handleToggle: (value: boolean) => void;
}) => (
  <div className="flex flex-col items-center text-white hover:text-yellow-400 cursor-pointer">
    <div
      className="text-2xl"
      onClick={() => {
        navigate(path);
        handleToggle(true);
      }}
    >
      {icon}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </div>
);

{
  /* TODO: 下面只是當時在實驗串接別的網頁 */
}
{
  /* <div className="flex flex-col w-[100%]">
        <div className="flex justify-between p-4">
          <div className="flex">
            <div
              onClick={() => setMode("mobile")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "mobile" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              Mobile
            </div>
            <div
              onClick={() => setMode("pc")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "pc" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              PC
            </div>
          </div>
          <div className="flex">
            <div
              onClick={() => setMode("mobile")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "mobile" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              Reset
            </div>
            <div
              onClick={() => setMode("pc")}
              className={`flex items-center justify-center h-8 cursor-pointer text-black px-4 py-2 rounded-full w-[120px] transition-all duration-200 ${
                mode === "pc" ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              save
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <div className="flex items-center justify-center w-[100%] p-8  text-center relative">
            <div
              className={`
      relative h-[80%] max-w-[1100px] overflow-auto
      transition-all duration-300 ease-in-out
      ${containerWidthClass} 
    `}
            >
              <div className="h-[calc(100vh-120px)] overflow-y-auto">
                <DisplayComponent ref={displayRef} />
              </div>
            </div>
          </div>
        </div>
      </div> */
}
