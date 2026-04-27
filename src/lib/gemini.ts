import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeInternPerformance(feedback: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following intern feedback and provide a structured summary with:
      1. Sentiment (Positive/Neutral/Negative)
      2. Key Strengths
      3. Areas of Improvement
      4. Recommendations for Next Task
      
      Feedback: "${feedback}"`,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
}
