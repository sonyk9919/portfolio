import type { Metric } from "@/types/content";

type Props = {
  metrics: Metric[];
  accent: string;
};

const COLUMN_CLASS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

export const MetricStrip = ({ metrics, accent }: Props) => {
  const columns = COLUMN_CLASS[Math.min(metrics.length, 3)] ?? "sm:grid-cols-3";

  return (
    <dl
      className={`mt-6 grid gap-px overflow-hidden rounded-lg border border-black/8 bg-black/8 dark:border-white/10 dark:bg-white/10 ${columns}`}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col justify-center bg-[var(--background)] px-4 py-4 sm:px-5"
        >
          <dt className="text-xs text-neutral-500 dark:text-neutral-400">
            {metric.label}
          </dt>
          <dd
            className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums"
            style={{ color: accent }}
          >
            {metric.value}
          </dd>
          {metric.detail && (
            <dd className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
              {metric.detail}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
};
