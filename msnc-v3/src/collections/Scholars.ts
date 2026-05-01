// src/collections/Scholars.ts
import { CollectionConfig } from 'payload'

export const Scholars: CollectionConfig = {
  slug: 'scholars',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'program', 'cohortYear', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'program',
      type: 'select',
      required: true,
      options: [
        { label: 'High School Support (Gr. 11–12)', value: 'high-school' },
        { label: 'Adult Learning & Career Pathways', value: 'adult-learning' },
        { label: 'Rebuilding Futures Initiative', value: 'rebuilding-futures' },
        { label: 'Workshops & Community Engagement', value: 'workshops' },
      ],
    },
    {
      name: 'cohortYear',
      type: 'text',
      required: true,
      admin: { placeholder: '2024 – 2025' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'On hold', value: 'on-hold' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        placeholder: 'e.g. Toronto, ON or Kakuma, Kenya',
        description: 'City and province/country — useful for the Rebuilding Futures initiative.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      admin: {
        description: 'Public testimonial quote displayed on the homepage.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Scholar portrait for the testimonials section.',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this scholar in the homepage testimonials carousel.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes on progress, mentorship match, or next steps.',
      },
    },
  ],
}