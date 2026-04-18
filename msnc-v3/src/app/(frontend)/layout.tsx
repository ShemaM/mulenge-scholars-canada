import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import NewFooter from '@/components/layout/NewFooter'
// HCI FIX: Using the correct singular name and named import
import { Breadcrumb } from '@/components/ui/breadcrumb'
import Providers from '@/providers'
import { cn } from '@/lib/utils'
import './globals.css'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  metadataBase: new URL('https://msnc-canada.org'), // Replace with your production domain
  title: {
    default: "Mulenge Scholars' Network Canada | MSNC",
    template: '%s | MSNC',
  },
  icons: {
    icon: '/media/icon.png',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('scroll-smooth')}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white selection:bg-secondary/10 selection:text-primary antialiased font-sans"
      >
        <Providers>
          <Navbar />

          <main className="relative min-h-screen">
            {/* HCI Principle #1: Visibility (Breadcrumb) 
                The 'auto' prop triggers the URL-based path generation */}
            <div className="pt-28 pb-4">
              <Breadcrumb auto />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10">{children}</div>

            {/* Global Design System: Brand Watermark */}
            <div className="fixed inset-0 -z-50 pointer-events-none opacity-[0.03] bg-[radial-gradient(#002147_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          </main>

<NewFooter />
        </Providers>
      </body>
    </html>
  )
}
