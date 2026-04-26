'use client'

import { useActionState } from 'react'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import Script from 'next/script'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Container from '@/components/ui/Container'
import { LinkedInIcon, XIcon, InstagramIcon } from '@/components/ui/SocialIcons'
import { submitContactForm } from '@/actions/contact'
import { getUiCopy, normalizeSiteLocale } from '@/lib/site-copy'

const socialLinks = [
  {
    icon: InstagramIcon,
    href: 'https://instagram.com/msnccanada',
    aria: 'Instagram',
  },
  {
    icon: XIcon,
    href: 'https://twitter.com/msnccanada',
    aria: 'X (Twitter)',
  },
  {
    icon: LinkedInIcon,
    href: 'https://linkedin.com/company/msnc',
    aria: 'LinkedIn',
  },
]

export default function Footer() {
  const locale = normalizeSiteLocale(useLocale())
  const copy = getUiCopy(locale)
  const currentYear = new Date().getFullYear()
  const [state, formAction] = useActionState(submitContactForm, null)
  const contactInfo = [
    {
      icon: Mail,
      label: copy.footer.contactInfo.email.label,
      value: copy.footer.contactInfo.email.value,
      href: 'mailto:info@mulengescholars.org',
    },
    {
      icon: MapPin,
      label: copy.footer.contactInfo.location.label,
      value: copy.footer.contactInfo.location.value,
    },
  ]

  return (
    <>
      <footer
        role="contentinfo"
        className="relative overflow-hidden border-t border-slate-200/50 bg-slate-50/50 pb-12 pt-24 text-slate-700 backdrop-blur-sm"
      >
        <div className="pointer-events-none absolute -bottom-12 -right-12 rotate-12 select-none text-[18vw] font-black leading-none text-slate-200/30">
          MSNC
        </div>

        <Container>
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div className="space-y-6 lg:col-span-1">
              <Link href="/" className="group flex items-center gap-3">
                <img
                  src="/media/logo-original.png"
                  alt="Mulenge Scholars Network Canada Logo"
                  className="h-14 w-14 rounded-xl border-2 border-slate-200 bg-white p-1.5 object-contain shadow-md transition-shadow group-hover:shadow-lg"
                  width={56}
                  height={56}
                  loading="lazy"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed">{copy.footer.brand}</p>
              <div className="flex gap-2" role="list">
                {socialLinks.map(({ icon: Icon, href, aria }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    aria-label={aria}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                {copy.footer.primaryHeading}
              </h4>
              <nav className="space-y-3" role="list">
                {copy.footer.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                {copy.footer.actionsHeading}
              </h4>
              <nav className="space-y-3" role="list">
                {copy.footer.actionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-8 lg:col-span-1">
              <div>
                <h4 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                  {copy.footer.contactHeading}
                </h4>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                    <div key={i} className="group flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 opacity-75 transition-opacity group-hover:opacity-100" />
                      <div>
                        <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            className="block text-sm font-medium text-slate-900 transition-colors hover:text-blue-600"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-slate-900">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                  {copy.footer.newsletterHeading}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  {copy.footer.newsletterBody}
                </p>
                <form action={formAction} className="space-y-3">
                  <input type="hidden" name="subject" value={copy.footer.newsletterSubject} />
                  <Input
                    type="email"
                    name="email"
                    placeholder={copy.footer.newsletterPlaceholder}
                    required
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                    aria-label={copy.footer.newsletterAria}
                  />
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-slate-900 font-semibold text-white transition-colors hover:bg-black"
                  >
                    {copy.footer.newsletterCta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  {state?.message && (
                    <p
                      className={`rounded-lg border p-2 text-center text-xs font-medium ${
                        state.success
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-red-200 bg-red-50 text-red-800'
                      }`}
                    >
                      {state.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs lg:flex-row">
            <p className="font-bold uppercase tracking-wide text-slate-500">
              {copy.footer.rights.replace('{year}', String(currentYear))}
            </p>
            <nav className="flex gap-6" role="list">
              <Link href="/privacy" className="font-black text-slate-500 transition-colors hover:text-slate-900">
                {copy.footer.legal.privacy}
              </Link>
              <Link href="/terms" className="font-black text-slate-500 transition-colors hover:text-slate-900">
                {copy.footer.legal.terms}
              </Link>
              <Link href="/sitemap.xml" className="font-black text-slate-500 transition-colors hover:text-slate-900">
                {copy.footer.legal.sitemap}
              </Link>
            </nav>
          </div>
        </Container>
      </footer>

      <Script id="msnc-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NGO',
          name: "Mulenge Scholars' Network Canada",
          url: 'https://mulengescholars.org',
          logo: 'https://mulengescholars.org/media/logo-original.png',
          contactPoint: [
            {
              '@type': 'ContactPoint',
              email: 'info@mulengescholars.org',
              contactType: 'general',
            },
          ],
          sameAs: [
            'https://twitter.com/msnccanada',
            'https://linkedin.com/company/msnc',
            'https://instagram.com/msnccanada',
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'CA',
          },
          founder: {
            '@type': 'Organization',
            name: 'Mulenge Scholars Network Canada',
          },
        })}
      </Script>
    </>
  )
}
