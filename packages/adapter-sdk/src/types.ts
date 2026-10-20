import { CanonicalEventEnvelope } from '@vibehub/event-protocol';

export type ObservabilityLevel = 'L1' | 'L2' | 'L3' | 'L4';

export interface AdapterCapabilities {
  supportedLevels: ObservabilityLevel[];
  canDetectTools: boolean;
  canInspectTasks: boolean;
  canCaptureLiveOutput: boolean;
  requiresLocalDaemon: boolean;
  supportedEventTypes: string[];
}

export interface AdapterContext {
  projectId: string;
  projectRoot: string;
  deviceId: string;
  config: Record<string, unknown>;
}

export interface AdapterSession {
  sessionId: string;
  startedAt: string;
  stop: () => Promise<void>;
}

export interface AgentAdapter {
  readonly id: string;
  readonly name: string;
  readonly version: string;

  detect(): Promise<boolean>;
  getCapabilities(): Promise<AdapterCapabilities>;
  start(
    context: AdapterContext,
    emit: (event: CanonicalEventEnvelope) => Promise<void>
  ): Promise<AdapterSession>;
  stop(): Promise<void>;
}
