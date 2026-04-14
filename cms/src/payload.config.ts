import path from 'path';
import { fileURLToPath } from 'url';

import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';

import sharp from 'sharp';

import { serverEnv } from '@/lib/env/server';
import { S3_PREFIXES } from '@/lib/s3';

import { Brands } from './collections/Brands';
import { Categories } from './collections/Categories';
import { LogoMedia } from './collections/LogoMedia';
import { Media } from './collections/Media';
import { SubCategories } from './collections/Subcategories';
import { Users } from './collections/Users';
import { brandSyncHandler } from './endpoints/sync/brands';

import type { SharpDependency } from 'payload';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const ALLOWED_ORIGINS: string[] = [
  serverEnv.BASE_FRONTEND_URL,
  'http://localhost:3000',
];

export const LOCALES = ['en', 'fr', 'it', 'es'] as const;

export default buildConfig({
  endpoints: [
    {
      path: '/sync/brand/:id',
      method: 'post',
      handler: brandSyncHandler,
    },
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    theme: 'light',
    components: {
      providers: ['@/admin/BrandThemeProvider#BrandThemeProvider'],
    },
  },
  collections: [Users, Media, Categories, SubCategories, Brands, LogoMedia],
  localization: {
    locales: [...LOCALES],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: serverEnv.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: serverEnv.DATABASE_URL,
  }),
  cors: ALLOWED_ORIGINS,
  plugins: [
    s3Storage({
      collections: {
        media: { prefix: S3_PREFIXES.media },
        'logo-media': { prefix: S3_PREFIXES.logoMedia },
      },
      bucket: serverEnv.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: serverEnv.S3_ACCESS_KEY_ID,
          secretAccessKey: serverEnv.S3_SECRET_ACCESS_KEY,
        },
        region: serverEnv.S3_REGION,
        // ... Other S3 configuration
      },
    }),
    seoPlugin({
      collections: ['categories', 'subcategories', 'brands'],
      uploadsCollection: 'media',
      tabbedUI: true,
      // Hide the URL preview field — it shows a static mock that doesn't reflect actual page URLs
      fields: ({ defaultFields }) =>
        defaultFields.filter(
          (field) => !('name' in field && field.name === 'preview')
        ),
    }),
  ],
  sharp: sharp as SharpDependency,
});
