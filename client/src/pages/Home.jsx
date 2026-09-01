import { useState, useRef } from "react";
import { Camera, Upload, ImagePlus } from "lucide-react";
import useCamera from "../hooks/useCamera.js";
import { useFoodAnalysis } from "../hooks/useFoodAnalysis.js";
import { useMealLog } from "../hooks/useMealLog.js";
import CameraCapture from "../components/CameraCapture.jsx";
import PhotoPreview from "../components/PhotoPreview.jsx";
import NutritionLabel from "../components/NutritionLabel.jsx";
import DailyTotals from "../components/DailyTotals.jsx";
import MealLog from "../components/MealLog.jsx";
import nueTrackerLogo from "../assets/NT-logo-black-white.png";

export default function Home() {
  const [mode, setMode] = useState("idle");
  const [image, setImage] = useState(null);
  const [logged, setLogged] = useState(false);
  const fileInputRef = useRef(null);

  const camera = useCamera();
  const { result, error, analyze, reset: resetAnalysis } = useFoodAnalysis();
  const { log, addMeal, removeMeal, totals } = useMealLog();

  const openCamera = async () => {
    setMode("camera");
    await camera.start();
  };

  const handleCapture = () => {
    const shot = camera.capture();
    if (shot) {
      setImage(shot);
      setMode("preview");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImage({
        dataUrl,
        base64: dataUrl.split(",")[1],
        mediaType: file.type || "image/jpeg",
      });
      setMode("preview");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const runAnalysis = async () => {
    if (!image) return;
    setMode("analysing");
    try {
      await analyze(image.base64, image.mediaType);
      setLogged(false);
      setMode("results");
    } catch (err) {
      setMode("preview");
    }
  };

  const handleLog = () => {
    if (!result) return;
    addMeal(result);
    setLogged(true);
  };

  const resetAll = () => {
    setImage(null);
    resetAnalysis();
    setLogged(false);
    setMode("idle");
  };

  return (
    <div className="home">
      <div className="home-container">
        <header className="home-header">
          <div className="nuetracker-logo">
            <img
              src={nueTrackerLogo}
              alt="NueTracker logo"
              className="nuetracker-logo-img"
              style={{ height: "150px", width: "150px" }}
            />
            <span
              className="nuetracker-logo-text"
              style={{ fontSize: "50px", fontWeight: "bold" }}
            >
              NueTracker
            </span>
          </div>
          <div className="nue-date">
            {new Date().toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
        </header>

        {log.length > 0 && <DailyTotals totals={totals} />}

        {(error || camera.error) && (
          <div className="nue-error">{error || camera.error}</div>
        )}

        {mode === "idle" && (
          <div className="nue-idle-actions">
            <button onClick={openCamera} className="nue-btn-solid nue-btn-lrg">
              <Camera size={19} /> Scan with camera
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="nue-btn-ghost nue-btn-lrg"
              style={{ background: "#fff" }}
            >
              <Upload size={19} /> Upload from device
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            {log.length === 0 && (
              <div className="nue-empty">
                <ImagePlus size={22} />
                <div>Nothing logged yet. Scan your first meal.</div>
              </div>
            )}
          </div>
        )}

        {mode === "camera" && (
          <CameraCapture
            videoRef={camera.videoRef}
            canvasRef={camera.canvasRef}
            onCapture={handleCapture}
            onCancel={() => {
              camera.stop();
              setMode("idle");
            }}
          />
        )}

        {mode === "preview" && image && (
          <PhotoPreview
            image={image}
            onRetake={resetAll}
            onAnalyze={runAnalysis}
          />
        )}

        {mode === "analysing" && (
          <div className="nue-loading">
            <div className="nue-spinner"></div>
            <div className="nue-loading-text">Analysing meal...</div>
          </div>
        )}

        {mode === "results" && result && (
          <NutritionLabel
            result={result}
            onLog={handleLog}
            onDiscard={resetAll}
            logged={logged}
          />
        )}

        {log.length > 0 && <MealLog log={log} onRemove={removeMeal} />}
      </div>
    </div>
  );
}
