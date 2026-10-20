'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useVibeHubStore, LiveAgentSession } from '@/lib/store';
import { AgentConnectionModal } from '@/components/bridge/AgentConnectionModal';

export default function RoomCollabView({ initialRoomId }: { initialRoomId?: string }) {
  const params = useParams();
  const roomId = initialRoomId || (params?.roomId as string) || 'viberhub-8842f';

  const {
    activeProject,
    setActiveProject,
    tunnelUrl,
    setTunnelUrl,
    gitBranch,
    recentGitCommits,
    activeAgents,
    events,
    connectedDevice,
    activeBridgesCount,
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
  const [previewTab, setPreviewTab] = useState<'observer' | 'web'>('observer');
  const [urlInput, setUrlInput] = useState(tunnelUrl);
  const [urlCopied, setUrlCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  // Znajdź wybranego agenta lub domyślnie pierwszego aktywnego
  const currentAgent: LiveAgentSession | null =
    activeAgents.find((a) => a.id === selectedAgentId) || activeAgents[0] || null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${urlInput}`);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    syncWithSystemTelemetry();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Workspace Control Matrix */}
      <section className="w-full bg-white/75 backdrop-blur-2xl border-b border-black/[0.06] px-6 py-2.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative z-30">
        <div className="flex flex-wrap items-center gap-3">
          {/* Room Switcher Pill */}
          <div className="flex items-center gap-1.5 bg-black/[0.04] border border-black/[0.04] px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
            <span className="sf-mono text-[10px] text-outline uppercase tracking-wider font-semibold">
              ROOM
            </span>
            <span className="sf-title-sm text-xs font-semibold text-on-surface">
              #{roomId}
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

          {/* Station Status Chip */}
          <div className="flex items-center gap-1.5 sf-mono text-[11px] bg-slate-100/80 border border-black/[0.05] px-2.5 py-1 rounded-lg text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-apple-blue">computer</span>
            <span>
              {connectedDevice?.hostname ? connectedDevice.hostname : 'Lokalna stacja'}
            </span>
            <span className="text-[10px] text-outline">
              ({activeBridgesCount > 0 ? `${activeBridgesCount} aktywne bridge` : 'oczekiwanie na bridge'})
            </span>
          </div>
        </div>

        {/* Central Action Bar: AI Connect & Tunnel URL */}
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            <span>🤖 Podłącz AI / Kopiuj Prompt</span>
          </button>

          <div className="glass-capsule hover:bg-white focus-within:bg-white rounded-xl flex items-center px-3 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition focus-within:ring-2 focus-within:ring-apple-blue/20 flex-1 xl:w-72">
            <div className="flex items-center gap-1 text-apple-green pr-1.5">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="sf-mono text-[10px] tracking-widest text-[#006e28] font-bold">mTLS</span>
            </div>
            <span className="text-outline/70 sf-mono text-xs select-none">https://</span>
            <input
              aria-label="Secure Tunnel URL"
              className="bg-transparent border-none outline-none sf-mono text-xs text-on-surface flex-1 px-1 focus:ring-0 placeholder:text-outline font-medium w-full"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setTunnelUrl(e.target.value);
              }}
            />
            <div className="flex items-center gap-1 pl-1">
              <button
                onClick={handleCopyUrl}
                className="p-1 rounded text-outline hover:text-apple-blue hover:bg-black/[0.04] transition cursor-pointer"
                title="Kopiuj adres"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {urlCopied ? 'check' : 'content_copy'}
                </span>
              </button>
              <button
                onClick={handleRefresh}
                className={`p-1 rounded text-outline hover:text-apple-blue hover:bg-black/[0.04] transition cursor-pointer ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
                title="Odśwież telemetrię"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">refresh</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Agent Selector Banner (if active agents present) */}
      {activeAgents && activeAgents.length > 0 && (
        <div className="bg-blue-50/70 border-b border-blue-200/50 px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-semibold text-blue-900 sf-mono uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
              Aktywni Agenci ({activeAgents.length}):
            </span>
            {activeAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`px-3 py-1 rounded-lg text-xs sf-mono font-medium flex items-center gap-2 transition ${
                  (currentAgent?.id === agent.id)
                    ? 'bg-white text-apple-blue shadow-xs border border-blue-200'
                    : 'bg-white/50 text-slate-700 hover:bg-white'
                }`}
                type="button"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{agent.name}</span>
                <span className="text-[10px] text-outline font-normal">
                  [{agent.provider}]
                </span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-blue-800 sf-mono">
            <span>Model: {currentAgent?.model || 'Coding AI'}</span>
            <span>•</span>
            <span>Narzędzie: <strong className="text-apple-blue">{currentAgent?.currentTool || 'brak'}</strong></span>
          </div>
        </div>
      )}

      {/* Dual Split Workspace: Live Preview vs Code & Git Diffs */}
      <div className="px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Live Preview & Cluster Observer (Spans 7 cols on desktop) */}
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
                {/* Toggle Observer vs Web Preview */}
                <div className="flex items-center bg-black/[0.04] p-0.5 rounded-lg border border-black/[0.04]">
                  <button
                    onClick={() => setPreviewTab('observer')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      previewTab === 'observer' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                    }`}
                    type="button"
                  >
                    Obserwator Agenta
                  </button>
                  <button
                    onClick={() => setPreviewTab('web')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      previewTab === 'web' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                    }`}
                    type="button"
                  >
                    Podgląd Aplikacji
                  </button>
                </div>
              </div>

              {/* Viewport Toggles (Desktop, Tablet, Mobile) */}
              <div className="flex items-center bg-black/[0.04] p-0.5 rounded-lg border border-black/[0.04]">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`p-1.5 rounded-md transition cursor-pointer ${
                    viewportMode === 'desktop' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                  }`}
                  title="Desktop (100%)"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`p-1.5 rounded-md transition cursor-pointer ${
                    viewportMode === 'tablet' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                  }`}
                  title="Tablet (768px)"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">tablet_mac</span>
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`p-1.5 rounded-md transition cursor-pointer ${
                    viewportMode === 'mobile' ? 'bg-white text-apple-blue shadow-xs' : 'text-outline'
                  }`}
                  title="Mobile (375px)"
                  type="button"
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
              {previewTab === 'observer' ? (
                /* LIVE AGENT OBSERVER VIEW */
                <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50/70">
                  <div className="flex flex-col gap-4">
                    {/* Agent Header Card */}
                    {currentAgent ? (
                      <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                              <span className="material-symbols-outlined text-[20px]">psychology</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm text-[#1C1C1E]">{currentAgent.name}</h3>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase">
                                  {currentAgent.status || 'ONLINE'}
                                </span>
                              </div>
                              <p className="text-xs text-outline font-mono">
                                Provider: {currentAgent.provider} • Model: {currentAgent.model || 'Unknown'}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="sf-mono text-[10px] text-outline uppercase font-semibold">
                              Ostatnia aktywność
                            </span>
                            <div className="text-xs font-semibold text-[#1C1C1E]">
                              {currentAgent.lastActiveAt
                                ? new Date(currentAgent.lastActiveAt).toTimeString().split(' ')[0]
                                : 'Teraz'}
                            </div>
                          </div>
                        </div>

                        {/* Current Task Activity */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-black/[0.04]">
                          <span className="text-[10px] sf-mono uppercase font-semibold text-outline">
                            Aktualne Działanie:
                          </span>
                          <p className="text-xs text-on-surface font-medium mt-0.5">
                            {currentAgent.activity || 'Oczekiwanie na kolejne polecenie...'}
                          </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04]">
                            <span className="text-[10px] sf-mono text-outline block">Narzędzie</span>
                            <span className="font-semibold text-apple-blue sf-mono">
                              {currentAgent.currentTool || 'idle'}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04]">
                            <span className="text-[10px] sf-mono text-outline block">Edytowany Plik</span>
                            <span className="font-semibold text-on-surface sf-mono truncate block" title={currentAgent.activeFile}>
                              {currentAgent.activeFile ? currentAgent.activeFile.split(/[/\\]/).pop() : 'Brak pliku'}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04]">
                            <span className="text-[10px] sf-mono text-outline block">Stacja Host</span>
                            <span className="font-semibold text-emerald-700 sf-mono truncate block">
                              {currentAgent.machine || connectedDevice?.hostname || 'Stacja robocza'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* No Agent Empty State */
                      <div className="p-8 rounded-2xl bg-white border border-dashed border-black/[0.1] flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0071E3] flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[32px]">sensors_off</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-[#1C1C1E]">
                            Oczekiwanie na Telemetrię Agenta AI
                          </h3>
                          <p className="text-xs text-[#636366] max-w-md mt-1">
                            Żaden agent nie wysyła obecnie strumienia danych do pokoju <strong>#{roomId}</strong>.
                            Podłącz swoje środowisko AI lub wyślij testowe zdarzenie.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsAiModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-apple-blue hover:bg-blue-600 text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                            <span>Podłącz AI / Kopiuj Prompt</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Live Output Log Stream */}
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1 mt-2 shadow-sm max-h-[220px] overflow-y-auto">
                      <div className="text-slate-400">// LIVE STREAM TELEMETRII KLASTRA:</div>
                      {events && events.length > 0 ? (
                        events.slice(0, 5).map((evt) => (
                          <div key={evt.id} className="text-slate-300">
                            <span className="text-slate-500">[{evt.time}]</span>{' '}
                            <span className="text-emerald-400">[{evt.badge}]</span>{' '}
                            <span>{evt.details}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-500">Brak zarejestrowanych zdarzeń w klastrze.</div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-outline sf-mono">
                    <span>VibeHub Real-Time Observation</span>
                    <span>Firestore Native Sync</span>
                  </div>
                </div>
              ) : (
                /* WEB APPLICATION PREVIEW VIEW */
                <div className="flex-1 flex flex-col">
                  <div className="h-9 bg-slate-50 border-b border-black/[0.06] px-3 flex items-center justify-between text-xs text-outline sf-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-apple-green" />
                      <span>https://{urlInput}</span>
                    </div>
                    <span className="text-[10px]">Render Time: ~14ms</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
                    <div className="text-center flex flex-col items-center gap-3 max-w-sm">
                      <span className="material-symbols-outlined text-outline text-[40px]">open_in_new</span>
                      <h4 className="font-semibold text-sm text-[#1C1C1E]">Zewnętrzny Podgląd Aplikacji</h4>
                      <p className="text-xs text-outline">
                        Aplikacja działa na serwerze pod adresem <code className="sf-mono text-apple-blue">{urlInput}</code>.
                      </p>
                      <a
                        href={`https://${urlInput}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-white border border-black/[0.08] text-xs font-semibold shadow-xs hover:bg-slate-50 transition"
                      >
                        Otwórz w Nowej Karcie ↗
                      </a>
                    </div>
                  </div>
                </div>
              )}
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeTab === tab
                        ? 'bg-[#0071E3] text-white shadow-xs'
                        : 'text-on-surface-variant hover:bg-black/[0.04]'
                    }`}
                    type="button"
                  >
                    {tab === 'diff'
                      ? 'Git Diff'
                      : tab === 'files'
                      ? 'Pliki'
                      : tab === 'commits'
                      ? 'Commits'
                      : `Console (${events?.length || 0})`}
                  </button>
                ))}
              </div>

              <span className="sf-mono text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded font-bold">
                {currentAgent?.fileStats || `${events?.length || 0} zdarzeń`}
              </span>
            </div>

            {/* Tab Content 1: Git Diff */}
            {activeTab === 'diff' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs sf-mono text-outline">
                  <span>{currentAgent?.activeFile || 'Working Tree Status'}</span>
                  <span className="text-apple-blue font-semibold">branch: {gitBranch}</span>
                </div>

                <div className="bg-white/95 border border-black/[0.06] rounded-xl p-3 font-mono-code text-[11px] text-[#3A3A3C] overflow-x-auto space-y-1 shadow-xs max-h-[460px]">
                  {currentAgent?.diffSnippet && currentAgent.diffSnippet.length > 0 ? (
                    <>
                      <div className="text-slate-400">@@ -1,10 +1,10 @@ live working diff @@</div>
                      {currentAgent.diffSnippet.map((line, idx) => (
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
                      ))}
                    </>
                  ) : (
                    <div className="text-slate-500 py-4 text-center">
                      Working tree clean. Brak niezatwierdzonych zmian w plikach przez wybranego agenta.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab Content 2: Files Changed */}
            {activeTab === 'files' && (
              <div className="flex flex-col gap-2 sf-mono text-xs">
                {currentAgent?.activeFile ? (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-apple-blue text-[16px]">code</span>
                      <span className="font-semibold text-on-surface">{currentAgent.activeFile}</span>
                    </div>
                    <span className="text-emerald-700 font-bold">{currentAgent.fileStats || 'modyfikowany'}</span>
                  </div>
                ) : (
                  <div className="p-4 text-center text-outline text-xs">
                    Brak obecnie modyfikowanych plików przez aktywnego agenta.
                  </div>
                )}
              </div>
            )}

            {/* Tab Content 3: Commits */}
            {activeTab === 'commits' && (
              <div className="flex flex-col gap-2 sf-mono text-xs max-h-[380px] overflow-y-auto">
                {recentGitCommits && recentGitCommits.length > 0 ? (
                  recentGitCommits.map((c) => (
                    <div key={c.hash} className="p-2.5 rounded-lg bg-slate-50 border border-black/[0.04]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-apple-blue font-bold">{c.hash}</span>
                        <span className="text-outline text-[10px]">{c.date}</span>
                      </div>
                      <div className="font-medium text-on-surface text-xs">{c.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-outline text-xs">Brak ostatnich commitów w repozytorium</div>
                )}
              </div>
            )}

            {/* Tab Content 4: Console Tail (Live Firestore Events) */}
            {activeTab === 'console' && (
              <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-[11px] space-y-2 max-h-[380px] overflow-y-auto">
                <div className="text-slate-400 pb-1 border-b border-slate-800">
                  // FIRESTORE LIVE EVENTS TAIL ({events.length}):
                </div>
                {events && events.length > 0 ? (
                  events.map((evt) => (
                    <div key={evt.id} className="flex flex-col gap-0.5 border-b border-slate-800/40 pb-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{evt.time}</span>
                        <span className="text-slate-400">[{evt.source}]</span>
                      </div>
                      <div className="text-emerald-400 font-medium">
                        [{evt.badge}] {evt.details}
                      </div>
                      {evt.metadata && (
                        <div className="text-[10px] text-slate-400">{evt.metadata}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 py-3 text-center">Brak logów w buforze zdarzeń.</div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] text-xs">
              <span className="sf-mono text-outline">
                {currentAgent ? `Agent: ${currentAgent.name}` : 'Brak aktywnego agenta'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="apple-btn px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0071E3] font-semibold sf-mono text-xs cursor-pointer"
                  type="button"
                >
                  Podłącz AI
                </button>
                <button
                  onClick={handleRefresh}
                  className="apple-btn px-3 py-1.5 rounded-lg bg-apple-blue text-white font-semibold sf-mono text-xs shadow-xs cursor-pointer"
                  type="button"
                >
                  Odśwież
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Connection Modal */}
      <AgentConnectionModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        roomId={roomId}
      />
    </div>
  );
}
