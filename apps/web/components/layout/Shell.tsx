'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useVibeHubStore } from '@/lib/store';

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { roomId, roomName, isBridgeConnected, bridgeLatency } = useVibeHubStore();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'monitoring' },
    { label: 'Room Collab & Preview', path: `/rooms/${roomId}`, icon: 'group_work' },
    { label: 'Code & Git Diffs', path: `/rooms/${roomId}#diffs`, icon: 'difference' },
    { label: 'Bridge & Devices', path: '/settings', icon: 'developer_board' },
    { label: 'Privacy & Permissions', path: '/privacy', icon: 'admin_panel_settings' },
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
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path.split('#')[0]));
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className={`apple-btn flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition ${
                      isActive
                        ? 'bg-[#0071E3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.28)] border-t border-white/20'
                        : 'text-[#636366] hover:bg-black/[0.04] hover:text-[#1C1C1E]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    <span className="font-title-sm apple-subtext">{item.label}</span>
                  </Link>
                );
              })}
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
            <div className="flex items-center gap-4">
              {/* Bridge Connected Capsule */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
                <span className="font-mono-status text-[11px] text-emerald-800 font-semibold tracking-wide">
                  Bridge: {isBridgeConnected ? `Connected (${bridgeLatency}ms)` : 'Offline'}
                </span>
              </div>

              {/* Observability Chips */}
              <div className="hidden lg:flex items-center gap-1 font-mono-status text-[11px] tracking-[0.01em]">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0071E3] border border-blue-100 font-bold">
                  [L1:SOCK]
                </span>
                <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100 font-bold">
                  [L2:DIFF]
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-100 font-bold">
                  [L3:PROC]
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#8E8E93] border border-slate-200/60 font-bold">
                  [L4:HOOK]
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
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

                <button
                  aria-label="Notifications"
                  className="apple-btn p-1.5 rounded-xl text-[#636366] hover:text-[#1C1C1E] hover:bg-black/[0.04] relative"
                >
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#34C759] ring-2 ring-white" />
                </button>

                <div className="pl-1 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-400 ring-2 ring-white shadow-sm flex items-center justify-center font-bold text-xs text-slate-700">
                    TY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="relative pt-14 w-full">{children}</main>
      </div>
    </div>
  );
}
