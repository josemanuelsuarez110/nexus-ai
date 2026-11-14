'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import {
  AlertCircle,
  Code,
  ExternalLink,
  FolderGit2,
  GitFork,
  Loader2,
  Search,
  Star,
} from 'lucide-react';

const repositorySchema = z.object({
  fullName: z.string(),
  description: z.string().nullable(),
  htmlUrl: z.string().url(),
  stars: z.number(),
  forks: z.number(),
  openIssues: z.number(),
  language: z.string().nullable(),
});

type Repository = z.infer<typeof repositorySchema>;

function normalizeRepository(input: string) {
  const value = input.trim();
  if (value.startsWith('http://') || value.startsWith('https://')) {
    const url = new URL(value);
    if (url.hostname !== 'github.com') {
      throw new Error('Introduce un repositorio de github.com.');
    }

    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 2) {
      throw new Error('Usa el formato owner/repo.');
    }
    return parts.join('/');
  }

  return value;
}

export default function GithubInspector() {
  const [repoInput, setRepoInput] = useState('');
  const [repoData, setRepoData] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setRepoData(null);

    try {
      const repo = normalizeRepository(repoInput);
      const response = await fetch(`/api/github?repo=${encodeURIComponent(repo)}`);
      const body: unknown = await response.json();

      if (!response.ok) {
        const apiError =
          typeof body === 'object' && body !== null && 'error' in body &&
          typeof body.error === 'string'
            ? body.error
            : 'No se pudo consultar el repositorio.';
        throw new Error(apiError);
      }

      const parsed = repositorySchema.safeParse(body);
      if (!parsed.success) {
        throw new Error('GitHub devolvió una respuesta inesperada.');
      }

      setRepoData(parsed.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al consultar el repositorio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <FolderGit2 className="h-5 w-5" />
          <span>Inspeccionar repositorio de GitHub</span>
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Consulta métricas públicas; los repositorios privados requieren integración OAuth.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            required
            maxLength={300}
            placeholder="ej. vercel/next.js"
            value={repoInput}
            onChange={(event) => setRepoInput(event.target.value)}
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
        <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
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
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <Metric icon={<Star className="h-3 w-3 text-amber-500" />} label="Estrellas" value={repoData.stars} />
            <Metric icon={<GitFork className="h-3 w-3 text-indigo-500" />} label="Forks" value={repoData.forks} />
            <Metric icon={<Code className="h-3 w-3 text-emerald-500" />} label="Lenguaje" value={repoData.language || 'N/D'} />
            <Metric icon={<AlertCircle className="h-3 w-3 text-rose-500" />} label="Issues abiertos" value={repoData.openIssues} />
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg bg-white p-3 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="text-[11px] text-zinc-500 flex items-center gap-1">
        {icon} {label}
      </span>
      <strong className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1 block">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </strong>
    </div>
  );
}
