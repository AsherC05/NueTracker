import { X } from "lucide-react";

export default function CameraCapture({ videoRef, canvasRef, onCapture, onCancel }) {
  return (
    <div>
      <div className="nue-frame">
        <video
          ref={videoRef}
          playsInline
          muted
          style={{ width: "100%", display: "block" }}
        />
      </div>
      <div className="nue-camera-controls">
        <button onClick={onCancel} className="nue-icon-btn" aria-label="Cancel">
          <X size={22} />
        </button>
        <div
          className="nue-shutter"
          onClick={onCapture}
          role="button"
          aria-label="Capture"
        />
        <div style={{ width: 38 }} />
      </div>
      {/* Hidden canvas used only as scratch space to turn a video frame into a JPEG */}
      <canvas ref={canvas} style={{ display: "none" }} />
    </div>
  );
}