import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nue-meal-log";

function loadLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((item) => ({
      ...item,
      time: new Date(item.time),
    }));
  } catch {
    return [];
  }
}

// Persists the daily log to localStorage so a refresh doesn't wipe it.
// Swap loadLog/the effect below for an API call if you add real accounts.
export function useMealLog() {
  const [log, setLog] = useState(loadLog);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  }, [log]);

  const addMeal = useCallback((result) => {
    setLog((prev) => [
      { id: crypto.randomUUID(), time: new Date(), ...result },
      ...prev,
    ]);
  }, []);

  const removeMeal = useCallback((id) => {
    setLog((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const totals = log.reduce(
    (acc, item) => ({
      calories: acc.calories + (item.calories || 0),
      protein_g: acc.protein_g + (item.protein_g || 0),
      carbs_g: acc.carbs_g + (item.carbs_g || 0),
      fats_g: acc.fats_g + (item.fats_g || 0),
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fats_g: 0 },
  );

  return { log, addMeal, removeMeal, totals };
}
