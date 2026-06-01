# MindLearn West Hacks Submission Packet

## Submission Links To Fill In

- Video demo:
- Working app or local run instructions: See `README.md`
- Public GitHub repo:
- Devpost page:

## Devpost Short Description

MindLearn is an AI-assisted study dashboard that helps students understand how stress, focus, motivation, sleep, and study behavior affect learning effectiveness, then gives adaptive study strategies based on explainable scoring.

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

## Video Demo Outline

1. Introduce MindLearn as an education project for West Hacks.
2. Explain the problem: students track assignments but not learning-state factors.
3. Show the dashboard scores and graph.
4. Submit a check-in with slider values and a journal entry.
5. Show the updated detected pattern, trend, recommendations, and explanation.
6. Explain that core logic is deterministic and AI is only used for summarization.
7. Close by connecting the project back to making learning more effective and accessible.

## Final Checklist

- Record a video demo under 5 minutes.
- Upload it and make the link viewable.
- Push the source code to a public GitHub repository.
- Add the GitHub link and local run instructions to Devpost.
- Copy the Devpost answers from this packet or `HACKATHON_SUBMISSION.md`.
