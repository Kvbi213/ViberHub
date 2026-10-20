#!/usr/bin/env node
/**
 * VibeHub Bridge — Standalone Interactive CLI & Multi-Agent Telemetry Runner
 * Paradygmat: Local-First Observability & Secure-by-Design
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import { VibeHubBridgeDaemon } from './core/daemon';
import { scanSystemEnvironment, SystemTelemetryData } from './core/scanner';

const DEFAULT_API_URL = process.env.VIBEHUB_API_URL || 'https://viber-hub.vercel.app/api/v1';
const GLOBAL_CONFIG_DIR = path.join(os.homedir(), '.vibehub');
const GLOBAL_CONFIG_FILE = path.join(GLOBAL_CONFIG_DIR, 'bridge.json');

export interface BridgeSavedConfig {
  deviceId: string;
  deviceToken: string;
  apiUrl: string;
  roomId: string;
  pairedAt: string;
  hostname: string;
  operatorName: string;
  operatorRole: string;
  activeAgents: Array<'antigravity' | 'claude-code' | 'cursor'>;
  projectRoot: string;
  hasCompletedInitialSetup: boolean;
  systemTelemetry?: Partial<SystemTelemetryData>;
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

function ask(rl: readline.Interface, questionText: string, defaultValue: string = ''): Promise<string> {
  return new Promise((resolve) => {
    const promptText = defaultValue ? `${questionText} [${defaultValue}]: ` : `${questionText}: `;
    rl.question(promptText, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function parseAiSelection(choice: string): Array<'antigravity' | 'claude-code' | 'cursor'> {
  const c = choice.trim();
  if (c === '1') return ['antigravity'];
  if (c === '2') return ['claude-code'];
  if (c === '3') return ['cursor'];
  return ['antigravity', 'claude-code', 'cursor'];
}

function getSafeProjectRoot(): string {
  const cwd = process.cwd();
  const home = os.homedir();

  // Jeśli cwd to katalog domowy użytkownika (np. C:\Users\Jakub Lis), zapobiegnij skanowaniu folderów systemowych
  if (path.resolve(cwd) === path.resolve(home)) {
    const candidate = path.join(home, 'Desktop', '01_PROJEKTY', 'ViberHub');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const projectsDir = path.join(home, 'Desktop');
    if (fs.existsSync(projectsDir)) {
      return projectsDir;
    }
  }
  return cwd;
}

async function pairDeviceWithTelemetry(
  pairingCode: string,
  apiUrl: string,
  operatorName: string,
  operatorRole: string,
  activeAgents: Array<'antigravity' | 'claude-code' | 'cursor'>,
  projectRoot: string,
  telemetry: SystemTelemetryData
): Promise<BridgeSavedConfig> {
  const payload = {
    pairingCode: pairingCode.trim(),
    hostname: os.hostname(),
    platform: process.platform === 'win32' || process.platform === 'darwin' || process.platform === 'linux'
      ? process.platform
      : 'linux',
    bridgeVersion: '0.1.4',
    operator: {
      name: operatorName,
      role: operatorRole,
    },
    activeAgents,
    workspaceRoot: projectRoot,
    systemInfo: {
      cpu: `${telemetry.cpuModel} (${telemetry.cpuCores} cores)`,
      memory: telemetry.memoryUsageFormatted,
      os: `${telemetry.osType} ${telemetry.osRelease}`,
      ipAddresses: telemetry.ipAddresses,
      installedTools: telemetry.installedTools,
      gitBranch: telemetry.git.branch,
      lastCommit: telemetry.git.lastCommit,
    },
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
    operatorName,
    operatorRole,
    activeAgents,
    projectRoot,
    hasCompletedInitialSetup: true,
    systemTelemetry: telemetry,
  };

  saveConfig(saved);

  console.log('\n================================================================');
  console.log(`[+] SUCCESS :: Stacja pomyślnie powiązana z klastrem VibeHub!`);
  console.log(`[*] INFO :: Przypisany Device ID: ${saved.deviceId}`);
  console.log(`[*] INFO :: Aktywne agenty: ${activeAgents.join(', ')}`);
  console.log(`[*] INFO :: Monitorowany projekt: ${saved.projectRoot}`);
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
  vibehub pair [KOD]            Sparuj tę stację roboczą za pomocą kodu (np. VH-9428-XK)
  vibehub start                 Uruchom demona telemetrycznego w tle
  vibehub status                Sprawdź status połączenia z backendem
  vibehub reset                 Zresetuj zapisane poświadczenia stacji
  vibehub --help                Wyświetl pomoc

PRZYKŁADY:
  vibehub pair VH-9428-XK
  vibehub start
  pnpm bridge pair VH-9428-XK
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

  if (command === 'reset') {
    try {
      if (fs.existsSync(GLOBAL_CONFIG_FILE)) {
        fs.unlinkSync(GLOBAL_CONFIG_FILE);
      }
      console.log('[+] SUCCESS :: Zresetowano konfigurację stacji ~/.vibehub/bridge.json.');
    } catch (err) {
      console.error('[!] ALERT :: Błąd resetowania:', err);
    }
    process.exit(0);
  }

  const savedConfig = loadConfig();
  const isFirstTime = !savedConfig || !savedConfig.hasCompletedInitialSetup;
  const safeRoot = getSafeProjectRoot();
  const telemetry = scanSystemEnvironment(safeRoot);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let chosenAgents: Array<'antigravity' | 'claude-code' | 'cursor'> = ['antigravity', 'claude-code', 'cursor'];
  let operatorName = savedConfig?.operatorName || telemetry.username || 'Jakub (Operator)';
  let operatorRole = savedConfig?.operatorRole || 'Systems & Observability Architect';
  let projectRoot = savedConfig?.projectRoot || safeRoot;
  let deviceId = savedConfig?.deviceId;
  let apiUrl = savedConfig?.apiUrl || DEFAULT_API_URL;

  // 1. SCENARIUSZ PIERWSZEGO URUCHOMIENIA — Pełny wywiad telemetryczny
  if (isFirstTime) {
    console.log('================================================================');
    console.log(`[*] INFO :: VibeHub Bridge CLI v0.1.4 — Inicjalizacja Nowej Stacji`);
    console.log(`[*] INFO :: Rozpoznano maszynę: ${telemetry.hostname} (${telemetry.platform} ${telemetry.arch})`);
    console.log(`[*] INFO :: CPU: ${telemetry.cpuModel} (${telemetry.cpuCores} rdzeni) | RAM: ${telemetry.memoryUsageFormatted}`);
    const toolsDetected: string[] = [];
    if (telemetry.installedTools.hasAntigravity) toolsDetected.push('Antigravity');
    if (telemetry.installedTools.hasClaudeCode) toolsDetected.push('Claude Code');
    if (telemetry.installedTools.hasCursor) toolsDetected.push('Cursor');
    if (telemetry.installedTools.hasGit) toolsDetected.push('Git');
    console.log(`[*] INFO :: Wykryte narzędzia deweloperskie: ${toolsDetected.join(', ') || 'Brak'}`);
    console.log('================================================================\n');

    operatorName = await ask(rl, '[1/4] Twoje Imię / Pseudonim Operatora', operatorName);
    operatorRole = await ask(rl, '[2/4] Twoja Rola Inżynierska', operatorRole);

    console.log('\n[3/4] Jakich narzędzi Coding AI używasz w tym środowisku?');
    console.log('  1) Google Antigravity CLI (agy)');
    console.log('  2) Claude Code (Anthropic)');
    console.log('  3) Cursor AI / Codex Agent');
    console.log('  4) Wszystkie 3 jednocześnie (Multi-Agent Mesh) [Rekomendowane]');
    const aiChoice = await ask(rl, 'Wybór (1-4)', '4');
    chosenAgents = parseAiSelection(aiChoice);

    projectRoot = await ask(rl, '[4/4] Katalog projektu do bezpiecznej obserwacji', safeRoot);

    let pairingCode = args[1];
    if (!pairingCode) {
      pairingCode = await ask(rl, '[+] Wpisz kod parowania z aplikacji (np. VH-9428-XK)', 'VH-9428-XK');
    }

    try {
      const paired = await pairDeviceWithTelemetry(
        pairingCode,
        apiUrl,
        operatorName,
        operatorRole,
        chosenAgents,
        projectRoot,
        telemetry
      );
      deviceId = paired.deviceId;
    } catch (err: any) {
      console.error(`[!] ALERT :: Błąd parowania:`, err.message);
      rl.close();
      process.exit(1);
    }
  } else {
    // 2. SCENARIUSZ KOLEJNEGO URUCHOMIENIA — Pamięta dane, pyta tylko o Coding AI
    console.log('================================================================');
    console.log(`[*] INFO :: Witaj ponownie, ${operatorName} [${operatorRole}]!`);
    console.log(`[*] INFO :: Stacja: ${savedConfig.hostname} (Device ID: ${savedConfig.deviceId})`);
    console.log(`[*] INFO :: Projekt: ${projectRoot}`);
    console.log('================================================================\n');

    console.log('[?] Które narzędzie Coding AI aktywować w tej sesji?');
    console.log('  1) Google Antigravity CLI (agy)');
    console.log('  2) Claude Code');
    console.log('  3) Cursor AI Agent');
    console.log('  4) Wszystkie 3 jednocześnie (Multi-Agent Mesh) [Ostatnio używane]');
    const aiChoice = await ask(rl, 'Wybór (1-4)', '4');
    chosenAgents = parseAiSelection(aiChoice);

    // Zaktualizuj wybór w zapisanej konfiguracji
    savedConfig.activeAgents = chosenAgents;
    savedConfig.projectRoot = projectRoot;
    saveConfig(savedConfig);
  }

  rl.close();

  // Uruchomienie demona Bridge z wybranymi agentami
  const daemon = new VibeHubBridgeDaemon({
    apiUrl,
    deviceId,
    projectId: 'viberhub-8842f',
    projectRoot,
    activeAgents: chosenAgents,
    operatorName,
    operatorRole,
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
