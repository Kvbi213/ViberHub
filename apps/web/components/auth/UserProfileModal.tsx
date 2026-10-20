'use client';

import React from 'react';
import { useVibeHubStore } from '@/lib/store';

function formatSeconds(totalSec: number): string {
  if (!totalSec || totalSec <= 0) return '0m 0s';
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

export function UserProfileModal() {
  const {
    currentUser,
    isProfileModalOpen,
    setProfileModalOpen,
    activeCoopSessionSeconds,
    handleLogout,
    roomId,
  } = useVibeHubStore();

  if (!isProfileModalOpen || !currentUser) return null;

  const totalSeconds = (currentUser.stats?.totalCoopSeconds || 0) + activeCoopSessionSeconds;
  const sessions = currentUser.stats?.totalSessionsCount || 1;
  const eventsEmitted = currentUser.stats?.totalEventsEmitted || 0;

  // Obliczanie rangi i postępu do kolejnego poziomu
  let rank = 'Co-op Novice';
  let nextRankGoal = 3600; // 1 godzina
  if (totalSeconds >= 3600 * 10) {
    rank = 'Architect Elite';
    nextRankGoal = 3600 * 25;
  } else if (totalSeconds >= 3600 * 3) {
    rank = 'Pair Pilot Pro';
    nextRankGoal = 3600 * 10;
  } else if (totalSeconds >= 1800) {
    rank = 'Collaborative Coder';
    nextRankGoal = 3600 * 3;
  }
  const progressPercent = Math.min(100, Math.round((totalSeconds / nextRankGoal) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white/95 apple-glass rounded-2xl border border-black/[0.08] border-t border-white/90 p-6 shadow-2xl flex flex-col gap-6 relative text-[#1C1C1E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-2xl ring-2 ring-white shadow-md bg-slate-100 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">{currentUser.displayName}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-status font-bold bg-blue-50 text-[#0071E3] border border-blue-200/60">
                  {rank}
                </span>
              </div>
              <p className="text-[12px] text-[#8E8E93]">
                {currentUser.email || (currentUser.isAnonymous ? 'Sesja Gościa (UID: ' + currentUser.uid.substring(0, 6) + '...)' : 'Użytkownik VibeHub')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setProfileModalOpen(false)}
            className="w-7 h-7 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#636366] transition"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Live Co-op Counter Highlight Banner */}
        <div className="rounded-xl p-4 bg-gradient-to-r from-blue-50/80 to-emerald-50/80 border border-blue-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-status uppercase text-[#636366] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
              Łączny czas kodowania w Co-op
            </span>
            <span className="text-[11px] font-mono-status text-[#0071E3] font-bold">
              +{formatSeconds(activeCoopSessionSeconds)} w tej sesji
            </span>
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-[#1C1C1E]">
            {formatSeconds(totalSeconds)}
          </div>
          <div className="w-full bg-black/[0.06] h-2 rounded-full overflow-hidden mt-1">
            <div
              className="bg-gradient-to-r from-[#0071E3] to-[#34C759] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono-status text-[#8E8E93]">
            <span>Ranga: {rank}</span>
            <span>{progressPercent}% do kolejnego poziomu</span>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-1">
            <span className="text-[11px] font-mono-status text-[#8E8E93] uppercase">Sesje Programowania</span>
            <span className="text-lg font-bold font-mono text-[#1C1C1E]">{sessions}</span>
            <span className="text-[11px] text-[#636366]">Aktywna stacja robocza</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-1">
            <span className="text-[11px] font-mono-status text-[#8E8E93] uppercase">Zdarzenia Telemetrii</span>
            <span className="text-lg font-bold font-mono text-[#0071E3]">{eventsEmitted}</span>
            <span className="text-[11px] text-[#636366]">Zsynchronizowane z Firestore</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-1">
            <span className="text-[11px] font-mono-status text-[#8E8E93] uppercase">Aktywny Pokój</span>
            <span className="text-sm font-semibold font-mono text-[#1C1C1E] truncate">#{roomId}</span>
            <span className="text-[11px] text-emerald-600 font-medium">Liveness: ONLINE</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-1">
            <span className="text-[11px] font-mono-status text-[#8E8E93] uppercase">Połączony Agent</span>
            <span className="text-sm font-semibold text-[#1C1C1E]">Google Antigravity</span>
            <span className="text-[11px] text-[#636366]">Protokół v2.4-rt</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
          <span className="text-[11px] text-[#8E8E93]">
            ID: <code className="font-mono">{currentUser.uid.substring(0, 10)}...</code>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium text-xs transition border border-rose-200/60 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Wyloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
