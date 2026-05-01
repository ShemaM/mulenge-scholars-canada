import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import { locales } from '@/navigation'
import Providers from '@/providers'
import { cn } from '@/lib/utils'

// Assuming your globals.css is at the root of the app directory
import '@/app/globals.css' 

/* ─── FONT INJECTION ───────────────────────────────────────────────────────
   Strict adherence to MSNC Design System:
   Instrument Serif → display/headings   (--font-display)
   DM Sans          → body/ui/buttons    (--font-sans)
   ────────────────────────────────────────────────────────────────────────── */
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Next.js 15: params must be awaited
  const { locale } = await params

  // Security & Validation: 404 if someone attempts to inject an unsupported locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Fetch translations for the client providers
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        'scroll-smooth',
        instrumentSerif.variable,
        dmSans.variable,
      )}
    >
      <body
        suppressHydrationWarning
        // Enforcing design system tokens directly on the body
        className="min-h-screen bg-paper-50 text-primary antialiased font-sans flex flex-col"
      >
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  )
}