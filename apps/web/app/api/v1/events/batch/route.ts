import { NextRequest, NextResponse } from 'next/server';
import { EventBatchRequestSchema } from '@vibehub/event-protocol';

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
        { status: 400 }
      );
    }

    const { events, deviceId, projectId } = parseResult.data;

    // Log zwalidowanego pakietu
    console.log(
      `[*] INFO :: Ingested ${events.length} events from device=${deviceId} project=${projectId}`
    );

    return NextResponse.json({
      success: true,
      acceptedCount: events.length,
      rejectedCount: 0,
      errors: [],
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[!] ALERT :: /api/v1/events/batch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', acceptedCount: 0, rejectedCount: 0, errors: [] },
      { status: 500 }
    );
  }
}
