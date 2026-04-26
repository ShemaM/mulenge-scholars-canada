'use client'

import { useActionState, useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Mail, Phone, MapPin, Share2, Users, X, Send, Loader2, Bookmark, Hash, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { submitContactForm } from '@/actions/contact'
import { toast } from 'sonner'
import { useRouter } from '@/navigation'

export default function Contact() {
  const t = useTranslations('Contact')
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const contactInfo = [
    {
      icon: Mail,
      title: t('contactInfo.email.title'),
      label: t('contactInfo.email.label'),
      value: 'info@mulengescholars.org',
      href: 'mailto:info@mulengescholars.org',
    },
    {
      icon: Phone,
      title: t('contactInfo.phone.title'),
      label: t('contactInfo.phone.label'),
      value: '+1 (234) 567-890',
      href: 'tel:+1234567890',
    },
    {
      icon: MapPin,
      title: t('contactInfo.location.title'),
      label: t('contactInfo.location.label'),
      value: 'Canada — Global Diaspora Hub',
      href: 'https://maps.google.com/?q=Canada',
    },
  ] as const
  const socialLinks = [
    { name: 'Instagram', icon: Share2, href: 'https://instagram.com/msnccanada' },
    { name: 'LinkedIn', icon: Users, href: 'https://linkedin.com/company/msnc' },
    { name: 'Twitter', icon: X, href: 'https://twitter.com/msnccanada' },
  ] as const

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    _honeypot: '',
  })
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success('Correspondence logged successfully.')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', _honeypot: '' })
      formRef.current?.reset()
      setTimeout(() => router.push('/success/contact'), 1500)
    } else if (state.success === false) {
      toast.error(state.message || 'Log failure. Please retry.')
    }
  }, [router, state])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white pb-32 text-[#002147] selection:bg-blue-100">
      <div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
        <header className="mb-16 border-b-2 border-slate-900 pb-12 pt-32">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {t('inquiryRegistry')}
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {t('contactModuleLabel')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              <span className="text-[10px] font-mono font-black uppercase text-slate-900">
                {t('liveNetwork')}
              </span>
            </div>
          </div>

          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter md:text-7xl lg:text-8xl">
                {t('heading')} <br />
                <span className="font-serif italic lowercase tracking-normal text-slate-200">
                  {t('headingItalic')}
                </span>
              </h1>
            </div>
            <div className="pb-4 lg:col-span-4">
              <p className="border-l-4 border-blue-600 pl-6 text-lg font-medium leading-tight text-slate-500">
                {t('subheading')}
              </p>
            </div>
          </div>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <aside className="space-y-12 lg:col-span-4 lg:sticky lg:top-32">
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="group border-b border-slate-100 pb-8 last:border-0">
                  <div className="mb-4 flex items-center gap-3">
                    <info.icon className="h-4 w-4 text-blue-600" strokeWidth={2} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {info.title}
                    </span>
                  </div>
                  <a
                    href={info.href}
                    className="block text-xl font-black tracking-tight transition-colors hover:text-blue-600 md:text-2xl"
                  >
                    {info.value}
                  </a>
                </div>
              ))}
            </div>

            <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-slate-900 bg-[#FAFAFA] p-10">
              <div className="relative z-10">
                <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  {t('globalChannels')}
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8">
            <div className="relative rounded-[3rem] border-2 border-slate-100 bg-white p-8 shadow-2xl shadow-blue-900/5 md:p-16">
              <div className="mb-12 flex items-center gap-3">
                <Bookmark className="h-5 w-5 text-blue-600" />
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  {t('submitCorrespondence')}
                </h2>
              </div>

              <form ref={formRef} action={formAction} className="space-y-10">
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="_honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._honeypot}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t('givenName')}
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder={t('enterName')}
                      className="h-16 rounded-2xl border-transparent bg-slate-50 px-6 font-bold text-[#002147] transition-all focus:border-slate-900 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t('familyName')}
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder={t('enterName')}
                      className="h-16 rounded-2xl border-transparent bg-slate-50 px-6 font-bold text-[#002147] transition-all focus:border-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t('digitalAddress')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                      className="h-16 rounded-2xl border-transparent bg-slate-50 px-6 font-bold text-[#002147] transition-all focus:border-slate-900 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t('contactLine')}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (000) 000-0000"
                      className="h-16 rounded-2xl border-transparent bg-slate-50 px-6 font-bold text-[#002147] transition-all focus:border-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {t('subjectOfInquiry')}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={t('inquiryPlaceholder')}
                    className="resize-none rounded-[2rem] border-transparent bg-slate-50 p-8 font-bold text-[#002147] transition-all focus:border-slate-900 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col items-center justify-between gap-8 border-t border-slate-100 pt-6 sm:flex-row">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Hash className="h-4 w-4" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest">
                      {t('authProtocol')}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="group h-16 w-full rounded-full bg-[#002147] px-12 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-blue-900/10 transition-all hover:bg-blue-700 sm:w-auto"
                  >
                    {isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        {t('transmitMessage')}
                        <Send className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </div>

        <footer className="mb-10 mt-32 flex flex-col items-center justify-between gap-8 border-t-2 border-slate-900 pt-12 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 md:flex-row">
          <div className="flex items-center gap-3">
            <Globe className="h-3 w-3" />
            <span>{t('globalRepository')}</span>
          </div>
          <div className="flex gap-12">
            <span>{t('securityVerified')}</span>
            <span>{t('archive')}</span>
          </div>
        </footer>
      </div>
    </main>
  )
}
