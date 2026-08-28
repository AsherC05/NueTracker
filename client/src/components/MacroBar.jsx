import { MACRO_COLORS } from "../constants.js";

export default function MacroBar({ protein, carbs, fat }) {
  const pCal = protein * 4;
  const cCal = carbs * 4;
  const fCal = fat * 9;
  const total = Math.max(pCal + cCal + fCal, 1);

  return (
    <div className="fuel-macrobar">
      <div
        style={{
          width: `${(pCal / total) * 100}%`,
          background: MACRO_COLORS.protein
        }}
      />
      <div
        style={{
          width: `${(cCal / total) * 100}%`,
          background: MACRO_COLORS.carbs
        }}
      />
      <div
        style={{
          width: `${(fCal / total) * 100}%`,background: MACRO_COLORS.fat}}
      />
    </div>
  );
}
