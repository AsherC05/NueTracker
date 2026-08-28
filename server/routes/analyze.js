import { Router } from "express";

const router = Router();

const PROMPT = `You are a nutrition estimator. Look at this photo of food and estimate its nutrition.
Respond with ONLY a raw JSON object, no markdown fences, no commentary, matching exactly this shape:
{
  "food_name": string (short, e.g. "Grilled chicken salad"),
  "serving_estimate": string (e.g. "1 bowl, ~350g"),
  "calories": number,
  "protein_g": number,
  "carbs_g": number,
  "fat_g": number,
  "fibre_g": number,
  "sugar_g": number,
  "confidence": "low" | "medium" | "high",
  "notes": string (max 12 words, e.g. "Estimate assumes light dressing")
}
If the image does not contain food, set food_name to "No food detected" and all numeric fields to 0.`;

router.post("/", async (req, res) => {
  const { image, mediaType } = req.body || {};

  if (!image || !mediaType) {
    return res.status(400).json({ error: "Missing image or mediaType" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing GEMINI_API_KEY" });
  }

  try {
    const cleanBase64 = image.replace(/^data:.*;base64,/, "").trim();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mediaType,
                    data: cleanBase64,
                  },
                },
                { text: PROMPT },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      return res.status(502).json({ error: "Upstream API error", detail });
    }

    const data = await response.json();

    const text =
      data?.candidates
        ?.map((candidate) =>
          candidate?.content?.parts?.map((part) => part?.text || "").join("\n"),
        )
        .join("\n") || "";

    const cleaned = text
      .replace(/```json\s*/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return res.json(parsed);
  } catch (err) {
    return res.status(500).json({
      error: "Analysis failed",
      detail: String(err),
    });
  }
});

export default router;
