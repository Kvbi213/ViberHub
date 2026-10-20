import { NextRequest, NextResponse } from 'next/server';
import { PairDeviceRequestSchema } from '@vibehub/contracts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = PairDeviceRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { pairingCode, hostname, platform, bridgeVersion } = parseResult.data;

    // Generowanie tokena sesji urządzenia
    const deviceId = `dev_${platform}_${Math.random().toString(36).substring(2, 9)}`;
    const deviceToken = `vh_live_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      deviceId,
      deviceToken,
      ownerId: 'user_operator_local',
      hostname,
      bridgeVersion,
      pairedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/bridge/pair error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
