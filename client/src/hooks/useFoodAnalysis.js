import { useState, useCallback } from "react";
// Talks to OUR backend, which calls Gemini behind the scenes.
// The browser never sees the API key. Base URL is empty (same-origin)
// unless VITE_API_URL is set, e.g. in local dev via the Vite proxy.

const BASE_URL = import.meta.env.VITE_API_URL || "";

export function useFoodAnalysis() {
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const analyze = useCallback(async (base64, mediaType) => {
    setStatus("analysing");
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/api/analyse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mediaType }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setResult(data);
      setStatus("done");
      return data;
    } catch (e) {
      setError("Couldn't read meal. Try clearer, well-lit photo.");
      setStatus("error");
      throw e;
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setStatus("idle");
    setError("");
  }, []);

  return { result, status, error, analyze, reset };
}