/**
 * VibeHub Bridge — Multi-Conversation Manager
 * Orkiestruje obserwatorów wielu równoległych sesji agentów AI i synchronizuje stan z chmurą
 */
import { ActiveAgentSession } from '@vibehub/contracts';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';
import { AntigravityConversationObserver } from './antigravity-observer';
import { ClaudeCodeSessionObserver } from './claude-observer';

export interface ConversationManagerOptions {
  apiUrl: string;
  deviceId: string;
  projectId: string;
  operatorName: string;
  enabledProviders: Array<'antigravity' | 'claude-code' | 'cursor'>;
  onEmitEvent?: (event: CanonicalEventEnvelope) => void;
}

export class MultiConversationManager {
  private apiUrl: string;
  private deviceId: string;
  private projectId: string;
  private operatorName: string;
  private enabledProviders: Array<'antigravity' | 'claude-code' | 'cursor'>;
  private onEmitEvent?: (event: CanonicalEventEnvelope) => void;

  private antigravityObserver: AntigravityConversationObserver;
  private claudeObserver: ClaudeCodeSessionObserver;
  private lastSyncedSessions: ActiveAgentSession[] = [];
  private syncTimer: NodeJS.Timeout | null = null;

  constructor(options: ConversationManagerOptions) {
    this.apiUrl = options.apiUrl;
    this.deviceId = options.deviceId;
    this.projectId = options.projectId;
    this.operatorName = options.operatorName;
    this.enabledProviders = options.enabledProviders;
    this.onEmitEvent = options.onEmitEvent;

    this.antigravityObserver = new AntigravityConversationObserver(
      this.deviceId,
      this.projectId,
      this.operatorName
    );
    this.claudeObserver = new ClaudeCodeSessionObserver(
      this.deviceId,
      this.projectId,
      this.operatorName
    );
  }

  public start(): void {
    const handleUpdate = () => {
      this.syncActiveSessionsToCloud();
    };

    if (this.enabledProviders.includes('antigravity')) {
      this.antigravityObserver.start((_) => handleUpdate(), this.onEmitEvent);
    }

    if (this.enabledProviders.includes('claude-code')) {
      this.claudeObserver.start((_) => handleUpdate(), this.onEmitEvent);
    }

    // Wykonaj pierwszą synchronizację
    this.syncActiveSessionsToCloud();

    // Heartbeat synchronizacyjny co 10 sekund
    this.syncTimer = setInterval(() => {
      this.syncActiveSessionsToCloud();
    }, 10000);
  }

  public stop(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
    this.antigravityObserver.stop();
    this.claudeObserver.stop();
  }

  public getAllActiveSessions(): ActiveAgentSession[] {
    const list: ActiveAgentSession[] = [];
    if (this.enabledProviders.includes('antigravity')) {
      list.push(...this.antigravityObserver.getActiveSessions());
    }
    if (this.enabledProviders.includes('claude-code')) {
      list.push(...this.claudeObserver.getActiveSessions());
    }
    return list;
  }

  public async syncActiveSessionsToCloud(): Promise<void> {
    const active = this.getAllActiveSessions();
    this.lastSyncedSessions = active;

    const cleanBase = this.apiUrl.replace(/\/$/, '');
    const endpoint = cleanBase.endsWith('/api/v1')
      ? `${cleanBase}/agents/active`
      : `${cleanBase}/api/v1/agents/active`;

    const payload = {
      roomId: this.projectId,
      deviceId: this.deviceId,
      agents: active,
    };

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err: any) {
      // Cichy fallback sieciowy
    }
  }
}
