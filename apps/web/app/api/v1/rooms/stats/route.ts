import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      timestamp: new Date().toISOString(),
      rooms: [
        { id: 'viberhub-8842f', name: 'Observability Mesh (Production)', activeMembers: 2, status: 'live' },
        { id: '409', name: 'Collaborative Pair Hub #409', activeMembers: 1, status: 'live' },
        { id: 'mesh', name: 'P2P Bridge Cluster', activeMembers: 1, status: 'standby' },
      ],
      globalStats: {
        activeBridges: 2,
        totalCoopHours: 18.5,
        totalEventsIngested: 1420,
        averageLatencyMs: 14,
      },
    },
    { headers: corsHeaders }
  );
}
