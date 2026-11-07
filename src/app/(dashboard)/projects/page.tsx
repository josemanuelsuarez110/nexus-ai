'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Search,
  Plus,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Github,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Project {
  id: string;
  name: string;
  description: string;
  default_branch: string;
  quality_score: number;
  repository_url: string;
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setProjects(data);
        } else {
          // Datos por defecto si la tabla está vacía para demostración
          setProjects([
            {
              id: '1',
              name: 'nexus-core-api',
              description: 'High-throughput microservices for agent telemetry (Connected via Supabase)',
              default_branch: 'main',
              quality_score: 96.4,
              repository_url: 'https://github.com/jose/nexus-core-api',
            },
          ]);
        }
      } catch (err: any) {
        console.error('Error cargando proyectos:', err.message);
        setError('No se pudieron cargar los proyectos. Verifica tus credenciales de Supabase.');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projects & Repositories
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage monitored GitHub repositories, automated checks, and active branches from Supabase.
          </p>
        </div>
        <button 
          onClick={() => alert('Función para conectar repositorio con OAuth próximamente.')}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Connect Repository</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-xs text-zinc-500">Cargando proyectos desde Supabase...</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-indigo-500/50 transition-all dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {project.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                      <GitBranch className="h-3 w-3" /> {project.default_branch}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Synced
                </span>
              </div>

              <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {project.description || 'Sin descripción disponible.'}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900 text-xs">
                <div className="flex items-center gap-4 text-zinc-500">
                  <span>Quality Score: <strong className="text-zinc-900 dark:text-zinc-100">{project.quality_score}%</strong></span>
                </div>
                {project.repository_url && (
                  <a
                    href={project.repository_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium"
                  >
                    <span>View Repo</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
