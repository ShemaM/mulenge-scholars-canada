import type { CollectionConfig, FieldHook } from 'payload'

const formatSlug: FieldHook = ({ value, data }) => {
  if (value) return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  if (data?.title) return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  return value
}

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location', '_status'],
    group: 'Editorial',
    description: '📅 Create events → homepage cards & /events. Past events auto-archive.',
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'The official name of the event.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '1. Event Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'eventDate',
                  type: 'date',
                  required: true,
                  admin: {
                    date: { pickerAppearance: 'dayAndTime' },
                    description: 'Select the exact start date and time.',
                    width: '50%',
                  },
                },
                {
                  name: 'location',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    placeholder: 'e.g., Nairobi, Kenya or Virtual (Zoom)',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: 'A short 1-2 sentence hook for event cards.' },
            },
          ],
        },
        {
          label: '2. Registration & Links',
          fields: [
            {
              name: 'registrationLink',
              type: 'text',
              admin: { placeholder: 'https://eventbrite.com/...' },
            },
          ],
        },
        {
          label: '3. Full Content & Media',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
            },
          ],
        },
        {
          label: 'Advanced (SEO)',
          fields: [
            {
              name: 'slug',
              type: 'text',
              unique: true,
              localized: true,
              admin: { position: 'sidebar' },
              hooks: { beforeValidate: [formatSlug] },
            },
          ],
        },
      ],
    },
  ],
}
