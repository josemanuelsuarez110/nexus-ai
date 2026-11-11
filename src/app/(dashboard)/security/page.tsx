import { Lock, ShieldCheck } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/metric-card';

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Security Center
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Esta aplicación aún no está conectada a un escáner de seguridad.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Open Vulnerabilities" value="—" description="No scan configured" icon={ShieldCheck} />
        <MetricCard title="Secret Scans" value="—" description="No scanner connected" icon={Lock} />
        <MetricCard title="Protected Endpoints" value="—" description="Review deployment configuration" icon={Lock} />
        <MetricCard title="Compliance" value="—" description="Not assessed" icon={ShieldCheck} />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Security scan results
        </h2>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          No se han ejecutado escaneos. No interpretes la ausencia de resultados como una auditoría limpia.
        </p>
      </section>
    </div>
  );
}
