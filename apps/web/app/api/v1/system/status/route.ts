import { NextResponse } from 'next/server';
import os from 'os';
import { execSync } from 'child_process';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let branch = 'master';
    let lastCommit = '';
    let recentCommits: Array<{ hash: string; message: string; date: string }> = [];
    let gitStatusLines: string[] = [];

    try {
      branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
      const logRaw = execSync('git log -n 5 --pretty=format:"%h|%s|%cr"', { encoding: 'utf-8' }).trim();
      if (logRaw) {
        recentCommits = logRaw.split('\n').map((line) => {
          const [hash, message, date] = line.split('|');
          return { hash, message, date };
        });
        if (recentCommits.length > 0) {
          lastCommit = recentCommits[0].hash;
        }
      }
      const statusRaw = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
      if (statusRaw) {
        gitStatusLines = statusRaw.split('\n');
      }
    } catch {
      // Git fallback
    }

    const totalMem = Math.round(os.totalmem() / (1024 * 1024 * 1024));
    const freeMem = Math.round(os.freemem() / (1024 * 1024 * 1024));
    const usedMemMB = Math.round((os.totalmem() - os.freemem()) / (1024 * 1024));

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      system: {
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        uptimeSeconds: Math.floor(os.uptime()),
        memory: `${usedMemMB}MB / ${totalMem}GB`,
        nodeVersion: process.version,
      },
      git: {
        branch,
        lastCommit,
        recentCommits,
        modifiedFilesCount: gitStatusLines.length,
        status: gitStatusLines.length === 0 ? 'CLEAN' : 'MODIFIED',
      },
      agent: {
        provider: 'antigravity',
        model: 'Gemini 3.8 Flash (High)',
        state: 'WORKING',
        activeTask: 'Integracja z produkcyjnym Firebase (viberhub-8842f) i eliminacja placeholderów',
        confidence: 1.0,
      },
    });
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/system/status error:', error);
    return NextResponse.json({ success: false, error: 'Failed to inspect system' }, { status: 500 });
  }
}
