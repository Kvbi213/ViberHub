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
    // Bezpieczne ignorowanie folderów systemowych Windows, junction points i artefaktów budowania
    const isSystemOrIgnored = (filePath: string): boolean => {
      const normalized = filePath.replace(/\\/g, '/');
      // Foldery systemowe i junction points Windows
      if (/(\/|^)(Cookies|AppData|Application Data|Local Settings|NetHood|PrintHood|Recent|SendTo|Start Menu|Templates|System Volume Information|\$Recycle\.Bin)(\/|$)/i.test(normalized)) {
        return true;
      }
      // Pliki rejestru systemowego Windows
      if (/(NTUSER|usrclass)\.dat/i.test(normalized)) {
        return true;
      }
      // Katalogi zależności, budowania i cachowania
      if (/(\/|^)(node_modules|\.git|\.next|dist|out|\.firebase|\.turbo|\.cache|\.gemini)(\/|$)/i.test(normalized)) {
        return true;
      }
      return false;
    };

    try {
      this.watcher = chokidar.watch(this.projectRoot, {
        ignored: isSystemOrIgnored,
        ignoreInitial: true,
        persistent: true,
        depth: 5,
        ignorePermissionErrors: true, // Kluczowe dla Windows EPERM / EACCES
      });

      // Bezpieczny handler błędów uniemożliwiający crash procesu
      this.watcher.on('error', (err: any) => {
        console.warn(`[*] INFO :: FileWatcher pomija chroniony zasób [${err?.code || 'WARN'}]: ${err?.path || err?.message || err}`);
      });

      const handleFileEvent = (action: 'add' | 'change' | 'unlink', fullPath: string) => {
        if (isSystemOrIgnored(fullPath)) return;
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
    } catch (err: any) {
      console.warn('[!] ALERT :: FileWatcher failed to start:', err.message);
    }
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
