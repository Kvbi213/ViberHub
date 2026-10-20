'use client';

import React, { useState } from 'react';
import { useVibeHubStore } from '@/lib/store';
import { completeUserOnboarding } from '@/lib/auth-service';

export function OnboardingWizard() {
  const { currentUser, setCurrentUser, setRoomId, togglePermission, permissions } = useVibeHubStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Jakub (Operator)');
  const [role, setRole] = useState(currentUser?.preferences?.role || 'Systems & Observability Architect');
  const [room, setRoom] = useState(currentUser?.preferences?.defaultRoom || 'viberhub-8842f');
  const [copiedCode, setCopiedCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const roles = [
    { id: 'Systems & Observability Architect', label: 'Systems & Observability Architect', icon: 'hub' },
    { id: 'Fullstack AI Engineer', label: 'Fullstack AI Engineer', icon: 'terminal' },
    { id: 'Autonomous Agent Pilot', label: 'Autonomous Agent Pilot', icon: 'smart_toy' },
    { id: 'Security & Redaction Lead', label: 'Security & Redaction Lead', icon: 'shield' },
  ];

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
    } catch (err) {
      console.warn('[!] ALERT :: Onboarding finish error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const copyPairingCommand = () => {
    navigator.clipboard.writeText('vibehub pair VH-9428-XK');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Ambient Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(0,113,227,0.1),rgba(244,245,248,0.85))]" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-6 my-auto">
        {/* Progress Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono-status text-[#8E8E93]">
            <span className="font-semibold text-[#0071E3] uppercase tracking-wider">
              KROK {step} Z 4: {step === 1 ? 'TOŻSAMOŚĆ' : step === 2 ? 'ŚRODOWISKO' : step === 3 ? 'BEZPIECZEŃSTWO' : 'INTEGRACJA CLI'}
            </span>
            <span>{Math.round((step / 4) * 100)}% UKOŃCZONO</span>
          </div>

          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0071E3] h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Step Card */}
        <div className="bg-white/85 apple-glass border border-black/[0.08] border-t border-white p-6 sm:p-8 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          {/* STEP 1: Tożsamość i Rola */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline">
                  Krok 1: Twoja Tożsamość Operatora
                </h2>
                <p className="text-xs text-[#636366] mt-1">
                  Określ swój pseudonim i specjalizację, pod którymi agenci i współpracownicy będą Cię identyfikować.
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
                <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline">
                  Krok 2: Konfiguracja Przestrzeni i Pokoju
                </h2>
                <p className="text-xs text-[#636366] mt-1">
                  Wybierz domyślny pokój obserwowalności lub utwórz dedykowany namespace.
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
                  Domyślny pokój demonstracyjny: <strong className="text-[#1C1C1E]">viberhub-8842f</strong>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-black/[0.05] flex flex-col gap-2">
                <span className="text-xs font-bold text-[#1C1C1E]">Architektura Połączenia</span>
                <div className="flex items-center justify-between text-xs text-[#636366]">
                  <span>Serwer Obserwowalności (Vercel):</span>
                  <strong className="text-emerald-700 font-mono">viber-hub.vercel.app (24/7)</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-[#636366]">
                  <span>Magazyn Danych Zdarzeń:</span>
                  <strong className="text-[#0071E3] font-mono">Cloud Firestore (europe-central2)</strong>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Bezpieczeństwo i Prywatność L1-L4 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline">
                  Krok 3: Zasady Bezpieczeństwa L1–L4
                </h2>
                <p className="text-xs text-[#636366] mt-1">
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

          {/* STEP 4: Podłączenie CLI Bridge */}
          {step === 4 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1E] apple-headline">
                  Krok 4: Integracja ze Stacją Roboczą
                </h2>
                <p className="text-xs text-[#636366] mt-1">
                  Twój lokalny demon Bridge jest już zainstalowany i gotowy do wysyłania telemetrii z kodu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-black/[0.06] flex flex-col gap-3">
                <span className="text-xs font-semibold text-[#1C1C1E]">
                  Polecenie parowania w PowerShell / Terminalu:
                </span>
                <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-black/[0.08]">
                  <code className="text-xs font-mono text-[#0071E3] font-bold">
                    vibehub pair VH-9428-XK
                  </code>
                  <button
                    type="button"
                    onClick={copyPairingCommand}
                    className="apple-btn px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#1C1C1E] flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copiedCode ? 'check' : 'content_copy'}
                    </span>
                    {copiedCode ? 'Skopiowano' : 'Kopiuj'}
                  </button>
                </div>
                <span className="text-[11px] text-[#636366]">
                  Możesz uruchomić to polecenie w dowolnym momencie w swoim projekcie. Możesz też przejść do Dashboardu bez uruchamiania Bridge — agenci będą symulowani w chmurze.
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 gap-2">
                  <div className="text-[11px] text-emerald-950 font-medium">
                    Nie masz jeszcze komendy vibehub w terminalu?
                  </div>
                  <a
                    href="/vibehub-cli-bundle.zip"
                    download="vibehub-cli-bundle.zip"
                    className="apple-btn px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs shrink-0"
                  >
                    <span className="material-symbols-outlined text-[14px]">download</span>
                    Zgraj Paczkę CLI (.ZIP)
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-700 text-[20px]">verified</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-emerald-900">Środowisko Skonfigurowane</span>
                  <span className="text-[11px] text-emerald-700">Wszystkie metryki, uprawnienia i profil są gotowe do pracy.</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
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
