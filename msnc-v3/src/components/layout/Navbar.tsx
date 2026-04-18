'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, ArrowUpRight, Loader2, Instagram, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const navigation = [
  { id: '01', name: 'About', href: '/about', tagline: 'Legacy & Vision', desc: 'Redefining educational pathways for global scholars.' },
  { id: '02', name: 'Programs', href: '/programs', tagline: 'Core Pillars', desc: 'Specialized support tracks from bridging to adult learning.' },
  { id: '03', name: 'Impact', href: '/impact/rebuilding-futures', tagline: 'Real Results', desc: 'Success stories from our global community.' },
  { id: '04', name: 'Journal', href: '/blog', tagline: 'Latest Insights', desc: 'Research, updates, and leadership pieces.' },
  { id: '05', name: 'Contact', href: '/contact', tagline: 'Get Involved', desc: 'Connect for partnerships or volunteering.' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<typeof navigation[0] | null>(null)
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  const pathname = usePathname()
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleMouseEnter = (item: typeof navigation[0]) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setHoveredLink(item)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setHoveredLink(null), 100)
  }

  return (
    <header
      onMouseLeave={handleMouseLeave}
      className={cn(
        'fixed top-0 z-[120] w-full transition-all duration-500',
        scrolled || hoveredLink || isOpen
          ? 'bg-white/95 backdrop-blur-sm border-b border-slate-200 py-3'
          : 'bg-transparent py-6',
      )}
    >
      <Container>
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          
          {/* LOGO */}
          <Link href="/" className="relative z-[160] flex-shrink-0">
            <div className="relative h-10 w-32 md:h-12 md:w-36 transition-transform duration-300 active:scale-95">
              <Image
                src="/media/logo.png"
                alt="MSNC"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
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
                      'relative px-5 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-wider transition-colors duration-300',
                      isHovered || isActive ? 'text-[#002147]' : 'text-slate-500 hover:text-slate-900'
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {item.name}
                      {navigatingTo === item.href && <Loader2 className="w-3 h-3 animate-spin" />}
                    </span>
                    {(isHovered || isActive) && (
                      <motion.div
                        layoutId="pill"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        className="absolute inset-0 bg-slate-100 rounded-full -z-0"
                      />
                    )}
                  </Link>
                )
              })}
            </LayoutGroup>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 relative z-[160]">
            <Button
              asChild
              className="hidden md:flex rounded-full bg-[#002147] hover:bg-slate-800 text-white font-bold px-6 py-5 transition-all shadow-sm"
            >
              <Link href="/donate">
                <span>Support Us</span>
                <Heart className="ml-2 w-4 h-4 fill-white" />
              </Link>
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-3 rounded-full transition-all duration-300 border flex lg:hidden",
                isOpen ? "bg-slate-100 border-slate-200 text-slate-900" : "bg-white border-slate-200 text-[#002147] shadow-sm"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* DESKTOP MEGA PANEL (LIGHT) */}
      <AnimatePresence>
        {hoveredLink && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl"
          >
            <div className="grid grid-cols-12 gap-0 border-t border-slate-100">
              <div className="col-span-8 p-16">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">
                    {hoveredLink.tagline}
                  </span>
                  <h2 className="text-7xl font-black text-[#002147] tracking-tighter mb-6">
                    {hoveredLink.name}
                  </h2>
                  <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                    {hoveredLink.desc}
                  </p>
                </motion.div>
              </div>
              <Link 
                href={hoveredLink.href}
                className="col-span-4 bg-slate-50 hover:bg-white group transition-all duration-500 flex flex-col items-center justify-center border-l border-slate-100"
              >
                <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 transition-colors">
                  <ArrowUpRight className="w-8 h-8 text-slate-300 group-hover:text-blue-600 transition-all duration-500 group-hover:rotate-45" />
                </div>
                <span className="mt-4 font-bold text-slate-400 group-hover:text-blue-600 uppercase tracking-widest text-xs">
                  View Page
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU (LIGHT MODE & HIGH CONTRAST) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white z-[150] lg:hidden overflow-hidden"
          >
            <div className="flex flex-col h-full pt-28 pb-10 px-6">
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
                      className="group flex flex-col py-6 border-b border-slate-100 active:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-4xl font-black text-[#002147] uppercase tracking-tight">
                          {item.name}
                        </span>
                        {navigatingTo === item.href ? (
                          <Loader2 className="text-blue-600 w-6 h-6 animate-spin" />
                        ) : (
                          <ArrowUpRight className="text-slate-300 w-6 h-6" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">
                        {item.tagline}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Mobile Actions */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto space-y-8"
              >
                <Button asChild className="w-full bg-[#002147] hover:bg-slate-800 text-white h-14 rounded-full text-lg font-bold">
                  <Link href="/donate">Support Our Mission</Link>
                </Button>
                
                <div className="flex justify-between items-center pt-6">
                  <div className="flex gap-5 text-slate-400">
                    <Instagram className="w-5 h-5" />
                    <Twitter className="w-5 h-5" />
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    © 2024 MSNC Canada
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