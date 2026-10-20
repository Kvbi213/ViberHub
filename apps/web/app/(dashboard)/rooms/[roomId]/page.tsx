export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Top HUD Nav */}
      <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-black text-xs">
            VH
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-wide text-white">POKÓJ:</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400">
              #{roomId}
            </span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Bridge: Online (win32-desktop)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-slate-400">Partner: @kolega (Online)</span>
          </div>
          <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition">
            Zaproś do pokoju
          </button>
        </div>
      </header>

      {/* Main Dual Workspace Grid */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1920px] mx-auto w-full">
        {/* Kolumna Lewa: Moje Środowisko */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-cyan-400" />
              Moja Stacja Robocza (Local Host)
            </h2>
            <span className="text-xs font-mono text-cyan-400">Google Antigravity</span>
          </div>

          {/* Karta Agenta */}
          <div className="p-5 rounded-xl bg-slate-900/50 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.05)] relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  <span>Antigravity Agent</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                    WORKING
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Model: Gemini 3.8 Flash (High)</div>
              </div>
              <div className="font-mono text-xs text-slate-400">Pewność: 100% (Statusline API)</div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-300 mb-3">
              <div className="text-slate-500 mb-1">// AKTYWNOŚĆ ZADANIOWA</div>
              <div>Planowanie architektury komponentów i przygotowanie makiet UI</div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <div>Narzędzie: <span className="text-cyan-400">write_to_file</span></div>
              <div>TTL Stanu: 28s</div>
            </div>
          </div>

          {/* Git & Pliki */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/10">
            <div className="font-bold text-sm text-white mb-3 flex items-center justify-between">
              <span>Aktywność Kodu & Git</span>
              <span className="font-mono text-xs text-slate-400">branch: feat/bridge-spec</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2 rounded bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-emerald-400">[MOD] apps/web/app/rooms/[roomId]/page.tsx</span>
                <span className="text-slate-500">teraz</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-cyan-400">[ADD] docs/TOPOGRAPHY_TREE.md</span>
                <span className="text-slate-500">2m temu</span>
              </div>
            </div>
          </div>

          {/* Live Preview Placeholder */}
          <div className="flex-1 min-h-[300px] p-5 rounded-xl bg-slate-900/40 border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-sm text-white">Podgląd Aplikacji (Live Preview)</span>
              <span className="font-mono text-xs text-emerald-400">http://localhost:3000</span>
            </div>
            <div className="flex-1 rounded-lg border border-white/5 bg-black/40 flex items-center justify-center text-slate-500 font-mono text-xs">
              [ Ramka Iframe / Dev Viewport ]
            </div>
          </div>
        </div>

        {/* Kolumna Prawa: Środowisko Kolegi */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-indigo-400" />
              Stacja Kolegi (@kolega)
            </h2>
            <span className="text-xs font-mono text-indigo-400">Claude Code</span>
          </div>

          {/* Karta Agenta Kolegi */}
          <div className="p-5 rounded-xl bg-slate-900/50 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.05)] relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  <span>Claude Code Agent</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-white/10">
                    IDLE
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Model: Claude 3.5 Sonnet</div>
              </div>
              <div className="font-mono text-xs text-slate-400">Pewność: 100% (Hooks API)</div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-300 mb-3">
              <div className="text-slate-500 mb-1">// OSTATNIA AKTYWNOŚĆ</div>
              <div>Zakończono weryfikację schematów Zod dla protokołu zdarzeń</div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <div>Ostatnie narzędzie: <span className="text-indigo-400">vitest run</span></div>
              <div>Uśpiony: 4m temu</div>
            </div>
          </div>

          {/* Git & Pliki Kolegi */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/10">
            <div className="font-bold text-sm text-white mb-3 flex items-center justify-between">
              <span>Aktywność Kodu & Git Kolegi</span>
              <span className="font-mono text-xs text-slate-400">branch: feat/contracts</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2 rounded bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-slate-400">[COMMIT] a4b8c9d — feat: zod schemas for contracts</span>
                <span className="text-slate-500">6m temu</span>
              </div>
            </div>
          </div>

          {/* Live Preview Kolegi */}
          <div className="flex-1 min-h-[300px] p-5 rounded-xl bg-slate-900/40 border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-sm text-white">Podgląd Aplikacji Kolegi</span>
              <span className="font-mono text-xs text-indigo-400">https://tunel-kolega.dev</span>
            </div>
            <div className="flex-1 rounded-lg border border-white/5 bg-black/40 flex items-center justify-center text-slate-500 font-mono text-xs">
              [ Ramka Iframe / Tunel Zdalny ]
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
