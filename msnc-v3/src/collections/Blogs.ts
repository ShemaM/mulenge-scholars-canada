import type { CollectionConfig, FieldHook } from 'payload'

// Hook to automatically generate a URL slug from the title
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

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Journal Entry',
    plural: 'Journal Entries',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'publishedDate'],
    group: 'Editorial',
    description: 'Publish articles, impact stories, and network updates.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'The headline of the article.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '1. Article Content',
          description: 'The main story.',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description: 'A 1-2 sentence hook for the blog preview card on the homepage.',
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              admin: {
                description:
                  'The full article. PRO TIP: Type "/" to insert images directly into the text. You can add captions right under them!',
              },
            },
          ],
        },
        {
          label: '2. Media & Gallery',
          description: 'Cover image and additional event photos.',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { description: 'The main cover image for the top of the article.' },
            },
            {
              name: 'imageGallery',
              type: 'array',
              admin: {
                description:
                  'Optional: Add extra images here to automatically generate a photo gallery at the bottom of the post.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  admin: { description: 'A short description of what is happening in this photo.' },
                },
              ],
            },
          ],
        },
        {
          label: '3. Publishing Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'author',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'e.g., MSNC Editorial Team' },
                },
                {
                  name: 'readTime',
                  type: 'number',
                  admin: { width: '50%', placeholder: 'e.g., 5 (minutes)' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  options: [
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                  ],
                  defaultValue: 'draft',
                  admin: { width: '50%' },
                },
                {
                  name: 'publishedDate',
                  type: 'date',
                  admin: {
                    width: '50%',
                    description: 'You can backdate posts here for past event recaps.',
                  },
                },
              ],
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
                description: 'Auto-generates from the title. Only edit if you need a specific URL.',
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
