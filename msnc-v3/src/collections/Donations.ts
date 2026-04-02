import type { CollectionConfig } from 'payload';

export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'donorName',
    group: 'Submissions',
    defaultColumns: ['donorName', 'email', 'amount', 'tier', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'donorName', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'amount', type: 'number', required: true },
    { name: 'tier', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ],
  timestamps: true,
};
