'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Menu, X, Heart, ArrowUpRight, Loader2, Instagram, Twitter, Linkedin } from 'lucide-react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Link, usePathname, useRouter } from '@/navigation'
import { Button } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { getUiCopy, normalizeSiteLocale } from '@/lib/site-copy'

export default function Navbar() {
  const locale = normalizeSiteLocale(useLocale())
  const copy = getUiCopy(locale)
  const navigation = copy.navbar.nav
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<(typeof navigation)[number] | null>(null)
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const switchLocale = locale === 'en' ? 'fr' : 'en'
  const switchLabel = locale === 'en' ? 'Fr' : 'En'

  useEffect(() => {
    setIsOpen(false)
    setNavigatingTo(null)
    setHoveredLink(null)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleMouseEnter = (item: (typeof navigation)[number]) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setHoveredLink(item)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setHoveredLink(null), 100)
  }

  const handleLocaleChange = useCallback(() => {
    router.replace(pathname, { locale: switchLocale })
  }, [pathname, router, switchLocale])

  return (
    <header
      onMouseLeave={handleMouseLeave}
      className={cn(
        'fixed top-0 z-[120] w-full transition-all duration-500',
        scrolled || hoveredLink || isOpen
          ? 'border-b border-slate-200 bg-white/95 py-3 backdrop-blur-sm'
          : 'bg-transparent py-6',
      )}
    >
      <Container>
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="relative z-[160] flex-shrink-0">
            <div className="relative h-10 w-32 transition-transform duration-300 active:scale-95 md:h-12 md:w-36">
              <Image src="/media/logo.png" alt="MSNC" fill priority className="object-contain" />
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex" role="menubar">
            <LayoutGroup id="nav-pills">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const isHovered = hoveredLink?.id === item.id

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onClick={() => setNavigatingTo(item.href)}
                    className={cn(
                      'relative rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-colors duration-300',
                      isHovered || isActive ? 'text-[#002147]' : 'text-slate-500 hover:text-slate-900',
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {item.name}
                      {navigatingTo === item.href && <Loader2 className="h-3 w-3 animate-spin" />}
                    </span>
                    {(isHovered || isActive) && (
                      <motion.div
                        layoutId="pill"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        className="absolute inset-0 -z-0 rounded-full bg-slate-100"
                      />
                    )}
                  </Link>
                )
              })}
            </LayoutGroup>
          </div>

          <div className="relative z-[160] flex items-center gap-3">
            <Button
              asChild
              className="hidden rounded-full bg-[#002147] px-6 py-5 font-bold text-white shadow-sm transition-all hover:bg-slate-800 md:flex"
            >
              <Link href="/donate">
                <span>{copy.navbar.donate}</span>
                <Heart className="ml-2 h-4 w-4 fill-white" />
              </Link>
            </Button>

            <button
              type="button"
              onClick={handleLocaleChange}
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#002147] transition-all hover:border-blue-600 hover:text-blue-600 md:inline-flex"
              aria-label={`Switch language to ${switchLocale}`}
            >
              {switchLabel}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'flex rounded-full border p-3 transition-all duration-300 lg:hidden',
                isOpen
                  ? 'border-slate-200 bg-slate-100 text-slate-900'
                  : 'border-slate-200 bg-white text-[#002147] shadow-sm',
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {hoveredLink && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 top-full hidden w-full border-b border-slate-200 bg-white shadow-xl lg:block"
          >
            <div className="grid grid-cols-12 gap-0 border-t border-slate-100">
              <div className="col-span-8 p-16">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="mb-4 block text-xs font-black uppercase tracking-[0.4em] text-blue-600">
                    {hoveredLink.tagline}
                  </span>
                  <h2 className="mb-6 text-7xl font-black tracking-tighter text-[#002147]">
                    {hoveredLink.name}
                  </h2>
                  <p className="max-w-xl text-xl leading-relaxed text-slate-500">
                    {hoveredLink.desc}
                  </p>
                </motion.div>
              </div>
              <Link
                href={hoveredLink.href}
                className="col-span-4 flex flex-col items-center justify-center border-l border-slate-100 bg-slate-50 transition-all duration-500 hover:bg-white group"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 transition-colors group-hover:border-blue-600">
                  <ArrowUpRight className="h-8 w-8 text-slate-300 transition-all duration-500 group-hover:rotate-45 group-hover:text-blue-600" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600">
                  {copy.navbar.viewPage}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[150] overflow-hidden bg-white lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-28">
              <nav className="flex flex-col">
                {navigation.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setNavigatingTo(item.href)}
                      className="group flex flex-col border-b border-slate-100 py-6 transition-colors active:bg-slate-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-4xl font-black uppercase tracking-tight text-[#002147]">
                          {item.name}
                        </span>
                        {navigatingTo === item.href ? (
                          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                        ) : (
                          <ArrowUpRight className="h-6 w-6 text-slate-300" />
                        )}
                      </div>
                      <span className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                        {item.tagline}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto space-y-8"
              >
                <button
                  type="button"
                  onClick={handleLocaleChange}
                  className="w-full rounded-full border border-slate-200 py-4 text-center text-sm font-black uppercase tracking-[0.25em] text-[#002147]"
                >
                  {switchLabel}
                </button>

                <Button asChild className="h-14 w-full rounded-full bg-[#002147] text-lg font-bold text-white hover:bg-slate-800">
                  <Link href="/donate">{copy.navbar.mobileDonate}</Link>
                </Button>

                <div className="flex items-center justify-between pt-6">
                  <div className="flex gap-5 text-slate-400">
                    <Instagram className="h-5 w-5" />
                    <Twitter className="h-5 w-5" />
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {copy.navbar.copyright}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
