export default function MacroRow({ label, grams, color }) {
  return (
    <div>
      <span>
        <span className="nue-swatch" style={{ background:color }} />
        {label}
      </span>
      <span className="nue-macro-grams">{Math.round(grams)} g</span>
    </div>
  );
}