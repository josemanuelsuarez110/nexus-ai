import { MetricCard } from "@/components/dashboard/metric-card";
import {
  Gauge,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Sparkles,
  Zap,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function QualityPage() {
  const qualityIssues = [
    {
      id: "Q-101",
      severity: "major",
      file: "src/lib/agents/orchestrator.ts",
      line: 142,
      rule: "Cognitive complexity exceeds threshold (18 > 15)",
      effort: "15 mins",
    },
    {
      id: "Q-102",
      severity: "minor",
      file: "src/components/layout/sidebar.tsx",
      line: 38,
      rule: "Redundant conditional rendering pattern",
      effort: "5 mins",
    },
    {
      id: "Q-103",
      severity: "info",
      file: "src/api/telemetry/route.ts",
      line: 88,
      rule: "Missing explicit return type on exported handler",
      effort: "2 mins",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Code Quality & Reliability
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Automated static analysis, cyclomatic complexity audits, and technical debt metrics.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
          <Zap className="h-4 w-4" />
          <span>Run Full Quality Scan</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Quality Score"
          value="94.2%"
          change={{ value: 2.1, timeframe: "last week" }}
          trend="up"
          icon={Gauge}
        />
        <MetricCard
          title="Test Coverage"
          value="89.5%"
          change={{ value: 4.8, timeframe: "vs target 85%" }}
          trend="up"
          icon={CheckCircle2}
        />
        <MetricCard
          title="Code Duplication"
          value="1.4%"
          change={{ value: -0.6, timeframe: "refactored" }}
          trend="up"
          icon={TrendingUp}
        />
        <MetricCard
          title="Technical Debt"
          value="3h 20m"
          change={{ value: -45, timeframe: "minutes saved" }}
          trend="up"
          icon={AlertTriangle}
        />
      </div>

      {/* Test Suites Summary */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Test Suite Breakdown
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Unit Tests (248/248 passed)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100%</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Integration Tests (64/68 passed)</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">94.1%</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '94.1%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">End-to-End E2E (18/20 passed)</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">90.0%</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Code Smells & Issues Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Detected Code Smells & Refactoring Candidates
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Priority issues analyzed across all active pull requests.
            </p>
          </div>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            3 issues
          </span>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {qualityIssues.map((issue) => (
            <div
              key={issue.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    issue.severity === 'major'
                      ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                      : issue.severity === 'minor'
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                      : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {issue.severity}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {issue.rule}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                    <FileCode className="h-3 w-3" />
                    <span>
                      {issue.file}:{issue.line}
                    </span>
                    <span>â€¢ Est. fix: {issue.effort}</span>
                  </div>
                </div>
              </div>

              <button className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800/40 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Auto-fix with Copilot</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
