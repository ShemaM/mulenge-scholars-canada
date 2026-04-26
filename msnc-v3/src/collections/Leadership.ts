import { CollectionConfig } from 'payload';

const Leadership: CollectionConfig = {
  slug: 'leadership',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'pillar', 'order'],
    // Groups this in the admin sidebar for better organization
    group: 'Organization', 
  },
  access: {
    read: () => true, 
  },
  fields: [
    {
      type: 'row', // HCI: Groups name and role horizontally in the admin
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
      admin: { position: 'sidebar' }
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true, // Editorial pages need high-quality photos
    },
    {
      name: 'bio',
      type: 'richText', // UPGRADE: Allows for formatted storytelling (paragraphs, bold, etc.)
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
        description: 'Lower numbers appear first in the list.'
      },
    },
    {
      name: 'slug',
      type: 'text',
      localized: true,
      unique: true, // Crucial for preventing 404s and duplicates
      admin: { 
        position: 'sidebar',
        description: 'The URL-friendly name (e.g., pacific-muhumure)'
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            // Robust slugification: removes special chars, handles spaces
            return data?.name?.toLowerCase()
              .trim()
              .replaceAll(/[^\w\s-]/g, '')
              .replaceAll(/[\s_-]+/g, '-')
              .replaceAll(/^-+|-+$/g, '');
          }
        ],
      },
    },
  ],
};

export default Leadership;
