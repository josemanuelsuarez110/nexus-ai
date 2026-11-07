import { MetricCard } from "@/components/dashboard/metric-card";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  AlertOctagon,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Terminal,
} from "lucide-react";

export default function SecurityPage() {
  const vulnerabilities = [
    {
      id: "CVE-2026-3819",
      package: "tar",
      currentVersion: "6.2.0",
      fixedIn: ">=6.2.1",
      severity: "medium",
      title: "Arbitrary File Overwrite via Symlink Traversal",
      status: "patch_available",
    },
    {
      id: "SEC-LEAK-04",
      package: "env-scanner",
      currentVersion: "N/A",
      fixedIn: "Remediated",
      severity: "low",
      title: "Staged .env file detected in pre-commit hook",
      status: "blocked",
    },
  ];

  const credentialsAudit = [
    { name: "Supabase Secret Key", status: "Secure", scope: "Server-side only", lastRotated: "14d ago" },
    { name: "AI Provider API Key", status: "Encrypted", scope: "Encrypted in memory", lastRotated: "30d ago" },
    { name: "FolderGit2 Client Secret", status: "Secure", scope: "OAuth Callback", lastRotated: "45d ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Security & Compliance Center
            </h1>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              Grade A+
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time vulnerability auditing, credential leak prevention, and dependency inspection.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
          <RefreshCw className="h-4 w-4" />
          <span>Rescan Dependencies</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Open Vulnerabilities"
          value="1"
          change={{ value: -66.7, timeframe: "from 3" }}
          trend="up"
          icon={AlertOctagon}
        />
        <MetricCard
          title="Secret Leaks Prevented"
          value="12"
          change={{ value: 100, timeframe: "100% blocked" }}
          trend="up"
          icon={KeyRound}
        />
        <MetricCard
          title="Protected Endpoints"
          value="100%"
          description="RLS & Auth enforced"
          icon={Lock}
        />
        <MetricCard
          title="OWASP Compliance"
          value="98.5%"
          change={{ value: 1.5, timeframe: "this cycle" }}
          trend="up"
          icon={ShieldCheck}
        />
      </div>

      {/* Vulnerability Report Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Dependency Security Advisories
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Live CVE matching from FolderGit2 Advisory & National Vulnerability Database.
            </p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
            1 Action Required
          </span>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {vulnerabilities.map((vuln) => (
            <div
              key={vuln.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                    vuln.severity === 'high'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                      : vuln.severity === 'medium'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                      : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {vuln.severity}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {vuln.title}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      ({vuln.id})
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Package: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{vuln.package}</span> â€¢ Current: {vuln.currentVersion} â€¢ Upgrade to: <span className="text-emerald-600 dark:text-emerald-400">{vuln.fixedIn}</span>
                  </p>
                </div>
              </div>

              <button className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
                <span>Apply Patch</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Credentials and Secrets Health */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Environment & Secret Encryption Audit
        </h3>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {credentialsAudit.map((cred) => (
            <div key={cred.name} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {cred.name}
                </span>
                <span className="text-zinc-400">({cred.scope})</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
                <span>Rotated {cred.lastRotated}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {cred.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
