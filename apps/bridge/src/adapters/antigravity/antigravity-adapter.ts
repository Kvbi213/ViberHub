/**
 * VibeHub Bridge — Antigravity Agent Adapter
 * Standard obserwowalności poziomu L1-L3 dla Google Antigravity CLI
 */
import { AgentAdapter, AdapterCapabilities, AdapterContext, AdapterSession } from '@vibehub/adapter-sdk';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';
import { RedactionEngine } from '../../redaction/redactor';

export interface AntigravityStatuslinePayload {
  conversation_id?: string;
  workspace?: string;
  model?: string;
  agent_state?: 'idle' | 'running' | 'working' | 'waiting' | 'error';
  current_tool?: string;
  activity_summary?: string;
}

export class AntigravityAdapter implements AgentAdapter {
  public readonly id = 'antigravity';
  public readonly name = 'Google Antigravity CLI Adapter';
  public readonly version = '0.1.0';

  private activeSession: AdapterSession | null = null;
  private redactor: RedactionEngine;

  constructor(redactor: RedactionEngine) {
    this.redactor = redactor;
  }

  public async detect(): Promise<boolean> {
    // Sprawdź obecność zmiennych środowiskowych lub narzędzia agy / antigravity
    return true;
  }

  public async getCapabilities(): Promise<AdapterCapabilities> {
    return {
      supportedLevels: ['L1', 'L2', 'L3'],
      canDetectTools: true,
      canInspectTasks: true,
      canCaptureLiveOutput: false, // Bezpieczeństwo: brak strumieniowania raw shella
      requiresLocalDaemon: true,
      supportedEventTypes: [
        'agent.status_changed',
        'agent.task_started',
        'agent.task_completed',
        'tool.started',
        'tool.completed',
      ],
    };
  }

  public async start(
    context: AdapterContext,
    emit: (event: CanonicalEventEnvelope) => Promise<void>
  ): Promise<AdapterSession> {
    const sessionId = `agy_sess_${Date.now()}`;
    let isStopped = false;

    // Emisja zdarzenia startowego agenta
    const initialEvent: CanonicalEventEnvelope = {
      id: `evt_${Date.now()}_agy_start`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: new Date().toISOString(),
      source: 'antigravity',
      type: 'agent.status_changed',
      data: {
        status: 'working',
        activity: 'Google Antigravity CLI podłączone do VibeHub Mesh',
        provider: 'antigravity',
        confidence: 1.0,
        expiresInMs: 30000,
      },
    };
    await emit(initialEvent);

    this.activeSession = {
      sessionId,
      startedAt: new Date().toISOString(),
      stop: async () => {
        isStopped = true;
        const stopEvent: CanonicalEventEnvelope = {
          id: `evt_${Date.now()}_agy_stop`,
          schemaVersion: 1,
          deviceId: context.deviceId,
          projectId: context.projectId,
          occurredAt: new Date().toISOString(),
          source: 'antigravity',
          type: 'agent.status_changed',
          data: {
            status: 'idle',
            activity: 'Google Antigravity CLI odłączone',
            provider: 'antigravity',
            confidence: 1.0,
          },
        };
        await emit(stopEvent);
      },
    };

    return this.activeSession;
  }

  public handleStatuslineInput(
    payload: AntigravityStatuslinePayload,
    context: AdapterContext,
    emit: (event: CanonicalEventEnvelope) => Promise<void>
  ): Promise<void> {
    const rawActivity = payload.activity_summary || (payload.current_tool ? `Wywołanie narzędzia: ${payload.current_tool}` : 'Praca nad zadaniem');
    const sanitizedActivity = this.redactor.sanitizeString(rawActivity);

    const event: CanonicalEventEnvelope = {
      id: `evt_${Date.now()}_agy_state`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: new Date().toISOString(),
      source: 'antigravity',
      type: 'agent.status_changed',
      data: {
        status: payload.agent_state === 'running' ? 'working' : payload.agent_state || 'working',
        activity: sanitizedActivity,
        provider: 'antigravity',
        tool: payload.current_tool,
        confidence: 1.0,
        expiresInMs: 45000,
      },
    };

    return emit(event);
  }

  public async stop(): Promise<void> {
    if (this.activeSession) {
      await this.activeSession.stop();
      this.activeSession = null;
    }
  }
}
