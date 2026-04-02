
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
import { Events } from './collections/Events'
import { Programs } from './collections/Programs'
import Leadership from './collections/Leadership'
import { Partners } from './collections/Partners'
import { Scholars } from './collections/Scholars'
import { Testimonials } from './collections/Testimonials'
import Messages from './collections/Messages'
import { JoinSubmissions } from './collections/JoinSubmissions'
import { Donations } from './collections/Donations'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: { path: '/components/admin/Logo' },
        Icon: { path: '/components/admin/Icon' },
      },
    },
    meta: {
      titleSuffix: '- MSNC Executive Board',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/media/icon.png',
        },
      ],
    },
  },

  collections: [
    Users, 
    Media, 
    Leadership,
    Scholars,
    Testimonials,
    Partners,
    Programs,
    Blogs, 
    Events, 
    Messages,
    JoinSubmissions,
    Donations,
  ],

  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_PRODUCTION_SECRET',
  
  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: 10,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),

  sharp,
})
