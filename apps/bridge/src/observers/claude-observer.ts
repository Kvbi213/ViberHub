/**
 * VibeHub Bridge — Claude Code Session Observer
 * Śledzi na żywo aktywne sesje Claude Code z ~/.claude/history.jsonl
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { ActiveAgentSession } from '@vibehub/contracts';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';

export class ClaudeCodeSessionObserver {
  private historyFile: string;
  private byteOffset: number = 0;
  private lastSession: ActiveAgentSession | null = null;
  private pollInterval: NodeJS.Timeout | null = null;
  private deviceId: string;
  private projectId: string;
  private hostname: string;
  private operatorName: string;

  constructor(deviceId: string, projectId: string, operatorName: string) {
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.hostname = os.hostname();
    this.operatorName = operatorName;
    this.historyFile = path.join(os.homedir(), '.claude', 'history.jsonl');
  }

  public start(
    onSessionUpdate: (sessions: ActiveAgentSession[]) => void,
    emitEvent?: (event: CanonicalEventEnvelope) => void
  ): void {
    if (!fs.existsSync(this.historyFile)) {
      return;
    }

    try {
      const stat = fs.statSync(this.historyFile);
      if (stat.size > 32 * 1024) {
        this.byteOffset = stat.size - 16 * 1024;
      }
    } catch {}

    this.pollHistory(onSessionUpdate, emitEvent);

    this.pollInterval = setInterval(() => {
      this.pollHistory(onSessionUpdate, emitEvent);
    }, 3000);
  }

  public stop(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  public getActiveSessions(): ActiveAgentSession[] {
    if (!this.lastSession) return [];
    const ageMs = Date.now() - new Date(this.lastSession.lastActiveAt).getTime();
    if (ageMs > 2 * 60 * 60 * 1000) {
      return []; // Starsze niż 2 godziny
    }
    return [this.lastSession];
  }

  private pollHistory(
    onSessionUpdate: (sessions: ActiveAgentSession[]) => void,
    emitEvent?: (event: CanonicalEventEnvelope) => void
  ): void {
    if (!fs.existsSync(this.historyFile)) return;

    let stat: fs.Stats;
    try {
      stat = fs.statSync(this.historyFile);
    } catch {
      return;
    }

    if (stat.size <= this.byteOffset) return;

    const readLength = stat.size - this.byteOffset;
    const buffer = Buffer.alloc(readLength);
    let fd: number | null = null;

    try {
      fd = fs.openSync(this.historyFile, 'r');
      fs.readSync(fd, buffer, 0, readLength, this.byteOffset);
      this.byteOffset += readLength;
    } catch {
      return;
    } finally {
      if (fd !== null) {
        try {
          fs.closeSync(fd);
        } catch {}
      }
    }

    const chunk = buffer.toString('utf-8');
    const lines = chunk.split('\n');
    let hasNew = false;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      try {
        const item = JSON.parse(line);
        if (item.sessionId && item.display) {
          const occurredAt = item.timestamp
            ? new Date(item.timestamp).toISOString()
            : new Date().toISOString();

          this.lastSession = {
            id: `claude_${String(item.sessionId).slice(0, 8)}`,
            conversationId: item.sessionId,
            provider: 'claude-code',
            name: `Claude Code #${String(item.sessionId).slice(0, 8)}`,
            model: 'claude-3.5-sonnet',
            status: 'working',
            activity: String(item.display).slice(0, 140),
            activeFile: item.project ? path.basename(item.project) : undefined,
            lastActiveAt: occurredAt,
            machine: this.hostname,
            operatorName: this.operatorName,
          };
          hasNew = true;

          if (emitEvent) {
            emitEvent({
              id: `evt_${Date.now()}_claude_act`,
              schemaVersion: 1,
              deviceId: this.deviceId,
              projectId: this.projectId,
              occurredAt,
              source: 'claude-code',
              type: 'agent.task_started',
              data: {
                sessionId: item.sessionId,
                activity: item.display,
                project: item.project,
              },
            });
          }
        }
      } catch {}
    }

    if (hasNew) {
      onSessionUpdate(this.getActiveSessions());
    }
  }
}
