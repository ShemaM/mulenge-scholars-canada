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

// Resolve dirname safely in ESM
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ✅ REQUIRED ENV VALIDATION (fail fast in production)
const DATABASE_URI = process.env.DATABASE_URI
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET

if (!DATABASE_URI) {
throw new Error('❌ Missing DATABASE_URI environment variable')
}

if (!PAYLOAD_SECRET) {
throw new Error('❌ Missing PAYLOAD_SECRET environment variable')
}

// ✅ Build config
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

secret: PAYLOAD_SECRET,

typescript: {
outputFile: path.resolve(dirname, 'types/payload-types.ts'),
},

db: postgresAdapter({
pool: {
connectionString: DATABASE_URI,
ssl: {
rejectUnauthorized: false,
},
},
}),

sharp,
})
