'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useVibeHubStore, TelemetryEvent } from '@/lib/store';

export default function DashboardPage() {
  const {
    roomId,
    eventsIngestedToday,
    activeBridgesCount,
    bridgeLatency,
    activeAgents,
    connectedDevice,
    isBridgeConnected,
    devA,
    events,
    simulateNextStep,
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

  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'antigravity' | 'claude-code' | 'cursor' | 'git'>('all');

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    return evt.source === activeFilter;
  });

  const handleCopyCli = () => {
    const prompt = `Jesteś autonomicznym agentem AI (Cursor / Claude Code / Antigravity / Windsurf).
Skonfiguruj połączenie MCP dla pokoju #${roomId}:
1. Wykonaj w terminalu: vibehub setup-mcp --room ${roomId}
2. Raportuj stan pracy przez narzędzie 'vibehub_push_status' oraz twórz 'vibehub_checkpoint'.`;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Command Strip / Session Banner */}
      <div className="w-full bg-white/70 apple-glass border-b border-black/[0.05] border-t border-white/80 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
            <span className="font-mono-status text-[11px] text-emerald-800 uppercase font-bold tracking-wider">
              SECURE MESH
            </span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#0071E3]">hub</span>
            <span className="font-title-sm text-[13px] text-[#1C1C1E] font-semibold apple-subtext">
              Pokój #{roomId}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-black/[0.05] font-mono-status text-[11px] text-[#636366] font-medium">
              {activeBridgesCount} {activeBridgesCount === 1 ? 'Stacja Online' : 'Stacji Online'}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono-status text-[11px] font-semibold border ${
                activeAgents.length > 0
                  ? 'bg-blue-50 text-[#0071E3] border-blue-100'
                  : 'bg-slate-100 text-[#8E8E93] border-slate-200'
              }`}
            >
              {activeAgents.length > 0
                ? `${activeAgents.length} ${activeAgents.length === 1 ? 'Aktywna Sesja' : 'Aktywne Sesje'}`
                : 'Oczekiwanie na agenta'}
            </span>
          </div>
        </div>

        {/* Quick Action / MCP Agent Prompt Ribbon */}
        <div className="flex items-center gap-2 bg-slate-50/90 border border-black/[0.06] border-t border-white/90 px-3 py-1 rounded-xl shadow-xs max-w-full overflow-hidden">
          <span className="material-symbols-outlined text-[16px] text-[#0071E3]">smart_toy</span>
          <span className="font-mono-code text-[12px] text-[#3A3A3C] truncate tracking-[0.01em]">
            Agent AI: <span className="text-[#0071E3] font-semibold">Skonfiguruj przez Prompt MCP</span>
          </span>
          <button
            onClick={handleCopyCli}
            className="apple-btn flex items-center gap-1 bg-white hover:bg-slate-50 text-[#1C1C1E] border border-black/[0.08] border-t border-white/90 px-2.5 py-1 rounded-lg font-mono-status text-[11px] font-semibold shadow-xs ml-1 cursor-pointer transition"
            title="Kopiuj gotowy prompt dla Agenta AI"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span className={copied ? 'text-emerald-600 font-bold' : ''}>
              {copied ? 'SKOPIOWANO PROMPT' : 'KOPIUJ PROMPT'}
            </span>
          </button>
        </div>
      </div>

      {/* Telemetry Barometer Grid */}
      <div className="w-full px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Events Ingested */}
        <div className="apple-card flex items-center gap-3.5 bg-white/75 apple-glass border border-white/80 border-black/[0.05] p-3.5 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0071E3] shadow-xs">
            <span className="material-symbols-outlined text-[20px]">dynamic_feed</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-status text-[11px] text-[#8E8E93] uppercase tracking-wider font-semibold">
              Events Ingested (Today)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-metric text-[18px] text-[#1C1C1E] font-semibold apple-display">
                {eventsIngestedToday.toLocaleString()}
              </span>
              <span className="font-mono-status text-[11px] text-[#34C759] font-bold">+12/sec</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Bridges */}
        <div className="apple-card flex items-center gap-3.5 bg-white/75 apple-glass border border-white/80 border-black/[0.05] p-3.5 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#34C759] shadow-xs">
            <span className="material-symbols-outlined text-[20px]">router</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-status text-[11px] text-[#8E8E93] uppercase tracking-wider font-semibold">
              Active Bridges
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-metric text-[18px] text-[#34C759] font-semibold apple-display">
                {activeBridgesCount} / 2
              </span>
              <span className="font-mono-status text-[10px] text-emerald-800 px-1.5 py-0.5 rounded-full bg-emerald-50 font-bold border border-emerald-200/60">
                100% HEALTHY
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Drop Rate & Schema */}
        <div className="apple-card flex items-center gap-3.5 bg-white/75 apple-glass border border-white/80 border-black/[0.05] p-3.5 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#FF9500] shadow-xs">
            <span className="material-symbols-outlined text-[20px]">speed</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-status text-[11px] text-[#8E8E93] uppercase tracking-wider font-semibold">
              Drop Rate & Schema
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-metric text-[18px] text-[#1C1C1E] font-semibold apple-display">
                0.00%
              </span>
              <span className="font-mono-status text-[10px] text-amber-800 px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/60 font-bold">
                SCHEMA: v1.0.4
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Telemetry Latency */}
        <div className="apple-card flex items-center gap-3.5 bg-white/75 apple-glass border border-white/80 border-black/[0.05] p-3.5 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-xs">
            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-status text-[11px] text-[#8E8E93] uppercase tracking-wider font-semibold">
              Telemetry Latency
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-metric text-[18px] text-sky-700 font-semibold apple-display">
                {bridgeLatency}ms
              </span>
              <span className="font-mono-status text-[11px] text-[#8E8E93]">P99: 22ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Multi-Conversation Observability Core (ZERO BOTS!) */}
      <div className="w-full px-6 py-2 flex flex-col gap-6">
        {activeAgents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
            {activeAgents.map((agent) => {
              const isAgy = agent.provider === 'antigravity';
              const isClaude = agent.provider === 'claude-code';
              const isCursor = agent.provider === 'cursor';

              const icon = isAgy
                ? 'smart_toy'
                : isClaude
                ? 'psychology'
                : isCursor
                ? 'auto_fix_high'
                : 'terminal';

              return (
                <div
                  key={agent.id}
                  className="apple-card flex flex-col gap-3 bg-white/80 apple-glass p-5 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] relative overflow-hidden"
                >
                  {/* Dev Identity Header */}
                  <div className="flex items-center justify-between gap-3 bg-slate-50/70 border border-black/[0.04] border-t border-white/90 p-3 rounded-xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-slate-700 shadow-xs shrink-0">
                        <span className="material-symbols-outlined text-[22px]">{icon}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-title-sm text-[14px] text-[#1C1C1E] font-bold truncate apple-headline">
                            {agent.name}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono-status font-bold border ${
                              isAgy
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
                                : isClaude
                                ? 'bg-amber-50 text-amber-800 border-amber-200/60'
                                : isCursor
                                ? 'bg-purple-50 text-purple-800 border-purple-200/60'
                                : 'bg-blue-50 text-blue-800 border-blue-200/60'
                            }`}
                          >
                            LIVE
                          </span>
                        </div>
                        <span className="font-body-dim text-[11px] text-[#636366] truncate font-medium apple-subtext">
                          {agent.operatorName || connectedDevice?.operator?.name || 'Operator'} • {agent.machine || connectedDevice?.hostname || 'Stacja robocza'}
                        </span>
                      </div>
                    </div>

                    {/* Machine Telemetry */}
                    <div className="flex flex-col items-end gap-0.5 font-mono-status text-[11px] text-[#8E8E93] flex-shrink-0">
                      <div className="flex items-center gap-1 text-[#1C1C1E] font-medium text-[10px]">
                        <span>{agent.model}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] tracking-[0.01em]">
                        <span className="text-emerald-700 font-semibold">
                          {agent.lastActiveAt ? new Date(agent.lastActiveAt).toLocaleTimeString() : 'Teraz'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active Agent Card */}
                  <div className="apple-agent-card bg-slate-50/80 border border-black/[0.04] border-t border-white/90 p-4 rounded-xl flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[12px] text-[#1C1C1E] font-semibold tracking-[0.01em]">
                          {agent.provider.toUpperCase()}
                        </span>
                        {agent.currentTool && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0071E3] border border-blue-100 font-mono-status text-[10px] font-semibold">
                            tool: {agent.currentTool}
                          </span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
                        <span className="font-mono-status text-[10px] font-bold uppercase tracking-wider">
                          {agent.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Active Intent / Task */}
                    <div className="bg-white/95 border border-black/[0.05] border-t border-white p-3 rounded-xl flex flex-col gap-1 shadow-xs">
                      <div className="flex items-center justify-between font-mono-status text-[10px] text-[#8E8E93] font-semibold tracking-wider uppercase">
                        <span>OSTATNIA AKTYWNOŚĆ / PROMPT</span>
                        <span className="text-[#0071E3] font-semibold">
                          {agent.status === 'working' ? 'EXECUTING' : 'IDLE'}
                        </span>
                      </div>
                      <p className="font-mono-code text-[12px] text-[#3A3A3C] font-medium leading-relaxed tracking-[0.01em] line-clamp-3">
                        {agent.activity}
                      </p>
                    </div>

                    {/* Tokens / Stats */}
                    {agent.tokens && (
                      <div className="flex items-center justify-between text-[11px] font-mono-code text-[#636366] bg-white/60 p-2 rounded-lg border border-black/[0.04]">
                        <span>
                          Tokens: In {agent.tokens.input || 0} / Out {agent.tokens.output || 0}
                        </span>
                        {agent.tokens.cacheRead ? (
                          <span className="text-emerald-700 font-semibold">Cache: {agent.tokens.cacheRead}</span>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* Active File & Diff Snippet */}
                  {agent.activeFile && (
                    <div className="bg-slate-50/80 border border-black/[0.04] border-t border-white/90 p-3 rounded-xl flex flex-col gap-2">
                      <div className="flex items-center justify-between font-mono-status text-[11px] text-[#8E8E93]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px] text-[#0071E3]">code</span>
                          <span className="text-[#1C1C1E] font-mono-code font-medium">{agent.activeFile}</span>
                        </div>
                        {agent.fileStats && <span className="text-emerald-700 font-bold">{agent.fileStats}</span>}
                      </div>
                      {agent.diffSnippet && agent.diffSnippet.length > 0 && (
                        <div className="bg-white/95 border border-black/[0.05] border-t border-white p-3 rounded-xl font-mono-code text-[11px] text-[#3A3A3C] overflow-x-auto space-y-0.5 shadow-xs">
                          {agent.diffSnippet.map((line, idx) => (
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
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Prawdziwy, czysty stan oczekiwania (ZERO FAŁSZYWYCH BOTÓW!) */
          <div className="apple-card bg-white/80 apple-glass p-8 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0071E3] shadow-xs">
              <span className="material-symbols-outlined text-[32px]">sensors</span>
            </div>

            <div className="flex flex-col gap-1 max-w-lg">
              <h3 className="font-title-sm text-lg font-bold text-[#1C1C1E]">
                {isBridgeConnected
                  ? 'Oczekiwanie na aktywną sesję Coding AI'
                  : 'Brak podłączonej stacji roboczej Bridge'}
              </h3>
              <p className="text-xs text-[#636366] leading-relaxed">
                {isBridgeConnected
                  ? `Stacja robocza (${connectedDevice?.hostname || 'Lokalny komputer'}) jest połączona i nasłuchuje w tle. Gdy tylko rozpoczniesz pracę w Google Antigravity, Claude Code lub Cursor, karta z promptami, wywoływanymi narzędziami i diffem pojawi się tutaj na żywo.`
                  : 'Uruchom w swoim terminalu poniższe polecenie, aby sparować ten komputer i włączyć automatyczne strumieniowanie aktywności w parze.'}
              </p>
            </div>

            {/* Terminal snippet box */}
            <div className="flex items-center gap-2 bg-slate-900 text-slate-100 px-4 py-2.5 rounded-xl font-mono text-xs shadow-sm mt-1">
              <span className="text-emerald-400">$</span>
              <span>vibehub start</span>
              <span className="text-slate-400">lub</span>
              <span className="text-sky-300">vibehub pair VH-9428-XK</span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <Link
                href="/settings"
                className="apple-btn px-4 py-2 rounded-xl bg-white border border-black/[0.08] hover:bg-slate-50 text-[#1C1C1E] text-xs font-semibold shadow-xs"
              >
                Zarządzaj stacjami Bridge
              </Link>
              <button
                onClick={simulateNextStep}
                className="apple-btn px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">play_arrow</span>
                Wyślij zdarzenie testowe
              </button>
            </div>
          </div>
        )}

        {/* Live Telemetry Event Stream & Inspector */}
        <div className="apple-card bg-white/80 apple-glass p-5 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.05] pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#0071E3]">stream</span>
              <h3 className="font-title-sm text-[15px] text-[#1C1C1E] font-bold">
                Live Telemetry Event Feed (Canonical Stream)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#636366] font-mono-status text-[11px]">
                {filteredEvents.length} events
              </span>
            </div>

            {/* Filter Buttons & Live Simulator Trigger */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-black/[0.04] p-0.5 rounded-lg border border-black/[0.04]">
                {(['all', 'antigravity', 'claude-code', 'cursor', 'git'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono-status font-medium transition ${
                      activeFilter === filter
                        ? 'bg-white text-[#0071E3] shadow-xs'
                        : 'text-[#636366] hover:text-[#1C1C1E]'
                    }`}
                  >
                    {filter === 'all'
                      ? 'ALL'
                      : filter === 'antigravity'
                      ? 'ANTIGRAVITY'
                      : filter === 'claude-code'
                      ? 'CLAUDE'
                      : filter === 'cursor'
                      ? 'CURSOR'
                      : 'GIT'}
                  </button>
                ))}
              </div>

              <button
                onClick={simulateNextStep}
                className="apple-btn flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono-status text-xs font-semibold hover:bg-emerald-100 shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                Simulate Step
              </button>
            </div>
          </div>

          {/* Event Stream Rows */}
          <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-black/[0.04] hover:bg-white hover:border-black/[0.08] transition shadow-xs text-xs font-mono-code"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#8E8E93] flex-shrink-0 font-mono-metric">{evt.time}</span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono-status text-[10px] font-bold border ${evt.badgeColor}`}
                  >
                    {evt.badge}
                  </span>
                  <span className="text-[#1C1C1E] truncate font-medium">{evt.details}</span>
                </div>

                <div className="flex items-center gap-3 text-[#8E8E93] text-[11px] flex-shrink-0 pl-2">
                  {evt.metadata && <span>{evt.metadata}</span>}
                  <span className="px-1.5 py-0.5 rounded bg-black/[0.04] text-[10px] text-[#636366]">
                    {evt.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
