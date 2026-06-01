import type { LearningScores, WeeklyTrend } from "@/lib/types";

const weightedScore = (scores: LearningScores) =>
  scores.learningEfficiency - scores.cognitiveLoad * 0.35 - scores.emotionalFriction * 0.25;

export function analyzeWeeklyTrend(history: Array<{ scores: LearningScores; createdAt: string }>): WeeklyTrend {
  if (history.length === 0) {
    return { trend: 0, status: "stable", currentWeekScore: 0, averageLast4Weeks: 0 };
  }

  const sorted = [...history].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const currentWeekScore = Number(weightedScore(sorted[0].scores).toFixed(2));
  const previous = sorted.slice(1, 5);
  const averageLast4Weeks =
    previous.length > 0
      ? Number((previous.reduce((sum, entry) => sum + weightedScore(entry.scores), 0) / previous.length).toFixed(2))
      : currentWeekScore;
  const trend = Number((currentWeekScore - averageLast4Weeks).toFixed(2));
  const status = trend > 0.35 ? "improving" : trend < -0.35 ? "declining" : "stable";

  return { trend, status, currentWeekScore, averageLast4Weeks };
}
