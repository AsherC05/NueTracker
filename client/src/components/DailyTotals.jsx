import { MACRO_COLORS } from "../constants";

export default function DailyTotals({ totals }) {
  return (
    <div className="nue-totals">
      <div>
        <div className="nue-totals-labels">TODAY</div>
        <div className="nue-totals-cal">
          {Math.round(totals.calories)} <span>kcal</span>
        </div>
      </div>
      <div className="nue-totals-macros">
        <span style={{ color: MACRO_COLORS.protein }}>
          P {Math.round(totals.protein_g)}g
        </span>
        <span style={{ color: MACRO_COLORS.carbs }}>
          G {Math.round(totals.carbs_g)}g
        </span>
        <span style={{ color: MACRO_COLORS.fat }}>
          F {Math.round(totals.fat_g)}g
        </span>
      </div>
    </div>
  );
}
