/**
 * VibeHub Bridge — Local Daemon & Telemetry Dispatcher
 * Paradygmat: Local-First Observability & Secure-by-Design
 */
import { DeviceSchema, HeartbeatRequest } from '@vibehub/contracts';
import { CanonicalEventEnvelope, EventBatchRequest } from '@vibehub/event-protocol';

const API_BASE_URL = process.env.VIBEHUB_API_URL || 'http://localhost:3000/api/v1';
const DEVICE_ID = process.env.VIBEHUB_DEVICE_ID || 'dev_win32_local';
const BRIDGE_VERSION = '0.1.4';

class VibeHubBridgeDaemon {
  private isRunning = false;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private eventBatchQueue: CanonicalEventEnvelope[] = [];

  public async start() {
    console.log('=====================================================');
    console.log(`[*] INFO :: VibeHub Bridge v${BRIDGE_VERSION} starting...`);
    console.log(`[*] INFO :: Target API: ${API_BASE_URL}`);
    console.log(`[*] INFO :: Device ID: ${DEVICE_ID}`);
    console.log('=====================================================');

    this.isRunning = true;
    this.startHeartbeatLoop();
    this.startEventFlushLoop();
    this.emitInitialStatus();
  }

  private startHeartbeatLoop() {
    this.heartbeatTimer = setInterval(async () => {
      if (!this.isRunning) return;

      const heartbeat: HeartbeatRequest = {
        deviceId: DEVICE_ID,
        bridgeVersion: BRIDGE_VERSION,
        uptimeSeconds: Math.floor(process.uptime()),
        activeProjectsCount: 1,
        activeAdapters: ['antigravity', 'claude-code'],
      };

      try {
        const res = await fetch(`${API_BASE_URL}/bridge/heartbeat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(heartbeat),
        });

        if (res.ok) {
          // Heartbeat acknowledged
        }
      } catch {
        // Fallback offline queue
      }
    }, 15000);
  }

  private startEventFlushLoop() {
    setInterval(async () => {
      if (!this.isRunning || this.eventBatchQueue.length === 0) return;

      const batch = this.eventBatchQueue.splice(0, 50);
      const payload: EventBatchRequest = {
        schemaVersion: 1,
        deviceId: DEVICE_ID,
        projectId: 'proj_vibehub_core',
        events: batch,
      };

      try {
        await fetch(`${API_BASE_URL}/events/batch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Re-queue on failure
        this.eventBatchQueue.unshift(...batch);
      }
    }, 2000);
  }

  private emitInitialStatus() {
    const event: CanonicalEventEnvelope = {
      id: `evt_${Date.now()}_init`,
      schemaVersion: 1,
      deviceId: DEVICE_ID,
      projectId: 'proj_vibehub_core',
      occurredAt: new Date().toISOString(),
      source: 'antigravity',
      type: 'agent.status_changed',
      data: {
        status: 'working',
        activity: 'Bridge daemon started and connected to local host',
        provider: 'antigravity',
        confidence: 1.0,
        expiresInMs: 30000,
      },
    };
    this.eventBatchQueue.push(event);
  }

  public stop() {
    this.isRunning = false;
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    console.log('[*] INFO :: VibeHub Bridge Daemon stopped cleanly.');
  }
}

// Inicjalizacja przy bezpośrednim wywołaniu
if (require.main === module || process.env.NODE_ENV !== 'test') {
  const daemon = new VibeHubBridgeDaemon();
  daemon.start().catch((err) => {
    console.error('[!] ALERT :: Bridge crash:', err);
  });
}
