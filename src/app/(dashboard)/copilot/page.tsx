import { Bot, Sparkles } from 'lucide-react';

export default function CopilotPage() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Nexus Copilot
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Asistente de análisis de código
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
        <Bot className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm">
          El servicio no está habilitado: todavía no hay un proveedor de IA configurado.
          No se procesan ni se envían mensajes.
        </p>
      </div>
    </section>
  );
}
