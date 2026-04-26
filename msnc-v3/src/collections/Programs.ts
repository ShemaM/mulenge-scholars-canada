import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    description: '🏛️ Program pillars → /programs page, stats, features layout.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'index',
      type: 'text',
      required: true,
      unique: true,
      admin: { placeholder: '01' },
    },
    {
      name: 'pillar',
      type: 'select',
      required: true,
      options: [
        { label: 'Workshops & Community Engagement', value: 'workshops' },
        { label: 'High School Support Program', value: 'high-school' },
        { label: 'Adult Learning & Career Pathways', value: 'adult-learning' },
        { label: 'Rebuilding Futures Initiative', value: 'rebuilding-futures' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: { placeholder: 'Community & Growth' },
    },
    {
      name: 'phase',
      type: 'select',
      options: ['foundation', 'growth', 'impact'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['active', 'on-hold', 'suspended'],
      defaultValue: 'active',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'color',
      type: 'select',
      options: ['sky', 'navy', 'slate', 'red'],
      defaultValue: 'sky',
    },
    {
      name: 'theme',
      type: 'select',
      options: ['light', 'alt'],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'desc',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Lucide icon name' },
        },
      ],
    },
    {
      name: 'statValue',
      type: 'text',
      localized: true,
      admin: { placeholder: '300+' },
    },
    {
      name: 'statLabel',
      type: 'text',
      localized: true,
    },
  ],
}
