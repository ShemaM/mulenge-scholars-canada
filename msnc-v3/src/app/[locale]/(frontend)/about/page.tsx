import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import AboutClient from './AboutClient'

interface Props {
  params: Promise<{ locale: string }>
}

// 1. Generate Metadata on the Server (Replaces your old Head component)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  
  // Optionally fetch translated metadata if you have it in en.json / fr.json
  // const t = await getTranslations({ locale, namespace: 'About.metadata' })

  return {
    title: `About | ${SITE_NAME}`,
    description: "Learn about Mulenge Scholars' Network Canada, our mission, our programs, and how we support Banyamulenge youth across Canada.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
    },
    openGraph: {
      title: `About | ${SITE_NAME}`,
      description: "Learn about Mulenge Scholars' Network Canada, our mission, our programs, and how we support Banyamulenge youth across Canada.",
      url: `${SITE_URL}/${locale}/about`,
      siteName: SITE_NAME,
      locale: locale,
      type: 'website',
    },
  }
}

// 2. Render the Client UI
export default function AboutPage() {
  return <AboutClient />
}