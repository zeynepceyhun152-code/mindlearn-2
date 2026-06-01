CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 5),
  focus_level INTEGER NOT NULL CHECK (focus_level BETWEEN 1 AND 5),
  motivation_level INTEGER NOT NULL CHECK (motivation_level BETWEEN 1 AND 5),
  energy_level INTEGER NOT NULL CHECK (energy_level BETWEEN 1 AND 5),
  study_hours NUMERIC(4, 1) NOT NULL CHECK (study_hours >= 0),
  sleep_hours NUMERIC(4, 1) NOT NULL CHECK (sleep_hours >= 0),
  journal_text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cognitive_load NUMERIC(5, 2) NOT NULL,
  learning_efficiency NUMERIC(5, 2) NOT NULL,
  emotional_friction NUMERIC(5, 2) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checkins_user_created ON checkins(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_learning_state_user_timestamp ON learning_state(user_id, timestamp);
