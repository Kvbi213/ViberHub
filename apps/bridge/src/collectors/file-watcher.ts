/**
 * VibeHub Bridge — File System Change Collector
 * Monitoruje zmiany plików projektu z wykluczeniem ścieżek ignorowanych
 */
import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';
import { CanonicalEventEnvelope } from '@vibehub/event-protocol';
import { RedactionEngine } from '../redaction/redactor';

export class FileWatcherCollector {
  private projectRoot: string;
  private deviceId: string;
  private projectId: string;
  private redactor: RedactionEngine;
  private watcher: FSWatcher | null = null;
  private debounceMap = new Map<string, NodeJS.Timeout>();

  constructor(projectRoot: string, deviceId: string, projectId: string, redactor: RedactionEngine) {
    this.projectRoot = projectRoot;
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.redactor = redactor;
  }

  public start(emit: (event: CanonicalEventEnvelope) => Promise<void>) {
    this.watcher = chokidar.watch(this.projectRoot, {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/dist/**',
        '**/.env*',
      ],
      ignoreInitial: true,
      persistent: true,
      depth: 6,
    });

    const handleFileEvent = (action: 'add' | 'change' | 'unlink', fullPath: string) => {
      const relPath = path.relative(this.projectRoot, fullPath);
      if (this.redactor.isIgnoredPath(relPath)) return;

      // Debounce częstych zapisów dla tego samego pliku
      const existing = this.debounceMap.get(relPath);
      if (existing) clearTimeout(existing);

      const timeout = setTimeout(async () => {
        this.debounceMap.delete(relPath);

        const event: CanonicalEventEnvelope = {
          id: `evt_file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          schemaVersion: 1,
          deviceId: this.deviceId,
          projectId: this.projectId,
          occurredAt: new Date().toISOString(),
          source: 'system',
          type: 'file.changed',
          data: {
            filePath: relPath.replace(/\\/g, '/'),
            action,
            timestamp: Date.now(),
          },
        };

        await emit(event);
      }, 500);

      this.debounceMap.set(relPath, timeout);
    };

    this.watcher.on('add', (p) => handleFileEvent('add', p));
    this.watcher.on('change', (p) => handleFileEvent('change', p));
    this.watcher.on('unlink', (p) => handleFileEvent('unlink', p));
  }

  public async stop() {
    for (const timeout of this.debounceMap.values()) {
      clearTimeout(timeout);
    }
    this.debounceMap.clear();

    if (this.watcher) {
      await this.watcher.close();
      this.watcher = null;
    }
  }
}
