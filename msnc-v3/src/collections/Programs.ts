import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'pillar', type: 'text', required: true, admin: { placeholder: '01' } },
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'phase', type: 'select', options: ['foundation', 'growth', 'impact'], required: true },
    { name: 'status', type: 'select', options: ['active', 'on-hold', 'suspended'], defaultValue: 'active' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
  ],
}
