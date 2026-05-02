import { CollectionConfig } from 'payload'

const Leadership: CollectionConfig = {
  slug: 'leadership',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'pillar', 'order'],
    group: 'Organization',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true, admin: { width: '50%' } },
        { name: 'role', type: 'text', required: true, localized: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'pillar',
      type: 'select',
      options: [
        { label: 'Technology', value: 'Tech' },
        { label: 'Academic Excellence', value: 'Academic' },
        { label: 'Policy & Advocacy', value: 'Policy' },
        { label: 'Community Engagement', value: 'Community' },
        { label: 'Strategic Partnerships', value: 'Strategic' },
        { label: 'Executive Leadership', value: 'Executive' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', admin: { width: '33%' } },
        { name: 'linkedinUrl', type: 'text', label: 'LinkedIn URL', admin: { width: '33%' } },
        { name: 'twitterUrl', type: 'text', label: 'X/Twitter URL', admin: { width: '33%' } },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in the list.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      localized: false, // ← shared across locales for consistent URLs
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generates from name. Only edit if you need a specific URL.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            const name = typeof data?.name === 'string'
              ? data.name
              : data?.name?.en || ''
            return name
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/[\s_-]+/g, '-')
              .replace(/^-+|-+$/g, '')
          },
        ],
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'Override SEO title (optional).',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'Override SEO description (optional). Recommended: 150-160 characters.',
      },
    },
  ],
}

export default Leadership