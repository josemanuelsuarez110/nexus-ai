'use client';

import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Terminal,
  Copy,
  Check,
  Code2,
  RefreshCw,
  Lightbulb,
  Cpu,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'copilot';
  content: string;
  codeSnippet?: string;
  timestamp: string;
}

export default function CopilotPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'copilot',
      content:
        'Hello! I am your Nexus Copilot. I can inspect your repositories, generate test suites, audit security vulnerabilities, or write full Next.js components. How can I help you today?',
      timestamp: '10:02 AM',
    },
    {
      id: '2',
      sender: 'user',
      content: 'Can you show me an example of an asynchronous Supabase server query with proper error handling?',
      timestamp: '10:04 AM',
    },
    {
      id: '3',
      sender: 'copilot',
      content:
        'Here is a robust pattern for querying Supabase in Next.js Server Components with proper TypeScript typings and error handling:',
      codeSnippet: `import { createClient } from '@/lib/supabase/server';

export async function fetchProjectMetrics(projectId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('telemetry_events')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Failed to query telemetry events:', error.message);
    throw new Error(\`Database error: \${error.message}\`);
  }

  return data ?? [];
}`,
      timestamp: '10:04 AM',
    },
  ]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');

    // Simulated copilot reaction
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'copilot',
        content: `I analyzed your request using ${selectedModel.toUpperCase()}. I have verified your codebase context and can run this automated task for you.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const promptSuggestions = [
    'Generate unit tests for sidebar.tsx',
    'Audit dependencies for CVE vulnerabilities',
    'Write Supabase RLS policy for user data',
    'Refactor metric-card to support animations',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] space-y-4">
      {/* Copilot Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              Nexus AI Copilot
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                Online
              </span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Autonomous engineering assistant with repo-level context.
            </p>
          </div>
        </div>

        {/* Model Selector */}
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-zinc-400" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <option value="gemini-2.5">Gemini 2.5 Flash (Google)</option>
            <option value="gpt-4o">GPT-4o (OpenAI)</option>
            <option value="claude-3-5">Claude 3.5 Sonnet (Anthropic)</option>
          </select>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'copilot' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <Sparkles className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-zinc-400">
                <span className="font-semibold">
                  {msg.sender === 'user' ? 'You' : 'Nexus Copilot'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="whitespace-pre-wrap">{msg.content}</p>

              {msg.codeSnippet && (
                <div className="mt-3 relative rounded-xl border border-zinc-200 bg-zinc-900 p-3 font-mono text-[11px] text-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-[10px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Code2 className="h-3 w-3" /> TypeScript
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.codeSnippet!)}
                      className="inline-flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto">{msg.codeSnippet}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 pt-2">
        {promptSuggestions.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInputPrompt(prompt)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
          >
            <Lightbulb className="h-3 w-3 text-amber-500" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="relative">
        <input
          type="text"
          placeholder="Ask Copilot to generate code, audit security, or explain bugs..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-4 pr-12 text-xs text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
          disabled={!inputPrompt.trim()}
          aria-label="Send message"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
