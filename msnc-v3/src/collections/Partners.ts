import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: { 
    useAsTitle: 'name',
    defaultColumns: ['name', 'logo', 'url'],
  },
  access: { 
    read: () => true 
  },
  fields: [
    { 
      name: 'name', 
      type: 'text', 
      required: true 
    },
    { 
      name: 'logo', // Changed from logoUrl to logo
      type: 'upload', 
      relationTo: 'media', // This links to your Media collection
      required: true,
      admin: {
        description: 'Upload the partner logo (SVG or PNG preferred for high-end editorial look)',
      },
    },
    { 
      name: 'url', 
      type: 'text',
      admin: {
        placeholder: 'https://partner-website.com'
      }
    },
    { 
      name: 'description', 
      type: 'textarea' 
    },
  ],
}