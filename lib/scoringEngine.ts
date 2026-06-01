import type { CheckInInput, ExtractedFeatures, LearningScores } from "@/lib/types";

const round = (value: number) => Number(value.toFixed(2));
const clamp = (value: number) => Math.max(0, Math.min(10, round(value)));

export function computeLearningScores(input: CheckInInput, features: ExtractedFeatures): LearningScores {
  const workloadFactor = Math.min(10, input.studyHours + features.overloadScore * 0.8);

  const cognitiveLoad =
    input.studyHours * 0.4 + input.stressLevel * 0.3 + workloadFactor * 0.3;

  const learningEfficiency =
    input.focusLevel * 0.4 +
    input.motivationLevel * 0.3 +
    input.sleepHours * 0.3 -
    cognitiveLoad * 0.2;

  const emotionalFriction =
    input.stressLevel * 0.5 +
    features.selfCriticismScore * 0.3 +
    features.comparisonScore * 0.2;

  return {
    cognitiveLoad: clamp(cognitiveLoad),
    learningEfficiency: clamp(learningEfficiency),
    emotionalFriction: clamp(emotionalFriction)
  };
}
