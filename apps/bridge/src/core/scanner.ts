/**
 * VibeHub Bridge — System & Hardware Scanner
 * Głęboka inspekcja środowiska, specyfikacji stacji oraz narzędzi Coding AI
 */
import os from 'os';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export interface SystemTelemetryData {
  hostname: string;
  platform: string;
  arch: string;
  osRelease: string;
  osType: string;
  uptimeSeconds: number;
  cpuModel: string;
  cpuCores: number;
  totalMemoryMB: number;
  freeMemoryMB: number;
  memoryUsageFormatted: string;
  ipAddresses: string[];
  nodeVersion: string;
  username: string;
  installedTools: {
    hasAntigravity: boolean;
    hasClaudeCode: boolean;
    hasCursor: boolean;
    hasVsCode: boolean;
    hasGit: boolean;
    hasPnpm: boolean;
  };
  detectedAiAgents: {
    antigravityBrainsCount: number;
    hasClaudeSession: boolean;
    hasCursorRules: boolean;
  };
  git: {
    isGitRepo: boolean;
    branch: string;
    lastCommit: string;
    commitMessage: string;
    modifiedFilesCount: number;
  };
}

function checkBinaryInstalled(cmd: string): boolean {
  try {
    const checkCmd = process.platform === 'win32' ? `where.exe ${cmd}` : `which ${cmd}`;
    execSync(checkCmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function scanSystemEnvironment(targetDir: string = process.cwd()): SystemTelemetryData {
  const homeDir = os.homedir();

  // 1. Pomiary pamięci i procesora
  const totalMemMB = Math.round(os.totalmem() / (1024 * 1024));
  const freeMemMB = Math.round(os.freemem() / (1024 * 1024));
  const usedMemMB = totalMemMB - freeMemMB;
  const memoryUsageFormatted = `${usedMemMB}MB / ${Math.round(totalMemMB / 1024)}GB (Wolne: ${Math.round(freeMemMB / 1024)}GB)`;

  const cpus = os.cpus() || [];
  const cpuModel = cpus[0]?.model?.trim() || 'Generic Processor';
  const cpuCores = cpus.length;

  // 2. Interfejsy sieciowe (IPv4 non-internal)
  const ipAddresses: string[] = [];
  try {
    const ifaces = os.networkInterfaces();
    for (const name of Object.keys(ifaces)) {
      for (const iface of ifaces[name] || []) {
        if (iface.family === 'IPv4' && !iface.internal) {
          ipAddresses.push(iface.address);
        }
      }
    }
  } catch {
    // ignore
  }

  // 3. Narzędzia zainstalowane w PATH
  const installedTools = {
    hasAntigravity: checkBinaryInstalled('agy') || checkBinaryInstalled('antigravity'),
    hasClaudeCode: checkBinaryInstalled('claude'),
    hasCursor: checkBinaryInstalled('cursor'),
    hasVsCode: checkBinaryInstalled('code'),
    hasGit: checkBinaryInstalled('git'),
    hasPnpm: checkBinaryInstalled('pnpm'),
  };

  // 4. Detekcja śladów i logów Coding AI na maszynie
  let antigravityBrainsCount = 0;
  const agyBrainDir = path.join(homeDir, '.gemini', 'antigravity', 'brain');
  try {
    if (fs.existsSync(agyBrainDir)) {
      const entries = fs.readdirSync(agyBrainDir, { withFileTypes: true });
      antigravityBrainsCount = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.')).length;
    }
  } catch {
    // ignore
  }

  const claudeConfigDir = path.join(homeDir, '.claude');
  const hasClaudeSession = fs.existsSync(claudeConfigDir);

  const hasCursorRules = fs.existsSync(path.join(targetDir, '.cursorrules')) || fs.existsSync(path.join(targetDir, '.cursor'));

  // 5. Stan repozytorium Git
  let isGitRepo = false;
  let branch = 'main';
  let lastCommit = '0000000';
  let commitMessage = 'No git repository detected';
  let modifiedFilesCount = 0;

  try {
    execSync('git rev-parse --is-inside-work-tree', { cwd: targetDir, stdio: 'ignore' });
    isGitRepo = true;
    branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: targetDir, encoding: 'utf-8' }).trim();
    lastCommit = execSync('git rev-parse --short HEAD', { cwd: targetDir, encoding: 'utf-8' }).trim();
    commitMessage = execSync('git log -1 --pretty=format:%s', { cwd: targetDir, encoding: 'utf-8' }).trim();
    const statusRaw = execSync('git status --porcelain', { cwd: targetDir, encoding: 'utf-8' }).trim();
    if (statusRaw) {
      modifiedFilesCount = statusRaw.split('\n').filter(Boolean).length;
    }
  } catch {
    // Not a git repo
  }

  return {
    hostname: os.hostname(),
    platform: process.platform,
    arch: os.arch(),
    osRelease: os.release(),
    osType: os.type(),
    uptimeSeconds: Math.floor(os.uptime()),
    cpuModel,
    cpuCores,
    totalMemoryMB: totalMemMB,
    freeMemoryMB: freeMemMB,
    memoryUsageFormatted,
    ipAddresses,
    nodeVersion: process.version,
    username: os.userInfo()?.username || 'Operator',
    installedTools,
    detectedAiAgents: {
      antigravityBrainsCount,
      hasClaudeSession,
      hasCursorRules,
    },
    git: {
      isGitRepo,
      branch,
      lastCommit,
      commitMessage,
      modifiedFilesCount,
    },
  };
}
