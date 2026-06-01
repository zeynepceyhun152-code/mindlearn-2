import type { DetectedPattern, LearningScores, WeeklyTrend } from "@/lib/types";

type ExplanationInput = {
  scores: LearningScores;
  detectedPattern: DetectedPattern;
  trend: WeeklyTrend;
};

export async function explainLearningProfile(input: ExplanationInput): Promise<string> {
  const fallback = `Your current profile suggests ${input.detectedPattern.toLowerCase()} with a ${input.trend.status} learning trend. The best next step is to adjust study structure around the score that is creating the most friction, then use short active-recall cycles to protect focus.`;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fallback;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Explain learning profiles in simple educational terms. Do not diagnose or mention mental health conditions. Focus on learning behavior and study strategy improvements."
          },
          {
            role: "user",
            content: JSON.stringify({
              cognitiveLoad: input.scores.cognitiveLoad,
              learningEfficiency: input.scores.learningEfficiency,
              emotionalFriction: input.scores.emotionalFriction,
              detectedPattern: input.detectedPattern,
              trend: input.trend
            })
          }
        ],
        temperature: 0.3,
        max_tokens: 160
      })
    });

    if (!response.ok) return fallback;
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content?.trim() || fallback;
  } catch {
    return fallback;
  }
}
