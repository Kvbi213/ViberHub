'use client';

import React, { useState } from 'react';
import { useVibeHubStore } from '@/lib/store';
import { completeUserOnboarding } from '@/lib/auth-service';

interface OnboardingWizardProps {
  isModal?: boolean;
  onClose?: () => void;
}

export function OnboardingWizard({ isModal = false, onClose }: OnboardingWizardProps) {
  const { currentUser, setCurrentUser, setRoomId, togglePermission, permissions } = useVibeHubStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Jakub (Operator)');
  const [role, setRole] = useState(currentUser?.preferences?.role || 'Systems & Observability Architect');
  const [room, setRoom] = useState(currentUser?.preferences?.defaultRoom || 'viberhub-8842f');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mcpTab, setMcpTab] = useState<'prompt' | 'json' | 'cli'>('prompt');
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  const roles = [
    { id: 'Systems & Observability Architect', label: 'Systems & Observability Architect', icon: 'hub' },
    { id: 'Fullstack AI Engineer', label: 'Fullstack AI Engineer', icon: 'terminal' },
    { id: 'Autonomous Agent Pilot', label: 'Autonomous Agent Pilot', icon: 'smart_toy' },
    { id: 'Security & Redaction Lead', label: 'Security & Redaction Lead', icon: 'shield' },
  ];

  const agentMcpPrompt = `Jesteś autonomicznym agentem programistycznym (Cursor / Claude Code / Antigravity / Windsurf / Cline) pracującym w projekcie podłączonym do klastra VibeHub.
Twoim zadaniem jest natychmiastowe skonfigurowanie serwera MCP oraz ciągłe raportowanie bieżącego statusu, aktywnego narzędzia i diffów kodu do pokoju VibeHub (#${room}).

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
        "VIBEHUB_ROOM_ID": "${room}",
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
Body: {"roomId":"${room}","agents":[{"id":"ai_active","provider":"antigravity","name":"AI Coder","status":"working","activity":"Zadanie w toku","lastActiveAt":"${new Date().toISOString()}"}]}`;

  const mcpConfigJson = JSON.stringify(
    {
      mcpServers: {
        vibehub: {
          command: 'vibehub',
          args: ['mcp'],
          env: {
            VIBEHUB_ROOM_ID: room,
            VIBEHUB_API_URL: 'https://viber-hub.vercel.app/api/v1',
          },
        },
      },
    },
    null,
    2
  );

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleLiveTest = async () => {
    setTestStatus('loading');
    setTestFeedback(null);
    try {
      const res = await fetch('https://viber-hub.vercel.app/api/v1/agents/active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room,
          agents: [
            {
              id: 'agent_onboarding_test',
              provider: 'antigravity',
              name: 'VibeHub Agent Pilot (MCP Test)',
              model: 'Gemini / Claude',
              status: 'working',
              activity: 'Weryfikacja kanału MCP i rejestracji agenta',
              currentTool: 'vibehub_push_status',
              activeFile: 'apps/bridge/src/mcp/server.ts',
              fileStats: '+ verified',
              diffSnippet: [
                { line: 1, type: '+', text: `// MCP Telemetry channel verified for room #${room}` },
              ],
              lastActiveAt: new Date().toISOString(),
              machine: 'Workstation (Verified)',
              operatorName: displayName,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Błąd HTTP ${res.status}: ${res.statusText}`);
      }

      setTestStatus('success');
      setTestFeedback(`[+] Połączenie aktywne! Serwer VibeHub odebrał sygnał MCP w pokoju #${room}.`);
    } catch (err: any) {
      setTestStatus('error');
      setTestFeedback(err?.message || 'Nie udało się nawiązać połączenia z serwerem API');
    }
  };

  const handleFinish = async () => {
    if (!currentUser) return;
    setSubmitting(true);
    try {
      const prefs = {
        role,
        defaultRoom: room,
        stationName: 'Windows Workstation',
        permissions: { ...permissions },
      };
      const updated = await completeUserOnboarding(currentUser.uid, prefs, displayName);
      if (updated) {
        setCurrentUser(updated);
        setRoomId(room);
      }
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.warn('[!] ALERT :: Onboarding finish error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={
        isModal
          ? 'w-full flex flex-col justify-center items-center'
          : 'min-h-screen w-full bg-[#F8F9FB] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-blue-100 selection:text-blue-900'
      }
    >
      {/* Ambient Gradient Glow */}
      {!isModal && (
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(0,113,227,0.1),rgba(244,245,248,0.85))]" />
      )}

      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-5 my-auto">
        {/* Progress Header */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-mono-status text-[#8E8E93]">
            <span className="font-semibold text-[#0071E3] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
              KROK {step} Z 4:{' '}
              {step === 1
                ? 'TOŻSAMOŚĆ OPERATORA'
                : step === 2
                ? 'PRZESTRZEŃ I POKÓJ'
                : step === 3
                ? 'POLITYKA BEZPIECZEŃSTWA'
                : 'POLECENIE DLA AGENTA AI (MCP)'}
            </span>
            <div className="flex items-center gap-2">
              <span>{Math.round((step / 4) * 100)}% UKOŃCZONO</span>
              {isModal && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  title="Zamknij"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0071E3] h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Step Card */}
        <div className="bg-white/90 apple-glass border border-black/[0.08] border-t border-white p-6 sm:p-8 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          {/* STEP 1: Tożsamość i Rola */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0071E3]">badge</span>
                  Krok 1: Twoja Tożsamość Operatora
                </h2>
                <p className="text-xs text-[#636366] mt-1 leading-relaxed">
                  Określ swój pseudonim i specjalizację, pod którymi agenci AI i współpracownicy w klastrze będą Cię identyfikować.
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-black/[0.05]">
                <img
                  src={currentUser?.avatarUrl}
                  alt={displayName}
                  className="w-14 h-14 rounded-full ring-2 ring-[#0071E3]/40 shadow-sm"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1C1C1E]">Pseudonim / Nazwa w Sesji</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-black/[0.1] bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#1C1C1E]">Wybierz Twoją Główną Rolę:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-semibold transition ${
                        role === r.id
                          ? 'bg-blue-50/80 border-[#0071E3] text-[#0071E3] shadow-xs'
                          : 'bg-white border-black/[0.06] text-[#3A3A3C] hover:bg-slate-50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Środowisko i Pokój */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0071E3]">corporate_fare</span>
                  Krok 2: Konfiguracja Przestrzeni i Pokoju
                </h2>
                <p className="text-xs text-[#636366] mt-1 leading-relaxed">
                  Wybierz dedykowany pokój obserwowalności. Do tego identyfikatora podłączy się Twój agent programistyczny przez MCP.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#1C1C1E]">Identyfikator Pokoju (Room ID)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-[#0071E3] font-bold">#</span>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/[0.1] bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
                <span className="text-[11px] text-[#8E8E93]">
                  Domyślny pokój demonstracyjny klastra: <strong className="text-[#1C1C1E]">viberhub-8842f</strong>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-black/[0.05] flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#1C1C1E]">Architektura Połączenia w Pokoju #{room}</span>
                <div className="flex items-center justify-between text-xs text-[#636366]">
                  <span>Serwer API VibeHub (Cloud Run / Vercel):</span>
                  <strong className="text-emerald-700 font-mono">viber-hub.vercel.app (24/7)</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-[#636366]">
                  <span>Magazyn Stanu i Diffów:</span>
                  <strong className="text-[#0071E3] font-mono">Cloud Firestore (Multi-region)</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-[#636366]">
                  <span>Protokół Integracji:</span>
                  <strong className="text-indigo-600 font-mono font-bold">Model Context Protocol (MCP)</strong>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Bezpieczeństwo i Prywatność L1-L4 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#34C759]">shield</span>
                  Krok 3: Zasady Bezpieczeństwa L1–L4
                </h2>
                <p className="text-xs text-[#636366] mt-1 leading-relaxed">
                  Dostosuj granularne poziomy udostępniania telemetrii stacji w paradygmacie Zero-Trust.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-black/[0.05]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1C1C1E]">L1: Git &amp; File Diffs</span>
                    <span className="text-[11px] text-[#636366]">Wysyłaj zanonimizowane diffy zmienionych linii kodu</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={permissions.L1_git}
                    onChange={() => togglePermission('L1_git')}
                    className="w-5 h-5 accent-[#0071E3] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-black/[0.05]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1C1C1E]">L2: Agent Intent &amp; Activity</span>
                    <span className="text-[11px] text-[#636366]">Strumieniuj aktualny krok i narzędzie agenta</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={permissions.L2_agent}
                    onChange={() => togglePermission('L2_agent')}
                    className="w-5 h-5 accent-[#0071E3] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-black/[0.05]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1C1C1E]">L3: Context Sanityzacja (Sekrety)</span>
                    <span className="text-[11px] text-[#636366]">Automatycznie wycinaj klucze API, hasła i tokeny .env</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={permissions.L3_context}
                    onChange={() => togglePermission('L3_context')}
                    className="w-5 h-5 accent-[#0071E3] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-black/[0.05]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1C1C1E]">L4: Live Collab Preview</span>
                    <span className="text-[11px] text-[#636366]">Włącz responsywny podgląd aplikacji w pokoju</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={permissions.L4_preview}
                    onChange={() => togglePermission('L4_preview')}
                    className="w-5 h-5 accent-[#0071E3] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Podłączenie Agenta AI & MCP (GŁÓWNE POLECENIE DLA AGENTA) */}
          {step === 4 && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0071E3]">smart_toy</span>
                    Krok 4: Podłącz Agenta AI (Model Context Protocol)
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                    MCP-First
                  </span>
                </div>
                <p className="text-xs text-[#636366] mt-1 leading-relaxed">
                  Zamiast uruchamiać lokalne mosty w tle, <strong>wklej poniższe polecenie w oknie czatu ze swoim Agentem AI</strong> (Cursor, Antigravity, Claude Code, Windsurf). Agent sam skonfiguruje serwer MCP i zacznie raportować postępy w pokoju <strong className="text-[#0071E3]">#{room}</strong>.
                </p>
              </div>

              {/* Sub-Tabs for Configuration Modes */}
              <div className="flex bg-slate-100/90 p-1 rounded-xl border border-black/[0.04]">
                <button
                  type="button"
                  onClick={() => setMcpTab('prompt')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
                    mcpTab === 'prompt'
                      ? 'bg-white text-[#0071E3] shadow-xs'
                      : 'text-[#636366] hover:text-[#1C1C1E]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  Polecenie dla Agenta AI (Rekomendowane)
                </button>
                <button
                  type="button"
                  onClick={() => setMcpTab('json')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
                    mcpTab === 'json'
                      ? 'bg-white text-[#0071E3] shadow-xs'
                      : 'text-[#636366] hover:text-[#1C1C1E]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">code</span>
                  Konfiguracja mcp.json
                </button>
                <button
                  type="button"
                  onClick={() => setMcpTab('cli')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
                    mcpTab === 'cli'
                      ? 'bg-white text-[#0071E3] shadow-xs'
                      : 'text-[#636366] hover:text-[#1C1C1E]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">terminal</span>
                  Szybkie CLI
                </button>
              </div>

              {/* TAB 1: AI Prompt */}
              {mcpTab === 'prompt' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1C1E] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#0071E3] text-[16px]">content_copy</span>
                      Wklej to polecenie w oknie czatu Twojego Agenta AI:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(agentMcpPrompt, 'prompt')}
                      className="apple-btn px-3 py-1.5 rounded-lg bg-[#0071E3] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedKey === 'prompt' ? 'check' : 'content_copy'}
                      </span>
                      {copiedKey === 'prompt' ? 'Skopiowano Polecenie!' : 'Kopiuj Polecenie dla Agenta'}
                    </button>
                  </div>

                  <div className="relative">
                    <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-56 border border-slate-800 shadow-inner select-all whitespace-pre-wrap">
                      {agentMcpPrompt}
                    </pre>
                  </div>

                  <p className="text-[11px] text-[#636366] leading-relaxed">
                    Agent wykona automatyczną rejestrację MCP, uruchomi narzędzia i przekaże pierwszy status do Dashboardu pokoju <strong>#{room}</strong>.
                  </p>
                </div>
              )}

              {/* TAB 2: JSON mcpServers */}
              {mcpTab === 'json' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1C1E]">
                      Wpis do pliku konfiguracji MCP (np. <code className="text-[#0071E3]">.cursor/mcp.json</code>):
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(mcpConfigJson, 'json')}
                      className="apple-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#1C1C1E] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedKey === 'json' ? 'check' : 'content_copy'}
                      </span>
                      {copiedKey === 'json' ? 'Skopiowano JSON' : 'Kopiuj JSON'}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-48 border border-slate-800 shadow-inner">
                    {mcpConfigJson}
                  </pre>
                </div>
              )}

              {/* TAB 3: CLI setup-mcp */}
              {mcpTab === 'cli' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1C1E]">
                      Polecenie jednorazowej konfiguracji w terminalu:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('vibehub setup-mcp', 'cli')}
                      className="apple-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#1C1C1E] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedKey === 'cli' ? 'check' : 'content_copy'}
                      </span>
                      {copiedKey === 'cli' ? 'Skopiowano komendę' : 'Kopiuj komendę'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-blue-400 font-mono text-xs font-bold flex items-center justify-between">
                    <span>vibehub setup-mcp</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-emerald-950">
                        Zgraj Paczkę Narzędziową CLI (.ZIP / .BAT / .PS1):
                      </span>
                      <span className="text-[11px] text-emerald-800">
                        Po zgraniu paczki, aby przejść dalej, podaj Agentowi AI prompt z pierwszej zakładki.
                      </span>
                    </div>
                    <a
                      href="/vibehub-cli-bundle.zip"
                      download="vibehub-cli-bundle.zip"
                      className="apple-btn px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">download</span>
                      Zgraj Paczkę CLI (.ZIP)
                    </a>
                  </div>
                </div>
              )}

              {/* Live Test Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3] status-pulse-green" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1C1C1E]">Sprawdź odbiór telemetrii MCP</span>
                    <span className="text-[11px] text-[#636366]">Wyślij sygnał testowy do pokoju #{room}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLiveTest}
                  disabled={testStatus === 'loading'}
                  className="apple-btn px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  {testStatus === 'loading' ? (
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="material-symbols-outlined text-[15px]">sensors</span>
                  )}
                  {testStatus === 'loading' ? 'Weryfikacja...' : 'Przetestuj Połączenie MCP'}
                </button>
              </div>

              {testFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    testStatus === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {testStatus === 'success' ? 'check_circle' : 'error'}
                  </span>
                  <span>{testFeedback}</span>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-black/[0.06]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => ((s - 1) as any))}
                className="apple-btn px-4 py-2 rounded-xl border border-black/[0.08] text-xs font-semibold text-[#636366] hover:text-[#1C1C1E]"
              >
                Wróć
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => ((s + 1) as any))}
                className="apple-btn px-5 py-2.5 rounded-xl bg-[#0071E3] text-white text-xs font-semibold shadow-xs hover:bg-blue-600 transition flex items-center gap-1.5"
              >
                Dalej
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={submitting}
                className="apple-btn px-6 py-2.5 rounded-xl bg-[#34C759] text-white text-xs font-bold shadow-xs hover:bg-emerald-600 transition flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Zakończ i Wejdź do Dashboardu
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
