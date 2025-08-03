import React, { useState } from "react";

const RO_ATTRIBUTES = ["無屬", "火", "水", "風", "地", "聖", "暗", "毒"];

// 傷害減免計算
function calculateDamageAfterReduction(originalDamage, reductionPercent) {
  if (originalDamage < 0) return 0;
  if (reductionPercent < 0 || reductionPercent > 100) return 0;
  return originalDamage * (1 - reductionPercent / 100);
}

function DamageReduction() {
  const [defenderAttribute, setDefenderAttribute] = useState("無屬");
  const [attackerAttribute, setAttackerAttribute] = useState("無屬");
  const [originalDamage, setOriginalDamage] = useState("");
  const [reductionPercent, setReductionPercent] = useState("");

  const isEffective = attackerAttribute === defenderAttribute;

  const reducedDamage =
    isEffective &&
    originalDamage !== "" &&
    reductionPercent !== "" &&
    !isNaN(originalDamage) &&
    !isNaN(reductionPercent)
      ? calculateDamageAfterReduction(
          Number(originalDamage),
          Number(reductionPercent)
        )
      : null;

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-blue-700 mb-8 tracking-wide text-center">
        RO 傷害減免判定
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        {/* 防禦方 */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 flex-1 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-green-700 mb-4">防禦方</h3>
          <label
            htmlFor="defender-attr-select"
            className="block text-gray-700 mb-2"
          >
            防具詞條
          </label>
          <select
            id="defender-attr-select"
            value={defenderAttribute}
            onChange={(e) => setDefenderAttribute(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
          >
            {RO_ATTRIBUTES.map((attr) => (
              <option key={attr} value={attr}>
                {attr}
              </option>
            ))}
          </select>
          <div className="bg-green-500 text-white text-center rounded font-bold py-3 px-2 mb-4">
            從「{defenderAttribute}」屬敵人受到的物理/魔法傷害降低
          </div>
          <div className="mt-4">
            <label
              htmlFor="reduction-percent"
              className="block text-gray-700 mb-2"
            >
              減傷百分比(%)
            </label>
            <input
              id="reduction-percent"
              type="number"
              min="0"
              max="100"
              value={reductionPercent}
              onChange={(e) => setReductionPercent(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="請輸入減傷百分比"
            />
          </div>
          {/* 新增判斷：isEffective 為 false 時，顯示與原始傷害相同的傷害 */}
          {!isEffective && originalDamage !== "" && !isNaN(originalDamage) && (
            <div className="mt-3 text-gray-600 italic">
              因屬性不符，傷害將與原始傷害相同：
              {Number(originalDamage).toFixed(2)}
            </div>
          )}
          {isEffective && reducedDamage !== null && (
            <div className="mt-4 text-lg font-semibold text-blue-700">
              穿抗裝備後的傷害：約 {reducedDamage.toFixed(2)}
            </div>
          )}
        </div>

        {/* 攻擊方 */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 flex-1 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-red-700 mb-4">攻擊方</h3>
          <label
            htmlFor="attribute-select"
            className="block text-gray-700 mb-2"
          >
            衣服屬性
          </label>
          <select
            id="attribute-select"
            value={attackerAttribute}
            onChange={(e) => setAttackerAttribute(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
          >
            {RO_ATTRIBUTES.map((attr) => (
              <option key={attr} value={attr}>
                {attr}
              </option>
            ))}
          </select>
          <div className="bg-red-500 text-white text-center rounded font-bold py-3 px-2 mb-4">
            玩家配置「{defenderAttribute}」屬衣服
          </div>
          <div className="mt-4">
            <label
              htmlFor="original-damage"
              className="block text-gray-700 mb-2"
            >
              原始傷害
            </label>
            <input
              id="original-damage"
              type="number"
              min="0"
              value={originalDamage}
              onChange={(e) => setOriginalDamage(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="請輸入原始傷害"
            />
          </div>
          {/* 減傷結果顯示 */}
          <div className="mt-6">
            <strong
              className={isEffective ? "text-green-600" : "text-gray-400"}
            >
              減傷效果：{isEffective ? "有效" : "無效"}
            </strong>
          </div>

          {isEffective && !reducedDamage && (
            <div className="mt-4 text-red-600 font-medium">
              請輸入正確的數值
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DamageReduction;
