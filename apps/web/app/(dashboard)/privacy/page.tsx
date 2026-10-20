'use client';

import React from 'react';
import { useVibeHubStore } from '@/lib/store';

export default function PrivacyMatrixPage() {
  const { permissions, togglePermission } = useVibeHubStore();

  const scopes = [
    {
      id: 'L1_git',
      level: 'L1',
      title: 'Stan Projektu i System Plików (Git & File Watcher)',
      desc: 'Udostępnia nazwy zmienianych plików, gałąź Git, historię commitów i podstawowy status repozytorium.',
      active: permissions.L1_git,
      badge: 'ZALECANE DLA WSPÓŁPRACY',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'L2_agent',
      level: 'L2',
      title: 'Status Agenta AI i Narzędzia (Lifecycle & Tools)',
      desc: 'Raportuje stan operacyjny agenta (working, waiting, idle), nazwę używanego narzędzia i poziom pewności.',
      active: permissions.L2_agent,
      badge: 'OFICJALNE API STATUSLINE',
      badgeColor: 'bg-blue-50 text-apple-blue border-blue-200',
    },
    {
      id: 'L3_context',
      level: 'L3',
      title: 'Kontekst Zadania i Zredagowane Wyjścia (Task Intent)',
      desc: 'Udostępnia zanonimizowane podsumowanie aktualnego zadania. Wszystkie sekrety, klucze i .env są automatycznie wycinane.',
      active: permissions.L3_context,
      badge: 'AUTOMATYCZNA SANITYZACJA',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'L4_preview',
      level: 'L4',
      title: 'Wizualizacja i Podgląd Live Preview (Dev Viewport)',
      desc: 'Włącza bezpieczny tunel deweloperski mTLS (HTTPS), umożliwiając partnerowi podgląd działającej aplikacji w iframe.',
      active: permissions.L4_preview,
      badge: 'SZYFROWANY TUNEL mTLS',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-8 gap-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] apple-headline">
            Kontrola Prywatności i Matryca Uprawnień (L1 – L4)
          </h1>
          <p className="text-sm text-[#636366] mt-1">
            Określ, jakie dane z Twojego komputera są synchronizowane z drugim deweloperem w pokoju.
          </p>
        </div>

        {/* Permission Toggles */}
        <div className="flex flex-col gap-4">
          {scopes.map((scope) => (
            <div
              key={scope.id}
              className="apple-card bg-white/80 apple-glass p-5 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-glass flex items-start justify-between gap-6"
            >
              <div className="flex flex-col gap-1.5 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 border border-black/[0.05] flex items-center justify-center font-bold text-xs text-[#0071E3] font-mono">
                    {scope.level}
                  </span>
                  <h3 className="font-bold text-sm text-[#1C1C1E]">{scope.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${scope.badgeColor}`}
                  >
                    {scope.badge}
                  </span>
                </div>
                <p className="text-xs text-[#636366] leading-relaxed pl-11">{scope.desc}</p>
              </div>

              {/* Apple-style Toggle Switch */}
              <button
                type="button"
                onClick={() => togglePermission(scope.id as keyof typeof permissions)}
                className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center ${
                  scope.active ? 'bg-[#34C759]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    scope.active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Strict Denylist / Redaction Audit Box */}
        <div className="apple-card bg-white/80 apple-glass p-6 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-glass flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-emerald-700">security</span>
            <h2 className="text-sm font-bold text-[#1C1C1E]">
              Gwarancja Bezpieczeństwa: Czarna Lista Ścieżek (Strict Denylist)
            </h2>
          </div>
          <p className="text-xs text-[#636366] leading-relaxed">
            Następujące pliki i wzorce są <strong>bezwzględnie blokowane</strong> przez silnik redakcji w lokalnym
            Bridge i nigdy nie opuszczają Twojej stacji roboczej:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 font-mono text-[11px] text-[#3A3A3C]">
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">.env / *.env</div>
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">*.pem / *.key</div>
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">service-account*.json</div>
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">*.sqlite / *.db</div>
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">node_modules/</div>
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">.git/ (raw internals)</div>
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">sk-... (API keys)</div>
            <div className="p-2 rounded-lg bg-slate-50 border border-black/[0.04]">ghp_... (GitHub PAT)</div>
          </div>
        </div>
      </div>
  );
}
