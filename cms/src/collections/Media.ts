import { serverEnv } from '@/lib/env/server';
import { S3_PREFIXES } from '@/lib/s3';

import type { CollectionConfig, FileSize } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  versions: true,
  access: { read: () => true },
  hooks: {
    afterRead: [
      ({ doc, collection }) => {
        const cdnBase = serverEnv.CDN_URL;
        const s3Prefix = S3_PREFIXES.media;
        const appBase = `/api/${collection.slug}/file/`;

        if (doc.url?.startsWith(appBase)) {
          doc.url = `${cdnBase}/${s3Prefix}/${doc.url.replace(appBase, '')}`;
        }

        if (doc.sizes) {
          Object.values(doc.sizes as Record<string, FileSize>).forEach(
            (size) => {
              if (size?.url?.startsWith(appBase)) {
                size.url = `${cdnBase}/${s3Prefix}/${size.url.replace(appBase, '')}`;
              }
            }
          );
        }

        return doc;
      },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
  upload: {
    mimeTypes: ['image/avif'],
    focalPoint: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 64,
        height: 64,
        position: 'centre',
      },
    ],
  },
};
