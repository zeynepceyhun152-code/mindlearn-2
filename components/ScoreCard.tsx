import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

type ScoreCardProps = {
  label: string;
  value: number;
  helper: string;
  tone: "load" | "efficiency" | "friction";
};

const toneStyles = {
  load: "border-coral/25 bg-coral/10 text-coral",
  efficiency: "border-sage/30 bg-sage/15 text-sage",
  friction: "border-amber/40 bg-amber/20 text-[#9a6a1f]"
};

export function ScoreCard({ label, value, helper, tone }: ScoreCardProps) {
  const Icon = value >= 4 ? ArrowUpRight : value <= 2 ? ArrowDownRight : ArrowRight;

  return (
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink/60">{label}</p>
          <p className="mt-3 text-4xl font-semibold tracking-normal text-ink">{value.toFixed(1)}</p>
        </div>
        <div className={`rounded-md border p-2 ${toneStyles[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink/65">{helper}</p>
    </div>
  );
}
