import { NextResponse } from "next/server";
import { demoUserId } from "@/lib/demoData";
import { listLearningEntries } from "@/lib/db";
import { analyzeWeeklyTrend } from "@/lib/temporalEngine";

export async function GET() {
  const entries = await listLearningEntries(demoUserId);
  const latest = entries.at(-1);
  const trend = analyzeWeeklyTrend(entries.map((entry) => ({ scores: entry.scores, createdAt: entry.createdAt })));

  return NextResponse.json({ latest, trend, entries });
}
