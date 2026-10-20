import { NextRequest, NextResponse } from 'next/server';
import { EventBatchRequestSchema } from '@vibehub/event-protocol';
import { persistEvent } from '@/lib/firestore-service';

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
    const parseResult = EventBatchRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Event batch validation failed',
          acceptedCount: 0,
          rejectedCount: Array.isArray(body?.events) ? body.events.length : 0,
          errors: parseResult.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const { events, deviceId, projectId } = parseResult.data;

    // Autentyczny zapis zdarzeń do bazy Firestore
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

    return NextResponse.json(
      {
        success: true,
        acceptedCount: events.length,
        rejectedCount: 0,
        errors: [],
        receivedAt: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/events/batch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', acceptedCount: 0, rejectedCount: 0, errors: [] },
      { status: 500, headers: corsHeaders }
    );
  }
}
