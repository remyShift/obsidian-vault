import { z } from 'zod';

import { STATUS_OPTIONS } from '@/collections/Brands';

// Zod lives only at the legacy DB read boundary — not on the Payload write side.
// Validates raw documents read directly from olis_lab_dev.notion_brands.
// Schema derived from apps/server/models/brandsAutomationSchema.js
// and apps/server/utils/translation_utils.js (brandTranslationsFields).

// Sub-document schemas — Mongoose sets _id: false on these, so no _id field.

const LegacyTileSchema = z.object({
  preTitle: z.string(),
  title: z.string(),
  subTitle: z.string(),
  image: z.string(),
  link: z.string(),
});

// Shared translatable content fields — present both at the root level (EN defaults)
// and inside each locale under `translations.{locale}`.
const LegacyBrandContentSchema = z.object({
  about: z.string(),
  WhyOli: z.string(),
  tiles: z.array(LegacyTileSchema),
});

// Per-locale translation — same content fields plus SEO meta.
const LegacyBrandTranslationSchema = LegacyBrandContentSchema.extend({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// Root document — content fields + identity/media fields + translations map.
export const LegacyBrandSchema = LegacyBrandContentSchema.extend({
  // MongoDB ObjectId — use .toString() when mapping to Payload legacyId
  _id: z.unknown(),

  brand: z.string(), // → name
  notion_id: z.string(), // → notionId

  backgroundImage: z.string(), // URL string → legacyImageUrls (disposable)
  titleImage: z.string(), // URL string → legacyImageUrls (disposable)

  // Per-locale translations (SUPPORTED_LANGUAGES: ['en', 'fr', 'es', 'it'])
  translations: z.object({
    en: LegacyBrandTranslationSchema,
    fr: LegacyBrandTranslationSchema,
    es: LegacyBrandTranslationSchema,
    it: LegacyBrandTranslationSchema,
  }),

  status: z.enum(STATUS_OPTIONS),
});

export type TLegacyBrand = z.infer<typeof LegacyBrandSchema>;
export type TLegacyBrandTranslation = z.infer<
  typeof LegacyBrandTranslationSchema
>;
