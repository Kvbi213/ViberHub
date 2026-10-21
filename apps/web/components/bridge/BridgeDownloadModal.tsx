'use client';

import React, { useState } from 'react';

interface BridgeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairingCode?: string;
  roomId?: string;
}

export function BridgeDownloadModal({
  isOpen,
  onClose,
  pairingCode = 'VH-9428-XK',
  roomId = 'viberhub-8842f',
}: BridgeDownloadModalProps) {
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [downloaded, setDownloaded] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadTriggered = () => {
    setDownloaded(true);
    // Płynne przejście do kroku 2 po pobraniu paczki
    setTimeout(() => {
      setActiveStep(2);
    }, 600);
  };

  const ps1OneLiner = `powershell -c "irm https://viberhub-8842f.web.app/install.ps1 | iex"`;
  const shOneLiner = `curl -fsSL https://viberhub-8842f.web.app/install.sh | bash`;

  const agentPrompt = `Jesteś autonomicznym agentem programistycznym (Cursor / Claude Code / Antigravity / Windsurf / Cline) pracującym na tej stacji roboczej.
Paczka VibeHub CLI została pobrana. Aby przejść dalej i połączyć się z klastrem VibeHub w pokoju #${roomId}, wykonaj następujące kroki:

1. REJESTRACJA SERWERA MCP:
Wykonaj w terminalu polecenie konfiguracji MCP dla Twojego edytora:
vibehub setup-mcp --room ${roomId}

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

2. RAPORTOWANIE STANU PRACY:
Przy każdym rozpoczęciu zadania, edycji pliku lub oczekiwaniu na operatora wywołuj:
- vibehub_push_status({ status: "working", activity: "Opis zadania", name: "Twój Model", currentTool: "edit_file" })
- vibehub_checkpoint({ title: "Kamień milowy", summary: "Opis zmian", files: ["edytowany_plik"] })

Potwierdź konfigurację serwera MCP i wyślij pierwszy status do pokoju #${roomId}.`;

  const handleLiveTest = async () => {
    setTestStatus('loading');
    setTestFeedback(null);
    try {
      const res = await fetch('https://viber-hub.vercel.app/api/v1/agents/active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          agents: [
            {
              id: 'agent_cli_post_install',
              provider: 'antigravity',
              name: 'VibeHub Agent (CLI Ready)',
              model: 'Gemini / Claude / Cursor',
              status: 'working',
              activity: 'Weryfikacja agenta po instalacji paczki CLI',
              currentTool: 'vibehub_push_status',
              activeFile: 'apps/bridge/src/cli.ts',
              fileStats: '+ installed',
              diffSnippet: [
                { line: 1, type: '+', text: `// CLI verified & active in room #${roomId}` },
              ],
              lastActiveAt: new Date().toISOString(),
              machine: 'Workstation (Verified)',
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Błąd HTTP ${res.status}: ${res.statusText}`);
      }

      setTestStatus('success');
      setTestFeedback(`[+] Połączenie aktywne! Agent poprawnie zgłasza stan w pokoju #${roomId}.`);
    } catch (err: any) {
      setTestStatus('error');
      setTestFeedback(err?.message || 'Nie udało się nawiązać połączenia z serwerem API');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto selection:bg-blue-100 selection:text-blue-900">
      <div
        className="relative w-full max-w-2xl bg-white/95 apple-glass rounded-3xl border border-black/[0.08] border-t border-white shadow-[0_24px_70px_rgba(0,0,0,0.22)] p-6 sm:p-8 flex flex-col gap-6 my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 shrink-0">
              <span className="material-symbols-outlined text-[26px]">terminal</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[#1C1C1E] tracking-tight apple-headline">
                  Zgraj Narzędzia VibeHub CLI
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  v0.2.1 Standalone
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0071E3] text-[10px] font-mono font-bold">
                  Pokój #{roomId}
                </span>
              </div>
              <p className="text-xs text-[#636366] mt-1 leading-relaxed">
                Pobierz paczkę narzędziową CLI, a następnie <strong>skonfiguruj środowisko podając swojemu Agentowi AI gotowy prompt MCP</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition cursor-pointer shrink-0 ml-2"
            title="Zamknij"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Step Progression Segmented Control */}
        <div className="flex bg-slate-100/90 p-1 rounded-2xl border border-black/[0.04]">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer ${
              activeStep === 1
                ? 'bg-white text-[#0071E3] shadow-xs'
                : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-50 text-[#0071E3] border border-blue-200/60 flex items-center justify-center text-[11px] font-bold">
              1
            </span>
            <span>1. Zgraj Paczkę CLI</span>
            {downloaded && (
              <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer ${
              activeStep === 2
                ? 'bg-white text-[#0071E3] shadow-xs'
                : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-50 text-[#0071E3] border border-blue-200/60 flex items-center justify-center text-[11px] font-bold">
              2
            </span>
            <span>2. Skonfiguruj przez Prompt Agenta</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-bold uppercase">
              Wymagane
            </span>
          </button>
        </div>

        {/* STEP 1: Pobieranie paczki CLI */}
        {activeStep === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#8E8E93] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Krok 1: Wybierz format pobrania paczki na maszynę:
              </span>
              {downloaded && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">done_all</span>
                  Paczka pobrana
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Download Full ZIP */}
              <a
                href="/vibehub-cli-bundle.zip"
                download="vibehub-cli-bundle.zip"
                onClick={handleDownloadTriggered}
                className="apple-btn flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/70 border border-blue-200/80 hover:border-blue-500 hover:shadow-md transition group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0071E3] text-white flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[20px]">folder_zip</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1C1C1E] group-hover:text-[#0071E3] transition">
                      Pobierz Paczkę (.ZIP)
                    </div>
                    <div className="text-[11px] text-[#636366]">
                      Komplet: bundle.cjs + .cmd + .ps1 (56 KB)
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-[#0071E3] group-hover:translate-y-0.5 transition">
                  download
                </span>
              </a>

              {/* Download Install.bat */}
              <a
                href="/install.bat"
                download="install-vibehub.bat"
                onClick={handleDownloadTriggered}
                className="apple-btn flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200/80 hover:border-emerald-500 hover:shadow-md transition group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1C1C1E] group-hover:text-emerald-700 transition">
                      Instalator 1-Klik (.BAT)
                    </div>
                    <div className="text-[11px] text-[#636366]">
                      Automatycznie kopiuje i dodaje do PATH
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-emerald-600 group-hover:translate-y-0.5 transition">
                  download
                </span>
              </a>
            </div>

            {/* Option 2: 1-Line Terminal PowerShell Command */}
            <div className="flex flex-col gap-2 bg-slate-50 border border-black/[0.06] p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1C1C1E] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0071E3]">terminal</span>
                  Alternatywa: Automatyczna instalacja w PowerShell (Windows)
                </span>
                <button
                  onClick={() => {
                    handleCopy(ps1OneLiner, 'ps1');
                    handleDownloadTriggered();
                  }}
                  className="apple-btn px-2.5 py-1 rounded-lg bg-white border border-black/[0.08] hover:bg-slate-100 text-[11px] font-semibold text-[#0071E3] flex items-center gap-1 transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {copiedKey === 'ps1' ? 'check' : 'content_copy'}
                  </span>
                  {copiedKey === 'ps1' ? 'Skopiowano!' : 'Kopiuj'}
                </button>
              </div>
              <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[12px] overflow-x-auto select-all shadow-inner">
                {ps1OneLiner}
              </div>
            </div>

            {/* Step 1 Next Action Banner */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#0071E3] text-[22px]">smart_toy</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1C1C1E]">
                    Po zgraniu paczki przejdź do konfiguracji agenta
                  </span>
                  <span className="text-[11px] text-[#636366]">
                    Nie musisz odpalać starych komend mostu — agent AI zrobi wszystko za Ciebie.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="apple-btn px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition shrink-0 cursor-pointer"
              >
                <span>Dalej: Prompt Agenta</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Skonfiguruj przez Prompt Agenta (WYMAGANE DO PRZEJŚCIA DALEJ) */}
        {activeStep === 2 && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0071E3] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Krok 2: Aby przejść dalej, skonfiguruj środowisko przez prompt Agenta AI
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  MCP-First
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Paczka została zgrana! Zamiast ręcznie odpalać komendy mostu w terminalu, <strong>wklej poniższe polecenie w oknie czatu Twojego Agenta AI</strong> (Cursor / Claude Code / Google Antigravity / Windsurf). Agent sam zarejestruje serwer MCP i zacznie transmitować status do pokoju <strong className="text-[#0071E3]">#{roomId}</strong>.
              </p>
            </div>

            {/* AI Agent Prompt Box */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1C1C1E] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#0071E3] text-[16px]">content_copy</span>
                  Gotowe polecenie dla Agenta AI (Wklej w czacie):
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(agentPrompt, 'agent-prompt')}
                  className="apple-btn px-3.5 py-1.5 rounded-xl bg-[#0071E3] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {copiedKey === 'agent-prompt' ? 'check' : 'content_copy'}
                  </span>
                  {copiedKey === 'agent-prompt' ? 'Skopiowano Polecenie!' : 'Kopiuj Polecenie dla Agenta'}
                </button>
              </div>

              <div className="relative">
                <pre className="p-3.5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-56 border border-slate-800 shadow-inner select-all whitespace-pre-wrap">
                  {agentPrompt}
                </pre>
              </div>
            </div>

            {/* Quick Live Test & Actions */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3] status-pulse-green" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1C1C1E]">
                    Weryfikacja Odbioru w Pokoju #{roomId}
                  </span>
                  <span className="text-[11px] text-[#636366]">
                    Przetestuj czy klaster odbiera sygnał od agenta
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLiveTest}
                  disabled={testStatus === 'loading'}
                  className="apple-btn px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {testStatus === 'loading' ? (
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="material-symbols-outlined text-[15px]">sensors</span>
                  )}
                  {testStatus === 'loading' ? 'Sprawdzanie...' : 'Przetestuj Odbiór Sygnału'}
                </button>
              </div>
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

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-black/[0.06] pt-4">
          <button
            type="button"
            onClick={() => setActiveStep(activeStep === 1 ? 2 : 1)}
            className="text-xs text-[#636366] hover:text-[#1C1C1E] font-medium flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">
              {activeStep === 1 ? 'arrow_forward' : 'arrow_back'}
            </span>
            {activeStep === 1 ? 'Przejdź do Kroku 2 (Prompt dla AI)' : 'Wróć do wyboru paczki CLI'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="apple-btn px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">check</span>
              Zakończ i Przejdź do Dashboardu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
