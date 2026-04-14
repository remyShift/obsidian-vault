import { slugField } from 'payload';

import type { Subcategory } from '@/payload-types';
import type { CollectionConfig, TextField, TextFieldValidation } from 'payload';

// Payload doesn't support composite unique constraints so validate queries the DB instead.
const uniquePerCategory =
  (field: 'name' | 'slug'): TextFieldValidation =>
  async (value, { req, data }) => {
    const doc = data as Subcategory;
    if (!value || !doc?.category) return true;

    const existing = await req.payload.find({
      collection: 'subcategories',
      where: {
        [field]: { equals: value },
        category: { equals: doc.category },
        // Exclude current doc on update to avoid a false positive.
        ...(doc.id ? { id: { not_equals: doc.id } } : {}),
      },
      limit: 1,
    });

    return existing.totalDocs > 0
      ? `This ${field} already exists for this category.`
      : true;
  };

export const SubCategories: CollectionConfig = {
  slug: 'subcategories',
  versions: { drafts: true },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    delete: () => false,
    create: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      validate: uniquePerCategory('name'),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    slugField({
      fieldToUse: 'name',
      // slugField returns a RowField: fields[0] = generateSlug checkbox, fields[1] = slug text.
      overrides: (field) => {
        const slugTextField = field.fields.find(
          (f): f is TextField => 'name' in f && f.name === 'slug'
        );
        if (slugTextField) {
          // Disable the DB-level unique constraint -> validation is handled by uniquePerCategory.
          slugTextField.unique = false;
          slugTextField.validate = uniquePerCategory('slug');
        }
        return field;
      },
    }),
  ],
};
