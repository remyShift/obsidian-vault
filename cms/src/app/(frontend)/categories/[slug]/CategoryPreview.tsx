'use client';

import Image from 'next/image';

import { useLivePreview } from '@payloadcms/live-preview-react';

import { clientEnv } from '@/lib/env/client';

import type { Category, Media } from '@/payload-types';

type TCategoryLivePreviewProps = {
  initialData: Category;
};

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in value;
}

export function CategoryPreview({ initialData }: TCategoryLivePreviewProps) {
  const { data } = useLivePreview<Category>({
    initialData,
    serverURL: clientEnv.NEXT_PUBLIC_PAYLOAD_URL,
    depth: 1,
  });

  const image = isMedia(data.image) ? data.image : null;
  const imageUrl = image?.url ?? '';

  return (
    <article>
      <div
        style={{
          position: 'relative',
          height: '300px',
          width: '100%',
        }}
      >
        <Image
          src={imageUrl}
          alt={image?.alt ?? data.name}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: image
              ? `${image.focalX}% ${image.focalY}%`
              : undefined,
          }}
        />
        <h1
          style={{
            color: '#fff',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            margin: 0,
            zIndex: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textTransform: 'uppercase',
          }}
        >
          {data.name}
        </h1>
      </div>

      {imageUrl && (
        <div
          style={{ display: 'flex', gap: 16, padding: 24, flexWrap: 'wrap' }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Image
              key={i}
              src={imageUrl}
              alt={image?.alt ?? data.name}
              width={80}
              height={80}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                height: '80px',
                objectPosition: image
                  ? `${image.focalX}% ${image.focalY}%`
                  : undefined,
              }}
            />
          ))}
        </div>
      )}
    </article>
  );
}
