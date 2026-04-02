import { CollectionConfig } from 'payload';

const Leadership: CollectionConfig = {
  slug: 'leadership',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'pillar', 'order'],
  },
  access: {
    read: () => true, // Publicly readable for the frontend
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { 
      name: 'pillar', 
      type: 'select', 
      options: [
        { label: 'Technology', value: 'Tech' },
        { label: 'Academic Excellence', value: 'Academic' },
        { label: 'Policy & Advocacy', value: 'Policy' },
        { label: 'Community Engagement', value: 'Community' },
        { label: 'Strategic Partnerships', value: 'Strategic' },
      ],
      required: true 
    },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },
    { name: 'bio', type: 'textarea', required: true },
    { name: 'email', type: 'text' },
    { name: 'linkedinUrl', type: 'text' },
    { name: 'twitterUrl', type: 'text' },
    {
      name: 'slug',
      type: 'text',
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [({ value, data }) => value || data?.name?.toLowerCase().replace(/ /g, '-')],
      },
    },
  ],
};

export default Leadership;