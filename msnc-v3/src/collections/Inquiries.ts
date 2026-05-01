import { CollectionConfig } from 'payload'

const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    group: 'Submissions',
    defaultColumns: ['firstName', 'lastName', 'email', 'type', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'emailView',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/SubmissionEmailView#SubmissionEmailView',
        },
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      admin: { readOnly: true },
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
        { name: 'firstName', type: 'text', required: true, admin: { width: '50%', readOnly: true } },
        { name: 'lastName',  type: 'text', required: true, admin: { width: '50%', readOnly: true } },
      ],
    },
    { name: 'email',   type: 'email',    required: true, admin: { readOnly: true } }, // removed unique: true
    { name: 'phone',   type: 'text',     admin: { readOnly: true } },
    { name: 'message', type: 'textarea', required: true, admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      required: true,          // added — prevents accidental null status
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
        description: 'Update this status as you process the inquiry.',
      },
      options: [
        { label: '🟢 New',      value: 'new' },
        { label: '🟡 Read',     value: 'read' },
        { label: '⚪ Archived', value: 'archived' },
      ],
    },
  ],
  timestamps: true,
}

export default Inquiries