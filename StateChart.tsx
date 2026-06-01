"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { LearningEntry } from "@/lib/types";

export function StateChart({ entries }: { entries: LearningEntry[] }) {
  const data = entries.map((entry) => ({
    date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(entry.createdAt)),
    cognitiveLoad: entry.scores.cognitiveLoad,
    learningEfficiency: entry.scores.learningEfficiency,
    emotionalFriction: entry.scores.emotionalFriction
  }));

  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#d9e4e2" />
          <XAxis dataKey="date" stroke="#52605f" fontSize={12} />
          <YAxis stroke="#52605f" fontSize={12} domain={[0, 10]} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid rgba(23,32,38,.12)",
              boxShadow: "0 14px 34px rgba(23,32,38,.12)"
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="cognitiveLoad" name="Cognitive load" stroke="#e26d5a" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="learningEfficiency" name="Learning efficiency" stroke="#5f8f7f" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="emotionalFriction" name="Emotional friction" stroke="#d59a37" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
