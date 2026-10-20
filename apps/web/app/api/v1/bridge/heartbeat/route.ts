import { NextRequest, NextResponse } from 'next/server';
import { HeartbeatRequestSchema } from '@vibehub/contracts';

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
    const parseResult = HeartbeatRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.format() },
        { status: 400, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        acknowledgedAt: new Date().toISOString(),
        status: 'healthy',
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/bridge/heartbeat error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
