/**
 * VibeHub Bridge — Git Telemetry Collector
 * Monitoruje gałęzie, ostatnie commity i status working tree
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';
import { RedactionEngine } from '../redaction/redactor';

const execAsync = promisify(exec);

export interface GitState {
  branch: string;
  lastCommitHash: string;
  lastCommitMessage: string;
  hasUncommittedChanges: boolean;
}

export class GitCollector {
  private projectRoot: string;
  private deviceId: string;
  private projectId: string;
  private redactor: RedactionEngine;
  private lastState: GitState | null = null;

  constructor(projectRoot: string, deviceId: string, projectId: string, redactor: RedactionEngine) {
    this.projectRoot = projectRoot;
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.redactor = redactor;
  }

  public async pollGitState(emit: (event: CanonicalEventEnvelope) => Promise<void>): Promise<GitState | null> {
    try {
      const branchCmd = await execAsync('git rev-parse --abbrev-ref HEAD', { cwd: this.projectRoot });
      const branch = branchCmd.stdout.trim();

      const logCmd = await execAsync('git log -n 1 --pretty=format:"%h|%s|%an|%cI"', {
        cwd: this.projectRoot,
      });
      const [lastCommitHash, rawMessage, author, dateStr] = logCmd.stdout.trim().split('|');
      const lastCommitMessage = this.redactor.sanitizeString(rawMessage || '');

      const statusCmd = await execAsync('git status --porcelain', { cwd: this.projectRoot });
      const hasUncommittedChanges = statusCmd.stdout.trim().length > 0;

      const currentState: GitState = {
        branch,
        lastCommitHash: lastCommitHash || '',
        lastCommitMessage,
        hasUncommittedChanges,
      };

      // Wykryj nowy commit
      if (this.lastState && this.lastState.lastCommitHash !== currentState.lastCommitHash && currentState.lastCommitHash) {
        const commitEvent: CanonicalEventEnvelope = {
          id: `evt_git_${Date.now()}_${currentState.lastCommitHash}`,
          schemaVersion: 1,
          deviceId: this.deviceId,
          projectId: this.projectId,
          occurredAt: dateStr || new Date().toISOString(),
          source: 'git',
          type: 'git.commit_created',
          data: {
            hash: currentState.lastCommitHash,
            message: currentState.lastCommitMessage,
            branch: currentState.branch,
            author: author || 'Developer',
          },
        };
        await emit(commitEvent);
      }

      this.lastState = currentState;
      return currentState;
    } catch {
      // Katalog nie jest repozytorium git lub błąd polecenia
      return null;
    }
  }
}
