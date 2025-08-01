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
    index: number,
    field: keyof GearOption,
    value: number
  ) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, { rate: 0, price: 0 }]);
  };

  const calculate = () => {
    const baseRegen = Math.floor(1 + intValue / 6 + spValue / 100);
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
      <div className="h-[500px] overflow-y-scroll overflow-x-hidden no-scrollbar">
        <h2 className="text-2xl font-bold mb-4">回魔計算機</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
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

        <div className="space-y-4 mb-6">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-4">
              <label>
                Rate (%):
                <input
                  type="number"
                  className="border rounded p-1 ml-2 w-24"
                  value={option.rate}
                  onChange={(e) =>
                    handleInputChange(index, "rate", +e.target.value)
                  }
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  className="border rounded p-1 ml-2 w-36"
                  value={option.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", +e.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-blue-500 hover:underline mt-2"
          >
            添加選項
          </button>
        </div>

        <button
          onClick={calculate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      <div
        className="overflow-y-scroll scrollbar-none overflow-x-hidden  no-scrollbar"
        style={{
          maxHeight: "calc(100% - 500px)",
        }}
      >
        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Results</h3>
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
