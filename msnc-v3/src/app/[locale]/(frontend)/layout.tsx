import type { Metadata } from 'next'
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar'
import NewFooter from '@/components/layout/NewFooter'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import Providers from '@/providers'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  metadataBase: new URL('https://mulengescholars.org'),
  title: {
    default: "Mulenge Scholars' Network Canada | MSNC",
    template: '%s | MSNC',
  },
  icons: {
    icon: '/media/icon.png',
  },
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function FrontendLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn('scroll-smooth')}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white selection:bg-secondary/10 selection:text-primary antialiased font-sans"
      >
        <Providers locale={locale} messages={messages}>
          <Navbar />
          <main className="relative min-h-screen">
            <div className="pt-28 pb-4">
              <Breadcrumb auto />
            </div>
            <div className="relative z-10">{children}</div>
            <div className="fixed inset-0 -z-50 pointer-events-none opacity-[0.03] bg-[radial-gradient(#002147_1px,transparent_1px)] bg-size-[40px_40px]" />
          </main>
          <NewFooter />
        </Providers>
      </body>
    </html>
  )
}
