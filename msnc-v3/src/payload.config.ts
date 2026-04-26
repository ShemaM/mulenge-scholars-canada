import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// MSNC Collection Imports
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
import { JoinSubmissions } from './collections/JoinSubmissions'
import { Donations } from './collections/Donations'

// MSNC Global Imports
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const isProduction = process.env.NODE_ENV === 'production'

function getDatabaseConnectionString(): string {
  const rawConnectionString = process.env.DATABASE_URL || ''
  if (!rawConnectionString || !isProduction) return rawConnectionString

  try {
    const url = new URL(rawConnectionString)
    if (url.searchParams.get('sslmode') === 'require' && !url.searchParams.has('uselibpqcompat')) {
      url.searchParams.set('uselibpqcompat', 'true')
    }
    return url.toString()
  } catch {
    return rawConnectionString
  }
}

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
  secret: process.env.PAYLOAD_SECRET || (() => { throw new Error('PAYLOAD_SECRET environment variable is required') })(),
  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: getDatabaseConnectionString(),
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    },
  }),
  sharp,
})
