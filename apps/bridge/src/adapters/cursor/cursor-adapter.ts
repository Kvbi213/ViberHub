/**
 * VibeHub Bridge — Cursor & Autonomous IDE Agent Adapter
 * Standard obserwowalności dla Cursor AI / Codex / Copilot Agent
 */
import { AgentAdapter, AdapterCapabilities, AdapterContext, AdapterSession } from '@vibehub/adapter-sdk';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';
import { RedactionEngine } from '../../redaction/redactor';

export class CursorAdapter implements AgentAdapter {
  public readonly id = 'cursor';
  public readonly name = 'Cursor AI / Autonomous Agent Adapter';
  public readonly version = '0.1.0';

  private activeSession: AdapterSession | null = null;
  private redactor: RedactionEngine;

  constructor(redactor: RedactionEngine) {
    this.redactor = redactor;
  }

  public async detect(): Promise<boolean> {
    return true;
  }

  public async getCapabilities(): Promise<AdapterCapabilities> {
    return {
      supportedLevels: ['L1', 'L2', 'L3'],
      canDetectTools: true,
      canInspectTasks: true,
      canCaptureLiveOutput: false,
      requiresLocalDaemon: true,
      supportedEventTypes: [
        'agent.status_changed',
        'agent.task_started',
        'agent.task_completed',
      ],
    };
  }

  public async start(
    context: AdapterContext,
    emit: (event: CanonicalEventEnvelope) => Promise<void>
  ): Promise<AdapterSession> {
    const sessionId = `cursor_sess_${Date.now()}`;

    const initialEvent: CanonicalEventEnvelope = {
      id: `evt_${Date.now()}_cursor_start`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: new Date().toISOString(),
      source: 'custom',
      type: 'agent.status_changed',
      data: {
        status: 'working',
        activity: 'Cursor AI Agent aktywny w projekcie',
        provider: 'cursor',
        confidence: 0.95,
        expiresInMs: 30000,
      },
    };
    await emit(initialEvent);

    this.activeSession = {
      sessionId,
      startedAt: new Date().toISOString(),
      stop: async () => {
        const stopEvent: CanonicalEventEnvelope = {
          id: `evt_${Date.now()}_cursor_stop`,
          schemaVersion: 1,
          deviceId: context.deviceId,
          projectId: context.projectId,
          occurredAt: new Date().toISOString(),
          source: 'custom',
          type: 'agent.status_changed',
          data: {
            status: 'idle',
            activity: 'Cursor AI Agent odłączony',
            provider: 'cursor',
            confidence: 1.0,
          },
        };
        await emit(stopEvent);
      },
    };

    return this.activeSession;
  }

  public async stop(): Promise<void> {
    if (this.activeSession) {
      await this.activeSession.stop();
      this.activeSession = null;
    }
  }
}
