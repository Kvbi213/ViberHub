'use client';

import React, { useState } from 'react';

export default function SettingsBridgePage() {
  const [pairingCode, setPairingCode] = useState('VH-9428-XK');
  const [copied, setCopied] = useState(false);
  const [devices, setDevices] = useState([
    {
      id: 'dev_m3_macbook',
      name: 'MacBook Pro M3 Max',
      platform: 'macOS Sonoma (Darwin 23.4)',
      version: 'Bridge v0.1.4',
      status: 'online',
      latency: '14ms',
      lastHeartbeat: 'Teraz (< 2s)',
      token: 'vh_live_9f8a20d4c82e...',
    },
    {
      id: 'dev_arch_linux',
      name: 'Arch Linux Devbox (Threadripper)',
      platform: 'Linux 6.9.3-arch',
      version: 'Bridge v0.1.4',
      status: 'online',
      latency: '18ms',
      lastHeartbeat: '4s temu',
      token: 'vh_live_a1b2c3d4e5f6...',
    },
  ]);

  const handleGenerateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'VH-';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for (let i = 0; i < 2; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setPairingCode(code);
  };

  const handleRevokeDevice = (id: string) => {
    if (confirm('Czy na pewno chcesz unieważnić poświadczenia dla tego urządzenia?')) {
      setDevices(devices.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-8 gap-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E] apple-headline">
            Zarządzanie Stacjami Roboczymi &amp; Bridge
          </h1>
          <p className="text-sm text-[#636366] mt-1">
            Połącz lokalny demon Bridge ze swoim kontem i kontroluj uprawnienia podłączonych komputerów.
          </p>
        </div>

        {/* Pairing Code Card */}
        <div className="apple-card bg-white/80 apple-glass p-6 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-glass flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#0071E3]">sensors</span>
              <h2 className="text-base font-bold text-[#1C1C1E]">Jednorazowy Kod Parowania (TTL: 5 min)</h2>
            </div>
            <button
              onClick={handleGenerateCode}
              className="apple-btn text-xs font-semibold text-[#0071E3] hover:underline"
            >
              Wygeneruj nowy kod
            </button>
          </div>

          <p className="text-xs text-[#636366] leading-relaxed">
            Wpisz poniższy kod na swoim komputerze, aby natychmiast sparować proces Bridge z kontem
            VibeHub bez przekazywania kluczy głównych:
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 border border-black/[0.06] p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black font-mono tracking-widest text-[#0071E3] select-all">
                {pairingCode}
              </span>
              <span className="text-xs text-[#8E8E93] font-mono">
                vibehub pair {pairingCode}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`vibehub pair ${pairingCode}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="apple-btn px-4 py-2 rounded-xl bg-[#0071E3] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'check' : 'terminal'}
              </span>
              {copied ? 'Skopiowano: vibehub pair ' + pairingCode : 'Kopiuj: vibehub pair ' + pairingCode}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#636366] bg-slate-100/70 p-2.5 rounded-lg border border-black/[0.04]">
            <span className="font-semibold text-[#1C1C1E]">Alternatywne metody:</span>
            <code className="bg-white px-2 py-0.5 rounded border border-black/[0.06]">npx vibehub pair {pairingCode}</code>
            <span>lub w repozytorium:</span>
            <code className="bg-white px-2 py-0.5 rounded border border-black/[0.06]">pnpm bridge pair {pairingCode}</code>
          </div>
        </div>

        {/* Active Connected Devices List */}
        <div className="apple-card bg-white/80 apple-glass p-6 rounded-2xl border border-black/[0.06] border-t border-white/90 shadow-glass flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1C1C1E]">Aktywne Stacje Deweloperskie</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono-status text-[11px] font-bold">
              {devices.length} Aktywne
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50/70 border border-black/[0.05] hover:bg-white transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0071E3]">
                    <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1C1C1E]">{device.name}</span>
                      <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
                    </div>
                    <div className="text-xs text-[#8E8E93] font-mono mt-0.5">
                      {device.platform} • {device.version} • Ping: {device.latency}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8E8E93] font-mono hidden md:inline">
                    Heartbeat: {device.lastHeartbeat}
                  </span>
                  <button
                    onClick={() => handleRevokeDevice(device.id)}
                    className="apple-btn px-3 py-1.5 rounded-lg border border-[#FF3B30]/30 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-xs font-semibold"
                  >
                    Odłącz urządzenie
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
