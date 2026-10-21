'use client';

import React, { useState, useEffect } from 'react';
import { useVibeHubStore } from '@/lib/store';
import { fetchDevices, DeviceRecord } from '@/lib/firestore-service';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { BridgeDownloadModal } from '@/components/bridge/BridgeDownloadModal';
import { AgentConnectionModal } from '@/components/bridge/AgentConnectionModal';

export default function SettingsBridgePage() {
  const { roomId, activeAgents, setOnboardingOpen } = useVibeHubStore();
  const [pairingCode, setPairingCode] = useState('VH-9428-XK');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [devices, setDevices] = useState<DeviceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    // 1. Początkowe pobranie urządzeń
    fetchDevices(roomId).then((devs) => {
      setDevices(devs);
      setLoading(false);
    });

    // 2. Nasłuchiwanie na żywo w Firestore
    if (db) {
      try {
        const devsRef = collection(db, 'rooms', roomId, 'devices');
        const unsub = onSnapshot(devsRef, (snap) => {
          const liveList = snap.docs.map((d) => ({ deviceId: d.id, ...(d.data() as any) }));
          setDevices(liveList);
        });
        return () => unsub();
      } catch (err) {
        console.warn('devices listener warning', err);
      }
    }
  }, [roomId]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleGenerateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'VH-';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for (let i = 0; i < 2; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setPairingCode(code);
  };

  const handleRevokeDevice = (deviceId: string) => {
    if (confirm('Czy na pewno chcesz unieważnić poświadczenia dla tego urządzenia?')) {
      setDevices(devices.filter((d) => d.deviceId !== deviceId));
    }
  };

  const agentMcpPrompt = `Jesteś autonomicznym agentem AI (Cursor / Claude Code / Antigravity / Windsurf / Cline) pracującym w projekcie podłączonym do klastra VibeHub.
Twoim zadaniem jest natychmiastowe skonfigurowanie serwera MCP oraz ciągłe raportowanie bieżącego statusu, aktywnego narzędzia i diffów kodu do pokoju VibeHub (#${roomId}).

INSTRUKCJA DLA CIEBIE (WYKONAJ PO KOLEI):

1. KONFIGURACJA SERWERA MCP:
Wykonaj w terminalu polecenie automatycznej rejestracji w Twoich edytorach:
vibehub setup-mcp

(Alternatywnie dopisz serwer 'vibehub' do swojego pliku mcp.json / .cursor/mcp.json / ~/.gemini/antigravity/mcp.json:
{
  "mcpServers": {
    "vibehub": {
      "command": "vibehub",
      "args": ["mcp"],
      "env": {
        "VIBEHUB_ROOM_ID": "${roomId}",
        "VIBEHUB_API_URL": "https://viber-hub.vercel.app/api/v1"
      }
    }
  }
})

2. ZASADY WYWOŁYWANIA NARZĘDZI MCP W CZASIE PRACY:
Zawsze wywołuj narzędzie 'vibehub_push_status' w kluczowych momentach:
- Na początku pracy:
  vibehub_push_status({ status: "working", activity: "Rozpoczęcie realizacji zadania: [opis]", name: "Twój Model" })
- Po każdej edycji pliku lub wykonaniu narzędzia (edit_file, write_file, run_command):
  vibehub_push_status({
    status: "working",
    activity: "Krótki opis wykonanej modyfikacji",
    currentTool: "edit_file",
    activeFile: "ścieżka/do/edytowanego/pliku",
    diff: "+ dodany kod\\n- usunięty kod",
    name: "Twój Model"
  })
- Po ukończeniu zadania / oczekiwaniu na użytkownika:
  vibehub_push_status({ status: "waiting", activity: "Zadanie zakończone, oczekiwanie na decyzję operatora" })
- Po zakończeniu ważnego etapu architektury:
  vibehub_checkpoint({ title: "Nazwa kamienia milowego", summary: "Opis wdrożenia", files: ["plik1", "plik2"] })

3. SZYBKI FALLBACK (jeśli sesja MCP nie została jeszcze zrestartowana):
Wyślij telemetrię bezpośrednio przez HTTP POST:
Endpoint: https://viber-hub.vercel.app/api/v1/agents/active
Headers: {"Content-Type": "application/json"}
Body: {"roomId":"${roomId}","agents":[{"id":"ai_active","provider":"antigravity","name":"AI Coder","status":"working","activity":"Zadanie w toku","lastActiveAt":"'$(Get-Date -Format o)'"}]}`;

  const mcpConfigJson = JSON.stringify(
    {
      mcpServers: {
        vibehub: {
          command: 'vibehub',
          args: ['mcp'],
          env: {
            VIBEHUB_ROOM_ID: roomId,
            VIBEHUB_API_URL: 'https://viber-hub.vercel.app/api/v1',
          },
        },
      },
    },
    null,
    2
  );

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-8 gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0071E3] font-mono text-[10px] font-bold">
              PARADYGMAT MCP-FIRST
            </span>
            <span className="text-xs text-[#8E8E93] font-mono">Pokój: #{roomId}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] apple-headline">
            Integracja Agenta AI &amp; Konfiguracja MCP
          </h1>
          <p className="text-sm text-[#636366] mt-1">
            Podłącz swoje środowisko AI (Cursor, Google Antigravity, Claude Code, Windsurf) przez protokół MCP — bez uciążliwych demonów w tle i problemów z uprawnieniami systemu plików.
          </p>
        </div>
        <button
          onClick={() => setOnboardingOpen(true)}
          className="apple-btn px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1C1C1E] text-xs font-semibold flex items-center gap-1.5 shrink-0 self-start sm:self-center transition border border-black/[0.06] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#0071E3]">tune</span>
          Otwórz Kreator Konfiguracji
        </button>
      </div>

      {/* PRIMARY CARD: Agent MCP Instruction Prompt */}
      <div className="apple-card bg-white/85 apple-glass p-6 sm:p-7 rounded-3xl border border-black/[0.08] border-t border-white shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C1C1E] flex items-center gap-2">
                <span>Polecenie dla Twojego Agenta AI</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  Rekomendowane
                </span>
              </h2>
              <p className="text-xs text-[#636366] mt-0.5">
                Wklej poniższy prompt swojemu modelowi AI w oknie czatu — agent sam skonfiguruje MCP i zacznie raportować stan na żywo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopy(agentMcpPrompt, 'agent-prompt')}
              className="apple-btn px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedKey === 'agent-prompt' ? 'check' : 'content_copy'}
              </span>
              <span>{copiedKey === 'agent-prompt' ? 'Skopiowano Polecenie!' : 'Kopiuj Polecenie dla AI'}</span>
            </button>
            <button
              onClick={() => setAiModalOpen(true)}
              className="apple-btn px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1C1C1E] text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Test Na Żywo</span>
            </button>
          </div>
        </div>

        {/* Code display box */}
        <div className="relative">
          <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto max-h-[260px] whitespace-pre-wrap select-all border border-slate-800">
            {agentMcpPrompt}
          </pre>
        </div>

        {/* Quick action one-liners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.05] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sf-mono uppercase font-bold text-[#8E8E93] block">
                Szybka konfiguracja w terminalu:
              </span>
              <code className="text-xs font-mono text-[#0071E3] font-semibold">
                vibehub setup-mcp
              </code>
            </div>
            <button
              onClick={() => handleCopy('vibehub setup-mcp', 'setup-cmd')}
              className="p-1.5 rounded-lg bg-white border border-black/[0.08] hover:bg-slate-100 text-xs text-[#1C1C1E] transition cursor-pointer"
              title="Kopiuj polecenie"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copiedKey === 'setup-cmd' ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-black/[0.05] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sf-mono uppercase font-bold text-[#8E8E93] block">
                Plik mcp.json (Cursor / Claude):
              </span>
              <span className="text-xs font-mono text-[#1C1C1E]">
                mcpServers.vibehub
              </span>
            </div>
            <button
              onClick={() => handleCopy(mcpConfigJson, 'mcp-json')}
              className="p-1.5 rounded-lg bg-white border border-black/[0.08] hover:bg-slate-100 text-xs text-[#1C1C1E] transition cursor-pointer flex items-center gap-1"
              title="Kopiuj JSON"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copiedKey === 'mcp-json' ? 'check' : 'content_copy'}
              </span>
              <span className="text-[11px] font-semibold">JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE AGENTS IN ROOM */}
      <div className="apple-card bg-white/80 apple-glass p-6 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-glass flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-apple-blue">psychology</span>
            <h2 className="text-base font-bold text-[#1C1C1E]">Aktywne Sesje Agentów AI w Pokoju</h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono-status text-[11px] font-bold">
            {activeAgents.length} Podłączonych
          </span>
        </div>

        {activeAgents.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-50 border border-dashed border-black/[0.08] flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[32px] text-[#8E8E93]">sensors_off</span>
            <span className="text-sm font-semibold text-[#1C1C1E]">Brak aktywnych agentów AI</span>
            <p className="text-xs text-[#8E8E93] max-w-sm">
              Skopiuj powyższe polecenie dla agenta AI lub wyślij testowe zdarzenie, aby zobaczyć sesję na żywo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeAgents.map((agent) => (
              <div
                key={agent.id}
                className="p-4 rounded-xl bg-slate-50/70 border border-black/[0.05] flex flex-col gap-2 hover:bg-white transition shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34C759] status-pulse-green" />
                    <span className="font-bold text-sm text-[#1C1C1E]">{agent.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase">
                    {agent.provider}
                  </span>
                </div>
                <p className="text-xs text-[#636366] line-clamp-2">
                  {agent.activity || 'Aktywny agent w klastrze'}
                </p>
                <div className="pt-2 border-t border-black/[0.04] flex items-center justify-between text-[11px] font-mono text-[#8E8E93]">
                  <span>Narzędzie: <strong className="text-apple-blue">{agent.currentTool || 'brak'}</strong></span>
                  <span>{agent.activeFile ? agent.activeFile.split(/[/\\]/).pop() : 'Brak pliku'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FALLBACK SECTION: Legacy Bridge Pairing */}
      <div className="apple-card bg-white/70 apple-glass p-6 rounded-2xl border border-black/[0.06] border-t border-white/80 shadow-glass flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#636366]">terminal</span>
            <h2 className="text-sm font-bold text-[#1C1C1E]">
              Opcjonalny Fallback: Klasyczny Bridge CLI
            </h2>
          </div>
          <button
            onClick={() => setDownloadModalOpen(true)}
            className="text-xs text-[#0071E3] hover:underline font-semibold"
            type="button"
          >
            Zgraj Paczkę CLI (.ZIP)
          </button>
        </div>

        <p className="text-xs text-[#636366] leading-relaxed">
          Jeśli Twoje środowisko nie obsługuje protokołu MCP, możesz opcjonalnie uruchomić klasyczny demon Bridge za pomocą jednorazowego kodu parowania:
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 border border-black/[0.06] p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black font-mono tracking-widest text-[#0071E3] select-all">
              {pairingCode}
            </span>
            <span className="text-xs text-[#8E8E93] font-mono">
              vibehub pair {pairingCode}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateCode}
              className="apple-btn px-3 py-1.5 rounded-lg border border-black/[0.08] hover:bg-slate-100 text-xs text-[#1C1C1E] font-semibold"
              type="button"
            >
              Odśwież Kod
            </button>
            <button
              onClick={() => handleCopy(`vibehub pair ${pairingCode}`, 'pair-cmd')}
              className="apple-btn px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copiedKey === 'pair-cmd' ? 'check' : 'terminal'}
              </span>
              {copiedKey === 'pair-cmd' ? 'Skopiowano!' : 'Kopiuj Polecenie'}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BridgeDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        pairingCode={pairingCode}
      />
      <AgentConnectionModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        roomId={roomId}
      />
    </div>
  );
}
