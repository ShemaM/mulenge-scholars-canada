'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Container from '@/components/ui/Container'
import { LinkedInIcon, XIcon, InstagramIcon } from '@/components/ui/SocialIcons'
import { submitContactForm } from '@/actions/contact'
import Script from 'next/script'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Events', href: '/events' },
  { name: 'Leadership', href: '/leadership' },
]

const actionLinks = [
  { name: 'Join', href: '/join' },
  { name: 'Donate', href: '/donate' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@mulengescholars.org',
    href: 'mailto:info@mulengescholars.org',
  },
  {
    icon: MapPin,
    label: 'Locations',
    value: 'Canada',
  },
  
]

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
  const currentYear = new Date().getFullYear()
  const [state, formAction] = useActionState(submitContactForm, null)

  return (
    <>
      <footer role="contentinfo" className="bg-slate-50/50 backdrop-blur-sm text-slate-700 pt-24 pb-12 border-t border-slate-200/50 relative overflow-hidden">
        {/* Subtle watermark */}
        <div className="absolute -bottom-12 -right-12 text-[18vw] font-black text-slate-200/30 select-none pointer-events-none leading-none rotate-12">
          MSNC
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Brand */}
            <div className="space-y-6 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 group">
                <img
                  src="/media/logo-original.png"
                  alt="Mulenge Scholars Network Canada Logo"
                  className="w-14 h-14 object-contain rounded-xl border-2 border-slate-200 p-1.5 bg-white shadow-md group-hover:shadow-lg transition-shadow"
                  width={56}
                  height={56}
                  loading="lazy"
                />
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">
                Empowering Mulenge diaspora youth through education, mentorship, and leadership for sustainable futures.
              </p>
              <div className="flex gap-2" role="list">
                {socialLinks.map(({ icon: Icon, href, aria }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    aria-label={aria}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-6 lg:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                MSNC
              </h4>
              <nav className="space-y-3" role="list">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                Actions
              </h4>
              <nav className="space-y-3" role="list">
                {actionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact & Newsletter */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-6">
                  Get in touch
                </h4>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <Icon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 opacity-75 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-1">{label}</div>
                        {href ? (
                          <a href={href} className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors block">
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

              {/* Newsletter */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-4">
                  Newsletter
                </h4>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Stay updated with program launches and impact stories.
                </p>
                <form action={formAction} className="space-y-3">
                  <input type="hidden" name="subject" value="Newsletter Signup" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="h-12 bg-white border-slate-200 rounded-xl px-4 placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    aria-label="Email for newsletter"
                  />
                  <Button type="submit" className="w-full bg-slate-900 hover:bg-black text-white h-12 rounded-xl font-semibold transition-colors">
                    Subscribe <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  {state?.message && (
                    <p className={`text-xs p-2 rounded-lg font-medium text-center ${
                      state.success 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {state.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-200 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs">
            <p className="font-bold text-slate-500 uppercase tracking-wide">
              © {currentYear} Mulenge Scholars&apos; Network Canada. All rights reserved.
            </p>
            <nav className="flex gap-6" role="list">
              <Link href="/privacy" className="font-black text-slate-500 hover:text-slate-900 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="font-black text-slate-500 hover:text-slate-900 transition-colors">
                Terms
              </Link>
              <Link href="/sitemap.xml" className="font-black text-slate-500 hover:text-slate-900 transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>
        </Container>
      </footer>

      {/* Schema.org */}
      <Script id="msnc-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          "name": "Mulenge Scholars' Network Canada",
          "url": "https://mulengescholars.org",
          "logo": "https://mulengescholars.org/media/logo-original.png",
          "contactPoint": [{
            "@type": "ContactPoint",
            "email": "info@mulengescholars.org",
            "contactType": "general"
          }],
          "sameAs": [
            "https://twitter.com/msnccanada",
            "https://linkedin.com/company/msnc",
            "https://instagram.com/msnccanada"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CA"
          },
          "founder": {
            "@type": "Organization",
            "name": "Mulenge Scholars Network Canada"
          }
        })}
      </Script>
    </>
  )
}
