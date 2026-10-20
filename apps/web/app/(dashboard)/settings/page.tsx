'use client';

import React, { useState, useEffect } from 'react';
import { useVibeHubStore } from '@/lib/store';
import { fetchDevices, DeviceRecord } from '@/lib/firestore-service';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { BridgeDownloadModal } from '@/components/bridge/BridgeDownloadModal';

export default function SettingsBridgePage() {
  const { roomId } = useVibeHubStore();
  const [pairingCode, setPairingCode] = useState('VH-9428-XK');
  const [copied, setCopied] = useState(false);
  const [devices, setDevices] = useState<DeviceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  useEffect(() => {
    // 1. Początkowe pobranie urządzeń
    fetchDevices(roomId).then((devs) => {
      setDevices(devs);
      setLoading(false);
    });

    // 2. Nasłuchiwanie na żywo w Firestore
    if (db) {
      try {
        const devsRef = collection(db, 'rooms', roomId, 'devices');
        const unsub = onSnapshot(devsRef, (snap) => {
          const liveList = snap.docs.map((d) => ({ deviceId: d.id, ...(d.data() as any) }));
          setDevices(liveList);
        });
        return () => unsub();
      } catch (err) {
        console.warn('devices listener warning', err);
      }
    }
  }, [roomId]);

  const handleGenerateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'VH-';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for (let i = 0; i < 2; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setPairingCode(code);
  };

  const handleRevokeDevice = (deviceId: string) => {
    if (confirm('Czy na pewno chcesz unieważnić poświadczenia dla tego urządzenia?')) {
      setDevices(devices.filter((d) => d.deviceId !== deviceId));
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

          {/* Quick Download Action Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-blue-50/40 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[22px]">download</span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#1C1C1E] flex items-center gap-2">
                  <span>Brakuje Ci polecenia vibehub w terminalu?</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">Standalone Bundle</span>
                </div>
                <div className="text-[11px] text-[#636366] mt-0.5">
                  Zgraj gotową paczkę CLI (.ZIP / .BAT / .PS1), aby komendy terminalowe działały bezpośrednio na Twoim komputerze.
                </div>
              </div>
            </div>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="apple-btn px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-[0_3px_12px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              Zgraj Paczkę CLI
            </button>
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
            {loading ? (
              <div className="py-8 text-center text-xs font-mono text-[#8E8E93]">
                Ładowanie stanu podłączonych urządzeń...
              </div>
            ) : devices.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-50 border border-dashed border-black/[0.08] flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[32px] text-[#8E8E93]">sensors_off</span>
                <span className="text-sm font-semibold text-[#1C1C1E]">Brak aktywnych stacji roboczych</span>
                <p className="text-xs text-[#8E8E93] max-w-sm">
                  Uruchom polecenie <code className="bg-white px-1.5 py-0.5 rounded border border-black/[0.06] font-mono text-[#0071E3]">vibehub pair {pairingCode}</code> w swoim terminalu, aby podłączyć pierwszą maszynę.
                </p>
              </div>
            ) : (
              devices.map((device) => (
                <div
                  key={device.deviceId}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-slate-50/70 border border-black/[0.05] hover:bg-white transition gap-4"
                >
                  <div className="flex items-start md:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0071E3] shrink-0">
                      <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-[#1C1C1E]">
                          {device.hostname || device.deviceId}
                        </span>
                        {device.operator?.name && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-semibold">
                            {device.operator.name} {device.operator.role ? `(${device.operator.role})` : ''}
                          </span>
                        )}
                        <span className="w-2 h-2 rounded-full bg-[#34C759] status-pulse-green" />
                      </div>
                      <div className="text-xs text-[#8E8E93] font-mono mt-0.5 flex flex-wrap items-center gap-2">
                        <span>{device.platform}</span>
                        <span>•</span>
                        <span>v{device.bridgeVersion || '0.1.4'}</span>
                        {device.systemInfo?.cpu?.model && (
                          <>
                            <span>•</span>
                            <span className="text-[#636366]">{device.systemInfo.cpu.model.slice(0, 30)}</span>
                          </>
                        )}
                      </div>
                      {device.activeAgents && device.activeAgents.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {device.activeAgents.map((agent) => (
                            <span
                              key={agent}
                              className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/50 text-[10px] font-mono font-medium"
                            >
                              AI: {agent}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/[0.04]">
                    <span className="text-[11px] text-[#8E8E93] font-mono">
                      {device.lastHeartbeat ? `Aktywność: ${new Date(device.lastHeartbeat).toLocaleTimeString()}` : 'Połączono'}
                    </span>
                    <button
                      onClick={() => handleRevokeDevice(device.deviceId)}
                      className="apple-btn px-3 py-1.5 rounded-lg border border-[#FF3B30]/30 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-xs font-semibold"
                    >
                      Odłącz stację
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <BridgeDownloadModal
          isOpen={downloadModalOpen}
          onClose={() => setDownloadModalOpen(false)}
          pairingCode={pairingCode}
        />
      </div>
  );
}
