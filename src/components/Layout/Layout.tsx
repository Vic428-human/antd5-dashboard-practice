import { useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import ManaRecoveryCalculator from "../spComp.tsx";
import GearEffectiveness from "../GearEffectiveness.tsx";

const ContainerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [enabledMap, setEnabledMap] = useState({
    gear: true,
    mana: true,
  });

  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    {
      label: "SPORTS",
      path: "/sports",
      icon: <FaBeer />, // 包裹在 JSX 元素中
      navigate,
      location,
    },
    {
      label: "SETTINGS",
      path: "/setting",
      icon: <FaBeer />, // 包裹在 JSX 元素中
      navigate,
      location,
    },
    {
      label: "計算機",
      path: "/ro-setting",
      icon: <FaBeer />, // 包裹在 JSX 元素中
      navigate,
      location,
    },
  ];
  const handleToggle = (nextExpanded?: boolean) => {
    if (typeof nextExpanded === "boolean") {
      setExpanded(nextExpanded);
    } else {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* flex-shrink 爲 0，不要有任何壓縮 */}
      <div
        className="flex flex-col bg-[#000000] flex-shrink-0  overflow-hidden relative"
        style={{ width: 100 }}
      >
        <div className="absolute top-0 right-0 h-full w-[2px] bg-red-600 " />
        {menuItems.map((item, index) => (
          <MenuItem
            icon={item.icon}
            key={index}
            label={item.label}
            path={item.path}
            navigate={item.navigate}
            handleToggle={handleToggle}
            location={item.location}
          />
        ))}
        {/* 展開/收合按鈕 */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer">
          <button
            className="text-white text-xl"
            onClick={() => handleToggle(!expanded)}
          >
            ⇆
          </button>
        </div>
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

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  path: string;
  navigate: (path: string) => void;
  handleToggle: (value: boolean) => void;
  location: Location;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  path,
  navigate,
  handleToggle,
  location,
}) => {
  const active =
    location.pathname === path ||
    (location.pathname === "/" && path === "/styling");
  return (
    <div
      className={` group  mt-2 text-center w-full h-[60px] flex flex-col items-center justify-center cursor-pointer select-none  ${
        active ? "text-primary border-4 border-red-500" : "text-white"
      }`}
      style={active ? { borderLeft: "4px solid red" } : {}}
    >
      <div
        className="text-gray-400 group-hover:text-white"
        onClick={() => {
          navigate(path);
          handleToggle(true);
        }}
      >
        {icon}
      </div>
      <span className="text-[12px] group-hover:text-white text-gray-400">
        {label}
      </span>{" "}
    </div>
  );
};

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
