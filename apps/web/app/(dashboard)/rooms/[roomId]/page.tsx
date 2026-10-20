'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { useVibeHubStore } from '@/lib/store';

export default function RoomCollabPage() {
  const params = useParams();
  const roomId = (params?.roomId as string) || '409';

  const {
    activeProject,
    setActiveProject,
    tunnelUrl,
    setTunnelUrl,
    gitBranch,
    recentGitCommits,
    devA,
    syncWithSystemTelemetry,
    initFirestoreLiveListener,
  } = useVibeHubStore();

  useEffect(() => {
    syncWithSystemTelemetry();
    const unsub = initFirestoreLiveListener(roomId);
    const interval = setInterval(() => {
      syncWithSystemTelemetry();
    }, 10000);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [roomId, syncWithSystemTelemetry, initFirestoreLiveListener]);

  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'diff' | 'files' | 'commits' | 'console'>('diff');
  const [urlInput, setUrlInput] = useState(tunnelUrl);
  const [urlCopied, setUrlCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${urlInput}`);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <Shell>
      <div className="flex flex-col w-full pb-16">
        {/* Workspace Control Matrix */}
        <section className="w-full bg-white/70 backdrop-blur-2xl border-b border-black/[0.06] px-6 py-2.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative z-30">
          <div className="flex flex-wrap items-center gap-3">
            {/* Room Switcher Pill */}
            <div className="flex items-center gap-1.5 bg-black/[0.04] border border-black/[0.04] px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
              <span className="sf-mono text-[10px] text-outline uppercase tracking-wider font-semibold">
                ROOM
              </span>
              <span className="sf-title-sm text-xs font-semibold text-on-surface">
                #{roomId}: Antigravity Core
              </span>
            </div>

            {/* Project Selector Pill */}
            <div className="flex items-center bg-black/[0.04] p-0.5 rounded-lg border border-black/[0.04]">
              <button
                onClick={() => setActiveProject('apps/web')}
                className={`px-3 py-1 rounded-md sf-mono text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeProject === 'apps/web'
                    ? 'bg-white text-apple-blue shadow-sm'
                    : 'text-outline hover:text-on-surface'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">language</span>
                <span>apps/web</span>
                <span className="sf-mono text-[10px] text-on-surface-variant bg-black/[0.04] px-1 rounded">
                  Next.js 15
                </span>
              </button>
              <button
                onClick={() => setActiveProject('apps/bridge')}
                className={`px-3 py-1 rounded-md sf-mono text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeProject === 'apps/bridge'
                    ? 'bg-white text-apple-blue shadow-sm'
                    : 'text-outline hover:text-on-surface'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">hub</span>
                <span>apps/bridge</span>
                <span className="sf-mono text-[10px] text-outline px-1 rounded">Node.js 22</span>
              </button>
            </div>

            {/* Observability Level Chip */}
            <div className="hidden 2xl:flex items-center gap-1 sf-mono text-[11px] bg-sky-50 border border-sky-200/50 px-2.5 py-1 rounded-lg">
              <span className="text-sky-700/70 uppercase font-semibold">ENGINE:</span>
              <span className="text-apple-blue font-bold tracking-wide">[L4:KERNEL_TUNNEL]</span>
            </div>
          </div>

          {/* Central Interactive Tunnel URL Bar */}
          <div className="flex-1 max-w-2xl mx-auto w-full px-2">
            <div className="glass-capsule hover:bg-white focus-within:bg-white rounded-xl flex items-center px-3 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition focus-within:ring-2 focus-within:ring-apple-blue/20">
              <div className="flex items-center gap-1 text-apple-green pr-1.5">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span className="sf-mono text-[10px] tracking-widest text-[#006e28] font-bold">mTLS</span>
              </div>
              <span className="text-outline/70 sf-mono text-xs select-none">https://</span>
              <input
                aria-label="Secure Tunnel URL"
                className="bg-transparent border-none outline-none sf-mono text-xs text-on-surface flex-1 px-1 focus:ring-0 placeholder:text-outline font-medium"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setTunnelUrl(e.target.value);
                }}
              />
              <div className="flex items-center gap-1 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-apple-green" />
                <span className="sf-mono text-[10px] text-outline font-medium">HTTP/2</span>
                <button
                  onClick={handleCopyUrl}
                  className="p-1 rounded text-outline hover:text-apple-blue hover:bg-black/[0.04] transition"
                  title="Copy tunnel path"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {urlCopied ? 'check' : 'content_copy'}
                  </span>
                </button>
                <button
                  onClick={handleRefresh}
                  className={`p-1 rounded text-outline hover:text-apple-blue hover:bg-black/[0.04] transition ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                  title="Reload preview"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">refresh</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Split Workspace: Live Preview vs Code & Git Diffs */}
        <div className="px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Live Preview Viewport (Spans 7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="glass-window rounded-2xl p-4 flex flex-col gap-3 shadow-window">
              {/* Preview Window Header & Viewport Toggles */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  {/* macOS Window Controls */}
                  <div className="flex items-center gap-1.5 pr-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  </div>
                  <span className="sf-title-sm text-xs font-semibold text-on-surface">
                    Live Application Viewport
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/60 sf-mono text-[10px] font-bold">
                    ONLINE (200 OK)
                  </span>
                </div>

                {/* Viewport Toggles (Desktop, Tablet, Mobile) */}
                <div className="flex items-center bg-black/[0.04] p-0.5 rounded-lg border border-black/[0.04]">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`p-1.5 rounded-md transition ${
                      viewportMode === 'desktop' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                    }`}
                    title="Desktop (100%)"
                  >
                    <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                  </button>
                  <button
                    onClick={() => setViewportMode('tablet')}
                    className={`p-1.5 rounded-md transition ${
                      viewportMode === 'tablet' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                    }`}
                    title="Tablet (768px)"
                  >
                    <span className="material-symbols-outlined text-[16px]">tablet_mac</span>
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`p-1.5 rounded-md transition ${
                      viewportMode === 'mobile' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                    }`}
                    title="Mobile (375px)"
                  >
                    <span className="material-symbols-outlined text-[16px]">smartphone</span>
                  </button>
                </div>
              </div>

              {/* Viewport Container Frame */}
              <div
                className={`w-full min-h-[560px] bg-white rounded-xl border border-black/[0.08] shadow-inner overflow-hidden flex flex-col transition-all duration-300 mx-auto ${
                  viewportMode === 'desktop'
                    ? 'max-w-full'
                    : viewportMode === 'tablet'
                    ? 'max-w-[768px]'
                    : 'max-w-[375px]'
                }`}
              >
                {/* Simulated Web App Bar */}
                <div className="h-9 bg-slate-50 border-b border-black/[0.06] px-3 flex items-center justify-between text-xs text-outline sf-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-apple-green" />
                    <span>localhost:3000/dashboard</span>
                  </div>
                  <span className="text-[10px]">Render Time: 4ms</span>
                </div>

                {/* App Content Preview */}
                <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50/60">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-on-surface">
                          VibeHub Live Service
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          Active tunnel listening on Node process PID 8412
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-apple-blue border border-blue-200 text-xs font-semibold">
                        v0.1.0 Ready
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="p-3 rounded-lg bg-slate-50 border border-black/[0.05]">
                        <span className="text-[10px] sf-mono text-outline uppercase font-semibold">
                          WebSocket State
                        </span>
                        <div className="text-sm font-bold text-emerald-700 mt-1">CONNECTED</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-black/[0.05]">
                        <span className="text-[10px] sf-mono text-outline uppercase font-semibold">
                          Active Sessions
                        </span>
                        <div className="text-sm font-bold text-apple-blue mt-1">2 Peers Paired</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1 mt-4 shadow-sm">
                      <div className="text-slate-400">// LIVE OUTPUT STREAM FROM PREVIEW SERVICE:</div>
                      <div className="text-emerald-400">[info] Fast Refresh complete in 128ms.</div>
                      <div className="text-sky-300">[route] GET /api/v1/telemetry/stats 200 OK</div>
                      <div className="text-slate-300">[sync] Firestore snapshot delivered in 14ms.</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-outline sf-mono">
                    <span>VibeHub Local-First Tunnel</span>
                    <span>No external ingress exposed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Code & Git Diffs / Inspector (Spans 5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="glass-card rounded-2xl p-4 flex flex-col gap-3 shadow-glass">
              {/* Tab Navigation Header */}
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <div className="flex items-center gap-1">
                  {(['diff', 'files', 'commits', 'console'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        activeTab === tab
                          ? 'bg-[#0071E3] text-white shadow-xs'
                          : 'text-on-surface-variant hover:bg-black/[0.04]'
                      }`}
                    >
                      {tab === 'diff'
                        ? 'Git Diff'
                        : tab === 'files'
                        ? 'Files (3)'
                        : tab === 'commits'
                        ? 'Commits'
                        : 'Console Tail'}
                    </button>
                  ))}
                </div>

                <span className="sf-mono text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded font-bold">
                  +48 -12 LOC
                </span>
              </div>

              {/* Tab Content 1: Git Diff */}
              {activeTab === 'diff' && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs sf-mono text-outline">
                    <span>{devA.activeFile || 'apps/web/app/rooms/[roomId]/page.tsx'}</span>
                    <span className="text-apple-blue font-semibold">branch: {gitBranch}</span>
                  </div>

                  <div className="bg-white/95 border border-black/[0.06] rounded-xl p-3 font-mono-code text-[11px] text-[#3A3A3C] overflow-x-auto space-y-1 shadow-xs max-h-[460px]">
                    <div className="text-slate-400">@@ -102,9 +102,15 @@ active working diff @@</div>
                    {devA.diffSnippet && devA.diffSnippet.length > 0 ? (
                      devA.diffSnippet.map((line, idx) => (
                        <div
                          key={idx}
                          className={
                            line.type === '+'
                              ? 'text-emerald-700 font-medium'
                              : line.type === '-'
                              ? 'text-[#FF3B30] font-medium'
                              : 'text-[#3A3A3C]'
                          }
                        >
                          <span className="text-[#8E8E93] select-none pr-2">{line.line}</span>
                          {line.type} {line.text}
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500">Working tree clean. No uncommitted diffs.</div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content 2: Files Changed */}
              {activeTab === 'files' && (
                <div className="flex flex-col gap-2 sf-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-apple-blue text-[16px]">code</span>
                      <span className="font-semibold text-on-surface">apps/web/tailwind.config.ts</span>
                    </div>
                    <span className="text-emerald-700 font-bold">+62 -14</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-apple-blue text-[16px]">css</span>
                      <span className="font-semibold text-on-surface">apps/web/app/globals.css</span>
                    </div>
                    <span className="text-emerald-700 font-bold">+140 -20</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-apple-blue text-[16px]">integration_instructions</span>
                      <span className="font-semibold text-on-surface">apps/web/lib/store.ts</span>
                    </div>
                    <span className="text-emerald-700 font-bold">+184 -0</span>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Commits */}
              {activeTab === 'commits' && (
                <div className="flex flex-col gap-2 sf-mono text-xs">
                  {recentGitCommits && recentGitCommits.length > 0 ? (
                    recentGitCommits.map((c) => (
                      <div key={c.hash} className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-apple-blue font-bold">{c.hash}</span>
                          <span className="text-outline">{c.date}</span>
                        </div>
                        <div className="font-medium text-on-surface">{c.message}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-outline text-xs">Brak ostatnich commitów w repozytorium</div>
                  )}
                </div>
              )}

              {/* Tab Content 4: Console Tail */}
              {activeTab === 'console' && (
                <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-[11px] space-y-1 max-h-[300px] overflow-y-auto">
                  <div className="text-slate-400">// BRIDGE SYSTEM DAEMON LOGS:</div>
                  <div className="text-emerald-400">[0.8ms] Heartbeat sent to /api/v1/bridge/heartbeat (HTTP 200)</div>
                  <div className="text-sky-300">[1.2ms] Watcher detected file change: apps/web/app/globals.css</div>
                  <div className="text-slate-300">[2.4ms] Redaction engine verified 0 secrets in diff payload.</div>
                  <div className="text-emerald-400">[3.1ms] Event batch accepted: 1 event written to Firestore.</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] text-xs">
                <span className="sf-mono text-outline">Author: @Ty (MacBook Pro)</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('Patch skopiowany do schowka!')}
                    className="apple-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-on-surface font-semibold sf-mono text-xs"
                  >
                    Copy Patch
                  </button>
                  <button
                    onClick={() => alert('Wymuszono synchronizację ze stacją zdalną!')}
                    className="apple-btn px-3 py-1.5 rounded-lg bg-apple-blue text-white font-semibold sf-mono text-xs shadow-xs"
                  >
                    Sync Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
