import { NextRequest, NextResponse } from 'next/server';
import { syncActiveAgentsInFirestore, persistEvent } from '@/lib/firestore-service';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const roomId = body?.roomId || 'viberhub-8842f';
    const provider = body?.provider || 'custom';
    const agentId = body?.agentId || `ai_${provider}_${Math.random().toString(36).substring(2, 8)}`;
    const name = body?.name || `AI Agent (${provider})`;
    const status = body?.status || 'working';
    const activity = body?.activity || 'Zadanie programistyczne w toku';
    const tool = body?.tool || 'code_generation';
    const file = body?.file || '';
    const diff = body?.diff || '';

    const agentData = {
      id: agentId,
      provider,
      name,
      model: body?.model || 'Coding AI Model',
      status,
      activity,
      currentTool: tool,
      activeFile: file,
      fileStats: file ? '+ modified' : undefined,
      diffSnippet: diff
        ? String(diff)
            .split('\n')
            .slice(0, 10)
            .map((l: string, idx: number) => ({
              line: idx + 1,
              type: l.startsWith('+') ? '+' : l.startsWith('-') ? '-' : ' ',
              text: l.slice(0, 80),
            }))
        : undefined,
      tokens: body?.tokens || { input: 0, output: 0 },
      lastActiveAt: new Date().toISOString(),
      machine: body?.machine || 'AI Workstation',
      operatorName: body?.operatorName || 'Operator',
    };

    await syncActiveAgentsInFirestore(roomId, [agentData]);

    await persistEvent(roomId, {
      schemaVersion: 1,
      deviceId: body?.deviceId || 'dev_ai_direct',
      projectId: roomId,
      occurredAt: new Date().toISOString(),
      source: provider,
      type: 'agent.telemetry_pushed',
      data: {
        agentId,
        name,
        status,
        activity,
        tool,
        file,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Telemetry successfully pushed to VibeHub cluster',
        agentId,
        roomId,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err: any) {
    console.error('[!] ALERT :: /api/v1/telemetry/push error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
