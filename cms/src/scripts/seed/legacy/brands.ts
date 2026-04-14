import { ObjectId } from 'mongodb';

import { getDb } from '@/lib/db/legacy';
import { LegacyBrandSchema } from '@/sync/schemas/brands';

import type { TLegacyBrand } from '@/sync/schemas/brands';
import type { Document, Filter } from 'mongodb';

const LEGACY_COLLECTION = 'notion_brands';

type TFetchOptions = {
  include?: string[] | null;
  exclude?: string[];
};

/**
 * Reads documents from the notion_brands collection in olis_lab (prod source),
 * validates each one against LegacyBrandSchema, and returns only valid documents.
 * Invalid documents are logged and skipped.
 */
export async function fetchLegacyBrands({
  include,
  exclude,
}: TFetchOptions = {}): Promise<TLegacyBrand[]> {
  const db = await getDb('olis_lab');
  const collection = db.collection(LEGACY_COLLECTION);

  const query: Filter<Document> = {};
  if (include?.length) {
    query['_id'] = { $in: include.map((id) => new ObjectId(id)) };
  } else if (exclude?.length) {
    query['_id'] = { $nin: exclude.map((id) => new ObjectId(id)) };
  }

  const rawDocs = await collection.find(query).toArray();

  console.log(`[seed/legacy/brands] found ${rawDocs.length} raw documents`);

  const results = rawDocs.flatMap((doc) => {
    const result = LegacyBrandSchema.safeParse(doc);
    if (!result.success) {
      console.warn(
        `[seed/legacy/brands] skipping _id=${doc._id}:`,
        result.error.issues
      );
      return [];
    }
    return [result.data];
  });

  console.log(
    `[seed/legacy/brands] ${results.length}/${rawDocs.length} docs passed validation`
  );

  return results;
}
