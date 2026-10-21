'use client';

import React, { useState } from 'react';

interface AgentConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
}

export function AgentConnectionModal({
  isOpen,
  onClose,
  roomId = 'viberhub-8842f',
}: AgentConnectionModalProps) {
  const [activeTab, setActiveTab] = useState<'prompt' | 'mcp' | 'curl' | 'test'>('prompt');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [testResponse, setTestResponse] = useState<any>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const aiSystemPrompt = `Jesteś autonomicznym agentem AI (Cursor / Claude Code / Antigravity / Windsurf / Cline) pracującym w projekcie podłączonym do klastra VibeHub.
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

  const ps1TelemetrySnippet = `$body = @{
  roomId = "${roomId}"
  agents = @(
    @{
      id = "agy_live_terminal"
      provider = "antigravity"
      name = "Terminal Agent (PowerShell)"
      model = "Gemini / Claude"
      status = "working"
      activity = "Aktywne kodowanie i weryfikacja modułów"
      currentTool = "run_command"
      activeFile = "apps/web/app/rooms/page.tsx"
      fileStats = "+ modified"
      diffSnippet = @(
        @{ line = 1; type = "+"; text = "export const telemetryReady = true;" }
      )
      lastActiveAt = (Get-Date).ToString("o")
    }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "https://viber-hub.vercel.app/api/v1/agents/active" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body`;

  const bashCurlSnippet = `curl -X POST "https://viber-hub.vercel.app/api/v1/agents/active" \\
  -H "Content-Type: application/json" \\
  -d '{
    "roomId": "${roomId}",
    "agents": [
      {
        "id": "agent_bash",
        "provider": "custom",
        "name": "Custom AI Agent",
        "model": "OpenAI / Claude",
        "status": "working",
        "activity": "Synchronizacja telemetrii kodu",
        "currentTool": "code_generation",
        "activeFile": "src/index.ts",
        "fileStats": "+ modified",
        "diffSnippet": [
          { "line": 1, "type": "+", "text": "const vibe = true;" }
        ],
        "lastActiveAt": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
      }
    ]
  }'`;

  const executeLiveTest = async () => {
    setTestStatus('loading');
    setTestResponse(null);
    try {
      const res = await fetch('https://viber-hub.vercel.app/api/v1/agents/active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          agents: [
            {
              id: `test_agent_${Date.now().toString(36)}`,
              provider: 'antigravity',
              name: 'Antigravity Test Agent',
              model: 'Gemini 3.8 Flash',
              status: 'working',
              activity: 'Weryfikacja natychmiastowego przepływu telemetrii w pokoju',
              currentTool: 'live_test_ping',
              activeFile: 'apps/web/app/(dashboard)/rooms/[roomId]/RoomCollabView.tsx',
              fileStats: '+ modified',
              diffSnippet: [
                { line: 1, type: '+', text: '// Zweryfikowano działanie klastra VibeHub' },
                { line: 2, type: '+', text: 'const clusterStatus = "ONLINE_200";' },
              ],
              machine: 'VibeHub Web Console',
              operatorName: 'Operator VibeHub',
              lastActiveAt: new Date().toISOString(),
            },
          ],
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus('success');
        setTestResponse(data);
      } else {
        setTestStatus('error');
        setTestResponse(data);
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestResponse({ error: err.message || 'Błąd połączenia' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white/95 apple-glass rounded-3xl border border-black/[0.08] border-t border-white shadow-[0_24px_70px_rgba(0,0,0,0.25)] p-6 sm:p-8 flex flex-col gap-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <span className="material-symbols-outlined text-[28px]">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#1C1C1E] tracking-tight">
                  Podłącz Agenta AI do Pokoju
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0071E3] text-[10px] font-mono font-bold">
                  Pokój: #{roomId}
                </span>
              </div>
              <p className="text-xs text-[#636366] mt-0.5">
                Skonfiguruj swoje AI (Cursor, Claude Code, Antigravity, Windsurf), aby widzieć jego pracę na żywo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-black/[0.04] p-1 rounded-xl border border-black/[0.04] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'prompt' ? 'bg-white text-[#0071E3] shadow-xs' : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>1. Prompt dla AI</span>
          </button>
          <button
            onClick={() => setActiveTab('mcp')}
            className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'mcp' ? 'bg-white text-[#0071E3] shadow-xs' : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">settings_input_component</span>
            <span>2. Serwer MCP</span>
          </button>
          <button
            onClick={() => setActiveTab('curl')}
            className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'curl' ? 'bg-white text-[#0071E3] shadow-xs' : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>3. Curl / PowerShell</span>
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'test' ? 'bg-white text-emerald-700 shadow-xs' : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>4. Test Na Żywo</span>
          </button>
        </div>

        {/* Tab 1: AI System Prompt */}
        {activeTab === 'prompt' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1C1C1E]">
                Wklej ten prompt do swojego okna chatu z AI (Cursor / Claude / Antigravity):
              </span>
              <button
                onClick={() => handleCopy(aiSystemPrompt, 'prompt')}
                className="px-3 py-1 rounded-lg bg-blue-50 text-[#0071E3] hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedKey === 'prompt' ? 'check' : 'content_copy'}
                </span>
                <span>{copiedKey === 'prompt' ? 'Skopiowano!' : 'Kopiuj Prompt'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto max-h-[320px] whitespace-pre-wrap select-all border border-slate-800">
              {aiSystemPrompt}
            </pre>
            <p className="text-[11px] text-[#8E8E93]">
              Agent po otrzymaniu tego polecenia natychmiast wyśle sygnał obecności i zacznie na bieżąco transmitować postęp swojej pracy do pokoju.
            </p>
          </div>
        )}

        {/* Tab 2: MCP Config */}
        {activeTab === 'mcp' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1C1C1E]">
                Konfiguracja MCP (<code className="font-mono text-[#0071E3]">mcp.json</code> lub ustawienia Cursor / Claude Desktop):
              </span>
              <button
                onClick={() => handleCopy(mcpConfigJson, 'mcp')}
                className="px-3 py-1 rounded-lg bg-blue-50 text-[#0071E3] hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedKey === 'mcp' ? 'check' : 'content_copy'}
                </span>
                <span>{copiedKey === 'mcp' ? 'Skopiowano JSON!' : 'Kopiuj MCP JSON'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto max-h-[300px] border border-slate-800">
              {mcpConfigJson}
            </pre>
            <p className="text-[11px] text-[#8E8E93]">
              Wymaga zainstalowanego pakietu CLI (<code className="font-mono">vibehub pair</code> lub skrótu <code className="font-mono">vibehub mcp</code>).
            </p>
          </div>
        )}

        {/* Tab 3: Direct Curl / PowerShell */}
        {activeTab === 'curl' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1C1C1E]">PowerShell (Windows):</span>
                <button
                  onClick={() => handleCopy(ps1TelemetrySnippet, 'ps1')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 text-[#1C1C1E] transition"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedKey === 'ps1' ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedKey === 'ps1' ? 'Skopiowano!' : 'Kopiuj'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-sky-300 font-mono text-[11px] overflow-x-auto max-h-[140px] border border-slate-800">
                {ps1TelemetrySnippet}
              </pre>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1C1C1E]">Bash / zsh (macOS & Linux):</span>
                <button
                  onClick={() => handleCopy(bashCurlSnippet, 'bash')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 text-[#1C1C1E] transition"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedKey === 'bash' ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedKey === 'bash' ? 'Skopiowano!' : 'Kopiuj'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-[11px] overflow-x-auto max-h-[140px] border border-slate-800">
                {bashCurlSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 4: Live Test Ping */}
        {activeTab === 'test' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Test Łączności Telemetrycznej w Czasie Rzeczywistym</span>
              </div>
              <p className="text-xs text-emerald-950/80 leading-relaxed">
                Kliknij poniższy przycisk, aby wysłać natychmiastowe zdarzenie testowe z przeglądarki prosto do klastra VibeHub.
                Pojawi się ono od razu w Twoim pokoju w zakładce <strong>Room Collab</strong> i <strong>Console Tail</strong>!
              </p>
            </div>

            <button
              onClick={executeLiveTest}
              disabled={testStatus === 'loading'}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${testStatus === 'loading' ? 'animate-spin' : ''}`}>
                {testStatus === 'loading' ? 'refresh' : 'bolt'}
              </span>
              <span>
                {testStatus === 'loading' ? 'Wysyłanie zdarzenia telemetrii...' : '⚡ Wyślij Testowe Zgłoszenie Agenta Teraz'}
              </span>
            </button>

            {testResponse && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#1C1C1E]">Odpowiedź klastra VibeHub:</span>
                <pre
                  className={`p-3 rounded-xl font-mono text-xs overflow-x-auto border ${
                    testStatus === 'success'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-red-950 text-red-300 border-red-800'
                  }`}
                >
                  {JSON.stringify(testResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-black/[0.06] pt-4 text-xs text-[#8E8E93]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Klaster API: viber-hub.vercel.app/api/v1 (ONLINE)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1C1C1E] font-semibold transition cursor-pointer"
            type="button"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
