import { useRef, useState, useCallback, useEffect } from 'react';
// Owns everything related to the device camera: opening the stream,
// wiring it to a <video>, grabbing a still frame, and cleanup.
export default function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState("");

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Always release the camera if the component unmounts mid-stream.
  useEffect(() => () => stop(), [stop]);

  const start = useCallback(async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setError("Couldn't access the camera. Check permissions, or upload a photo instead.");
    }
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    stop();
    return { dataUrl, base64: dataUrl.split(",")[1], mediaType: "image/jpeg" };
  }, [stop]);
  
  return { videoRef, canvasRef, error, start, stop, capture };
}