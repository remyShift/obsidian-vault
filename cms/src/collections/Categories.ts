import { slugField } from 'payload';

import { clientEnv } from '@/lib/env/client';

import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  versions: { drafts: true },
  admin: {
    useAsTitle: 'name',
    livePreview: {
      url: ({ data }) =>
        `${clientEnv.NEXT_PUBLIC_PAYLOAD_URL}/categories/${data.slug}`,
    },
  },
  access: {
    read: () => true,
    delete: () => false,
    create: () => false,
  },
  fields: [
    {
      name: 'legacyId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'MongoDB _id of the legacy document',
      },
    },
    {
      name: 'name',
      type: 'text',
      unique: true,
      localized: true,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    slugField({ fieldToUse: 'name' }),
  ],
};
