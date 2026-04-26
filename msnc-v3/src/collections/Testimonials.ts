import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'quote', type: 'textarea', required: true, localized: true },
    { name: 'role', type: 'text', localized: true },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
  ],
}
