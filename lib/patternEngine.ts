import type { CheckInInput, DetectedPattern, ExtractedFeatures, LearningScores } from "@/lib/types";

export function detectPattern(
  input: CheckInInput,
  features: ExtractedFeatures,
  scores: LearningScores
): DetectedPattern {
  const motivationLow = input.motivationLevel <= 2;
  const studyHoursLow = input.studyHours <= 1.5;
  const stressHigh = input.stressLevel >= 4;
  const studyHoursHigh = input.studyHours >= 4;
  const focusLow = input.focusLevel <= 2;

  if (scores.cognitiveLoad > 4.2 && scores.learningEfficiency < 2.8) {
    return "Overload";
  }

  if (motivationLow && studyHoursLow && stressHigh) {
    return "Avoidance Loop";
  }

  if (features.selfCriticismScore > 3 && features.comparisonScore > 2) {
    return "Perfectionism";
  }

  if (studyHoursHigh && focusLow) {
    return "Inefficient Studying";
  }

  return "Balanced Progress";
}
