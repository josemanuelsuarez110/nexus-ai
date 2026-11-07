import { MetricCard } from "@/components/dashboard/metric-card";
import { ModuleCard } from "@/components/dashboard/module-card";
import {
  FolderGit2,
  Gauge,
  ShieldCheck,
  Bot,
  Activity,
  ArrowUpRight,
  GitCommit,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const recentActivities = [
    {
      id: 1,
      title: "Security audit passed for main branch",
      project: "nexus-core-api",
      time: "10 mins ago",
      status: "success",
      icon: CheckCircle2,
    },
    {
      id: 2,
      title: "Quality scan: 2 code smells detected",
      project: "nexus-web-frontend",
      time: "35 mins ago",
      status: "warning",
      icon: AlertTriangle,
    },
    {
      id: 3,
      title: "Copilot auto-generated 14 unit tests",
      project: "auth-service",
      time: "2 hours ago",
      status: "success",
      icon: Bot,
    },
    {
      id: 4,
      title: "Automated vulnerability remediation deployed",
      project: "data-pipeline",
      time: "5 hours ago",
      status: "info",
      icon: GitCommit,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            System Overview
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time telemetry, codebase health, and autonomous agent metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/copilot"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <Bot className="h-4 w-4" />
            <span>Launch Copilot</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Monitored Projects"
          value="18"
          change={{ value: 12.5, timeframe: "this month" }}
          trend="up"
          icon={FolderGit2}
        />
        <MetricCard
          title="Overall Quality Score"
          value="94.2%"
          change={{ value: 3.8, timeframe: "vs last sprint" }}
          trend="up"
          icon={Gauge}
        />
        <MetricCard
          title="Security Vulnerabilities"
          value="0"
          change={{ value: -100, timeframe: "resolved" }}
          trend="up"
          icon={ShieldCheck}
        />
        <MetricCard
          title="AI Copilot Assists"
          value="3,420"
          change={{ value: 24.6, timeframe: "last 30d" }}
          trend="up"
          icon={Bot}
        />
      </div>

      {/* Core Platform Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Platform Modules
          </h2>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            4 modules active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ModuleCard
            title="Projects"
            description="Manage connected FolderGit2 repositories, branches, and deployment pipelines."
            icon={FolderGit2}
            status="active"
            href="/projects"
            ctaText="View Projects"
          />
          <ModuleCard
            title="Code Quality"
            description="Continuous static analysis, test coverage tracking, and technical debt monitoring."
            icon={Gauge}
            status="active"
            href="/quality"
            ctaText="Analyze Quality"
          />
          <ModuleCard
            title="Security Audit"
            description="CVE vulnerability detection, secret leak prevention, and dependency scans."
            icon={ShieldCheck}
            status="active"
            href="/security"
            ctaText="View Audits"
          />
          <ModuleCard
            title="Nexus Copilot"
            description="AI-driven code generation, automated PR reviews, and smart refactoring."
            icon={Bot}
            status="active"
            badge="GPT-4o / Gemini"
            href="/copilot"
            ctaText="Open Assistant"
          />
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Live Pipeline Feed
            </h3>
          </div>
          <span className="text-xs text-zinc-400 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Auto-updates
          </span>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {recentActivities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                className="flex items-center justify-between py-3.5 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/30 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      act.status === "success"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : act.status === "warning"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                        : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200">
                      {act.title}
                    </p>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {act.project}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-zinc-400">{act.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
