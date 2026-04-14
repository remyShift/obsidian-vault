import type { Brand, Config } from '@/payload-types';
import type {
  TLegacyBrand,
  TLegacyBrandTranslation,
} from '@/sync/schemas/brands';
import type { RequiredDataFromCollection } from 'payload';

/**
 * Extracts the URL from a populated Payload upload field.
 * Throws if the field is missing or not populated — callers must ensure population before calling.
 */
function resolveUploadUrl(
  field: { url?: string | null } | string | null | undefined
): string {
  if (field === null || field === undefined)
    throw new Error('Upload field is missing');
  if (typeof field === 'string')
    throw new Error(`Upload field is not populated (got ID "${field}")`);
  if (!field.url) throw new Error('Upload field has no URL');
  return field.url;
}

type TBrandLocaleData = Pick<Brand, 'about' | 'whyOli' | 'tiles' | 'meta'>;
type TCreateBrandInput = RequiredDataFromCollection<Brand>;
type TLegacyBrandDocument = Omit<TLegacyBrand, '_id'>;

type TBrandImageIds = {
  backgroundImageId: string;
  logoImageId: string;
  /** Payload media IDs indexed by tile position (from EN tiles, reused across all locales). */
  tileImageIds: string[];
};

/**
 * Returns localized content fields for a given locale.
 * Translations are guaranteed to be present after Zod validation — no fallbacks needed.
 *
 * @param tileImageIds - Payload media IDs indexed by tile position.
 */
export function getLocaleData(
  raw: TLegacyBrand,
  locale: Config['locale'],
  tileImageIds: string[]
): TBrandLocaleData {
  const t = raw.translations[locale];

  return {
    about: t.about,
    whyOli: t.WhyOli,
    tiles: t.tiles.map((tile, i) => ({
      preTitle: tile.preTitle,
      title: tile.title,
      subTitle: tile.subTitle,
      articleSlug: tile.link,
      image: tileImageIds[i],
    })),
    meta: {
      title: t.metaTitle,
      description: t.metaDescription,
    },
  };
}

export const generateSlug = (string: string) => {
  return string
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

/**
 * Transforms a validated olis_lab_dev notion_brands document into a Payload Brand create input.
 * Returns non-localized fields merged with EN locale content.
 *
 * @param images - Uploaded Payload media IDs for `backgroundImage`, `logoImage`, and tiles.
 */
export function transformLegacyBrandToPayload(
  raw: TLegacyBrand,
  images: TBrandImageIds
): TCreateBrandInput {
  return {
    notionId: raw.notion_id,
    name: raw.brand,
    status: raw.status,
    slug: generateSlug(raw.brand),

    backgroundImage: images.backgroundImageId,
    logoImage: images.logoImageId,

    // EN localized content (tiles include real image IDs)
    ...getLocaleData(raw, 'en', images.tileImageIds),
  };
}

function buildLegacyTranslation(
  doc: Brand,
  existing: TLegacyBrandTranslation | undefined
): TLegacyBrandTranslation {
  return {
    // Preserve fields Payload does not manage — fall back to empty only if no existing doc
    ...existing,
    // Fields Payload owns — always overwrite
    about: doc.about,
    WhyOli: doc.whyOli,
    tiles: (doc.tiles ?? []).map((t) => ({
      preTitle: t.preTitle,
      title: t.title,
      subTitle: t.subTitle,
      image: resolveUploadUrl(t.image),
      link: t.articleSlug,
    })),
    metaTitle: doc.meta?.title ?? existing?.metaTitle,
    metaDescription: doc.meta?.description ?? existing?.metaDescription,
  };
}

/**
 * Transforms per-locale Payload Brand data back into the notion_brands document shape.
 * Used by the sync back endpoint (Payload → olis_lab_dev direction).
 *
 * @param brand - Map of locale → Payload Brand document fetched with req.payload.findByID
 * @param existing - The current legacy document from olis_lab_dev, used to preserve fields
 *                   Payload does not manage (shopBanner, metaTitle, metaDescription).
 */
export function transformPayloadBrandToLegacy(
  brand: Record<Config['locale'], Brand>,
  existing: TLegacyBrandDocument | null
): TLegacyBrandDocument {
  const translations: TLegacyBrand['translations'] = {
    en: buildLegacyTranslation(brand.en, existing?.translations.en),
    fr: buildLegacyTranslation(brand.fr, existing?.translations.fr),
    es: buildLegacyTranslation(brand.es, existing?.translations.es),
    it: buildLegacyTranslation(brand.it, existing?.translations.it),
  };

  return {
    brand: brand.en.name,
    notion_id: brand.en.notionId ?? '',
    backgroundImage: resolveUploadUrl(brand.en.backgroundImage),
    titleImage: resolveUploadUrl(brand.en.logoImage),
    status: brand.en.status,
    // Root-level EN content — legacy schema mirrors translations.en at the document root
    about: brand.en.about,
    WhyOli: brand.en.whyOli,
    tiles: translations.en.tiles,
    translations,
  };
}
