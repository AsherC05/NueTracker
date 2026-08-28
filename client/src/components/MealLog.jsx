import { Trash2 } from "lucide-react";

export default function MealLog({ log, onRemove }) {
  return (
    <div className="nue-log">
      <div className="nue-log-title">Today's log</div>
      {log.map((item) => (
        <div key={item.id} className="nue-log-row">
          <div>
            <div className="nue-log-name">{item.food_name}</div>
            <div className="nue-log-time">
              {item.time.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="nue-log-right">
            <span className="nue-log-cal">{Math.round(item.calories)}kcal</span>
            <button
              onClick={() => onRemove(item.id)}
              className="nue-icon-btn nue-icon-btn-sm"
              aria-label="Remove"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
