import { z } from 'zod';

import { closeLegacyConnection, getDb } from '@/lib/db/legacy';
import { transformPayloadBrandToLegacy } from '@/sync/transformers/brands';

import type { TLegacyBrand } from '@/sync/schemas/brands';
import type { PayloadHandler } from 'payload';

const TRouteParamsSchema = z.object({ id: z.string().min(1) });

/**
 * POST /api/sync/brand/:id
 *
 * Fetches a Payload Brand document for all active locales, transforms it to
 * the notion_brands shape, and writes it back to both olis_lab and olis_lab_dev.
 * Lookup is performed by notionId (notion_id field in the legacy collection).
 */
export const brandSyncHandler: PayloadHandler = async (req) => {
  const start = Date.now();

  if (!req.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = TRouteParamsSchema.safeParse(req.routeParams);
  if (!params.success) {
    return Response.json(
      { error: 'Missing or invalid id param' },
      { status: 400 }
    );
  }
  const { id } = params.data;

  try {
    const [en, fr, it, es] = await Promise.all([
      req.payload.findByID({
        collection: 'brands',
        id,
        locale: 'en',
        overrideAccess: true,
      }),
      req.payload.findByID({
        collection: 'brands',
        id,
        locale: 'fr',
        overrideAccess: true,
      }),
      req.payload.findByID({
        collection: 'brands',
        id,
        locale: 'it',
        overrideAccess: true,
      }),
      req.payload.findByID({
        collection: 'brands',
        id,
        locale: 'es',
        overrideAccess: true,
      }),
    ]);

    const { notionId } = en;

    if (!notionId) {
      return Response.json(
        { error: `Brand id=${id} has no notionId — cannot sync back` },
        { status: 422 }
      );
    }

    const filter = { notion_id: notionId };

    // Read existing from prod to preserve fields Payload does not manage
    const prodDb = await getDb('olis_lab');
    const prodCollection = prodDb.collection('notion_brands');

    const existingRaw = await prodCollection.findOne<TLegacyBrand>(filter);

    const legacyDoc = transformPayloadBrandToLegacy(
      { en, fr, it, es },
      existingRaw
    );

    // Write to both prod and dev in parallel
    const devDb = await getDb('olis_lab_dev');
    const devCollection = devDb.collection('notion_brands');

    await Promise.all([
      prodCollection.findOneAndUpdate(
        filter,
        { $set: legacyDoc },
        { upsert: false }
      ),
      devCollection.findOneAndUpdate(
        filter,
        { $set: legacyDoc },
        { upsert: false }
      ),
    ]);

    const now = new Date().toISOString();
    await req.payload.update({
      collection: 'brands',
      id,
      data: {
        syncMetadata: {
          lastSyncedAt: now,
          lastSyncedBy: req.user.email,
          syncStatus: 'success',
        },
      },
      overrideAccess: true,
      context: { skipSync: true },
    });

    const duration = Date.now() - start;

    console.log(
      `[sync/brand] event=brand_sync documentId=${id} status=success duration=${duration}ms`
    );

    return Response.json({ success: true, duration });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const duration = Date.now() - start;

    console.error(
      `[sync/brand] event=brand_sync documentId=${id} status=failed duration=${duration}ms error=${message}`
    );

    try {
      await req.payload.update({
        collection: 'brands',
        id,
        data: {
          syncMetadata: {
            lastSyncedAt: new Date().toISOString(),
            lastSyncedBy: req.user.email,
            syncStatus: 'failed',
          },
        },
        overrideAccess: true,
        context: { skipSync: true },
      });
    } catch (updateErr) {
      console.error(
        '[sync/brand] Failed to update syncMetadata after error:',
        updateErr
      );
    }

    return Response.json({ success: false, error: message }, { status: 500 });
  } finally {
    await closeLegacyConnection();
  }
};
