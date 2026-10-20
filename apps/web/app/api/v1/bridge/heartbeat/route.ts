import { NextRequest, NextResponse } from 'next/server';
import { HeartbeatRequestSchema } from '@vibehub/contracts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = HeartbeatRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      acknowledgedAt: new Date().toISOString(),
      status: 'healthy',
    });
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/bridge/heartbeat error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
