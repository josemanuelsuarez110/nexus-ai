'use client';

import React, { useState } from 'react';
import { FolderGit2, Search, Star, GitFork, AlertCircle, Code, Calendar, ExternalLink, Loader2 } from 'lucide-react';

export default function ShieldInspector() {
  const [repoInput, setRepoInput] = useState('');
  const [repoData, setRepoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoInput.trim()) return;

    setLoading(true);
    setError(null);
    setRepoData(null);

    try {
      // Limpiar formato si el usuario pasa la URL completa
      let cleanRepo = repoInput.trim();
      if (cleanRepo.includes('FolderGit2.com/')) {
        const parts = cleanRepo.split('FolderGit2.com/');
        cleanRepo = parts[1].replace(/\/$/, '');
      }

      const res = await fetch(`/api/FolderGit2?repo=${encodeURIComponent(cleanRepo)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'No se pudo obtener la información del repositorio.');
      }

      setRepoData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <FolderGit2 className="h-5 w-5" />
          <span>Inspector de Repositorios en Vivo (FolderGit2 API)</span>
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Consulta métricas públicas en tiempo real de cualquier repositorio de código abierto en FolderGit2.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="ej. vercel/next.js o facebook/react"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !repoInput.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>Inspeccionar</span>
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {repoData && (
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-5 space-y-4 dark:border-zinc-900 dark:bg-zinc-900/50">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {repoData.fullName}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {repoData.description || 'Sin descripción disponible.'}
              </p>
            </div>
            <a
              href={repoData.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <span>FolderGit2</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="rounded-lg bg-white p-3 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1"><Star className="h-3 w-3 text-amber-500" /> Estrellas</span>
              <strong className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1 block">{repoData.stars.toLocaleString()}</strong>
            </div>
            <div className="rounded-lg bg-white p-3 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1"><GitFork className="h-3 w-3 text-indigo-500" /> Forks</span>
              <strong className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1 block">{repoData.forks.toLocaleString()}</strong>
            </div>
            <div className="rounded-lg bg-white p-3 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1"><Code className="h-3 w-3 text-emerald-500" /> Lenguaje</span>
              <strong className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1 block">{repoData.language || 'N/D'}</strong>
            </div>
            <div className="rounded-lg bg-white p-3 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1"><AlertCircle className="h-3 w-3 text-rose-500" /> Issues Abiertos</span>
              <strong className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1 block">{repoData.openIssues.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
