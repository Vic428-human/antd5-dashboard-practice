import { useRef, useState, useEffect } from "react";
import { Layout, Switch } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { useSettingsStore } from "../store/store";
import { useOutletContext } from "react-router-dom";
import { assets } from "../assets/assets.ts";
// import { onLiveDot } from "../assets/assets.ts";
const { Sider } = Layout;

const Setting = () => {
  const { isDisplay } = useOutletContext();

  const {
    setDisplaySportsRaw,
    uncheckAllCategories,
    checkAllCategories,
    sportsCategories,
    initialSettings,
    toggleCategory,
    toggleSetting,
  } = useSettingsStore();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedStr, setSelectedStr] = useState<string>("");
  const allUnchecked = sportsCategories.every(
    (category) => category.checked === true
  );

  async function fetchMockData() {
    // 模擬 API 延遲
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 模擬返回的資料結構
    const mockResponse = {
      data: {
        displaySportsRaw: "1,4",
      },
    };

    return mockResponse;
  }
  useEffect(() => {
    const fetchDisplaySettings = async () => {
      try {
        const response = await fetchMockData();
        setDisplaySportsRaw(response.data.displaySportsRaw);

        useSettingsStore.getState().initializeCategories();
      } catch (error) {
        console.error("模擬 API 錯誤:", error);
      }
    };

    fetchDisplaySettings(); // 只呼叫這個
  }, []);

  useEffect(() => {
    const str = selectedIds.join(",");
    setSelectedStr(str);
    if (selectedIds.length === 0) {
      isDisplay({ title: "displaySports", value: "0" });
    } else {
      isDisplay({ title: "displaySports", value: str });
    }
  }, [selectedIds]);

  useEffect(() => {
    const selected = sportsCategories
      .filter((cat) => cat.checked)
      .map((cat) => cat.id);
    setSelectedIds(selected);
  }, [sportsCategories]);

  function handleSelect(option) {
    if (option === "all") {
      if (allUnchecked === true) {
        // 全部已選，點擊 all 則「全部取消」
        uncheckAllCategories();
        isDisplay({ title: "displaySports", value: "0" });
      } else {
        // 非全選，點擊 all 則「全部選取」
        checkAllCategories();
        // isDisplay({ title: "displaySports", value: "2,4" });
      }
    } else {
      // 點選個別選項
      if (selectedIds.includes(option)) {
        // selectedIds = selectedIds.filter((key) => key !== option);
      } else {
        // selectedIds = [...selectedIds, option];
      }

      // 自動勾選或取消 all
      const others = options.filter((key) => key !== "all");
      const allPicked = others.every((key) => selectedIds.includes(key));
      if (allPicked) {
        // 全部個別選項已選，all 也需被選
        // selectedIds = [...others, "all"];
      } else {
        // 有任何個別選項沒選，all 移除
        // selectedIds = selectedIds.filter((key) => key !== "all");
      }
    }
    // console.log(selectedIds);
  }

  const handleClick = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const RequirementRow = ({
    text,
    checked,
    onClick,
  }: {
    text: string;
    checked: boolean;
    onClick: () => void;
  }) => {
    const iconSrc = checked ? assets.function_succes : assets.onLiveDot;

    return (
      <div onClick={onClick} className="flex items-center gap-2 cursor-pointer">
        <img src={iconSrc} alt="" className="w-[12px] sm:w-[12px]" />
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "green", // Add this line
      }}
      className="h-screen overflow-auto"
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={"100%"}
        style={{
          position: "relative",
          backgroundColor: "#000000", // Add this line
          // minHeight: "800px",
        }}
      >
        <div
          className="text-white h-[30px] w-[30px] bg-red-600 flex items-center justify-center absolute bottom-[50px] z-[1000]"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div
            style={{
              transition: "transform 0.3s ease",
              transform: collapsed ? "rotate(-180deg)" : "none",
            }}
          >
            <CaretRightFilled />
          </div>
        </div>
        <div>
          {initialSettings.map((setting, index) => (
            <div
              key={index}
              className="min-w-[260px] shadow-lg overflow-hidden text-white"
            >
              <div className="h-12 bg-[#424242] p-4 font-semibold text-zinc-900 flex justify-center items-center">
                <div className="">{setting.title}</div>
              </div>
              <div className="p-4 flex gap-3 bg-[#000000] h-16">
                {!setting.btn ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Switch
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      checked={setting.checked}
                      onChange={() => {
                        toggleSetting(setting.title);
                        isDisplay({
                          title: setting.title,
                          value: !setting.checked,
                        });
                      }}
                    />
                    <span className="font-medium">
                      {setting.checked ? setting.onText : setting.offText}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center ">
                    <RequirementRow
                      key={"all"}
                      text={"all"}
                      checked={allUnchecked}
                      onClick={() => {
                        handleSelect("all");
                      }}
                    />
                    {sportsCategories?.map((cat) => (
                      <RequirementRow
                        key={cat.value}
                        text={cat.value}
                        checked={cat.checked}
                        onClick={() => {
                          handleClick(cat.id);
                          toggleCategory(cat.value);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Sider>
    </div>
  );
};

export default Setting;
