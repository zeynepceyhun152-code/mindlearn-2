import type { LearningEntry } from "@/lib/types";

export const demoUserId = "00000000-0000-4000-8000-000000000001";

export const demoEntries: LearningEntry[] = [
  {
    id: "demo-1",
    userId: demoUserId,
    stressLevel: 4,
    focusLevel: 2,
    motivationLevel: 3,
    energyLevel: 2,
    studyHours: 4.5,
    sleepHours: 5.5,
    journalText: "I had too much to cover and could not keep up.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    features: { selfCriticismScore: 0, comparisonScore: 0, overloadScore: 4, disengagementScore: 0 },
    scores: { cognitiveLoad: 4.95, learningEfficiency: 1.66, emotionalFriction: 2 },
    detectedPattern: "Overload",
    recommendations: [
      "Reduce study blocks to 25 minutes and place a 5-minute break between blocks.",
      "Switch from rereading to active recall with small question sets.",
      "Move one low-priority task out of today's plan."
    ],
    explanation:
      "Your study load is high compared with your current focus. A smaller, more structured session will make it easier to convert effort into learning."
  },
  {
    id: "demo-2",
    userId: demoUserId,
    stressLevel: 3,
    focusLevel: 3,
    motivationLevel: 3,
    energyLevel: 3,
    studyHours: 3,
    sleepHours: 6.5,
    journalText: "I stayed on task but felt pressure around deadlines.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    features: { selfCriticismScore: 0, comparisonScore: 0, overloadScore: 2, disengagementScore: 0 },
    scores: { cognitiveLoad: 3.18, learningEfficiency: 3.41, emotionalFriction: 1.5 },
    detectedPattern: "Balanced Progress",
    recommendations: [
      "Choose one priority learning outcome before starting.",
      "Use a short retrieval practice check at the end of the session."
    ],
    explanation:
      "This looks like a steady study session. Keep the structure clear and add a quick self-test to make progress easier to see."
  },
  {
    id: "demo-3",
    userId: demoUserId,
    stressLevel: 5,
    focusLevel: 2,
    motivationLevel: 2,
    energyLevel: 2,
    studyHours: 1,
    sleepHours: 6,
    journalText: "I procrastinated because others are ahead and I should have done better.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    features: { selfCriticismScore: 3, comparisonScore: 3, overloadScore: 0, disengagementScore: 2 },
    scores: { cognitiveLoad: 2.2, learningEfficiency: 2.76, emotionalFriction: 4 },
    detectedPattern: "Avoidance Loop",
    recommendations: [
      "Start with a 5-minute task that has a visible finish line.",
      "Use a prepared checklist so the first step is already decided.",
      "Lower the first task's difficulty until starting feels easy.",
      "Track progress against your previous attempt, not against other students."
    ],
    explanation:
      "Your profile suggests that starting may be the hardest part of the session. Make the first action tiny and specific, then build momentum with short structured steps."
  }
];
