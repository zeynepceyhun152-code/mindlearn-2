import pg from "pg";
import type { LearningEntry } from "@/lib/types";
import { demoEntries, demoUserId } from "@/lib/demoData";

const { Pool } = pg;

let pool: pg.Pool | null = null;
const memoryEntries: LearningEntry[] = [...demoEntries];

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

export async function ensureUser(userId = demoUserId) {
  const db = getPool();
  if (!db) return userId;

  await db.query("INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING", [userId]);
  return userId;
}

export async function saveLearningEntry(entry: LearningEntry) {
  const db = getPool();
  if (!db) {
    memoryEntries.push(entry);
    return entry;
  }

  await ensureUser(entry.userId);
  await db.query(
    `INSERT INTO checkins (
      id, user_id, stress_level, focus_level, motivation_level, energy_level,
      study_hours, sleep_hours, journal_text, created_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      entry.id,
      entry.userId,
      entry.stressLevel,
      entry.focusLevel,
      entry.motivationLevel,
      entry.energyLevel,
      entry.studyHours,
      entry.sleepHours,
      entry.journalText,
      entry.createdAt
    ]
  );
  await db.query(
    `INSERT INTO learning_state (
      user_id, cognitive_load, learning_efficiency, emotional_friction, timestamp
    ) VALUES ($1,$2,$3,$4,$5)`,
    [
      entry.userId,
      entry.scores.cognitiveLoad,
      entry.scores.learningEfficiency,
      entry.scores.emotionalFriction,
      entry.createdAt
    ]
  );
  return entry;
}

export async function listLearningEntries(userId = demoUserId): Promise<LearningEntry[]> {
  const db = getPool();
  if (!db) return [...memoryEntries].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

  await ensureUser(userId);
  const result = await db.query(
    `SELECT
      c.id,
      c.user_id,
      c.stress_level,
      c.focus_level,
      c.motivation_level,
      c.energy_level,
      c.study_hours,
      c.sleep_hours,
      c.journal_text,
      c.created_at,
      l.cognitive_load,
      l.learning_efficiency,
      l.emotional_friction
    FROM checkins c
    JOIN learning_state l ON l.user_id = c.user_id AND l.timestamp = c.created_at
    WHERE c.user_id = $1
    ORDER BY c.created_at ASC`,
    [userId]
  );

  return result.rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    stressLevel: Number(row.stress_level),
    focusLevel: Number(row.focus_level),
    motivationLevel: Number(row.motivation_level),
    energyLevel: Number(row.energy_level),
    studyHours: Number(row.study_hours),
    sleepHours: Number(row.sleep_hours),
    journalText: row.journal_text,
    createdAt: new Date(row.created_at).toISOString(),
    features: { selfCriticismScore: 0, comparisonScore: 0, overloadScore: 0, disengagementScore: 0 },
    scores: {
      cognitiveLoad: Number(row.cognitive_load),
      learningEfficiency: Number(row.learning_efficiency),
      emotionalFriction: Number(row.emotional_friction)
    },
    detectedPattern: "Balanced Progress",
    recommendations: [],
    explanation: ""
  }));
}
