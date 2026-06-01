import { NextResponse } from "next/server";
import { z } from "zod";
import { demoUserId } from "@/lib/demoData";
import { listLearningEntries } from "@/lib/db";
import { runLearningPipeline } from "@/lib/learningPipeline";

const checkInSchema = z.object({
  stressLevel: z.number().min(1).max(5),
  focusLevel: z.number().min(1).max(5),
  motivationLevel: z.number().min(1).max(5),
  energyLevel: z.number().min(1).max(5),
  studyHours: z.number().min(0).max(16),
  sleepHours: z.number().min(0).max(14),
  journalText: z.string().max(2000).default("")
});

export async function GET() {
  const entries = await listLearningEntries(demoUserId);
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkInSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid check-in data", details: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await runLearningPipeline(parsed.data, demoUserId);
  return NextResponse.json({ entry }, { status: 201 });
}
