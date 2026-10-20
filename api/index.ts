import type { IncomingMessage, ServerResponse } from 'http';
import os from 'os';
import { execSync } from 'child_process';
import { HeartbeatRequestSchema, PairDeviceRequestSchema } from '@vibehub/contracts';
import { EventBatchRequestSchema } from '@vibehub/event-protocol';
import { persistEvent, registerDeviceInFirestore, getDevicesFromFirestore } from './lib/firestore';

interface VercelRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
  body?: any;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  send: (body: any) => VercelResponse;
}

function ensureResponseHelpers(res: any): VercelResponse {
  if (!res.status) {
    res.status = function (code: number) {
      res.statusCode = code;
      return res;
    };
  }
  if (!res.json) {
    res.json = function (data: any) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(data));
      return res;
    };
  }
  if (!res.send) {
    res.send = function (data: any) {
      res.end(data);
      return res;
    };
  }
  return res as VercelResponse;
}

async function getRequestBody(req: VercelRequest): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: Buffer) => {
      raw += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function applyCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export default async function handler(rawReq: IncomingMessage, rawRes: ServerResponse) {
  const req = rawReq as VercelRequest;
  const res = ensureResponseHelpers(rawRes);

  applyCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/\/$/, '') || '/';

  // 1. Root & Discovery
  if (pathname === '' || pathname === '/' || pathname === '/api') {
    return res.status(200).json({
      status: 'online',
      service: 'VibeHub Microserver Backend',
      version: '0.1.0',
      runtime: 'Vercel Serverless Function',
      frontend: 'https://viberhub-8842f.web.app',
      database: 'Cloud Firestore (europe-central2)',
      endpoints: {
        systemStatus: 'GET /api/v1/system/status',
        eventsBatch: 'POST /api/v1/events/batch',
        bridgePair: 'POST /api/v1/bridge/pair',
        bridgeHeartbeat: 'POST /api/v1/bridge/heartbeat',
      },
      timestamp: new Date().toISOString(),
    });
  }

  // 2. GET /api/v1/system/status
  if (pathname === '/api/v1/system/status' && req.method === 'GET') {
    let branch = process.env.VERCEL_GIT_COMMIT_REF || 'main';
    let lastCommit = process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || '599ba10';
    let recentCommits: Array<{ hash: string; message: string; date: string }> = [
      {
        hash: lastCommit,
        message: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'feat: deploy VibeHub microserver backend to Vercel',
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
      // Running in Vercel Serverless environment where git CLI is not bundled
    }

    const totalMem = Math.round(os.totalmem() / (1024 * 1024 * 1024));
    const freeMem = Math.round(os.freemem() / (1024 * 1024 * 1024));
    const usedMemMB = Math.round((os.totalmem() - os.freemem()) / (1024 * 1024));

    return res.status(200).json({
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
    });
  }

  // 3. POST /api/v1/events/batch
  if (pathname === '/api/v1/events/batch' && req.method === 'POST') {
    try {
      const body = await getRequestBody(req);
      const parseResult = EventBatchRequestSchema.safeParse(body);

      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          error: 'Event batch validation failed',
          acceptedCount: 0,
          rejectedCount: Array.isArray(body?.events) ? body.events.length : 0,
          errors: parseResult.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
        });
      }

      const { events, deviceId, projectId } = parseResult.data;

      for (const event of events) {
        await persistEvent(projectId, {
          schemaVersion: event.schemaVersion,
          deviceId: event.deviceId,
          projectId: event.projectId,
          occurredAt: event.occurredAt,
          source: event.source,
          type: event.type,
          data: event.data,
        });
      }

      console.log(
        `[+] SUCCESS :: Persisted ${events.length} authentic events to Firestore (${projectId}) from device=${deviceId}`
      );

      return res.status(200).json({
        success: true,
        acceptedCount: events.length,
        rejectedCount: 0,
        errors: [],
        receivedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('[!] ALERT :: /api/v1/events/batch error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        acceptedCount: 0,
        rejectedCount: 0,
        errors: [],
      });
    }
  }

  // 4. POST /api/v1/bridge/pair
  if (pathname === '/api/v1/bridge/pair' && req.method === 'POST') {
    try {
      const body = await getRequestBody(req);
      const parseResult = PairDeviceRequestSchema.safeParse(body);

      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: parseResult.error.format(),
        });
      }

      const { hostname, platform, bridgeVersion, operator, activeAgents, workspaceRoot, systemInfo } = parseResult.data;
      const deviceId = `dev_${platform}_${Math.random().toString(36).substring(2, 9)}`;
      const deviceToken = `vh_live_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
      const roomId = 'viberhub-8842f';

      const deviceData = {
        deviceId,
        deviceToken,
        hostname,
        platform,
        bridgeVersion,
        pairedAt: new Date().toISOString(),
        lastHeartbeat: new Date().toISOString(),
        status: 'online',
        operator: operator || { name: 'Jakub (Operator)', role: 'Systems & Observability Architect' },
        activeAgents: activeAgents || ['antigravity', 'claude-code', 'cursor'],
        workspaceRoot: workspaceRoot || '/workspace',
        systemInfo: systemInfo || {},
      };

      await registerDeviceInFirestore(roomId, deviceData);

      return res.status(200).json({
        success: true,
        deviceId,
        deviceToken,
        ownerId: 'user_operator_local',
        hostname,
        bridgeVersion,
        pairedAt: deviceData.pairedAt,
        operator: deviceData.operator,
        activeAgents: deviceData.activeAgents,
        systemInfo: deviceData.systemInfo,
      });
    } catch (error) {
      console.error('[!] ALERT :: /api/v1/bridge/pair error:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  // 5. POST /api/v1/bridge/heartbeat
  if (pathname === '/api/v1/bridge/heartbeat' && req.method === 'POST') {
    try {
      const body = await getRequestBody(req);
      const parseResult = HeartbeatRequestSchema.safeParse(body);

      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: parseResult.error.format(),
        });
      }

      return res.status(200).json({
        success: true,
        acknowledgedAt: new Date().toISOString(),
        status: 'healthy',
      });
    } catch (error) {
      console.error('[!] ALERT :: /api/v1/bridge/heartbeat error:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  // 6. /api/v1/users/stats
  if (pathname === '/api/v1/users/stats') {
    if (req.method === 'GET') {
      const uid = url.searchParams.get('uid');
      if (!uid) return res.status(400).json({ success: false, error: 'Missing uid query parameter' });
      return res.status(200).json({ success: true, uid, status: 'online' });
    }
    if (req.method === 'POST') {
      const body = await getRequestBody(req);
      return res.status(200).json({ success: true, recordedSeconds: body?.secondsDelta || 0 });
    }
  }

  // 7. /api/v1/rooms/stats
  if (pathname === '/api/v1/rooms/stats' && req.method === 'GET') {
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      rooms: [
        { id: 'viberhub-8842f', name: 'Observability Mesh (Production)', activeMembers: 2, status: 'live' },
        { id: '409', name: 'Collaborative Pair Hub #409', activeMembers: 1, status: 'live' },
      ],
      globalStats: {
        activeBridges: 2,
        totalCoopHours: 18.5,
        totalEventsIngested: 1420,
      },
    });
  }

  // Default: 404
  return res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: pathname,
    method: req.method,
  });
}
