'use client'

import { useActionState, useEffect } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import Script from 'next/script'
import { Link, usePathname, useRouter } from '@/navigation'
import { submitNewsletterForm } from '@/actions/newsletter'
import { toast } from 'sonner'
import { getUiCopy, normalizeSiteLocale, SiteLocale } from '@/lib/site-copy'
import { InstagramIcon, SocialLink } from '@/components/ui/SocialIcons'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Footer() {
  const locale = normalizeSiteLocale(useLocale())
  const copy = getUiCopy(locale)
  const router = useRouter()
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()
  const [state, formAction, isPending] = useActionState(submitNewsletterForm, null)
  const t = useTranslations('Footer')

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      router.push('/')
    } else if (state?.message) {
      toast.error(state.message)
    }
  }, [state])

  const handleLanguageToggle = (targetLocale: SiteLocale) => {
    router.replace(pathname, { locale: targetLocale })
  }

  const orgName = copy.footer.brand.split(' ').slice(0, 3).join(' ')

  return (
    <>
      <footer role="contentinfo" className="relative overflow-hidden border-t border-border bg-paper-50 pb-12 pt-24 text-primary">
        <div className="pointer-events-none absolute -bottom-12 -right-12 rotate-12 select-none text-[18vw] font-black leading-none text-muted-foreground/5" aria-hidden="true">
          MSNC
        </div>

        <Container className="relative z-10">
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20">

            {/* Column 1: Contact & Organization Info */}
            <section aria-labelledby="org-info-heading">
              <h2 id="org-info-heading" className="section-label sr-only">Organization Information</h2>

              <Link href="/" className="group mb-6 flex w-fit items-center gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-paper-50">
                <div className="relative h-14 w-14 rounded-xl border border-border bg-white p-1.5 shadow-sm transition-all group-hover:shadow-md">
                  <Image
                    src="/media/logo-emblem-transparent.png"
                    alt={`${orgName} logo`}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <div>
                  <span className="font-black uppercase tracking-widest text-primary text-sm leading-tight">
                    {orgName}
                  </span>
                </div>
              </Link>

              <address className="not-italic space-y-4 text-muted-foreground">
                <div className="font-medium text-primary">{orgName}</div>
                <a
                  href="mailto:info@mulengescholars.org"
                  className="block font-medium text-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm"
                  aria-label="Email info@mulengescholars.org"
                >
                  info@mulengescholars.org
                </a>
                <Link
                  href="/contact"
                  className="inline-block font-medium text-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm"
                >
                  {t('contactUs')}
                </Link>
              </address>
            </section>

            {/* Column 2: Engagement */}
            <section aria-labelledby="engagement-heading">
              <h2 id="engagement-heading" className="mb-6 block section-label">Engagement</h2>

              <div className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-black uppercase tracking-widest text-primary text-2xs">
                  {t('newsletter.heading')}
                </h3>
                <form action={formAction} className="space-y-4">
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="fullName" value="Newsletter Subscriber" />
                  <input type="hidden" name="subject" value="Newsletter Signup" />
                  <input type="hidden" name="message" value="Newsletter subscription" />

                  <Input
                    type="email"
                    name="email"
                    placeholder={t('newsletter.placeholder')}
                    required
                    aria-label={t('newsletter.ariaLabel')}
                    disabled={isPending}
                    className="focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1"
                  />

                  <Button
                    type="submit"
                    variant="secondary"
                    size="default"
                    className="w-full focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1"
                    isLoading={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        {t('newsletter.buttonPending')}
                      </>
                    ) : (
                      <>
                        {t('newsletter.button')}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground leading-relaxed">{t('newsletter.privacyReassurance')}</p>

                  {state?.message && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className={`rounded-lg border p-3 text-center text-xs font-bold uppercase tracking-wider ${
                        state.success
                          ? 'border-green-200 bg-green-50 text-green-800'
                          : 'border-destructive bg-destructive/10 text-destructive'
                      }`}
                    >
                      {state.message}
                    </div>
                  )}
                </form>
              </div>

              <div className="mt-8 flex gap-3" role="list">
                <SocialLink
                  href="https://instagram.com/msnccanada"
                  ariaLabel={t('socialInstagram')}
                >
                  <InstagramIcon />
                </SocialLink>
              </div>
            </section>

            {/* Column 3: Utility */}
            <section aria-labelledby="utility-heading">
              <h2 id="utility-heading" className="mb-6 block section-label">Utility</h2>

              <nav className="mb-8 flex flex-col space-y-2" role="navigation" aria-label="Legal policies">
                <Link href="/privacy" className="block py-2 text-sm font-medium text-muted-foreground hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-md">
                  {copy.footer.legal.privacy}
                </Link>
                <Link href="/terms" className="block py-2 text-sm font-medium text-muted-foreground hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-md">
                  {copy.footer.legal.terms}
                </Link>
                <Link href="/accessibility" className="block py-2 text-sm font-medium text-muted-foreground hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-md">
                  {t('legal.accessibility')}
                </Link>
              </nav>

              <div className="rounded-full border border-border bg-white p-1 shadow-sm" role="group" aria-label="Language selector">
                <button
                  type="button"
                  onClick={() => handleLanguageToggle('en')}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors w-full text-left ${
                    locale === 'en'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-muted-foreground hover:text-primary hover:bg-paper-50'
                  }`}
                  aria-pressed={locale === 'en'}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageToggle('fr')}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors w-full text-left ${
                    locale === 'en'
                      ? 'text-muted-foreground hover:text-primary hover:bg-paper-50'
                      : 'bg-primary text-white shadow-md'
                  }`}
                  aria-pressed={locale !== 'en'}
                >
                  Français
                </button>
              </div>
            </section>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 lg:flex-row">
            <p className="text-[11px] font-medium text-muted-foreground/70 text-center lg:text-left tracking-normal normal-case">
              {t('copyright', { year: currentYear.toString() })}
            </p>
          </div>
        </Container>
      </footer>

      <Script id="msnc-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NGO',
          name: "Mulenge Scholars' Network Canada",
          url: 'https://mulengescholars.org',
          logo: 'https://mulengescholars.org/media/logo-emblem-transparent.png',
          contactPoint: [{ '@type': 'ContactPoint', email: 'info@mulengescholars.org', contactType: 'general' }],
          sameAs: ['https://instagram.com/msnccanada'],
          address: { '@type': 'PostalAddress', addressCountry: 'CA' },
          founder: { '@type': 'Organization', name: 'Mulenge Scholars Network Canada' },
        })}
      </Script>
    </>
  )
}