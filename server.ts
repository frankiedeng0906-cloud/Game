import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily inside handler to prevent server crash if key is missing
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY 未設定，請至 Settings 設置 API Key。");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Helper to safely parse JSON from Gemini text
function parseGeminiJson(rawText: string) {
  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/, "")
    .replace(/\s*```$/, "")
    .trim();
  return JSON.parse(cleaned);
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Word Explanation Endpoint
app.post("/api/ai-explain", async (req, res) => {
  try {
    const { word, definition, zh } = req.body;
    if (!word) {
      return res.status(400).json({ error: "Word parameter is required" });
    }

    const ai = getGeminiClient();
    const prompt = `You are a friendly and engaging English language tutor for Taiwanese students.
Please provide a structured learning explanation for the English word: "${word}" (Definition: "${definition || ''}", Chinese: "${zh || ''}").

Return your response in pure JSON format matching this structure:
{
  "phonetic": "phonetic symbol e.g. /ˈæp.əl/",
  "partOfSpeech": "noun / verb / adjective / etc.",
  "zhTranslation": "Traditional Chinese translation e.g. 蘋果",
  "simpleExplanation": "Clear, easy-to-understand explanation in Traditional Chinese (繁體中文)",
  "mnemonic": "A clever memory hook or association tip in Traditional Chinese to remember this word easily",
  "rootAnalysis": "Word root, prefix, or etymology breakdown if applicable, in Traditional Chinese",
  "exampleSentences": [
    { "en": "Example sentence in English using ${word}", "zh": "Traditional Chinese translation of example sentence" },
    { "en": "Second example sentence in English", "zh": "Traditional Chinese translation" }
  ],
  "synonyms": ["synonym1", "synonym2"],
  "collocations": ["common phrase 1", "common phrase 2"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini API");
    }

    const data = parseGeminiJson(text);
    res.json({ success: true, data });
  } catch (err: any) {
    console.error("AI Explanation error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to generate AI explanation.",
    });
  }
});

// AI Custom Vocabulary Generator Endpoint
app.post("/api/ai-custom-quiz", async (req, res) => {
  try {
    const { category, count = 10 } = req.body;
    const ai = getGeminiClient();
    const prompt = `Generate a list of ${count} English vocabulary words for theme/category: "${category || 'General English'}".

For each word, provide 6-8 highly confusable distractor words that belong to the SAME semantic category and same part of speech (e.g. if the target word is a person/role, distractors MUST be other people/roles; if an animal, distractors MUST be animals; if an adjective, distractors MUST be adjectives with similar prefixes/suffixes).

Return response as a JSON array of word objects matching this format:
[
  {
    "word": "Target Word",
    "def": "Clear English definition without mentioning the target word directly",
    "zh": "Traditional Chinese translation",
    "partOfSpeech": "noun/verb/adjective",
    "category": "person_role / animal / plant_food / place_building / device_tool / abstract_noun / character_adj / state_adj / action_verb",
    "confusableWords": ["Distractor1", "Distractor2", "Distractor3", "Distractor4", "Distractor5", "Distractor6", "Distractor7"],
    "level": "custom"
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini API");
    }

    const words = parseGeminiJson(text);
    res.json({ success: true, words });
  } catch (err: any) {
    console.error("AI Custom Quiz error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to generate custom quiz words.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
