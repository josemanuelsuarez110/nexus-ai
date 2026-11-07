import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type ModuleStatus = 'active' | 'beta' | 'coming_soon' | 'inactive';

export interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status?: ModuleStatus;
  href?: string;
  badge?: string;
  ctaText?: string;
  onClick?: () => void;
}

const statusConfig: Record<
  ModuleStatus,
  { label: string; className: string }
> = {
  active: {
    label: 'Active',
    className:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40',
  },
  beta: {
    label: 'Beta',
    className:
      'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/40',
  },
  coming_soon: {
    label: 'Soon',
    className:
      'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  },
  inactive: {
    label: 'Disabled',
    className:
      'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800',
  },
};

export function ModuleCard({
  title,
  description,
  icon: Icon,
  status = 'active',
  href,
  badge,
  ctaText = 'Open module',
  onClick,
}: ModuleCardProps) {
  const currentStatus = statusConfig[status];
  const isClickable = Boolean(href || onClick);
  const isDisabled = status === 'coming_soon' || status === 'inactive';

  const Content = (
    <div
      className={`group relative flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-950 ${
        isClickable && !isDisabled
          ? 'hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-700 cursor-pointer'
          : ''
      }`}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div>
        {/* Card Header: Icon & Badges */}
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-zinc-900 dark:text-zinc-200 dark:group-hover:bg-indigo-950/60 dark:group-hover:text-indigo-400">
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {badge}
              </span>
            )}
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${currentStatus.className}`}
            >
              {currentStatus.label}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className="text-base font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      {/* Card Footer: Action */}
      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900">
        <span
          className={`text-xs font-semibold ${
            isDisabled
              ? 'text-zinc-400 dark:text-zinc-600'
              : 'text-zinc-700 group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400'
          } inline-flex items-center gap-1 transition-colors`}
        >
          {ctaText}
          {!isDisabled && (
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </span>
      </div>
    </div>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className="block h-full">
        {Content}
      </Link>
    );
  }

  return Content;
}
