import { Check, Flame, RotateCcw } from "lucide-react";
import MacroBar from "./MacroBar.jsx";
import MacroRow from "./MacroRow.jsx";
import { MACRO_COLORS } from "../constants.js";

export default function NutritionLabel({ result, onLog, onDiscard, logged }) {
  const {
    food_name,
    serving_estimate,
    calories,
    protein_g,
    carbs_g,
    fat_g,
    fibre_g,
    sugar_g,
    confidence,
    notes,
  } = result;

  return (
    <div className="nue-label">
      <div className="nue-label-title">Nutrition Facts</div>
      <div className="nue-rule-thin" />
      <div className="nue-serving">
        {serving_estimate || "Estimated serving"}
      </div>
      <div className="nue-food-name">{food_name}</div>

      <div className="nue-rule-thick" />

      <div className="nue-calorie-row">
        <span>Calories</span>
        <span className="nue-calories-value" style={{ fontSize: 18 }}>
          {Math.round(calories)}
        </span>
      </div>

      <div className="nue-rule-medium" />

      <MacroBar protein={protein_g} carbs={carbs_g} fats={fat_g} />

      <div style={{ marginTop: 10, fontSize: 18 }}>
        <MacroRow
          label=" Protein "
          grams={protein_g}
          color={MACRO_COLORS.protein}
        />
        <MacroRow
          label=" Carbohydrates "
          grams={carbs_g}
          color={MACRO_COLORS.carbs}
        />
        <MacroRow 
          label=" Fat " 
          grams={fat_g} 
          color={MACRO_COLORS.fat} />
        <MacroRow 
          label=" Fibre " 
          grams={fibre_g} 
          color={MACRO_COLORS.fibre} />
        <MacroRow
          label=" Suger "
          grams={sugar_g}
          color={MACRO_COLORS.sugar}
        />
      </div>

      <div className="nue-rule-thin" />
      <div className="nue-label-footer">
        <span>Confidence: {confidence || "medium"}</span>
        <span>AI Estimate</span>
      </div>
      {notes ? <div className="nue-label-notes">{notes}</div> : null}

      <div className="nue-row-gap" style={{ marginTop: 16 }}>
        <button
          onClick={onDiscard}
          className="nue-btn-ghost"
          style={{ flex: 1 }}
        >
          <RotateCcw size={15} /> Scan another
        </button>
        <button
          onClick={onLog}
          disabled={logged}
          className="nue-btn-solid"
          style={{ flex: 1, opacity: logged ? 0.5 : 1 }}
        >
          {logged ? (
            <>
              <Check size={15} /> Logged
            </>
          ) : (
            <>
              <Flame size={15} /> Log this meal
            </>
          )}
        </button>
      </div>
    </div>
  );
}
