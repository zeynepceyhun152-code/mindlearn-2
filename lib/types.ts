export type CheckInInput = {
  stressLevel: number;
  focusLevel: number;
  motivationLevel: number;
  energyLevel: number;
  studyHours: number;
  sleepHours: number;
  journalText: string;
};

export type ExtractedFeatures = {
  selfCriticismScore: number;
  comparisonScore: number;
  overloadScore: number;
  disengagementScore: number;
};

export type LearningScores = {
  cognitiveLoad: number;
  learningEfficiency: number;
  emotionalFriction: number;
};

export type DetectedPattern =
  | "Overload"
  | "Avoidance Loop"
  | "Perfectionism"
  | "Inefficient Studying"
  | "Balanced Progress";

export type TrendStatus = "improving" | "stable" | "declining";

export type WeeklyTrend = {
  trend: number;
  status: TrendStatus;
  currentWeekScore: number;
  averageLast4Weeks: number;
};

export type LearningEntry = CheckInInput & {
  id: string;
  userId: string;
  createdAt: string;
  features: ExtractedFeatures;
  scores: LearningScores;
  detectedPattern: DetectedPattern;
  recommendations: string[];
  explanation: string;
};
