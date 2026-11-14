import { FileCode2, Gauge } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/metric-card';

export default function QualityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Code Quality & Reliability
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Los resultados se mostrarán cuando se integre un analizador de calidad.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Quality Score" value="—" description="Not analyzed" icon={Gauge} />
        <MetricCard title="Test Coverage" value="—" description="No test report connected" icon={FileCode2} />
        <MetricCard title="Code Duplication" value="—" description="Not analyzed" icon={FileCode2} />
        <MetricCard title="Technical Debt" value="—" description="Not analyzed" icon={Gauge} />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Analysis results
        </h2>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          No hay resultados disponibles. Esta aplicación todavía no ejecuta análisis estáticos ni pruebas.
        </p>
      </section>
    </div>
  );
}
