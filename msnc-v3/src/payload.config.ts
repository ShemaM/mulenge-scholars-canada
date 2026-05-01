import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Sessions } from './collections/Sessions'
import { AuditLogs } from './collections/Auditlogs'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
import { Events } from './collections/Events'
import { Programs } from './collections/Programs'
import Leadership from './collections/Leadership'
import { Partners } from './collections/Partners'
import { Scholars } from './collections/Scholars'
import { Testimonials } from './collections/Testimonials'
import Messages from './collections/Messages'
import Inquiries from './collections/Inquiries'
import { JoinSubmissions } from './collections/JoinSubmissions'
import { Donations } from './collections/Donations'

// Globals
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * ✅ Safe env access (prevents build crashes)
 */
const DATABASE_URL = process.env.DATABASE_URL
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- MSNC Admin',
    },
  },

  collections: [
    Users,
    Sessions,
    AuditLogs,
    Media,
    Programs,
    Blogs,
    Events,
    Leadership,
    Scholars,
    Testimonials,
    Partners,
    Messages,
    Inquiries,
    JoinSubmissions,
    Donations,
  ],

  globals: [SiteSettings],

  editor: lexicalEditor(),

  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },

  secret: PAYLOAD_SECRET || 'dev-secret',

  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: DATABASE_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    },
  }),

  sharp,
})