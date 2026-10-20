'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useVibeHubStore } from '@/lib/store';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserProfileModal } from '@/components/auth/UserProfileModal';
import { BridgeDownloadModal } from '@/components/bridge/BridgeDownloadModal';

function formatTimer(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s < 10 ? '0' : ''}${s}s`;
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const {
    roomId,
    roomName,
    isBridgeConnected,
    bridgeLatency,
    currentUser,
    activeCoopSessionSeconds,
    tickCoopTimer,
    initAuthListener,
    setAuthModalOpen,
    setProfileModalOpen,
  } = useVibeHubStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash);
      const handleHashChange = () => setHash(window.location.hash);
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  useEffect(() => {
    const unsubAuth = initAuthListener();
    const interval = setInterval(() => {
      tickCoopTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
      unsubAuth();
    };
  }, [tickCoopTimer, initAuthListener]);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'monitoring',
      isActive: pathname === '/dashboard' || pathname === '/',
    },
    {
      id: 'collab',
      label: 'Room Collab & Preview',
      path: `/rooms/${roomId}`,
      icon: 'group_work',
      isActive: pathname.startsWith('/rooms'),
    },
    {
      id: 'settings',
      label: 'Bridge & Stacje',
      path: '/settings',
      icon: 'developer_board',
      isActive: pathname.startsWith('/settings'),
    },
    {
      id: 'privacy',
      label: 'Prywatność & Uprawnienia',
      path: '/privacy',
      icon: 'admin_panel_settings',
      isActive: pathname.startsWith('/privacy'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1C1C1E] antialiased selection:bg-blue-100 selection:text-blue-900 relative">
      {/* Radial Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,rgba(255,255,255,0.95),rgba(244,245,248,0.7))]" />

      {/* Milky Frosted Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/75 apple-glass border-r border-black/[0.06] border-t border-white/80 z-50 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col">
          {/* Top Brand Header */}
          <div className="h-14 px-6 flex items-center justify-between border-b border-black/[0.05] bg-white/40">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759] status-pulse-green" />
              <span className="font-mono-code text-[12px] text-[#1C1C1E] uppercase tracking-wider font-semibold">
                VIBE_CORE
              </span>
            </Link>
            <span className="px-1.5 py-0.5 rounded-md bg-black/[0.04] border border-black/[0.04] font-mono-status text-[10px] font-medium text-[#636366]">
              v2.4-rt
            </span>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-3">
            <div className="px-3 py-1 mb-1 font-mono-status text-[10px] text-[#8E8E93] uppercase tracking-wider font-semibold">
              Navigation Engine
            </div>
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`apple-btn flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition ${
                    item.isActive
                      ? 'bg-[#0071E3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.28)] border-t border-white/20'
                      : 'text-[#636366] hover:bg-black/[0.04] hover:text-[#1C1C1E]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span className="font-title-sm apple-subtext">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Kernel Daemon Footer Status */}
        <div className="p-4 border-t border-black/[0.05] bg-white/40">
          <div className="rounded-xl bg-white/80 border border-black/[0.05] border-t border-white/90 p-3 flex flex-col gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <span className="font-mono-status text-[11px] text-[#636366] uppercase font-medium">
                Kernel Daemon
              </span>
              <span className="font-mono-status text-[11px] text-[#34C759] font-bold">ONLINE</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#34C759] h-full w-[82%] rounded-full shadow-[0_0_6px_rgba(52,199,89,0.4)] transition-all duration-700 ease-out" />
            </div>
            <div className="flex items-center justify-between font-mono-status text-[10px] text-[#8E8E93] tracking-[0.01em]">
              <span>Mem: 412MB</span>
              <span>Loop: 0.8ms</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 relative z-10">
        {/* Frosted Glass Header */}
        <header className="fixed top-0 left-64 right-0 h-14 bg-white/80 apple-glass border-b border-black/[0.06] border-t border-white/80 z-40 shadow-[0_4px_24px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]">
          <div className="h-14 w-full px-6 flex items-center justify-between gap-4">
            {/* Left Header Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0071E3] to-[#34C759] flex items-center justify-center font-black text-white text-xs shadow-sm">
                  VH
                </div>
                <span className="font-headline-md text-base text-[#1C1C1E] font-semibold tracking-[-0.025em]">
                  VibeHub
                </span>
              </div>

              {/* Room Badge */}
              <div className="apple-btn hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 border border-black/[0.05] text-[#3A3A3C] shadow-sm">
                <span className="material-symbols-outlined text-[#8E8E93] text-[16px]">corporate_fare</span>
                <span className="font-mono-code text-[12px] font-medium text-[#1C1C1E] tracking-[0.01em]">
                  Room #{roomId}: {roomName}
                </span>
                <span className="material-symbols-outlined text-[#8E8E93] text-[16px]">expand_more</span>
              </div>
            </div>

            {/* Right Controls & Status */}
            <div className="flex items-center gap-3">
              {/* Live Co-op Timer Chip */}
              <div
                onClick={() => {
                  if (currentUser) setProfileModalOpen(true);
                  else setAuthModalOpen(true);
                }}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 shadow-sm transition"
              >
                <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
                <span className="font-mono-status text-[11px] text-[#0071E3] font-semibold tracking-wide">
                  Co-op: {formatTimer(activeCoopSessionSeconds)}
                </span>
              </div>

              {/* Bridge Connected Capsule */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
                <span className="font-mono-status text-[11px] text-emerald-800 font-semibold tracking-wide">
                  Bridge: {isBridgeConnected ? `Online (${bridgeLatency}ms)` : 'Offline'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Zgraj Bridge CLI Button */}
                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="apple-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium text-[13px] shadow-[0_3px_12px_rgba(16,185,129,0.3)] border-t border-white/20 transition cursor-pointer"
                  title="Zgraj pliki i narzędzia terminalowe VibeHub CLI"
                >
                  <span className="material-symbols-outlined text-[16px]">terminal</span>
                  <span className="hidden md:inline">Zgraj Bridge CLI</span>
                  <span className="md:hidden">CLI</span>
                </button>

                <Link
                  href="/settings"
                  className="apple-btn hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-black/[0.08] hover:bg-slate-50 text-[#1C1C1E] font-medium text-[13px] shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0071E3]">sensors</span>
                  Pair Bridge
                </Link>

                <button
                  onClick={() => alert(`Link zaproszenia do pokoju #${roomId} skopiowany do schowka!`)}
                  className="apple-btn hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0071E3] text-white hover:bg-blue-600 font-medium text-[13px] shadow-[0_3px_12px_rgba(0,113,227,0.28)] border-t border-white/20"
                >
                  <span className="material-symbols-outlined text-[16px]">person_add</span>
                  Invite Peer
                </button>

                {/* User Auth Profile Button */}
                {currentUser ? (
                  <button
                    onClick={() => setProfileModalOpen(true)}
                    className="flex items-center gap-2 pl-1 group cursor-pointer focus:outline-none"
                    title="Otwórz profil i statystyki Co-op"
                  >
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.displayName}
                      className="w-8 h-8 rounded-full ring-2 ring-[#0071E3]/40 shadow-sm object-cover group-hover:ring-[#0071E3] transition"
                    />
                    <div className="hidden xl:flex flex-col text-left">
                      <span className="text-[12px] font-semibold text-[#1C1C1E] leading-tight truncate max-w-[100px]">
                        {currentUser.displayName}
                      </span>
                      <span className="text-[10px] font-mono-status text-[#8E8E93]">
                        {currentUser.isAnonymous ? 'Gość' : 'Operator'}
                      </span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="apple-btn inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0071E3] to-blue-600 text-white font-medium text-[12px] shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[15px]">account_circle</span>
                    Konto / Zaloguj
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="relative pt-14 w-full">{children}</main>
      </div>

      {/* Global Modals */}
      <AuthModal />
      <UserProfileModal />
      <BridgeDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        pairingCode="VH-9428-XK"
      />
    </div>
  );
}
