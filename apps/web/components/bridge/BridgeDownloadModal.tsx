'use client';

import React, { useState } from 'react';

interface BridgeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairingCode?: string;
}

export function BridgeDownloadModal({ isOpen, onClose, pairingCode = 'VH-9428-XK' }: BridgeDownloadModalProps) {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(label);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const ps1OneLiner = `powershell -c "irm https://viberhub-8842f.web.app/install.ps1 | iex"`;
  const shOneLiner = `curl -fsSL https://viberhub-8842f.web.app/install.sh | bash`;
  const pairCmd = `vibehub pair ${pairingCode}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white/95 apple-glass rounded-3xl border border-black/[0.08] border-t border-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-6 sm:p-8 flex flex-col gap-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#1C1C1E] tracking-tight">
                  Zgraj VibeHub Bridge CLI
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  v0.1.7 Standalone
                </span>
              </div>
              <p className="text-xs text-[#636366] mt-0.5">
                Pobierz skrypty i pliki odpowiedzialne za działanie komend terminalowych <code className="text-[#0071E3] font-mono">vibehub pair</code>.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Option 1: Direct Download Buttons */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#8E8E93]">
            1. Bezpośrednie Pobieranie Paczki (Gotowe do Uruchomienia)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Download Full ZIP */}
            <a
              href="/vibehub-cli-bundle.zip"
              download="vibehub-cli-bundle.zip"
              className="apple-btn flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/70 border border-blue-200/70 hover:border-blue-400/80 hover:shadow-md transition group text-left"
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
              className="apple-btn flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200/70 hover:border-emerald-400/80 hover:shadow-md transition group text-left"
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
        </div>

        {/* Option 2: 1-Line Terminal PowerShell Command */}
        <div className="flex flex-col gap-2 bg-slate-50 border border-black/[0.06] p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1C1C1E] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#0071E3]">terminal</span>
              Automatyczna instalacja w PowerShell (Windows)
            </span>
            <button
              onClick={() => handleCopy(ps1OneLiner, 'ps1')}
              className="apple-btn px-2.5 py-1 rounded-lg bg-white border border-black/[0.08] hover:bg-slate-100 text-[11px] font-semibold text-[#0071E3] flex items-center gap-1 transition"
            >
              <span className="material-symbols-outlined text-[13px]">
                {copiedCmd === 'ps1' ? 'check' : 'content_copy'}
              </span>
              {copiedCmd === 'ps1' ? 'Skopiowano!' : 'Kopiuj'}
            </button>
          </div>
          <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[12px] overflow-x-auto select-all">
            {ps1OneLiner}
          </div>
        </div>

        {/* Option 3: Linux / macOS Command */}
        <div className="flex flex-col gap-2 bg-slate-50 border border-black/[0.06] p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1C1C1E] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#34C759]">laptop</span>
              Instalacja w Linux / macOS / WSL
            </span>
            <button
              onClick={() => handleCopy(shOneLiner, 'sh')}
              className="apple-btn px-2.5 py-1 rounded-lg bg-white border border-black/[0.08] hover:bg-slate-100 text-[11px] font-semibold text-[#34C759] flex items-center gap-1 transition"
            >
              <span className="material-symbols-outlined text-[13px]">
                {copiedCmd === 'sh' ? 'check' : 'content_copy'}
              </span>
              {copiedCmd === 'sh' ? 'Skopiowano!' : 'Kopiuj'}
            </button>
          </div>
          <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[12px] overflow-x-auto select-all">
            {shOneLiner}
          </div>
        </div>

        {/* Step 3: Pairing instruction */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900">
              Krok 2: Po zainstalowaniu sparuj stację w terminalu
            </span>
            <button
              onClick={() => handleCopy(pairCmd, 'pair')}
              className="apple-btn px-2.5 py-1 rounded-lg bg-white border border-blue-200 hover:bg-blue-100 text-[11px] font-semibold text-[#0071E3] flex items-center gap-1 transition"
            >
              <span className="material-symbols-outlined text-[13px]">
                {copiedCmd === 'pair' ? 'check' : 'content_copy'}
              </span>
              {copiedCmd === 'pair' ? 'Skopiowano!' : 'Kopiuj komendę'}
            </button>
          </div>
          <div className="bg-white border border-blue-200/80 p-2.5 rounded-xl font-mono text-[13px] font-bold text-[#0071E3] flex items-center justify-between">
            <span>{pairCmd}</span>
          </div>
          <p className="text-[11px] text-blue-800/80 leading-relaxed">
            Stacja natychmiast zarejestruje się w klastrze, a aktywny agent AI (Google Antigravity, Claude Code lub Cursor) zacznie strumieniować swój stan w czasie rzeczywistym.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-black/[0.06] pt-4">
          <span className="text-[11px] text-[#8E8E93] font-mono">
            Wymaga: Node.js 18+ (https://nodejs.org)
          </span>
          <button
            onClick={onClose}
            className="apple-btn px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition"
          >
            Zamknij
          </button>
        </div>

      </div>
    </div>
  );
}
