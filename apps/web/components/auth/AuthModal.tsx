'use client';

import React, { useState } from 'react';
import { useVibeHubStore } from '@/lib/store';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginAsGuest,
} from '@/lib/auth-service';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen } = useVibeHubStore();
  const [tab, setTab] = useState<'login' | 'register' | 'guest'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [guestNick, setGuestNick] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setErrorMsg('');
    setAuthModalOpen(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      if (tab === 'login') {
        await loginWithEmail(email, password);
      } else {
        if (!name.trim()) throw new Error('Podaj nazwę wyświetlaną');
        await registerWithEmail(email, password, name.trim());
      }
      handleClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Wystąpił błąd autoryzacji');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      handleClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Błąd logowania przez Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await loginAsGuest(guestNick);
      handleClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Błąd logowania jako gość');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white/95 apple-glass rounded-2xl border border-black/[0.08] border-t border-white/90 p-6 shadow-2xl flex flex-col gap-5 relative text-[#1C1C1E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0071E3] to-[#34C759] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              VH
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">Konto VibeHub Co-op</h2>
              <p className="text-[12px] text-[#8E8E93]">Zapisuj czas kodowania w parze i statystyki sesji</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#636366] transition"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-black/[0.04] p-1 gap-1">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
              tab === 'login' ? 'bg-white text-[#1C1C1E] shadow-sm' : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
          >
            Logowanie
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
              tab === 'register' ? 'bg-white text-[#1C1C1E] shadow-sm' : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
          >
            Rejestracja
          </button>
          <button
            type="button"
            onClick={() => setTab('guest')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
              tab === 'guest' ? 'bg-white text-[#1C1C1E] shadow-sm' : 'text-[#636366] hover:text-[#1C1C1E]'
            }`}
          >
            ⚡ Tryb Gościa
          </button>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab content: Login or Register */}
        {(tab === 'login' || tab === 'register') && (
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-3.5">
            {tab === 'register' && (
              <div>
                <label className="block text-[11px] font-mono-status text-[#636366] uppercase mb-1">
                  Twój Nick / Imię
                </label>
                <input
                  type="text"
                  required
                  placeholder="np. Jakub (Dev)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
                />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-mono-status text-[#636366] uppercase mb-1">Adres Email</label>
              <input
                type="email"
                required
                placeholder="dev@vibehub.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono-status text-[#636366] uppercase mb-1">Hasło</label>
              <input
                type="password"
                required
                placeholder="Minimum 6 znaków"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-2.5 rounded-xl bg-[#0071E3] hover:bg-blue-600 text-white font-medium text-sm transition shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              {loading ? 'Przetwarzanie...' : tab === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
            </button>

            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-black/[0.06]" />
              <span className="text-[11px] font-mono-status text-[#8E8E93] uppercase">lub</span>
              <div className="flex-1 h-px bg-black/[0.06]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.1] text-[#1C1C1E] font-medium text-xs flex items-center justify-center gap-2 transition shadow-sm"
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
              Kontynuuj z Google
            </button>
          </form>
        )}

        {/* Tab content: Guest */}
        {tab === 'guest' && (
          <form onSubmit={handleGuestAuth} className="flex flex-col gap-3.5">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[12px] text-amber-800 leading-relaxed">
              <strong>Szybki start:</strong> Wejdź jako gość bez podawania hasła. Twoje statystyki z tej sesji będą powiązane z tym urządzeniem.
            </div>
            <div>
              <label className="block text-[11px] font-mono-status text-[#636366] uppercase mb-1">
                Pseudonim (opcjonalnie)
              </label>
              <input
                type="text"
                placeholder="np. Hacker_99"
                value={guestNick}
                onChange={(e) => setGuestNick(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-2.5 rounded-xl bg-[#34C759] hover:bg-emerald-600 text-white font-medium text-sm transition shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              {loading ? 'Inicjowanie sesji...' : 'Dołącz jako Gość natychmiast'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
