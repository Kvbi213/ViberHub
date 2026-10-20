import { NextResponse } from 'next/server';
import os from 'os';
import { execSync } from 'child_process';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET() {
  try {
    let branch = process.env.VERCEL_GIT_COMMIT_REF || 'main';
    let lastCommit = process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'b93d935';
    let recentCommits: Array<{ hash: string; message: string; date: string }> = [
      {
        hash: lastCommit,
        message: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'VibeHub microserver on Vercel',
        date: 'just now',
      },
    ];
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
      // Serverless Linux container fallback
    }

    const totalMem = Math.round(os.totalmem() / (1024 * 1024 * 1024));
    const freeMem = Math.round(os.freemem() / (1024 * 1024 * 1024));
    const usedMemMB = Math.round((os.totalmem() - os.freemem()) / (1024 * 1024));

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        system: {
          hostname: os.hostname(),
          platform: os.platform(),
          arch: os.arch(),
          uptimeSeconds: Math.floor(os.uptime()),
          memory: `${usedMemMB}MB / ${totalMem}GB (Free: ${freeMem}GB)`,
          nodeVersion: process.version,
          serverProvider: 'Vercel Serverless Microserver',
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
          activeTask: 'VibeHub Microserver Backend active on Vercel',
          confidence: 1.0,
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/system/status error:', error);
    return NextResponse.json({ success: false, error: 'Failed to inspect system' }, { status: 500, headers: corsHeaders });
  }
}
