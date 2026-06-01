import type { CheckInInput, ExtractedFeatures } from "@/lib/types";

const phraseRules: Array<{ phrases: string[]; key: keyof ExtractedFeatures; weight: number }> = [
  {
    key: "selfCriticismScore",
    weight: 2,
    phrases: ["should have done better", "not good enough", "i failed", "my fault", "wasted time"]
  },
  {
    key: "comparisonScore",
    weight: 2,
    phrases: ["everyone is better", "others are ahead", "behind everyone", "not as smart", "compared to"]
  },
  {
    key: "overloadScore",
    weight: 2,
    phrases: ["too much", "overwhelmed", "can't keep up", "so many tasks", "burned out", "heavy workload"]
  },
  {
    key: "disengagementScore",
    weight: 2,
    phrases: ["don't care", "avoid studying", "kept scrolling", "couldn't start", "gave up", "procrastinated"]
  }
];

const keywordRules: Array<{ words: string[]; key: keyof ExtractedFeatures; weight: number }> = [
  { key: "selfCriticismScore", weight: 1, words: ["should", "failed", "lazy", "mistake", "perfect"] },
  { key: "comparisonScore", weight: 1, words: ["everyone", "others", "behind", "comparison", "better"] },
  { key: "overloadScore", weight: 1, words: ["overload", "pressure", "deadline", "exhausted", "confused"] },
  { key: "disengagementScore", weight: 1, words: ["avoid", "stuck", "bored", "delay", "skip"] }
];

const clamp = (value: number) => Math.max(0, Math.min(10, value));

export function extractFeatures(input: CheckInInput): ExtractedFeatures {
  const normalizedText = input.journalText.toLowerCase();
  const features: ExtractedFeatures = {
    selfCriticismScore: 0,
    comparisonScore: 0,
    overloadScore: 0,
    disengagementScore: 0
  };

  for (const rule of phraseRules) {
    for (const phrase of rule.phrases) {
      if (normalizedText.includes(phrase)) {
        features[rule.key] += rule.weight;
      }
    }
  }

  const tokens = new Set(normalizedText.match(/[a-z']+/g) ?? []);
  for (const rule of keywordRules) {
    for (const word of rule.words) {
      if (tokens.has(word)) {
        features[rule.key] += rule.weight;
      }
    }
  }

  if (input.stressLevel >= 4 && input.studyHours >= 4) features.overloadScore += 1;
  if (input.motivationLevel <= 2 && input.studyHours <= 1.5) features.disengagementScore += 1;
  if (input.focusLevel <= 2 && input.studyHours >= 3) features.overloadScore += 1;

  return {
    selfCriticismScore: clamp(features.selfCriticismScore),
    comparisonScore: clamp(features.comparisonScore),
    overloadScore: clamp(features.overloadScore),
    disengagementScore: clamp(features.disengagementScore)
  };
}
