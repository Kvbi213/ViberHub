import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ success: false, error: 'Missing uid query parameter' }, { status: 400, headers: corsHeaders });
    }

    if (!db) {
      return NextResponse.json({ success: false, error: 'Database offline' }, { status: 503, headers: corsHeaders });
    }

    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ success: true, profile: snap.data() }, { headers: corsHeaders });
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/users/stats GET error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, secondsDelta, roomId } = body;

    if (!uid || typeof secondsDelta !== 'number') {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400, headers: corsHeaders });
    }

    if (!db) {
      return NextResponse.json({ success: false, error: 'Database offline' }, { status: 503, headers: corsHeaders });
    }

    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      lastSeenAt: new Date().toISOString(),
      'stats.totalCoopSeconds': increment(secondsDelta),
      'stats.lastActiveRoom': roomId || 'viberhub-8842f',
    });

    return NextResponse.json({ success: true, recordedSeconds: secondsDelta }, { headers: corsHeaders });
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/users/stats POST error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
