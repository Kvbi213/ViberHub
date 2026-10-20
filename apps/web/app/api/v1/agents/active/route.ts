import { NextRequest, NextResponse } from 'next/server';
import { syncActiveAgentsInFirestore, getActiveAgentsFromFirestore } from '@/lib/firestore-service';

export async function GET(req: NextRequest) {
  const roomId = 'viberhub-8842f';
  const agents = await getActiveAgentsFromFirestore(roomId);
  return NextResponse.json({ success: true, count: agents.length, agents });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const agents = Array.isArray(body?.agents) ? body.agents : [];
    await syncActiveAgentsInFirestore(body?.roomId || 'viberhub-8842f', agents);
    return NextResponse.json({ success: true, syncedCount: agents.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
