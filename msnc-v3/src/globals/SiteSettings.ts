import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Admin',
    description: 'Manage global impact data, branding, and homepage editorial content.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'impact',
          label: 'Impact Stats',
          fields: [
            {
              name: 'youthEmpowered',
              type: 'text',
              defaultValue: '500+',
              admin: { description: 'Total youth mentored or trained' },
            },
            {
              name: 'successRate',
              type: 'text',
              defaultValue: '94%',
              admin: { description: 'Percentage of higher education enrollment' },
            },
            {
              name: 'scholarshipsAwarded',
              type: 'text',
              defaultValue: '42',
              admin: { description: 'Number of active scholarship recipients' },
            },
            {
              name: 'globalPartners',
              type: 'text',
              defaultValue: '12',
              admin: { description: 'Total institutional collaborations' },
            },
          ],
        },
        {
          name: 'editorial',
          label: 'Homepage Editorial',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Empowering the Next Generation of Leaders',
            },
            {
              name: 'featuredQuote',
              type: 'textarea',
              localized: true,
              defaultValue: 'Education is not just a tool; it is the architect of a new future.',
            },
            {
              name: 'totalImpactValue',
              type: 'text',
              defaultValue: '$480,000',
              admin: { description: 'Total financial support shown in Scholarship section' },
            },
          ],
        },
        {
          name: 'contact',
          label: 'Contact & Social',
          fields: [
            {
              name: 'email',
              type: 'text',
              defaultValue: 'info@mulengescholars.org',
              admin: { description: 'Primary contact email' },
            },
            {
              name: 'phone',
              type: 'text',
              defaultValue: '+1 (234) 567-890',
              admin: { description: 'Phone number' },
            },
            {
              name: 'twitterUrl',
              type: 'text',
              defaultValue: 'https://twitter.com/msnccanada',
            },
            {
              name: 'linkedinUrl',
              type: 'text',
              defaultValue: 'https://linkedin.com/company/msnc',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              defaultValue: 'https://instagram.com/msnccanada',
            },
            {
              name: 'address',
              type: 'textarea',
              localized: true,
              defaultValue: 'Nairobi, Kenya • Winnipeg, MB, Canada',
              admin: { description: 'Office locations' },
            },
          ],
        },
      ],
    },
  ],
}
