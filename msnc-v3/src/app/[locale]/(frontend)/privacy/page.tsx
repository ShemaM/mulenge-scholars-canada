import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Container from '@/components/ui/Container'
import { Link } from '@/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' })

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: `https://mulengescholars.org/${locale}/privacy`,
    },
  }
}

const sectionKeys = ['information', 'howWeUse'] as const

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' })

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50 pb-16 pt-32">
        <Container className="max-w-5xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-700">
            {t('legal')}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#002147] md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{t('description')}</p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>{t('effectiveDate')}</span>
            <Link href="/contact" className="font-medium text-[#002147] transition hover:text-sky-700">
              {t('contactLink')}
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="space-y-12">
            {sectionKeys.map((key) => (
              <section key={key} className="border-b border-slate-100 pb-10 last:border-b-0 last:pb-0">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#002147]">
                  {t(`sections.${key}.title`)}
                </h2>
                <div className="mt-5 space-y-4">
                  {(t.raw(`sections.${key}.body`) as string[]).map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#002147]">
                {t('contactSection.title')}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {t.rich('contactSection.body', {
                  emailLink: (chunks) => (
                    <a
                      href="mailto:info@mulengescholars.org"
                      className="font-medium text-[#002147] transition hover:text-sky-700"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </section>
          </div>
        </Container>
      </section>
    </main>
  )
}
