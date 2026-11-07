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
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Project {
  id: string;
  name: string;
  repository: string;
  status: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('*');
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects & Repositories</h1>
          <p className="text-sm text-slate-400">Manage monitored FolderGit2 repositories and security scans.</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        {loading ? (
          <p className="text-slate-400">Loading repositories...</p>
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
                  {p.status || 'Active'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
