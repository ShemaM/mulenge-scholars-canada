import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import ContactClient from './ContactClient'
import { SITE_NAME, SITE_URL } from '@/lib/site'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/contact`,
      siteName: SITE_NAME,
      locale: locale,
      type: 'website',
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage' })

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/msnccanada',
      icon: Instagram,
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Breadcrumb auto />
      <PageHeader
        label={t('header.label')}
        title={t('header.title')}
        description={t('header.description')}
      />
      <section
        className="section py-16 md:py-24 border-t border-border"
        aria-label="Contact section"
      >
        <div className="container-editorial">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start w-full">
            {/* Left column: form */}
            <div className="lg:col-span-7">
              <ContactClient />
            </div>

            {/* Right column: contact details */}
            <div
              id="contact-details"
              className="lg:col-span-5 lg:sticky lg:top-32 space-y-12"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-10 bg-secondary" aria-hidden="true" />
                <span className="section-label text-secondary">{t('details.heading')}</span>
              </div>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <Mail className="h-6 w-6 text-secondary shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      {t('details.email.label')}
                    </h3>
                    <a
                      href={`mailto:${t('details.email.value')}`}
                      className="text-xl text-primary transition-colors hover:text-secondary"
                    >
                      {t('details.email.value')}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <Phone className="h-6 w-6 text-secondary shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      {t('details.phone.label')}
                    </h3>
                    <a
                      href={`tel:${t('details.phone.value')}`}
                      className="text-xl text-primary transition-colors hover:text-secondary"
                    >
                      {t('details.phone.value')}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-secondary shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      {t('details.address.label')}
                    </h3>
                    <address className="not-italic text-xl text-primary leading-relaxed">
                      {t('details.address.line1')}
                      <br />
                      {t('details.address.line2')}
                      <br />
                      {t('details.address.line3')}
                    </address>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="border-t border-border pt-10">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  {t('details.social.label')}
                </h3>
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 hover:bg-secondary hover:border-secondary hover:text-white"
                    >
                      <link.icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}