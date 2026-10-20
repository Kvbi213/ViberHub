/**
 * VibeHub Bridge — HTTP Outbound Transport
 * Obsługuje okresowy heartbeat oraz wysyłanie paczek zdarzeń z buforowaniem offline
 */
import { HeartbeatRequest, HeartbeatResponse } from '@vibehub/contracts';
import { CanonicalEventEnvelope, EventBatchRequest, EventBatchResponse } from '@vibehub/event-protocol';

export interface TransportConfig {
  baseUrl: string;
  deviceId: string;
  projectId: string;
  bridgeVersion: string;
}

export class HttpTransport {
  private config: TransportConfig;
  private queue: CanonicalEventEnvelope[] = [];
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private flushInterval: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(config: TransportConfig) {
    this.config = config;
  }

  public start() {
    this.isRunning = true;

    // Heartbeat co 15 sekund
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat().catch(() => {});
    }, 15000);

    // Wysyłanie paczek co 2 sekundy
    this.flushInterval = setInterval(() => {
      this.flushQueue().catch(() => {});
    }, 2000);

    // Natychmiastowy pierwszy heartbeat
    this.sendHeartbeat().catch(() => {});
  }

  public enqueue(event: CanonicalEventEnvelope) {
    this.queue.push(event);
  }

  public async sendHeartbeat(): Promise<HeartbeatResponse | null> {
    if (!this.isRunning) return null;

    const payload: HeartbeatRequest = {
      deviceId: this.config.deviceId,
      bridgeVersion: this.config.bridgeVersion,
      uptimeSeconds: Math.floor(process.uptime()),
      activeProjectsCount: 1,
      activeAdapters: ['antigravity', 'claude-code'],
    };

    try {
      const res = await fetch(`${this.config.baseUrl}/bridge/heartbeat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return (await res.json()) as HeartbeatResponse;
      }
      return null;
    } catch {
      // Offline fallback
      return null;
    }
  }

  public async flushQueue(): Promise<EventBatchResponse | null> {
    if (!this.isRunning || this.queue.length === 0) return null;

    const batch = this.queue.splice(0, 50);
    const payload: EventBatchRequest = {
      schemaVersion: 1,
      deviceId: this.config.deviceId,
      projectId: this.config.projectId,
      events: batch,
    };

    try {
      const res = await fetch(`${this.config.baseUrl}/events/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return (await res.json()) as EventBatchResponse;
      } else {
        // Zwróć na początek kolejki w razie błędu serwera
        this.queue.unshift(...batch);
        return null;
      }
    } catch {
      // Re-queue offline
      this.queue.unshift(...batch);
      return null;
    }
  }

  public async stop() {
    this.isRunning = false;
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (this.flushInterval) clearInterval(this.flushInterval);
    // Wyślij ewentualne pozostałe zdarzenia
    await this.flushQueue();
  }
}
