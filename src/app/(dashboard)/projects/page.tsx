'use client';

import React, { useState } from 'react';
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
  Filter,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  branch: string;
  coverage: number;
  securityStatus: 'clean' | 'warning' | 'alert';
  lastScan: string;
  status: 'active' | 'in_review' | 'synced';
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'nexus-core-api',
    description: 'High-throughput Rust & TypeScript microservices for agent telemetry.',
    language: 'TypeScript',
    branch: 'main',
    coverage: 96.4,
    securityStatus: 'clean',
    lastScan: '12m ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'nexus-web-frontend',
    description: 'Next.js 16 app router workspace with real-time WebSocket dashboard.',
    language: 'React / Next.js',
    branch: 'release/v2.1',
    coverage: 88.2,
    securityStatus: 'clean',
    lastScan: '45m ago',
    status: 'synced',
  },
  {
    id: '3',
    name: 'supabase-vector-sync',
    description: 'Background worker syncing pgvector knowledge graphs with Supabase.',
    language: 'Python',
    branch: 'feat/pgvector-hnsw',
    coverage: 74.0,
    securityStatus: 'warning',
    lastScan: '2h ago',
    status: 'in_review',
  },
  {
    id: '4',
    name: 'copilot-agent-runtime',
    description: 'Autonomous multi-agent execution environment with sandbox isolation.',
    language: 'TypeScript',
    branch: 'main',
    coverage: 92.8,
    securityStatus: 'clean',
    lastScan: '3h ago',
    status: 'active',
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'warning'>('all');

  const filteredProjects = mockProjects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'active') return matchesSearch && p.status === 'active';
    if (activeTab === 'warning') return matchesSearch && p.securityStatus !== 'clean';
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projects & Repositories
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage monitored GitHub repositories, automated checks, and active branches.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
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

        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            All ({mockProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Active (2)
          </button>
          <button
            onClick={() => setActiveTab('warning')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              activeTab === 'warning'
                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Needs Attention (1)
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      {project.name}
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {project.language}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <GitBranch className="h-3 w-3 text-zinc-400" />
                  <span>{project.branch}</span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {project.description}
              </p>
            </div>

            <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-900 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-zinc-400 text-[11px] block">Test Coverage</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {project.coverage}%
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 text-[11px] block">Security</span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      project.securityStatus === 'clean'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {project.securityStatus === 'clean' ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    {project.securityStatus === 'clean' ? 'Passed' : '1 Advisory'}
                  </span>
                </div>
              </div>

              <span className="text-zinc-400 text-[11px]">Scan: {project.lastScan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
