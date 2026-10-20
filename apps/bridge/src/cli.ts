#!/usr/bin/env node
/**
 * VibeHub Bridge — Standalone CLI & Telemetry Runner
 * Paradygmat: Local-First Observability & Secure-by-Design
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { VibeHubBridgeDaemon } from './core/daemon';

const DEFAULT_API_URL = process.env.VIBEHUB_API_URL || 'https://viber-hub.vercel.app/api/v1';
const GLOBAL_CONFIG_DIR = path.join(os.homedir(), '.vibehub');
const GLOBAL_CONFIG_FILE = path.join(GLOBAL_CONFIG_DIR, 'bridge.json');

interface BridgeSavedConfig {
  deviceId: string;
  deviceToken: string;
  apiUrl: string;
  roomId?: string;
  pairedAt: string;
  hostname: string;
}

function loadConfig(): BridgeSavedConfig | null {
  try {
    if (fs.existsSync(GLOBAL_CONFIG_FILE)) {
      const raw = fs.readFileSync(GLOBAL_CONFIG_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return null;
}

function saveConfig(cfg: BridgeSavedConfig) {
  try {
    if (!fs.existsSync(GLOBAL_CONFIG_DIR)) {
      fs.mkdirSync(GLOBAL_CONFIG_DIR, { recursive: true });
    }
    fs.writeFileSync(GLOBAL_CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[!] ALERT :: Could not save config to ~/.vibehub/bridge.json:', err);
  }
}

async function pairDevice(pairingCode: string, apiUrl: string = DEFAULT_API_URL): Promise<BridgeSavedConfig> {
  console.log('================================================================');
  console.log(`[*] INFO :: VibeHub Bridge CLI v0.1.4`);
  console.log(`[*] INFO :: Inicjalizacja parowania stacji roboczej...`);
  console.log(`[*] INFO :: Kod parowania: ${pairingCode}`);
  console.log(`[*] INFO :: Target API: ${apiUrl}`);
  console.log('================================================================');

  const payload = {
    pairingCode: pairingCode.trim(),
    hostname: os.hostname(),
    platform: process.platform === 'win32' || process.platform === 'darwin' || process.platform === 'linux'
      ? process.platform
      : 'linux',
    bridgeVersion: '0.1.4',
  };

  const cleanBase = apiUrl.replace(/\/$/, '');
  const pairEndpoint = cleanBase.endsWith('/api/v1') ? `${cleanBase}/bridge/pair` : `${cleanBase}/api/v1/bridge/pair`;

  const response = await fetch(pairEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Błąd parowania (HTTP ${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as any;

  if (!data.success) {
    throw new Error(`Serwer odrzucił parowanie: ${data.error || 'Nieznany błąd'}`);
  }

  const saved: BridgeSavedConfig = {
    deviceId: data.deviceId,
    deviceToken: data.deviceToken,
    apiUrl,
    roomId: 'viberhub-8842f',
    pairedAt: data.pairedAt || new Date().toISOString(),
    hostname: os.hostname(),
  };

  saveConfig(saved);

  console.log(`[+] SUCCESS :: Stacja pomyślnie powiązana z klastrem VibeHub!`);
  console.log(`[*] INFO :: Przypisany Device ID: ${saved.deviceId}`);
  console.log(`[*] INFO :: Token sesji: ${saved.deviceToken.substring(0, 16)}...`);
  console.log(`[*] INFO :: Poświadczenia zapisane w: ${GLOBAL_CONFIG_FILE}`);
  console.log('================================================================\n');

  return saved;
}

async function checkStatus(apiUrl: string = DEFAULT_API_URL) {
  console.log(`[*] INFO :: Sprawdzanie łączności z mikroserwerem VibeHub (${apiUrl})...`);
  const cleanBase = apiUrl.replace(/\/$/, '');
  const healthEndpoint = cleanBase.endsWith('/api/v1') ? `${cleanBase}/health` : `${cleanBase}/api/v1/health`;

  try {
    const res = await fetch(healthEndpoint);
    if (res.ok) {
      const data = await res.json();
      console.log(`[+] SUCCESS :: Backend mikroserwera Vercel aktywny i dostępny.`);
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.error(`[!] ALERT :: Serwer zwrócił status ${res.status}`);
    }
  } catch (err: any) {
    console.error(`[!] ALERT :: Błąd połączenia:`, err.message);
  }
}

function showHelp() {
  console.log(`
VibeHub Bridge CLI — Narzędzie obserwowalności i parowania agentów AI

UŻYCIE:
  vibehub pair <KOD>            Sparuj tę stację roboczą za pomocą jednorazowego kodu
  vibehub start                 Uruchom demona telemetrycznego w tle
  vibehub status                Sprawdź status połączenia z backendem
  vibehub --help                Wyświetl pomoc

PRZYKŁADY:
  vibehub pair VH-GXAE-SN
  vibehub start --project=apps/web
  pnpm bridge pair VH-GXAE-SN
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'start';

  if (command === '--help' || command === '-h' || command === 'help') {
    showHelp();
    process.exit(0);
  }

  if (command === 'status') {
    await checkStatus();
    process.exit(0);
  }

  let deviceId: string | undefined;
  let apiUrl: string = DEFAULT_API_URL;

  if (command === 'pair') {
    const code = args[1];
    if (!code) {
      console.error('[!] ALERT :: Brak kodu parowania. Użycie: vibehub pair <KOD_NP_VH-GXAE-SN>');
      process.exit(1);
    }

    try {
      const config = await pairDevice(code, apiUrl);
      deviceId = config.deviceId;
    } catch (err: any) {
      console.error(`[!] ALERT :: Nie udało się sparować stacji:`, err.message);
      process.exit(1);
    }
  } else {
    const saved = loadConfig();
    if (saved) {
      deviceId = saved.deviceId;
      apiUrl = saved.apiUrl || apiUrl;
      console.log(`[*] INFO :: Załadowano zapisane poświadczenia stacji: ${deviceId}`);
    }
  }

  // Uruchomienie demona Bridge
  const daemon = new VibeHubBridgeDaemon({
    apiUrl,
    deviceId,
    projectRoot: process.cwd(),
  });

  await daemon.start();

  const handleShutdown = async () => {
    console.log('\n[*] INFO :: Zamykanie demona VibeHub Bridge...');
    await daemon.stop();
    process.exit(0);
  };

  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);
}

main().catch((err) => {
  console.error('[!] ALERT :: Krytyczny błąd CLI:', err);
  process.exit(1);
});
