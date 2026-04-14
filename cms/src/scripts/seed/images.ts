import sharp from 'sharp';

import type { getPayload } from 'payload';

type TPayloadInstance = Awaited<ReturnType<typeof getPayload>>;

/**
 * Downloads an image from a URL, converts it to AVIF, and uploads it to the media collection.
 * Idempotent: skips upload if a media document with the same alt already exists.
 *
 * Returns the Payload media document ID, or null if the upload fails.
 */
export async function uploadImageFromUrl(
  payload: TPayloadInstance,
  url: string,
  alt: string
): Promise<string | null> {
  try {
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: alt } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) return String(existing.docs[0].id);

    const res = await fetch(url);
    if (!res.ok) {
      console.warn(
        `  ⚠️  Image fetch failed for "${alt}": ${res.status} ${res.statusText}`
      );
      return null;
    }

    const contentType = res.headers.get('content-type') ?? '';
    const sourceBuffer = Buffer.from(await res.arrayBuffer());

    let avifBuffer: Buffer;
    if (contentType.includes('image/avif')) {
      avifBuffer = sourceBuffer;
    } else {
      console.warn(
        `  ⚠️  "${alt}" is not AVIF (got "${contentType}"), converting...`
      );
      avifBuffer = await sharp(sourceBuffer).avif().toBuffer();
    }
    const filename = `${alt.replace(/[^a-zA-Z0-9-_]/g, '-')}.avif`;

    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: avifBuffer,
        mimetype: 'image/avif',
        name: filename,
        size: avifBuffer.byteLength,
      },
      overrideAccess: true,
    });

    return String(media.id);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  ⚠️  Image upload failed for "${alt}": ${message}`);
    return null;
  }
}

/**
 * Downloads an SVG logo from a URL and uploads it to the logo-media collection.
 * Validates that the response is SVG — rejects other formats.
 * Idempotent: skips upload if a logo-media document with the same alt already exists.
 *
 * Returns the Payload logo-media document ID, or null if the upload fails.
 */
export async function uploadLogoFromUrl(
  payload: TPayloadInstance,
  url: string,
  alt: string
): Promise<string | null> {
  try {
    const existing = await payload.find({
      collection: 'logo-media',
      where: { alt: { equals: alt } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) return String(existing.docs[0].id);

    const res = await fetch(url);
    if (!res.ok) {
      console.warn(
        `  ⚠️  Logo fetch failed for "${alt}": ${res.status} ${res.statusText}`
      );
      return null;
    }

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('image/svg+xml')) {
      console.warn(
        `  ⚠️  Logo upload skipped for "${alt}": expected SVG, got "${contentType}"`
      );
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = `${alt.replace(/[^a-zA-Z0-9-_]/g, '-')}.svg`;

    const logo = await payload.create({
      collection: 'logo-media',
      data: { alt },
      file: {
        data: buffer,
        mimetype: 'image/svg+xml',
        name: filename,
        size: buffer.byteLength,
      },
      overrideAccess: true,
    });

    return String(logo.id);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  ⚠️  Logo upload failed for "${alt}": ${message}`);
    return null;
  }
}
