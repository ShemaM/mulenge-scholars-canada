import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

// Ensure we get the correct path relative to the project root
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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