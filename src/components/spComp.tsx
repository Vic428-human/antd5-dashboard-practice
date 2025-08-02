import React, { useState } from "react";

type GearOption = {
  rate: number;
  price: number;
};

type ResultOption = GearOption & {
  regen: number;
  manaPerCoin: string;
};

export default function ManaRecoveryCalculator() {
  const [intValue, setIntValue] = useState(36);
  const [spValue, setSpValue] = useState(127);
  const [options, setOptions] = useState<GearOption[]>([
    { rate: 25, price: 180000 },
  ]);
  console.log("options", options);
  const [results, setResults] = useState<ResultOption[]>([]);

  const handleInputChange = (
    idx: number,
    field: keyof GearOption,
    value: number
  ) => {
    const updated = [...options];
    updated[idx][field] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, { rate: 0, price: 0 }]);
    calculate();
  };

  const calculate = () => {
    const baseRegen = 1 + Math.floor(intValue / 6) + Math.floor(spValue / 100);
    console.log("baseRegen", baseRegen);
    const result = options.map(({ rate, price }) => {
      const recoveryMultiplier = 1 + rate / 100;
      const regen = Math.floor(baseRegen * recoveryMultiplier);
      return { rate, price, regen };
    });

    const finalResults = result.map((option) => ({
      ...option,
      manaPerCoin: (option.regen / option.price).toFixed(6),
    }));

    setResults(finalResults);
  };

  return (
    <div className="w-1/2 mx-auto my-auto h-[800px] p-4 bg-white shadow-md rounded-lg">
      <div className="h-[300px] overflow-y-scroll overflow-x-hidden no-scrollbar">
        <h2 className="text-2xl font-bold mb-4">RO回魔計算機</h2>
        <div className="mb-4 space-x-2">
          <label>
            INT:
            <input
              type="number"
              className="border rounded p-1 ml-2 w-24"
              value={intValue}
              onChange={(e) => setIntValue(+e.target.value)}
            />
          </label>
          <label>
            SP:
            <input
              type="number"
              className="border rounded p-1 ml-2 w-24"
              value={spValue}
              onChange={(e) => setSpValue(+e.target.value)}
            />
          </label>
        </div>

        <div className="space-y-2 mb-6">
          {options.map((option, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <label>
                Rate (%):
                <input
                  type="number"
                  className="border rounded p-1 ml-2 w-24"
                  value={option.rate}
                  onChange={(e) =>
                    handleInputChange(idx, "rate", +e.target.value)
                  }
                />
              </label>
              <label>
                裝備售價:
                <input
                  type="number"
                  className="border rounded p-1 ml-2 w-36"
                  value={option.price}
                  onChange={(e) =>
                    handleInputChange(idx, "price", +e.target.value)
                  }
                />
              </label>
              {idx === options.length - 1 && (
                <button
                  onClick={addOption}
                  className="ml-2 w-[30px] h-[30px] font-bold text-[20px] leading-[20px] cursor-pointer rounded-md flex items-center justify-center bg-transparent border-0 hover:bg-gray-200"
                  aria-label="新增輸入框"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="overflow-y-scroll scrollbar-none overflow-x-hidden  no-scrollbar"
        style={{
          maxHeight: "calc(100% - 500px)",
        }}
      >
        {results.length > 0 && (
          <div className="mt-6">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">SP回復 (%)</th>
                  <th className="border p-2">價格</th>
                  <th className="border p-2">實際回魔</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{r.rate}</td>
                    <td className="border p-2">{r.price}</td>
                    <td className="border p-2">{r.regen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
