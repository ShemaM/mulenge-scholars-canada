import { CollectionConfig } from 'payload'

const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    group: 'Submissions',
    defaultColumns: ['firstName', 'lastName', 'email', 'type', 'status', 'createdAt'],
  },
  access: {
    create: () => true,           // Public can submit
    read: ({ req: { user } }) => !!user,   // Only admins can read
    update: ({ req: { user } }) => !!user, // Only admins can update status
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Scholar', value: 'scholar' },
        { label: 'Support', value: 'support' },
        { label: 'Partner', value: 'partner' },
        { label: 'General', value: 'general' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'lastName',  type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    { name: 'email',   type: 'email', required: true },
    { name: 'phone',   type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New',      value: 'new' },
        { label: 'Read',     value: 'read' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
  timestamps: true,
}

export default Inquiries
