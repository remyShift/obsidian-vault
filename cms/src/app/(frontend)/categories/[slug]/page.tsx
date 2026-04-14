import { notFound } from 'next/navigation';

import { getPayload } from 'payload';

import config from '@/payload.config';

import { CategoryPreview } from './CategoryPreview';

type TPageParams = {
  params: Promise<{ slug: string }>;
};

async function getCategory(slug: string) {
  const payload = await getPayload({ config: await config });
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export default async function CategoryPage({ params }: TPageParams) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) return notFound();

  return <CategoryPreview initialData={category} />;
}
