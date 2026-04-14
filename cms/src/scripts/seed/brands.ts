import 'dotenv/config';

import { getPayload } from 'payload';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { closeLegacyConnection } from '@/lib/db/legacy';
import config, { LOCALES } from '@/payload.config';
import { uploadImageFromUrl, uploadLogoFromUrl } from '@/scripts/seed/images';
import { fetchLegacyBrands } from '@/scripts/seed/legacy/brands';
import {
  generateSlug,
  getLocaleData,
  transformLegacyBrandToPayload,
} from '@/sync/transformers/brands';

// Migrates brands from legacy MongoDB → Payload CMS.
// Idempotent: skips brands already seeded (matched by legacyId).
//
// Usage (run from monorepo root):
//   pnpm --filter cms payload run src/scripts/seed/brands.ts                                    — dry run (default)
//   pnpm --filter cms payload run src/scripts/seed/brands.ts -- --no-dry-run                    — write to Payload
//   pnpm --filter cms payload run src/scripts/seed/brands.ts -- --include 507f1f77 abc          — only these legacy _ids
//   pnpm --filter cms payload run src/scripts/seed/brands.ts -- --exclude 507f1f77              — skip these legacy _ids

type TSeedArgs = {
  include: string[] | null;
  exclude: string[];
  dryRun: boolean;
};

async function seed({ include, exclude, dryRun }: TSeedArgs) {
  console.log('\n🌱 Brands seed (legacy MongoDB → Payload) started');
  console.log(
    `Mode: ${dryRun ? 'DRY RUN (no changes will be written)' : 'LIVE (changes will be saved)'}`
  );

  const payload = await getPayload({ config });
  console.log('  ✓ Payload initialized');

  const filtered = await fetchLegacyBrands({ include, exclude });
  console.log('  ✓ Legacy DB connected');

  console.log(`\n📂 Processing ${filtered.length} brands...`);

  let created = 0;
  let wouldCreate = 0;
  let skipped = 0;
  let alreadyExists = 0;

  for (const raw of filtered) {
    const notionId = String(raw.notion_id);

    try {
      const existing = await payload.find({
        collection: 'brands',
        where: { notionId: { equals: notionId } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        console.log(`  → notionId=${notionId} already seeded, skipping`);
        alreadyExists++;
        continue;
      }

      if (dryRun) {
        console.log(`  ~ notionId=${notionId} (would create)`);
        wouldCreate++;
        continue;
      }

      // Upload images in parallel — all three are required
      const slug = generateSlug(raw.brand);
      const enTiles = raw.translations.en.tiles;

      const [backgroundImageId, logoImageId, ...tileImageIds] =
        await Promise.all([
          uploadImageFromUrl(payload, raw.backgroundImage, `brand-bg-${slug}`),
          uploadLogoFromUrl(payload, raw.titleImage, `brand-logo-${slug}`),
          ...enTiles.map((tile, i) =>
            uploadImageFromUrl(payload, tile.image, `${slug}-tile-${i + 1}`)
          ),
        ]);

      if (!backgroundImageId || !logoImageId) {
        console.warn(
          `  ⚠️  Skipped notionId=${notionId}: background or logo image upload failed`
        );
        skipped++;
        continue;
      }

      if (tileImageIds.some((tid) => !tid)) {
        console.warn(
          `  ⚠️  Skipped notionId=${notionId}: one or more tile image uploads failed`
        );
        skipped++;
        continue;
      }

      const brandData = transformLegacyBrandToPayload(raw, {
        backgroundImageId,
        logoImageId,
        tileImageIds: tileImageIds as string[],
      });

      const doc = await payload.create({
        collection: 'brands',
        locale: LOCALES[0],
        data: { ...brandData, _status: 'published' },
        overrideAccess: true,
        draft: false,
        context: { skipSync: true },
      });

      // Capture IDs Payload assigned to each tile so locale updates
      // target the same array items rather than creating new ones
      const payloadTileIds = (doc.tiles ?? []).map((t) => t.id);

      for (const locale of LOCALES.slice(1)) {
        const localeData = getLocaleData(raw, locale, tileImageIds as string[]);

        await payload.update({
          collection: 'brands',
          id: String(doc.id),
          locale,
          data: {
            ...localeData,
            tiles: localeData.tiles?.map((tile, i) => ({
              ...tile,
              id: payloadTileIds[i],
            })),
            _status: 'published',
          },
          overrideAccess: true,
          context: { skipSync: true },
        });
      }

      console.log(`  ✓ notionId=${notionId}`);
      created++;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`  ⚠️  Skipped notionId=${notionId}: ${message}`);
      skipped++;
    }
  }

  if (dryRun) {
    console.log(
      `\n✅ Dry run complete — ${wouldCreate} would create, ${alreadyExists} already exist, ${skipped} errored`
    );
  } else {
    console.log(
      `\n✅ Seed complete — ${created} created, ${alreadyExists} already existed, ${skipped} errored`
    );
  }
}

const argv = yargs(hideBin(process.argv))
  .option('include', {
    type: 'array',
    string: true,
    description: 'Only process these legacy _ids (space-separated)',
  })
  .option('exclude', {
    type: 'array',
    string: true,
    description: 'Skip these legacy _ids (space-separated)',
  })
  .option('dry-run', {
    type: 'boolean',
    default: true,
    description:
      'Preview changes without writing to Payload (default: true). Pass --no-dry-run to apply.',
  })
  .conflicts('include', 'exclude')
  .parseSync();

seed({
  include: argv.include ?? null,
  exclude: argv.exclude ?? [],
  dryRun: argv.dryRun,
})
  .catch((err: unknown) => {
    console.error('\n❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await closeLegacyConnection();
    process.exit(0);
  });
