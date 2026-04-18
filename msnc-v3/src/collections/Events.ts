import type { CollectionConfig, FieldHook } from 'payload'

// Hook to automatically generate a URL slug from the title if left blank
const formatSlug: FieldHook = ({ value, data }) => {
  if (value)
    return value
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  if (data?.title)
    return data.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  return value
}

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location', '_status'],
    group: 'Editorial',
    description:
      '📅 Create events → homepage cards & /events. Past events auto-archive. High-quality landscape images recommended.',
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The official name of the event (e.g., "Fall Mentorship Summit 2026").',
      },
    },
    {
      type: 'tabs', // Uses tabs to clean up the admin UI
      tabs: [
        {
          label: '1. Event Details',
          description: 'When and where is this happening?',
          fields: [
            {
              type: 'row', // Places Date and Location side-by-side
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
                  admin: {
                    placeholder: 'e.g., Nairobi, Kenya or Virtual (Zoom)',
                    description: 'Where will attendees go?',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description:
                  'A short 1-2 sentence hook. This appears on the event cards on the homepage before they click to read more.',
              },
            },
          ],
        },
        {
          label: '2. Registration & Links',
          description: 'How do scholars sign up?',
          fields: [
            {
              name: 'registrationLink',
              type: 'text',
              admin: {
                placeholder: 'https://eventbrite.com/...',
                description:
                  'Paste the full URL to your Eventbrite, Zoom registration, or Google Form. Leave blank if no RSVP is required.',
              },
            },
          ],
        },
        {
          label: '3. Full Content & Media',
          description: 'The main page content for this event.',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'The primary cover photo for the event. (Use high-quality, landscape images).',
              },
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description:
                  'The full details, agenda, and speaker bios. You can format text and add links here.',
              },
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
              admin: {
                description:
                  'The URL path for this event. Leave this blank to auto-generate it from the Title!',
                position: 'sidebar',
              },
              hooks: {
                beforeValidate: [formatSlug],
              },
            },
          ],
        },
      ],
    },
  ],
}
