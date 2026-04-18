import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

/**
 * MSNC Super Admin Seed Script
 * Sanitized for production-grade security logging.
 */
async function createSuperAdmin() {
  console.log('🚀 Initializing System Setup...')

  // It is best practice to pull these from .env,
  // but if hardcoded for a one-time seed, ensure the script is deleted after use.
  const ADMIN_EMAIL = 'shemamanase992@gmail.com'
  const ADMIN_PASS = 'Nm&&668852'

  try {
    const payload = await getPayload({
      config: configPromise,
    })

    // Check for existing administrative users
    const existing = await payload.find({
      collection: 'users',
      where: { role: { equals: 'super-admin' } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log('ℹ️ Administrative user already exists. Termination successful.')
      process.exit(0)
    }

    // Create the super-admin
    await payload.create({
      collection: 'users',
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASS,
      },
      overrideAccess: true,
    })

    console.log('✅ System user created successfully.')

    // We avoid logging the password here to prevent it from being stored
    // in cleartext terminal history or logging aggregators.
    console.log(`🎉 Account verified for: ${ADMIN_EMAIL}`)

    process.exit(0)
  } catch (error: unknown) {
    // SECURITY: We do not log the raw 'error' object.
    // Raw errors often contain the DATABASE_URL (including credentials)
    // or internal server file paths.

    console.error('\n❌ CRITICAL: System Setup Failed.')

    if (error instanceof Error) {
      // Log only the high-level message, which is usually sanitized by the library
      if (error.message.includes('ECONNREFUSED') || error.message.includes('connection')) {
        console.error('👉 Internal Status: Database connection could not be established.')
      } else {
        console.error('👉 Internal Status: An unexpected error occurred during user creation.')
      }
    }

    console.log('💡 Action Required: Verify environment configuration and service status.')
    process.exit(1)
  }
}

await createSuperAdmin()
