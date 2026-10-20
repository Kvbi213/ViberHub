/**
 * VibeHub Bridge — Core Daemon Orchestrator
 * Integruje kolektory, adaptery agentów, silnik redakcji i transport HTTP
 */
import path from 'path';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';
import { RedactionEngine } from '../redaction/redactor';
import { HttpTransport } from '../transport/http-transport';
import { GitCollector } from '../collectors/git-collector';
import { FileWatcherCollector } from '../collectors/file-watcher';
import { AntigravityAdapter } from '../adapters/antigravity/antigravity-adapter';
import { ClaudeCodeAdapter } from '../adapters/claude-code/claude-code-adapter';
import { CursorAdapter } from '../adapters/cursor/cursor-adapter';

export interface DaemonOptions {
  apiUrl?: string;
  deviceId?: string;
  projectId?: string;
  projectRoot?: string;
  activeAgents?: Array<'antigravity' | 'claude-code' | 'cursor'>;
  operatorName?: string;
  operatorRole?: string;
}

export class VibeHubBridgeDaemon {
  public readonly version = '0.1.4';
  private apiUrl: string;
  private deviceId: string;
  private projectId: string;
  private projectRoot: string;
  private activeAgentsList: Array<'antigravity' | 'claude-code' | 'cursor'>;
  private operatorName: string;
  private operatorRole: string;

  private redactor: RedactionEngine;
  private transport: HttpTransport;
  private gitCollector: GitCollector;
  private fileWatcher: FileWatcherCollector;
  private antigravityAdapter: AntigravityAdapter;
  private claudeCodeAdapter: ClaudeCodeAdapter;
  private cursorAdapter: CursorAdapter;

  private gitPollTimer: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(options: DaemonOptions = {}) {
    this.apiUrl =
      options.apiUrl || process.env.VIBEHUB_API_URL || 'https://viber-hub.vercel.app/api/v1';
    this.deviceId = options.deviceId || process.env.VIBEHUB_DEVICE_ID || 'dev_win32_local';
    this.projectId = options.projectId || process.env.VIBEHUB_PROJECT_ID || 'viberhub-8842f';
    this.projectRoot = options.projectRoot || process.cwd();
    this.activeAgentsList = options.activeAgents || ['antigravity', 'claude-code', 'cursor'];
    this.operatorName = options.operatorName || 'Jakub (Operator)';
    this.operatorRole = options.operatorRole || 'Systems & Observability Architect';

    this.redactor = new RedactionEngine(this.projectRoot);
    this.transport = new HttpTransport({
      baseUrl: this.apiUrl,
      deviceId: this.deviceId,
      projectId: this.projectId,
      bridgeVersion: this.version,
    });

    this.gitCollector = new GitCollector(this.projectRoot, this.deviceId, this.projectId, this.redactor);
    this.fileWatcher = new FileWatcherCollector(this.projectRoot, this.deviceId, this.projectId, this.redactor);
    this.antigravityAdapter = new AntigravityAdapter(this.redactor);
    this.claudeCodeAdapter = new ClaudeCodeAdapter(this.redactor);
    this.cursorAdapter = new CursorAdapter(this.redactor);
  }

  public async start(): Promise<void> {
    console.log('================================================================');
    console.log(`[*] INFO :: VibeHub Bridge Daemon v${this.version} starting...`);
    console.log(`[*] INFO :: Target API: ${this.apiUrl}`);
    console.log(`[*] INFO :: Device ID: ${this.deviceId}`);
    console.log(`[*] INFO :: Operator: ${this.operatorName} [${this.operatorRole}]`);
    console.log(`[*] INFO :: Active Agents: ${this.activeAgentsList.join(', ')}`);
    console.log(`[*] INFO :: Project ID: ${this.projectId}`);
    console.log(`[*] INFO :: Project Root: ${this.projectRoot}`);
    console.log('================================================================');

    this.isRunning = true;

    // 1. Uruchom transport sieciowy
    this.transport.start();

    // 2. Uruchom obserwator plików
    this.fileWatcher.start(async (event) => {
      this.emitEvent(event);
    });

    // 3. Zainicjuj wybrane adaptery Coding AI
    const adapterContext = {
      projectId: this.projectId,
      projectRoot: this.projectRoot,
      deviceId: this.deviceId,
      config: {
        operatorName: this.operatorName,
        operatorRole: this.operatorRole,
      },
    };

    if (this.activeAgentsList.includes('antigravity')) {
      await this.antigravityAdapter.start(adapterContext, async (event) => {
        this.emitEvent(event);
      });
    }

    if (this.activeAgentsList.includes('claude-code')) {
      await this.claudeCodeAdapter.start(adapterContext, async (event) => {
        this.emitEvent(event);
      });
    }

    if (this.activeAgentsList.includes('cursor')) {
      await this.cursorAdapter.start(adapterContext, async (event) => {
        this.emitEvent(event);
      });
    }

    // 4. Uruchom pętlę sprawdzania repozytorium Git (co 5 sekund)
    this.gitPollTimer = setInterval(async () => {
      if (!this.isRunning) return;
      await this.gitCollector.pollGitState(async (event) => {
        this.emitEvent(event);
      });
    }, 5000);

    // Wykonaj pierwsze sprawdzenie Git
    await this.gitCollector.pollGitState(async (event) => {
      this.emitEvent(event);
    });

    console.log('[+] SUCCESS :: VibeHub Bridge Daemon running and listening (Multi-Agent Active).');
  }

  public emitEvent(event: CanonicalEventEnvelope): void {
    const { redactedData } = this.redactor.sanitizeObject(event.data);
    const sanitizedEvent: CanonicalEventEnvelope = {
      ...event,
      data: redactedData,
    };

    this.transport.enqueue(sanitizedEvent);
  }

  public async stop(): Promise<void> {
    console.log('[*] INFO :: Stopping VibeHub Bridge Daemon...');
    this.isRunning = false;

    if (this.gitPollTimer) {
      clearInterval(this.gitPollTimer);
      this.gitPollTimer = null;
    }

    await this.fileWatcher.stop();
    await this.antigravityAdapter.stop();
    await this.claudeCodeAdapter.stop();
    await this.cursorAdapter.stop();
    await this.transport.stop();

    console.log('[+] SUCCESS :: VibeHub Bridge Daemon stopped cleanly.');
  }
}
