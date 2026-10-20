/**
 * VibeHub Bridge — Claude Code Agent Adapter
 * Standard obserwowalności poziomu L1-L3 dla Claude Code Hooks
 */
import { AgentAdapter, AdapterCapabilities, AdapterContext, AdapterSession } from '@vibehub/adapter-sdk';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';
import { RedactionEngine } from '../../redaction/redactor';

export interface ClaudeCodeHookPayload {
  hook_event?: 'pre_tool_use' | 'post_tool_use' | 'user_prompt' | 'session_start' | 'session_end';
  tool_name?: string;
  tool_input_summary?: string;
  status?: string;
}

export class ClaudeCodeAdapter implements AgentAdapter {
  public readonly id = 'claude-code';
  public readonly name = 'Claude Code Adapter';
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
        'tool.started',
        'tool.completed',
      ],
    };
  }

  public async start(
    context: AdapterContext,
    emit: (event: CanonicalEventEnvelope) => Promise<void>
  ): Promise<AdapterSession> {
    const sessionId = `claude_sess_${Date.now()}`;

    this.activeSession = {
      sessionId,
      startedAt: new Date().toISOString(),
      stop: async () => {
        const stopEvent: CanonicalEventEnvelope = {
          id: `evt_${Date.now()}_claude_stop`,
          schemaVersion: 1,
          deviceId: context.deviceId,
          projectId: context.projectId,
          occurredAt: new Date().toISOString(),
          source: 'claude-code',
          type: 'agent.status_changed',
          data: {
            status: 'idle',
            activity: 'Claude Code sesja zakończona',
            provider: 'claude-code',
            confidence: 1.0,
          },
        };
        await emit(stopEvent);
      },
    };

    return this.activeSession;
  }

  public async handleHookPayload(
    payload: ClaudeCodeHookPayload,
    context: AdapterContext,
    emit: (event: CanonicalEventEnvelope) => Promise<void>
  ): Promise<void> {
    let eventType: 'agent.status_changed' | 'tool.started' | 'tool.completed' = 'agent.status_changed';
    let status: 'working' | 'waiting' | 'idle' = 'working';
    let activity = 'Claude Code wykonuje operację';

    if (payload.hook_event === 'pre_tool_use') {
      eventType = 'tool.started';
      status = 'working';
      activity = `Narzędzie: ${payload.tool_name || 'nieznane'}`;
    } else if (payload.hook_event === 'post_tool_use') {
      eventType = 'tool.completed';
      status = 'waiting';
      activity = `Zakończono narzędzie: ${payload.tool_name || 'nieznane'}`;
    }

    const sanitizedActivity = this.redactor.sanitizeString(payload.tool_input_summary || activity);

    const event: CanonicalEventEnvelope = {
      id: `evt_${Date.now()}_claude_hook`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: new Date().toISOString(),
      source: 'claude-code',
      type: eventType,
      data: {
        status,
        activity: sanitizedActivity,
        provider: 'claude-code',
        tool: payload.tool_name,
        confidence: 1.0,
        expiresInMs: 30000,
      },
    };

    await emit(event);
  }

  public async stop(): Promise<void> {
    if (this.activeSession) {
      await this.activeSession.stop();
      this.activeSession = null;
    }
  }
}
