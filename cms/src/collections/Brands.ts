import { slugField } from 'payload';

import type { CollectionConfig } from 'payload';

export const STATUS_OPTIONS = ['Live', 'Staged', 'Offline'] as const;

export const Brands: CollectionConfig = {
  slug: 'brands',
  versions: { drafts: true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'notionId', 'syncMetadata.lastSyncedAt'],
  },
  access: {
    read: () => true,
    delete: () => false,
  },
  fields: [
    {
      name: 'syncButton',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/SyncBrandButton',
        },
      },
    },
    {
      name: 'notionId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Notion ID of the brand',
        readOnly: true,
      },
    },
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'about',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'whyOli',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Offline',
      options: [...STATUS_OPTIONS],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'logo-media',
      required: true,
    },
    {
      name: 'tiles',
      type: 'array',
      fields: [
        {
          name: 'preTitle',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subTitle',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'articleSlug',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'syncMetadata',
      type: 'group',
      label: 'Sync Status',
      admin: { readOnly: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'lastSyncedAt',
              type: 'date',
              admin: { date: { displayFormat: 'dd MMM yyyy HH:mm:ss' } },
            },
            { name: 'lastSyncedBy', type: 'text' },
            {
              name: 'syncStatus',
              type: 'select',
              options: ['success', 'failed'],
            },
          ],
        },
      ],
    },
    slugField({ fieldToUse: 'name' }),
  ],
};
