import { CollectionConfig } from 'payload'

export const Scholars: CollectionConfig = {
  slug: 'scholars',
  admin: {
    useAsTitle: 'recipientName',
    defaultColumns: ['recipientName', 'university', 'year'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'recipientName', type: 'text', required: true },
    { name: 'university', type: 'text', required: true },
    { name: 'year', type: 'text', required: true, admin: { placeholder: '2024 - 2025' } },
    { name: 'amount', type: 'text', required: true, admin: { placeholder: '$5,000' } },
  ],
}