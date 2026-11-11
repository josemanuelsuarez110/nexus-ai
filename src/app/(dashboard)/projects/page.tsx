'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FolderGit2, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import GithubInspector from './GithubInspector';

interface Project {
  id: string;
  name: string;
  repository: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [repository, setRepository] = useState('');
  const [saving, setSaving] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;

    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, name, repository, created_at')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Failed to load projects', error);
          if (active) setError('No se pudieron cargar los proyectos. Revisa la configuración de Supabase.');
          return;
        }

        if (active) setProjects(data ?? []);
      } catch (error) {
        console.error('Failed to load projects', error);
        if (active) setError('No se pudieron cargar los proyectos. Inténtalo más tarde.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchProjects();
    return () => {
      active = false;
    };
  }, [supabase]);

  const handleCreateProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const name = projectName.trim();
    const repo = repository.trim();
    if (!name || name.length > 120 || !/^[A-Za-z0-9_.-]{1,39}\/[A-Za-z0-9_.-]{1,100}$/.test(repo)) {
      setError('Introduce un nombre (máximo 120 caracteres) y un repositorio en formato owner/repo.');
      return;
    }

    setSaving(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        if (authError) console.error('Failed to verify project owner', authError);
        setError('Tu sesión ha caducado. Inicia sesión de nuevo.');
        return;
      }

      const { data, error: insertError } = await supabase
        .from('projects')
        .insert({ name, repository: repo, user_id: user.id })
        .select('id, name, repository, created_at')
        .single();

      if (insertError) {
        console.error('Failed to create project', insertError);
        setError(
          insertError.code === '23505'
            ? 'Este repositorio ya está guardado en tu cuenta.'
            : 'No se pudo guardar el proyecto. Revisa la migración y las políticas RLS de Supabase.'
        );
        return;
      }

      setProjects((current) => [data, ...current]);
      setProjectName('');
      setRepository('');
    } catch (error) {
      console.error('Failed to create project', error);
      setError('No se pudo guardar el proyecto. Inténtalo más tarde.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects & Repositories</h1>
          <p className="text-sm text-slate-400">Guarda tus repositorios; los escaneos de seguridad aún no están configurados.</p>
        </div>
      </div>
      <GithubInspector />
      <form onSubmit={handleCreateProject} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5 sm:grid-cols-[1fr_1fr_auto]">
        <label className="text-xs text-slate-300">
          Nombre del proyecto
          <input
            required
            maxLength={120}
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="text-xs text-slate-300">
          Repositorio (owner/repo)
          <input
            required
            maxLength={200}
            value={repository}
            onChange={(event) => setRepository(event.target.value)}
            placeholder="vercel/next.js"
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 self-end rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
      </form>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        {loading ? (
          <p className="text-slate-400">Loading repositories...</p>
        ) : error ? (
          <p role="alert" className="mb-4 text-red-400">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-slate-400">No projects found in database.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center space-x-3">
                  <FolderGit2 className="w-6 h-6 text-indigo-400" />
                  <div>
                    <h3 className="text-white font-medium">{p.name}</h3>
                    <p className="text-xs text-slate-400">{p.repository}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                  Guardado
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
