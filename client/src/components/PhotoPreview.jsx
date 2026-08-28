import { RotateCcw, Flame } from "lucide-react";

export default function PhotoPreview({ image, onRetake, onAnalyze }) {
  return(
    <div>
      <div className="nue-frame">
        <img src={image.dataUrl} alt="Captured food" style={{width: "100%", display: "block"}} />
      </div>
      <div className="nue-row-gap">
        <button onClick={onRetake} className="nue-btn-ghost" 
        style={{flex: 1, background: "#fff" }}>
          <RotateCcw size={15} /> Retake
        </button>
        <button onClick={onAnalyze} className="nue-btn-solid" style={{ flex: 1 }}>
          <Flame size={15} /> Analyze
        </button>
      </div>
    </div>
  );
}