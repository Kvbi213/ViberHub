/**
 * VibeHub Bridge — Antigravity Multi-Conversation Observer
 * Sledzi na zywo transkrypty i sesje Google Antigravity w brain
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { ActiveAgentSession } from '@vibehub/contracts';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';

interface ConversationState {
  conversationId: string;
  byteOffset: number;
  lastPrompt: string;
  activity?: string;
  currentTool?: string;
  activeFile?: string;
  fileStats?: string;
  diffSnippet: Array<{ line: number; type: '+' | '-' | ' '; text: string }>;
  status: 'working' | 'waiting' | 'idle' | 'error';
  tokens: { input: number; output: number; cacheRead: number };
  lastActiveAt: string;
  createdAt: string;
}

export class AntigravityConversationObserver {
  private brainDir: string;
  private conversations = new Map<string, ConversationState>();
  private pollInterval: NodeJS.Timeout | null = null;
  private isScanning = false;
  private deviceId: string;
  private projectId: string;
  private hostname: string;
  private operatorName: string;

  constructor(deviceId: string, projectId: string, operatorName: string) {
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.hostname = os.hostname();
    this.operatorName = operatorName;
    this.brainDir = path.join(os.homedir(), '.gemini', 'antigravity', 'brain');
  }

  public start(
    onSessionUpdate: (sessions: ActiveAgentSession[]) => void,
    emitEvent?: (event: CanonicalEventEnvelope) => void
  ): void {
    if (!fs.existsSync(this.brainDir)) {
      console.log(`[*] INFO :: Antigravity brain dir nie istnieje w ${this.brainDir} — observer oczekuje.`);
      return;
    }

    // Pierwsze natychmiastowe skanowanie
    this.scanAndTail(onSessionUpdate, emitEvent).catch((err) => {
      console.warn('[!] ALERT :: Antigravity observer initial scan warning:', err.message);
    });

    // Pętla odpytywania co 2 sekundy
    this.pollInterval = setInterval(async () => {
      if (this.isScanning) return;
      this.isScanning = true;
      try {
        await this.scanAndTail(onSessionUpdate, emitEvent);
      } catch (err: any) {
        // Cichy fallback
      } finally {
        this.isScanning = false;
      }
    }, 2000);
  }

  public stop(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  public getActiveSessions(): ActiveAgentSession[] {
    const list: ActiveAgentSession[] = [];
    const now = Date.now();
    const MAX_ACTIVE_AGE_MS = 2 * 60 * 60 * 1000; // Ostatnie 2 godziny

    for (const [convId, state] of this.conversations.entries()) {
      const lastActiveTime = new Date(state.lastActiveAt).getTime();
      if (now - lastActiveTime > MAX_ACTIVE_AGE_MS) continue;

      list.push({
        id: `agy_${convId.slice(0, 8)}`,
        conversationId: convId,
        provider: 'antigravity',
        name: `Google Antigravity #${convId.slice(0, 8)}`,
        model: 'Gemini 3.8 Flash',
        status: state.status,
        activity: state.lastPrompt || 'Sesja Antigravity CLI aktywna',
        currentTool: state.currentTool,
        activeFile: state.activeFile,
        fileStats: state.fileStats,
        diffSnippet: state.diffSnippet.length > 0 ? state.diffSnippet : undefined,
        tokens: state.tokens,
        lastActiveAt: state.lastActiveAt,
        machine: this.hostname,
        operatorName: this.operatorName,
      });
    }

    // Sortuj: najbardziej aktywne na początku
    return list.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
  }

  private async scanAndTail(
    onSessionUpdate: (sessions: ActiveAgentSession[]) => void,
    emitEvent?: (event: CanonicalEventEnvelope) => void
  ): Promise<void> {
    if (!fs.existsSync(this.brainDir)) return;

    let entries: string[] = [];
    try {
      entries = fs.readdirSync(this.brainDir);
    } catch {
      return;
    }

    const now = Date.now();
    const RECENT_THRESHOLD_MS = 12 * 60 * 60 * 1000; // 12 godzin
    let hasChanges = false;

    for (const entry of entries) {
      const convPath = path.join(this.brainDir, entry);
      let stat: fs.Stats;
      try {
        stat = fs.statSync(convPath);
      } catch {
        continue;
      }

      if (!stat.isDirectory()) continue;
      // Sprawdź czy folder był modyfikowany w ciągu ostatnich 12h
      if (now - stat.mtimeMs > RECENT_THRESHOLD_MS) continue;

      const logPath = path.join(convPath, '.system_generated', 'logs', 'transcript.jsonl');
      if (!fs.existsSync(logPath)) continue;

      const changed = this.tailTranscript(entry, logPath, emitEvent);
      if (changed) hasChanges = true;
    }

    if (hasChanges) {
      onSessionUpdate(this.getActiveSessions());
    }
  }

  private tailTranscript(
    convId: string,
    logFilePath: string,
    emitEvent?: (event: CanonicalEventEnvelope) => void
  ): boolean {
    let stat: fs.Stats;
    try {
      stat = fs.statSync(logFilePath);
    } catch {
      return false;
    }

    let state = this.conversations.get(convId);
    if (!state) {
      state = {
        conversationId: convId,
        byteOffset: 0,
        lastPrompt: 'Inicjalizacja sesji Antigravity...',
        status: 'waiting',
        diffSnippet: [],
        tokens: { input: 0, output: 0, cacheRead: 0 },
        lastActiveAt: stat.mtime.toISOString(),
        createdAt: stat.birthtime.toISOString(),
      };
      this.conversations.set(convId, state);

      // Jeśli plik jest duży, przy pierwszym odczycie weź tylko ostatnie 128KB
      if (stat.size > 128 * 1024) {
        state.byteOffset = stat.size - 64 * 1024;
      }
    }

    if (stat.size <= state.byteOffset) {
      return false;
    }

    const readLength = stat.size - state.byteOffset;
    const buffer = Buffer.alloc(readLength);
    let fd: number | null = null;
    let bytesRead = 0;

    try {
      fd = fs.openSync(logFilePath, 'r');
      bytesRead = fs.readSync(fd, buffer, 0, readLength, state.byteOffset);
      state.byteOffset += bytesRead;
      state.lastActiveAt = new Date().toISOString();
    } catch (err) {
      return false;
    } finally {
      if (fd !== null) {
        try {
          fs.closeSync(fd);
        } catch {}
      }
    }

    const chunk = buffer.toString('utf-8');
    const lines = chunk.split('\n');
    let updated = false;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      try {
        const item = JSON.parse(line);
        this.processTranscriptItem(convId, state, item, emitEvent);
        updated = true;
      } catch {
        // Ignoruj niepełne linie
      }
    }

    return updated;
  }

  private processTranscriptItem(
    convId: string,
    state: ConversationState,
    item: any,
    emitEvent?: (event: CanonicalEventEnvelope) => void
  ): void {
    // 1. Prompt użytkownika (USER_INPUT)
    if (item.type === 'USER_INPUT' && item.content) {
      let promptText = String(item.content);
      const matchRequest = promptText.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/i);
      if (matchRequest && matchRequest[1]) {
        promptText = matchRequest[1].trim();
      }
      state.lastPrompt = promptText.slice(0, 160);
      state.status = 'working';
      state.lastActiveAt = item.created_at || new Date().toISOString();

      if (emitEvent) {
        emitEvent({
          id: `evt_${Date.now()}_agy_task`,
          schemaVersion: 1,
          deviceId: this.deviceId,
          projectId: this.projectId,
          occurredAt: state.lastActiveAt,
          source: 'antigravity',
          type: 'agent.task_started',
          data: {
            conversationId: convId,
            status: 'working',
            activity: state.lastPrompt,
            provider: 'antigravity',
          },
        });
      }
    }

    // 2. Tokeny i krok planisty (PLANNER_RESPONSE)
    if (item.type === 'PLANNER_RESPONSE') {
      if (typeof item.input_tokens === 'number') state.tokens.input = item.input_tokens;
      if (typeof item.output_tokens === 'number') state.tokens.output = item.output_tokens;
      if (typeof item.cache_read_tokens === 'number') state.tokens.cacheRead = item.cache_read_tokens;

      if (Array.isArray(item.tool_calls) && item.tool_calls.length > 0) {
        state.status = 'working';
        const primaryTool = item.tool_calls[0];
        state.currentTool = primaryTool.name;

        // Rozpoznaj argumenty narzędzi
        if (primaryTool.name === 'run_command' && primaryTool.args) {
          const cmd = primaryTool.args.CommandLine || primaryTool.args.toolSummary || 'Shell command';
          state.activity = `Terminal: ${String(cmd).slice(0, 80)}`;
        } else if (
          (primaryTool.name === 'edit_file' || primaryTool.name === 'write_file' || primaryTool.name === 'read_file') &&
          primaryTool.args
        ) {
          const filePath = primaryTool.args.Path || 'workspace file';
          const relPath = path.basename(filePath);
          state.activeFile = relPath;
          state.activity = `${primaryTool.name}: ${relPath}`;

          if (primaryTool.name === 'edit_file' && primaryTool.args.Replacement) {
            state.fileStats = '+ modified';
            const repLines = String(primaryTool.args.Replacement).split('\n').slice(0, 4);
            state.diffSnippet = repLines.map((l, i) => ({
              line: i + 1,
              type: '+' as const,
              text: l.slice(0, 60),
            }));
          }
        }

        if (emitEvent) {
          emitEvent({
            id: `evt_${Date.now()}_tool_${primaryTool.name}`,
            schemaVersion: 1,
            deviceId: this.deviceId,
            projectId: this.projectId,
            occurredAt: item.created_at || new Date().toISOString(),
            source: 'antigravity',
            type: 'tool.started',
            data: {
              conversationId: convId,
              tool: primaryTool.name,
              activity: state.activity || state.lastPrompt,
              activeFile: state.activeFile,
            },
          });
        }
      }
    }

    // 3. Zakończenie fazy / oczekiwanie na operatora
    if (item.status === 'DONE' && (!item.tool_calls || item.tool_calls.length === 0)) {
      state.status = 'waiting';
    }
  }
}
