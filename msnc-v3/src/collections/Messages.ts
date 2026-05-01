import { CollectionConfig } from 'payload'

const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'name',
    group: 'Submissions',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
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
    { name: 'name',    type: 'text',     required: true, admin: { readOnly: true } },
    { name: 'email',   type: 'email',    required: true, admin: { readOnly: true } }, // unique: true removed
    { name: 'subject', type: 'text',     required: true, admin: { readOnly: true } },
    { name: 'message', type: 'textarea', required: true, admin: { readOnly: true } },
    {
      name: 'type',
      type: 'select',
      required: true,           // added — a message should always have a known origin
      defaultValue: 'contact',  // added — safe fallback
      admin: { readOnly: true },
      options: [
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Contact',    value: 'contact' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,           // added — prevents status being nulled via API
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
        description: 'Update this status as you process the message.',
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

export default Messages