import { randomUUID } from "crypto";
import { explainLearningProfile } from "@/lib/aiExplanation";
import { saveLearningEntry, listLearningEntries } from "@/lib/db";
import { extractFeatures } from "@/lib/featureExtractor";
import { detectPattern } from "@/lib/patternEngine";
import { buildRecommendations } from "@/lib/recommendationEngine";
import { computeLearningScores } from "@/lib/scoringEngine";
import { analyzeWeeklyTrend } from "@/lib/temporalEngine";
import type { CheckInInput, LearningEntry } from "@/lib/types";

export async function runLearningPipeline(input: CheckInInput, userId: string): Promise<LearningEntry> {
  const features = extractFeatures(input);
  const scores = computeLearningScores(input, features);
  const detectedPattern = detectPattern(input, features, scores);
  const history = await listLearningEntries(userId);
  const trend = analyzeWeeklyTrend([...history, { scores, createdAt: new Date().toISOString() }]);
  const recommendations = buildRecommendations(detectedPattern, scores, trend);
  const explanation = await explainLearningProfile({ scores, detectedPattern, trend });

  const entry: LearningEntry = {
    id: randomUUID(),
    userId,
    ...input,
    createdAt: new Date().toISOString(),
    features,
    scores,
    detectedPattern,
    recommendations,
    explanation
  };

  return saveLearningEntry(entry);
}
