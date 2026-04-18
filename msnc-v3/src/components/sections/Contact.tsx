'use client'

/**
 * MSNC Contact - Scholarly Editorial Version
 * Design System: 32px Grid, Rigid Mastheads, Communication Ledger
 */

import { useActionState, useEffect, useState, useRef } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Share2,
  Users,
  X,
  Send,
  Loader2,
  Bookmark,
  Hash,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { submitContactForm } from '@/actions/contact'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Primary Correspondence',
    label: 'Email',
    value: 'info@msnc.ca',
    href: 'mailto:info@msnc.ca',
  },
  {
    icon: Phone,
    title: 'Telecommunications',
    label: 'Phone',
    value: '+1 (234) 567-890',
    href: 'tel:+1234567890',
  },
  {
    icon: MapPin,
    title: 'Institutional Presence',
    label: 'Location',
    value: 'Canada — Global Diaspora Hub',
    href: 'https://maps.google.com/?q=Canada',
  },
] as const

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: Share2, href: 'https://instagram.com/msnccanada' },
  { name: 'LinkedIn', icon: Users, href: 'https://linkedin.com/company/msnc' },
  { name: 'Twitter', icon: X, href: 'https://twitter.com/msnccanada' },
] as const

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

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
  }, [state, router])

  return (
    <main className="min-h-screen bg-white text-[#002147] selection:bg-blue-100 pb-32 relative overflow-x-hidden">
      {/* Structural UI Grid Background */}
      <div
        className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 mx-auto max-w-[1600px]">
        {/* ─── PHASE 01: MASTHEAD ─── */}
        <header className="pt-32 pb-12 border-b-2 border-slate-900 mb-16">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                Inquiry Registry
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Contact Module Vol. 24
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-black uppercase text-slate-900">
                Live_Network
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                Connect with <br />
                <span className="text-slate-200 font-serif italic lowercase tracking-normal">
                  the network.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-slate-500 font-medium leading-tight border-l-4 border-blue-600 pl-6">
                Direct communication channels for scholars, partners, and institutional
                stakeholders.
              </p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* ─── LEFT: INFO LEDGER ─── */}
          <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
            <div className="space-y-6">
              {CONTACT_INFO.map((info) => (
                <div
                  key={info.label}
                  className="group border-b border-slate-100 pb-8 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <info.icon className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {info.title}
                    </span>
                  </div>
                  <a
                    href={info.href}
                    className="text-xl md:text-2xl font-black hover:text-blue-600 transition-colors tracking-tight block"
                  >
                    {info.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Follow Ledger */}
            <div className="p-10 border-2 border-slate-900 rounded-[2.5rem] bg-[#FAFAFA] relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-6">
                  Global Channels
                </h3>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all duration-300"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ─── RIGHT: MESSAGE MANUSCRIPT (FORM) ─── */}
          <section className="lg:col-span-8">
            <div className="bg-white border-2 border-slate-100 p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-900/5 relative">
              <div className="flex items-center gap-3 mb-12">
                <Bookmark className="w-5 h-5 text-blue-600" />
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  Submit Correspondence
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

                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label
                      htmlFor="firstName"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2"
                    >
                      Given Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter name"
                      className="h-16 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 px-6 font-bold text-[#002147] transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="lastName"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2"
                    >
                      Family Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter name"
                      className="h-16 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 px-6 font-bold text-[#002147] transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2"
                    >
                      Digital Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                      className="h-16 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 px-6 font-bold text-[#002147] transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2"
                    >
                      Contact Line
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (000) 000-0000"
                      className="h-16 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 px-6 font-bold text-[#002147] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2"
                  >
                    Subject of Inquiry
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Provide detailed inquiry context..."
                    className="rounded-[2rem] bg-slate-50 border-transparent focus:bg-white focus:border-slate-900 p-8 font-bold text-[#002147] resize-none transition-all"
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Hash className="w-4 h-4" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest">
                      Auth_Protocol_Active
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto rounded-full bg-[#002147] hover:bg-blue-700 text-white px-12 h-16 transition-all font-black uppercase tracking-widest text-[11px] group shadow-xl shadow-blue-900/10"
                  >
                    {isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Transmit Message
                        <Send className="ml-4 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </div>

        {/* ─── FOOTER LABELS ─── */}
        <footer className="mt-32 border-t-2 border-slate-900 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-10 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
          <div className="flex items-center gap-3">
            <Globe className="w-3 h-3" />
            <span>Global Diaspora Correspondence Repository</span>
          </div>
          <div className="flex gap-12">
            <span>Security_Verified</span>
            <span>Archive_2024</span>
          </div>
        </footer>
      </div>
    </main>
  )
}
