'use client';

import React from 'react';
import { Search, Bell, Command } from 'lucide-react';

interface TopbarProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  onOpenSearch?: () => void;
  unreadNotifications?: number;
}

export function Topbar({
  title = 'Dashboard Overview',
  breadcrumbs,
  onOpenSearch,
  unreadNotifications = 3,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      {/* Title / Breadcrumbs */}
      <div className="flex items-center gap-3">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                {idx > 0 && <span className="text-zinc-300 dark:text-zinc-700">/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : (
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Global Search Input */}
        <button
          onClick={onOpenSearch}
          className="flex h-9 w-60 items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 text-xs text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span>Search modules, logs...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </button>

        {/* Live System Status */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Connected</span>
        </div>

        {/* Notification Bell */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm">
              {unreadNotifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
