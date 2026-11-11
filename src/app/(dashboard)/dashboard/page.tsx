import { MetricCard } from '@/components/dashboard/metric-card';
import { ModuleCard } from '@/components/dashboard/module-card';
import { Bot, FolderGit2, Gauge, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          System Overview
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Conecta tus repositorios y análisis para ver métricas verificables.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Monitored Projects" value="—" description="No data available" icon={FolderGit2} />
        <MetricCard title="Quality Score" value="—" description="No analysis connected" icon={Gauge} />
        <MetricCard title="Security Findings" value="—" description="No scan configured" icon={ShieldCheck} />
        <MetricCard title="Copilot Assists" value="—" description="AI provider not configured" icon={Bot} />
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Platform Modules
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Solo la inspección de repositorios públicos está conectada actualmente.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ModuleCard
            title="Projects"
            description="Consulta los repositorios guardados y explora métricas públicas de GitHub."
            icon={FolderGit2}
            status="active"
            href="/projects"
            ctaText="View Projects"
          />
          <ModuleCard
            title="Code Quality"
            description="Los análisis de calidad aún no están conectados."
            icon={Gauge}
            status="inactive"
            href="/quality"
            ctaText="Not configured"
          />
          <ModuleCard
            title="Security Audit"
            description="No se ejecutan escaneos de vulnerabilidades ni secretos todavía."
            icon={ShieldCheck}
            status="inactive"
            href="/security"
            ctaText="Not configured"
          />
          <ModuleCard
            title="Nexus Copilot"
            description="Configura un proveedor de IA antes de habilitar el asistente."
            icon={Bot}
            status="inactive"
            href="/copilot"
            ctaText="Not configured"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Recent Activity
        </h2>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          No hay actividad registrada. Los análisis aparecerán aquí cuando se conecten sus integraciones.
        </p>
      </section>
    </div>
  );
}
