import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const webDir = path.resolve('apps/web');
const apiDir = path.join(webDir, 'app', 'api');
const tempDir = path.join(webDir, '_api_shelter');

console.log('[*] INFO :: Preparing static frontend export for Firebase Hosting...');

let moved = false;
if (fs.existsSync(apiDir)) {
  fs.renameSync(apiDir, tempDir);
  moved = true;
}

try {
  console.log('[*] INFO :: Running next build in export mode...');
  execSync('next build', {
    cwd: webDir,
    stdio: 'inherit',
    env: { ...process.env, BUILD_TARGET: 'export' },
  });
  console.log('[+] SUCCESS :: Export generated at apps/web/out');
} finally {
  if (moved && fs.existsSync(tempDir)) {
    fs.renameSync(tempDir, apiDir);
    console.log('[*] INFO :: Restored API route handlers for Vercel backend.');
  }
}
