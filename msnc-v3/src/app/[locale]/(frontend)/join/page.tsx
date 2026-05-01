import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import JoinClient from './JoinClient'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'JoinPage.metadata' })

  return {
    title: `${t('title')} | ${SITE_NAME}`,
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/join`,
    },
    openGraph: {
      title: `${t('title')} | ${SITE_NAME}`,
      description: t('description'),
      url: `${SITE_URL}/${locale}/join`,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
    },
  }
}

export default function JoinPage() {
  return <JoinClient />
}
