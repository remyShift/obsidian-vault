/**
 * Watches apps/cms/src/payload-types.ts for changes and syncs to
 * packages/shared. Intended to run alongside the dev server.
 *
 * Uses fs.watchFile (poll-based, ~1s interval) instead of fs.watch because
 * generated/overwritten files can produce unreliable events with fs.watch.
 */
import { watchFile } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sync } from './sync-payload-types';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CMS_TYPES = resolve(__dirname, '../src/payload-types.ts');

// Initial sync on startup
sync();

// Watch for changes
watchFile(CMS_TYPES, { interval: 1000 }, () => {
  sync();
});

console.log('[watch-types] Watching src/payload-types.ts for changes...');
