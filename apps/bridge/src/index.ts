/**
 * VibeHub Bridge — Local Daemon & Telemetry Dispatcher Entry Point
 * Paradygmat: Local-First Observability & Secure-by-Design
 */
import { VibeHubBridgeDaemon } from './core/daemon';

export * from './core/daemon';
export * from './redaction/redactor';
export * from './transport/http-transport';
export * from './collectors/git-collector';
export * from './collectors/file-watcher';
export * from './adapters/antigravity/antigravity-adapter';
export * from './adapters/claude-code/claude-code-adapter';

if (require.main === module || process.env.NODE_ENV !== 'test') {
  const daemon = new VibeHubBridgeDaemon();

  daemon.start().catch((err) => {
    console.error('[!] ALERT :: VibeHub Bridge crash:', err);
    process.exit(1);
  });

  const handleShutdown = async () => {
    console.log('\n[*] INFO :: Graceful shutdown initiated...');
    await daemon.stop();
    process.exit(0);
  };

  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);
}
