"use client";

import { useEffect, useMemo, useState } from "react";
import { Brain, CalendarDays, Lightbulb, TrendingUp } from "lucide-react";
import { CheckInForm } from "@/components/CheckInForm";
import { ScoreCard } from "@/components/ScoreCard";
import { StateChart } from "@/components/StateChart";
import type { LearningEntry, WeeklyTrend } from "@/lib/types";

type InsightsResponse = {
  latest?: LearningEntry;
  trend: WeeklyTrend;
  entries: LearningEntry[];
};

const defaultTrend: WeeklyTrend = {
  trend: 0,
  status: "stable",
  currentWeekScore: 0,
  averageLast4Weeks: 0
};

export default function Home() {
  const [entries, setEntries] = useState<LearningEntry[]>([]);
  const [trend, setTrend] = useState<WeeklyTrend>(defaultTrend);

  useEffect(() => {
    fetch("/api/insights")
      .then((response) => response.json())
      .then((data: InsightsResponse) => {
        setEntries(data.entries ?? []);
        setTrend(data.trend ?? defaultTrend);
      });
  }, []);

  const latest = entries.at(-1);
  const summary = useMemo(() => {
    if (!latest) return "Submit a check-in to create your first learning-state summary.";
    return `${latest.detectedPattern} pattern with a ${trend.status} trend.`;
  }, [latest, trend.status]);

  const saveEntry = (entry: LearningEntry) => {
    const updated = [...entries, entry];
    setEntries(updated);
    fetch("/api/insights")
      .then((response) => response.json())
      .then((data: InsightsResponse) => setTrend(data.trend ?? defaultTrend));
  };

  return (
    <main className="min-h-screen">
      <section className="border-b border-black/10 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-ink p-2 text-white">
                <Brain className="h-6 w-6" aria-hidden />
              </div>
              <h1 className="text-3xl font-semibold tracking-normal text-ink">MindLearn</h1>
            </div>
            <div className="mt-3 inline-flex rounded-md border border-sage/30 bg-sage/10 px-3 py-1 text-sm font-medium text-sage">
              West Hacks education track prototype
            </div>
            <p className="mt-3 max-w-2xl text-ink/65">
              Adaptive study guidance from cognitive load, motivation, stress, behavior signals, and trend history.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm md:min-w-[360px]">
            <div className="rounded-lg border border-black/10 bg-mist p-3">
              <p className="text-ink/55">Sessions</p>
              <p className="mt-1 text-2xl font-semibold text-ink">{entries.length}</p>
            </div>
            <div className="rounded-lg border border-black/10 bg-mist p-3">
              <p className="text-ink/55">Trend</p>
              <p className="mt-1 text-2xl font-semibold capitalize text-ink">{trend.status}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <ScoreCard
              label="Cognitive load"
              value={latest?.scores.cognitiveLoad ?? 0}
              helper="Higher values mean the session is carrying more effort, pressure, or workload."
              tone="load"
            />
            <ScoreCard
              label="Learning efficiency"
              value={latest?.scores.learningEfficiency ?? 0}
              helper="Combines focus, motivation, sleep, and load into one study-effectiveness signal."
              tone="efficiency"
            />
            <ScoreCard
              label="Emotional friction"
              value={latest?.scores.emotionalFriction ?? 0}
              helper="Shows how stress and journal signals may be making study harder to sustain."
              tone="friction"
            />
          </div>

          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-ink">Dashboard</h2>
                <p className="text-sm text-ink/60">Learning-state evolution with comparison overlays.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-mist px-3 py-2 text-sm font-medium text-ink/70">
                <TrendingUp className="h-4 w-4" aria-hidden />
                {trend.trend > 0 ? "+" : ""}
                {trend.trend.toFixed(2)}
              </div>
            </div>
            <StateChart entries={entries} />
          </section>

          <CheckInForm onSaved={saveEntry} />
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-sage/20 p-2 text-sage">
                <CalendarDays className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="text-xl font-semibold text-ink">Learning state summary</h2>
            </div>
            <p className="mt-4 text-lg font-medium text-ink">{summary}</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              Current score {trend.currentWeekScore.toFixed(2)} compared with recent baseline{" "}
              {trend.averageLast4Weeks.toFixed(2)}.
            </p>
          </section>

          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-amber/25 p-2 text-[#9a6a1f]">
                <Lightbulb className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="text-xl font-semibold text-ink">Insights</h2>
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold uppercase tracking-normal text-ink/50">Detected pattern</p>
              <p className="mt-1 text-2xl font-semibold text-ink">{latest?.detectedPattern ?? "No pattern yet"}</p>
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold uppercase tracking-normal text-ink/50">AI explanation</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">
                {latest?.explanation ?? "The explanation appears after deterministic scoring is complete."}
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">Adaptive strategy</h2>
            <div className="mt-4 space-y-3">
              {(latest?.recommendations?.length ? latest.recommendations : ["Submit a check-in to receive rule-based study recommendations."]).map(
                (recommendation) => (
                  <div key={recommendation} className="rounded-md border border-black/10 bg-mist px-3 py-3 text-sm leading-6 text-ink/75">
                    {recommendation}
                  </div>
                )
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
