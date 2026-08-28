import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import analyzeRouter from "./routes/analyze.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, status: "server-running" });
});

app.use("/api/analyse", analyzeRouter);

if (!GEMINI_API_KEY) {
  console.warn(
    "Warning: GEMINI_API_KEY is not set. Copy server/.env.example to server/.env and add your key.",
  );
}

app.listen(PORT, () => {
  console.log(`Food scanner API running on http://localhost:${PORT}`);
});
