import { useState, forwardRef } from "react";

interface SettingItem {
  title: string;
  checked: boolean;
}

interface LuckySportsProps {
  defalut: SettingItem[];
}

const LuckySports = forwardRef<HTMLDivElement, LuckySportsProps>(
  ({ defalut }, ref) => {
    const [inputs, setInputs] = useState<{ id: number; value: string }[]>([
      { id: 0, value: "" }, // 初始帶一個輸入框
    ]);
    function addInput() {
      setInputs((prev) => [...prev, { id: prev.length, value: "" }]);
    }

    function onChangeInput(id: number, newValue: string) {
      setInputs((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        )
      );
    }

    if (!defalut[0].checked) {
      return <div ref={ref}>內容已關閉</div>;
    }

    return (
      <div ref={ref}>
        <h3>{defalut[0].title}</h3>

        {/* 父容器垂直排列 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {inputs.map(({ id, value }, idx) => (
            // 這裡每行用 flex 水平排列 input + 按鈕（按鈕只在最後一個input旁出現）
            <div key={id} style={{ display: "flex", alignItems: "center" }}>
              <label>
                INT:
                <input
                  type="number"
                  value={inputs[id].value}
                  className="border rounded p-1 ml-2 w-24"
                  placeholder={`輸入框 ${id + 1}`}
                  onChange={(e) => onChangeInput(id, e.target.value)}
                  style={{ width: "150px", padding: 6, fontSize: 14 }}
                />
              </label>

              {idx === inputs.length - 1 && (
                <button
                  type="button"
                  onClick={addInput}
                  style={{
                    marginLeft: 8,
                    width: 30,
                    height: 30,
                    fontWeight: "bold",
                    fontSize: 20,
                    lineHeight: "20px",
                    cursor: "pointer",
                    userSelect: "none",
                    borderRadius: 6,
                  }}
                  aria-label="新增輸入框"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default LuckySports;
