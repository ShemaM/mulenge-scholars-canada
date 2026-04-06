import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

// Ensure we get the correct path relative to the project root
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function getBlobBaseUrl() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  const storeId = token?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()

  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : null
}

function getBlobUrl(filename?: string | null) {
  const baseUrl = getBlobBaseUrl()

  if (!baseUrl || !filename) {
    return null
  }

  return `${baseUrl}/${encodeURIComponent(filename)}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Allows the frontend to fetch images without an auth token
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Central asset vault for MSNC v3. All images are automatically optimized.',
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc) {
          return doc
        }

        const nextDoc = { ...doc }
        const directUrl = getBlobUrl(nextDoc.filename)

        if (directUrl) {
          nextDoc.url = directUrl
        }

        if (nextDoc.thumbnailURL) {
          const thumbnailFilename = typeof nextDoc.sizes?.thumbnail?.filename === 'string'
            ? nextDoc.sizes.thumbnail.filename
            : nextDoc.thumbnailURL.split('/').pop()

          nextDoc.thumbnailURL = getBlobUrl(thumbnailFilename) || nextDoc.thumbnailURL
        }

        if (nextDoc.sizes && typeof nextDoc.sizes === 'object') {
          nextDoc.sizes = Object.fromEntries(
            Object.entries(nextDoc.sizes).map(([sizeName, sizeValue]) => {
              if (!sizeValue || typeof sizeValue !== 'object') {
                return [sizeName, sizeValue]
              }

              const typedSize = sizeValue as { filename?: string; url?: string | null }
              const nextUrl = getBlobUrl(typedSize.filename)

              return [
                sizeName,
                nextUrl ? { ...typedSize, url: nextUrl } : typedSize,
              ]
            }),
          )
        }

        return nextDoc
      },
    ],
  },
  upload: {
    // Points directly to /public/media for Next.js to serve them statically
    staticDir: path.resolve(dirname, '../../public/media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'], // Restricts uploads to images only
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Crucial for SEO and Accessibility. Describe the image clearly.',
      },
    },
  ],
}
