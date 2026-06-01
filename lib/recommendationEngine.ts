import type { DetectedPattern, LearningScores, WeeklyTrend } from "@/lib/types";

const baseRecommendations = [
  "Choose one priority learning outcome before starting.",
  "Use a short retrieval practice check at the end of the session."
];

export function buildRecommendations(
  pattern: DetectedPattern,
  scores: LearningScores,
  trend: WeeklyTrend
): string[] {
  const recommendations: string[] = [];

  if (pattern === "Overload") {
    recommendations.push(
      "Reduce study blocks to 25 minutes and place a 5-minute break between blocks.",
      "Switch from rereading to active recall with small question sets.",
      "Move one low-priority task out of today's plan."
    );
  }

  if (pattern === "Avoidance Loop") {
    recommendations.push(
      "Start with a 5-minute task that has a visible finish line.",
      "Use a prepared checklist so the first step is already decided.",
      "Lower the first task's difficulty until starting feels easy."
    );
  }

  if (pattern === "Perfectionism") {
    recommendations.push(
      "Set a good-enough completion target before beginning.",
      "Track progress against your previous attempt, not against other students.",
      "Limit review passes to one focused correction round."
    );
  }

  if (pattern === "Inefficient Studying") {
    recommendations.push(
      "Replace one long block with two shorter focused blocks.",
      "Add a quick self-test after each concept.",
      "Study the hardest material when energy is highest."
    );
  }

  if (scores.emotionalFriction >= 4) {
    recommendations.push("Add a two-minute reset before studying: write the next tiny action and begin only that.");
  }

  if (trend.status === "declining") {
    recommendations.push("Review the last week's schedule and remove one friction point from the next session.");
  }

  return [...recommendations, ...baseRecommendations].slice(0, 6);
}
