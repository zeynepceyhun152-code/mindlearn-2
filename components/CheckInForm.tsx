"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, SlidersHorizontal } from "lucide-react";
import type { LearningEntry } from "@/lib/types";

const sliderFields = [
  { key: "stressLevel", label: "Stress", minLabel: "low", maxLabel: "high" },
  { key: "focusLevel", label: "Focus", minLabel: "scattered", maxLabel: "clear" },
  { key: "motivationLevel", label: "Motivation", minLabel: "low", maxLabel: "strong" },
  { key: "energyLevel", label: "Energy", minLabel: "tired", maxLabel: "ready" }
] as const;

type FormState = {
  stressLevel: number;
  focusLevel: number;
  motivationLevel: number;
  energyLevel: number;
  studyHours: number;
  sleepHours: number;
  journalText: string;
};

export function CheckInForm({ onSaved }: { onSaved: (entry: LearningEntry) => void }) {
  const [form, setForm] = useState<FormState>({
    stressLevel: 3,
    focusLevel: 3,
    motivationLevel: 3,
    energyLevel: 3,
    studyHours: 2,
    sleepHours: 7,
    journalText: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    const response = await fetch("/api/checkins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = (await response.json()) as { entry: LearningEntry };
    setIsSaving(false);
    if (data.entry) {
      onSaved(data.entry);
      update("journalText", "");
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-black/10 bg-white p-5 shadow-soft"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-ink">Check-in</h2>
          <p className="text-sm text-ink/60">Your entries feed the scoring engine.</p>
        </div>
        <div className="rounded-md bg-mist p-2 text-ink/70">
          <SlidersHorizontal className="h-5 w-5" aria-hidden />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {sliderFields.map((field) => (
          <label key={field.key} className="block">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{field.label}</span>
              <span className="rounded-md bg-mist px-2 py-1 text-sm font-semibold text-ink">{form[field.key]}</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={form[field.key]}
              onChange={(event) => update(field.key, Number(event.target.value))}
              className="w-full accent-sage"
            />
            <div className="mt-1 flex justify-between text-xs text-ink/50">
              <span>{field.minLabel}</span>
              <span>{field.maxLabel}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Study hours</span>
          <input
            type="number"
            min={0}
            max={16}
            step={0.5}
            value={form.studyHours}
            onChange={(event) => update("studyHours", Number(event.target.value))}
            className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 outline-none ring-sage/30 focus:ring-4"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Sleep hours</span>
          <input
            type="number"
            min={0}
            max={14}
            step={0.5}
            value={form.sleepHours}
            onChange={(event) => update("sleepHours", Number(event.target.value))}
            className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 outline-none ring-sage/30 focus:ring-4"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-ink">Journal</span>
        <textarea
          value={form.journalText}
          onChange={(event) => update("journalText", event.target.value)}
          rows={5}
          placeholder="What affected your study session today?"
          className="mt-2 w-full resize-none rounded-md border border-black/10 bg-white px-3 py-3 outline-none ring-sage/30 focus:ring-4"
        />
      </label>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-4 py-2 font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden />
        {isSaving ? "Saving" : "Submit check-in"}
      </button>
    </motion.form>
  );
}
