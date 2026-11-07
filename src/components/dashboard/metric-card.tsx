import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    timeframe?: string;
  };
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
}: MetricCardProps) {
  const resolvedTrend =
    trend ??
    (change
      ? change.value > 0
        ? 'up'
        : change.value < 0
        ? 'down'
        : 'neutral'
      : 'neutral');

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {value}
        </span>
      </div>

      {(change || description) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {change && (
            <div
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium ${
                resolvedTrend === 'up'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : resolvedTrend === 'down'
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                  : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {resolvedTrend === 'up' && <ArrowUpRight className="h-3 w-3" />}
              {resolvedTrend === 'down' && <ArrowDownRight className="h-3 w-3" />}
              {resolvedTrend === 'neutral' && <Minus className="h-3 w-3" />}
              <span>
                {change.value > 0 ? `+${change.value}%` : `${change.value}%`}
              </span>
            </div>
          )}

          <span className="text-zinc-500 dark:text-zinc-400">
            {change?.timeframe ? `vs ${change.timeframe}` : description}
          </span>
        </div>
      )}
    </div>
  );
}
