import { NextRequest, NextResponse } from 'next/server';
import { PairDeviceRequestSchema } from '@vibehub/contracts';
import { registerOrUpdateDevice } from '@/lib/firestore-service';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = PairDeviceRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.format() },
        { status: 400, headers: corsHeaders }
      );
    }

    const { hostname, platform, bridgeVersion, operator, activeAgents, workspaceRoot, systemInfo } = parseResult.data;

    // Generowanie tokena sesji urządzenia
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
      status: 'online' as const,
      operator: operator || { name: 'Jakub (Operator)', role: 'Systems & Observability Architect' },
      activeAgents: activeAgents || ['antigravity', 'claude-code', 'cursor'],
      workspaceRoot: workspaceRoot || process.cwd(),
      systemInfo: systemInfo || {},
    };

    // Zapis w bazie Firestore
    await registerOrUpdateDevice(roomId, deviceData);

    return NextResponse.json(
      {
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
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/bridge/pair error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
