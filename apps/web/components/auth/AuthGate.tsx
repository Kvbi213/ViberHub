'use client';

import React, { useState } from 'react';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginAsGuest,
  isResilientFallbackError,
  createFallbackUser,
  createOrUpdateUserProfileDirect,
  saveLocalSession,
} from '@/lib/auth-service';
import { useVibeHubStore } from '@/lib/store';

export function AuthGate() {
  const [tab, setTab] = useState<'guest' | 'login' | 'register'>('guest');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isVercelPreview = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');

  const { setCurrentUser } = useVibeHubStore();

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await loginAsGuest(nickname.trim() || undefined);
      setCurrentUser(user);
    } catch (err: any) {
      if (isResilientFallbackError(err)) {
        const fallback = createFallbackUser(null, true, nickname.trim() || undefined);
        const profile = await createOrUpdateUserProfileDirect(fallback);
        saveLocalSession(profile);
        setCurrentUser(profile);
        return;
      }
      setError(err?.message || 'Błąd trybu gościa');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Wypełnij wszystkie pola');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (tab === 'register') {
        const user = await registerWithEmail(email, password, nickname.trim() || 'Operator');
        setCurrentUser(user);
      } else {
        const user = await loginWithEmail(email, password);
        setCurrentUser(user);
      }
    } catch (err: any) {
      if (isResilientFallbackError(err)) {
        const fallback = createFallbackUser(email, false, nickname.trim() || undefined);
        const profile = await createOrUpdateUserProfileDirect(fallback);
        saveLocalSession(profile);
        setCurrentUser(profile);
        return;
      }
      setError(err?.message || 'Błąd uwierzytelniania');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      setCurrentUser(user);
    } catch (err: any) {
      if (isResilientFallbackError(err)) {
        const fallback = createFallbackUser('operator@vibehub.cloud', false, 'Google Operator');
        const profile = await createOrUpdateUserProfileDirect(fallback);
        saveLocalSession(profile);
        setCurrentUser(profile);
        return;
      }
      setError(err?.message || 'Błąd logowania przez Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Ambient Radial Glass Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_10%,rgba(0,113,227,0.12),rgba(244,245,248,0.85))]" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 my-auto">
        {/* Top Header & Branding */}
        <div className="flex flex-col items-center text-center gap-2 max-w-xl">
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/80 border border-black/[0.06] shadow-xs mb-1">
            <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
            <span className="font-mono-status text-[11px] text-[#1C1C1E] font-semibold tracking-wide">
              VIBEHUB OBSERVABILITY PLATFORM v0.2.1
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1E] apple-headline">
            Współpraca i Obserwowalność <span className="text-[#0071E3]">Agentów AI</span>
          </h1>
          <p className="text-sm text-[#636366] leading-relaxed max-w-md">
            Wielostanowiskowa telemetria oparta o natywny protokół <strong>MCP (Model Context Protocol)</strong> dla edytorów Cursor, Google Antigravity i Claude Code.
          </p>

          {isVercelPreview && (
            <div className="flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 text-[#0071E3] text-[11px] font-medium shadow-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-pulse" />
                Vercel Preview: Resilient Cloud Session aktywna
              </span>
              <a
                href="https://viberhub-8842f.web.app"
                className="underline font-bold hover:text-blue-700"
              >
                Oficjalny hosting &rarr;
              </a>
            </div>
          )}
        </div>

        {/* Auth Gate Card */}
        <div className="w-full max-w-lg bg-white/85 apple-glass border border-black/[0.08] border-t border-white p-6 sm:p-8 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          {/* Segmented Control Tabs */}
          <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-black/[0.04]">
            <button
              onClick={() => {
                setTab('guest');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
                tab === 'guest'
                  ? 'bg-white text-[#0071E3] shadow-xs'
                  : 'text-[#636366] hover:text-[#1C1C1E]'
              }`}
            >
              ⚡ Szybki Gość
            </button>
            <button
              onClick={() => {
                setTab('login');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
                tab === 'login'
                  ? 'bg-white text-[#0071E3] shadow-xs'
                  : 'text-[#636366] hover:text-[#1C1C1E]'
              }`}
            >
              🔑 Logowanie
            </button>
            <button
              onClick={() => {
                setTab('register');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
                tab === 'register'
                  ? 'bg-white text-[#0071E3] shadow-xs'
                  : 'text-[#636366] hover:text-[#1C1C1E]'
              }`}
            >
              ✨ Nowe Konto
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50/90 border border-red-200 text-xs text-red-700 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">error</span>
                <span className="font-semibold">{error}</span>
              </div>
              {error.includes('unauthorized-domain') && (
                <div className="pt-2 border-t border-red-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] text-red-800">
                    Domena Vercel Preview nie jest zarejestrowana w Google Auth.
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      const fallback = createFallbackUser(email || 'dev@vibehub.local', false, nickname.trim() || undefined);
                      const profile = await createOrUpdateUserProfileDirect(fallback);
                      saveLocalSession(profile);
                      setCurrentUser(profile);
                    }}
                    className="apple-btn px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    Zaloguj w Trybie Resilient &rarr;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 1: Guest Login */}
          {tab === 'guest' && (
            <form onSubmit={handleGuestLogin} className="flex flex-col gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col gap-1">
                <span className="text-xs font-bold text-[#0071E3] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  Błyskawiczny Dostęp (Zero Haseł)
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Utworzy sesję gościa i przekieruje Cię bezpośrednio do kreatora, gdzie wygenerujesz gotowe polecenie MCP dla swojego Agenta AI.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1C1E]">
                  Twój Pseudonim lub Imię Operatora (opcjonalne)
                </label>
                <input
                  type="text"
                  placeholder="np. Jakub (Lead Architect)"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-[#0071E3] text-white text-sm font-semibold shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:bg-blue-600 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    Rozpocznij Konfigurację MCP i Wejdź
                  </>
                )}
              </button>
            </form>
          )}

          {/* Tab 2: Email Login */}
          {tab === 'login' && (
            <form onSubmit={handleEmailAuth} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1C1E]">Adres Email</label>
                <input
                  type="email"
                  required
                  placeholder="dev@vibehub.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1C1E]">Hasło</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 py-2.5 rounded-xl bg-[#0071E3] text-white text-sm font-semibold shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:bg-blue-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Zaloguj się do platformy'
                )}
              </button>

              <div className="relative my-2 flex items-center justify-center">
                <div className="w-full border-t border-black/[0.08]" />
                <span className="absolute bg-white px-2 text-[10px] uppercase font-mono-status text-[#8E8E93]">
                  LUB
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-2.5 rounded-xl border border-black/[0.1] bg-white hover:bg-slate-50 text-xs font-semibold text-[#1C1C1E] transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Zaloguj przez Google
              </button>
            </form>
          )}

          {/* Tab 3: Register */}
          {tab === 'register' && (
            <form onSubmit={handleEmailAuth} className="flex flex-col gap-3.5">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col gap-1">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                  Architektura MCP-First
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Po rejestracji automatycznie przejdziesz do kreatora z gotowym poleceniem MCP do wklejenia w czacie z agentem (Cursor / Antigravity / Claude Code).
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1C1E]">Pseudonim Operatora</label>
                <input
                  type="text"
                  required
                  placeholder="np. Jakub Lis"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1C1E]">Adres Email</label>
                <input
                  type="email"
                  required
                  placeholder="dev@vibehub.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1C1E]">Hasło (min. 6 znaków)</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 py-2.5 rounded-xl bg-[#0071E3] text-white text-sm font-semibold shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:bg-blue-600 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Utwórz konto i odbierz polecenie dla AI'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Feature Badges Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-center">
          <div className="p-3 rounded-2xl bg-white/60 border border-black/[0.04] flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[20px] text-[#0071E3]">smart_toy</span>
            <span className="text-xs font-bold text-[#1C1C1E]">Architektura MCP-First</span>
            <span className="text-[11px] text-[#636366]">Natywny protokół MCP dla Cursor, Antigravity i Claude</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/60 border border-black/[0.04] flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[20px] text-[#34C759]">shield</span>
            <span className="text-xs font-bold text-[#1C1C1E]">L1–L4 Zero-Trust</span>
            <span className="text-[11px] text-[#636366]">Automatyczna redakcja kluczy i sekretów</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/60 border border-black/[0.04] flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[20px] text-[#FF9500]">monitoring</span>
            <span className="text-xs font-bold text-[#1C1C1E]">Live Mesh &amp; Diffs</span>
            <span className="text-[11px] text-[#636366]">Strumieniowanie diffów i statusu agentów na żywo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
