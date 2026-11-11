'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  FolderGit2,
  Gauge,
  ShieldCheck,
  Bot,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FolderGit2 },
  { label: 'Quality', href: '/quality', icon: Gauge },
  { label: 'Security', href: '/security', icon: ShieldCheck },
  { label: 'Copilot', href: '/copilot', icon: Bot, badge: 'AI' },
];

interface SidebarProps {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const handleSignOut = async () => {
    setLogoutError(null);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Failed to sign out', error);
        setLogoutError('No se pudo cerrar la sesión.');
        return;
      }

      router.replace('/login');
      router.refresh();
    } catch (error) {
      console.error('Failed to sign out', error);
      setLogoutError('No se pudo cerrar la sesión.');
    }
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${
        collapsed ? 'w-20' : 'w-64'
      } h-screen sticky top-0 z-30 select-none shrink-0`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm tracking-tight">
                Nexus AI
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Workspace
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div
          className={`px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 ${
            collapsed ? 'text-center' : ''
          }`}
        >
          {collapsed ? 'â€¢â€¢â€¢' : 'Main Menu'}
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-105 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <div
          className={`flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-medium text-xs text-zinc-700 dark:text-zinc-300">
            <span>{user?.email?.slice(0, 2).toUpperCase() || 'NX'}</span>
          </div>

          {!collapsed && (
            <div className="flex flex-1 flex-col overflow-hidden text-left">
              <span className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {user?.email || 'Cuenta'}
              </span>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={handleSignOut}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              title="Sign out"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
        {logoutError && (
          <p role="alert" className="px-2 pt-2 text-xs text-red-600 dark:text-red-400">
            {logoutError}
          </p>
        )}
      </div>
    </aside>
  );
}
