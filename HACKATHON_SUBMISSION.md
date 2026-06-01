# West Hacks Submission: MindLearn

## Project Name

MindLearn

## One-Line Description

MindLearn helps students understand and improve their study effectiveness by modeling cognitive load, motivation, stress, sleep, and learning behavior over time.

## Track Fit

Education. MindLearn builds a tool for students that makes learning more effective, organized, and accessible through explainable feedback and adaptive study strategies.

## What Issue Are You Solving?

Students often know whether they studied, but not why a study session worked or failed. A student can spend hours rereading notes and still learn very little, or avoid starting because the workload feels too big. Most school tools track assignments and grades, but they do not help students understand the learning-state factors that shape study effectiveness, such as stress, focus, sleep, motivation, workload, and self-critical thinking.

MindLearn solves this by giving students a structured way to reflect on their study state and receive clear, non-clinical learning feedback.

## How Does Your Project Address It?

MindLearn collects a short student check-in with sliders for stress, focus, motivation, energy, sleep, study time, and a journal reflection. It then runs a deterministic learning pipeline:

1. Extracts cognitive and behavioral signals from the journal text using rule-based NLP.
2. Computes cognitive load, learning efficiency, and emotional friction.
3. Detects learning patterns such as overload, avoidance loop, perfectionism, and inefficient studying.
4. Compares the current learning state with recent history.
5. Generates adaptive study strategies using deterministic rules.
6. Optionally uses AI only to explain the already-computed profile in simple educational language.

The result is a dashboard that shows scores, trends, graphs, a detected pattern, and specific study recommendations.

## What Was the Hardest Part of the Build?

The hardest part was designing the system so it felt intelligent without letting AI control the important decisions. I wanted the app to be explainable and trustworthy, so the core logic had to be deterministic: the scoring formulas, pattern detection, and recommendations all needed to be readable and auditable. Balancing that with a polished user experience, trend visualization, and an optional AI explanation layer was the main challenge.

## Key Features

- Student check-in form with stress, focus, motivation, energy, study hours, sleep hours, and journal text
- Rule-based NLP feature extraction
- Deterministic cognitive load, learning efficiency, and emotional friction scores
- Pattern detection for overload, avoidance loop, perfectionism, inefficient studying, and balanced progress
- Recharts dashboard showing learning-state evolution over time
- Rule-based adaptive study recommendations
- Optional AI explanation layer that summarizes structured results without making core decisions
- PostgreSQL schema plus demo fallback mode for easy judging

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion
- PostgreSQL-ready schema
- Optional OpenAI-compatible explanation layer

## Local Run Instructions

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

On Windows, you can also run:

```powershell
.\start-mindlearn.ps1
```

No database or API key is required for demo mode.

## Suggested Devpost Short Description

MindLearn is an AI-assisted study dashboard that helps students understand how stress, focus, motivation, sleep, and study behavior affect learning effectiveness, then gives adaptive study strategies based on explainable scoring.

## Suggested Devpost Tags

Education, AI, Next.js, TypeScript, Data Visualization, Student Tools, Learning Analytics
