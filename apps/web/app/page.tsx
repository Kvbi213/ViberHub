import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-between p-8 md:p-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 flex justify-between items-center border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            VH
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white">VIBEHUB</span>
            <span className="ml-2 font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              MVP v0.1
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition"
          >
            Dashboard
          </Link>
          <Link
            href="/rooms/demo-room"
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] transition"
          >
            Otwórz Pokój Współpracy
          </Link>
        </nav>
      </header>

      {/* Hero Content */}
      <section className="relative z-10 my-auto max-w-4xl py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          LOCAL-FIRST AGENT OBSERVABILITY · COLLABORATIVE CODING
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Prawdziwy obraz pracy agentów AI.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
            W czasie rzeczywistym.
          </span>
        </h1>

        <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl">
          Ty i Twój znajomy programista pracujecie na osobnych komputerach, używacie różnych agentów
          (Google Antigravity, Claude Code) i widzicie wspólny, wiarygodny stan projektów.
          Bez zgadywania, bez ujawniania sekretów.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="font-mono text-xs text-cyan-400 mb-1">L1 — PROJEKT</div>
            <div className="font-bold text-sm text-white mb-1">Git & Pliki</div>
            <p className="text-xs text-slate-400">Śledzenie branchy, commitów i modyfikacji w locie.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="font-mono text-xs text-indigo-400 mb-1">L2 — AGENT</div>
            <div className="font-bold text-sm text-white mb-1">Status & Narzędzia</div>
            <p className="text-xs text-slate-400">Oficjalne interfejsy statusline i hooki cyklu życia.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="font-mono text-xs text-purple-400 mb-1">L3 — KONTEKST</div>
            <div className="font-bold text-sm text-white mb-1">Zredagowane Zadania</div>
            <p className="text-xs text-slate-400">Anonimizacja promptów i automatyczny filtr sekretów.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="font-mono text-xs text-emerald-400 mb-1">L4 — PODGLĄD</div>
            <div className="font-bold text-sm text-white mb-1">Live Preview</div>
            <p className="text-xs text-slate-400">Bezpieczny tunel dev i zrzuty ekranu na żywo.</p>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="relative z-10 flex justify-between items-center border-t border-white/10 pt-6 text-xs text-slate-500 font-mono">
        <div>PROTOKÓŁ ANTIGRAVITY v3.2 // MONOREPO SPEC</div>
        <div>FIREBASE FIRESTORE · NEXT.JS 15 · NODE BRIDGE</div>
      </footer>
    </main>
  );
}
