/**
 * Copies apps/cms/src/payload-types.ts → packages/shared/src/payload-types.ts
 * stripping the `declare module 'payload'` augmentation block (it only works
 * inside the CMS where `payload` is a dependency, and causes type errors in
 * the shared package).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CMS_TYPES = resolve(__dirname, '../src/payload-types.ts');
const SHARED_TYPES = resolve(
  __dirname,
  '../../../packages/shared/src/payload-types.ts'
);

export function sync() {
  const content = readFileSync(CMS_TYPES, 'utf-8');

  const cleaned = content
    // Remove // @ts-nocheck if present (no longer needed)
    .replace(/^\/\/\s*@ts-nocheck\s*\n*/m, '')
    // Remove the declare module 'payload' { ... } augmentation block
    .replace(/\n*declare module ['"]payload['"] \{[\s\S]*?\}\s*$/, '\n');

  writeFileSync(SHARED_TYPES, cleaned);
  console.log('[sync-types] Updated packages/shared/src/payload-types.ts');
}

// Run directly
sync();
