'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, ArrowUpRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavItem {
  id: string
  name: string
  href: string
  tagline: string
  desc: string
}

// ---------------------------------------------------------------------------
// Static data — defined outside component so reference is always stable
// ---------------------------------------------------------------------------

const navigation: NavItem[] = [
  {
    id: '01',
    name: 'About',
    href: '/about',
    tagline: 'Legacy & Vision',
    desc: 'Founded on equity and excellence, we are redefining educational pathways for global scholars.',
  },
  {
    id: '02',
    name: 'Programs',
    href: '/programs',
    tagline: 'Core Pillars',
    desc: 'From high school bridging to adult learning pathways, explore our specialized support tracks.',
  },
  {
    id: '03',
    name: 'Impact',
    href: '/impact/rebuilding-futures',
    tagline: 'Real Results',
    desc: 'Quantitative and qualitative success stories from our global community of scholars.',
  },
  {
    id: '04',
    name: 'Journal',
    href: '/blog',
    tagline: 'Latest Insights',
    desc: 'Academic research, community updates, and leadership thought-pieces.',
  },
  {
    id: '05',
    name: 'Contact',
    href: '/contact',
    tagline: 'Get Involved',
    desc: 'Connect with our team for partnerships, volunteering, or sponsorship opportunities.',
  },
]

// ---------------------------------------------------------------------------
// NavLink sub-component
// ---------------------------------------------------------------------------

interface NavLinkProps {
  item: NavItem
  isActive: boolean
  isHovered: boolean
  onMouseEnter: (item: NavItem) => void
  onNavigate: (href: string) => void
  isNavigating: boolean
}

function NavLink({ item, isActive, isHovered, onMouseEnter, onNavigate, isNavigating }: NavLinkProps) {
  return (
    <Link
      href={item.href}
      onMouseEnter={() => onMouseEnter(item)}
      onClick={() => onNavigate(item.href)}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative px-6 py-3 rounded-full text-[15px] font-black uppercase tracking-tight transition-all duration-300',
        isHovered || isActive ? 'text-white' : 'text-[#002147]/70 hover:text-[#002147]',
      )}
    >
      <span
        className="relative z-10 flex items-center gap-2 transition-transform duration-300"
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
      >
        {item.name}
        {isNavigating && (
          <Loader2 className="w-3 h-3 animate-spin" />
        )}
      </span>

      {(isHovered || isActive) && (
        <motion.div
          layoutId="pill"
          transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
          className="absolute inset-0 bg-[#002147] rounded-full -z-0 shadow-lg shadow-blue-900/20"
        />
      )}
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<NavItem | null>(null)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  const pathname = usePathname()

  // Debounce timer ref — prevents mega-panel flicker on fast mouse movement
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close mobile menu and clear loading state on route change
  useEffect(() => {
    setIsOpen(false)
    setNavigatingTo(null)
    setHoveredLink(null)
  }, [pathname])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Passive scroll listener — no layout thrashing
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleMouseEnter = useCallback((item: NavItem) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setHoveredLink(item)
  }, [])

  const handleMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHoveredLink(null), 80)
  }, [])

  // Navigation tracking — sets loading state immediately
  const handleNavigate = useCallback((href: string) => {
    setNavigatingTo(href)
    // We intentionally DO NOT close the panel or menu immediately here.
    // This allows the loading spinner to be shown while Next.js fetches the new route.
    // The panel/menu will automatically close when the pathname changes via the useEffect above.
  }, [])

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <header
      onMouseLeave={handleMouseLeave}
      className={cn(
        'fixed top-0 z-[120] w-full transition-all duration-500',
        scrolled || hoveredLink
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 shadow-xl shadow-blue-900/5'
          : 'bg-transparent py-8',
      )}
    >
      <Container>
        <nav className="flex items-center justify-between" aria-label="Main navigation">

          {/* LOGO */}
          <Link href="/" className="relative z-[130] flex-shrink-0" aria-label="MSNC Home">
            <div className="relative h-12 w-36 transition-transform duration-500 hover:scale-105">
              {/* Shimmer placeholder shown until image loads */}
              {!logoLoaded && (
                <div className="absolute inset-0 rounded-md bg-slate-200 animate-pulse" />
              )}
              <Image
                src="/media/logo.png"
                alt="Mulenge Scholars' Network Canada"
                fill
                priority
                className={cn(
                  'object-contain transition-opacity duration-300',
                  logoLoaded ? 'opacity-100' : 'opacity-0',
                )}
                onLoad={() => setLogoLoaded(true)}
              />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-2" role="menubar">
            <LayoutGroup id="nav-pills">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isActive={pathname === item.href}
                  isHovered={hoveredLink?.name === item.name}
                  onMouseEnter={handleMouseEnter}
                  onNavigate={handleNavigate}
                  isNavigating={navigatingTo === item.href}
                />
              ))}
            </LayoutGroup>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 relative z-[130]">
            <Button
              asChild
              className="hidden md:flex rounded-full px-8 h-12 bg-[#002147] hover:bg-blue-800 text-white font-black uppercase tracking-widest text-[11px] transition-all shadow-xl active:scale-95 group"
            >
              <Link href="/donate">
                Support Us
                <Heart className="ml-2 w-4 h-4 transition-transform group-hover:scale-125 fill-current" />
              </Link>
            </Button>

            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 text-[#002147] bg-white border border-slate-200 rounded-2xl shadow-sm"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* MEGA PANEL */}
      <AnimatePresence>
        {hoveredLink && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden shadow-2xl"
            role="region"
            aria-label={`${hoveredLink.name} overview`}
          >
            <div className="relative border-t border-slate-100">
              {/* Clickable panel — entire area navigates */}
              <Link
                href={hoveredLink.href}
                onClick={() => handleNavigate(hoveredLink.href)}
                className="group w-full text-left block py-24 relative overflow-hidden cursor-pointer"
                aria-label={`Go to ${hoveredLink.name}`}
              >
                {/* Background wash */}
                <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />

                <Container className="relative z-10">
                  <div className="grid grid-cols-12 gap-16 items-center">
                    {/* Index number */}
                    <div className="col-span-1">
                      <span className="text-6xl font-mono font-black text-slate-100 group-hover:text-blue-600 transition-colors duration-500">
                        {hoveredLink.id}
                      </span>
                    </div>

                    {/* Title & tagline */}
                    <div className="col-span-6">
                      <motion.h2
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-8xl text-[#002147] font-black tracking-tighter transition-all duration-700 group-hover:-translate-x-4"
                      >
                        {hoveredLink.name}
                      </motion.h2>
                      <p className="text-sm font-black uppercase tracking-[0.5em] text-blue-600 mt-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                        {hoveredLink.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="col-span-4">
                      <p className="text-2xl text-slate-400 font-medium leading-tight transition-colors duration-500 group-hover:text-slate-900">
                        {hoveredLink.desc}
                      </p>
                    </div>

                    {/* Arrow CTA — shows spinner while navigating to this route */}
                    <div className="col-span-1 flex justify-end">
                      <div className="w-28 h-28 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#002147] group-hover:border-[#002147] transition-all duration-700 group-hover:rotate-45 shadow-sm group-hover:shadow-blue-900/20">
                        {navigatingTo === hoveredLink.href ? (
                          <Loader2 className="w-10 h-10 text-white animate-spin" />
                        ) : (
                          <ArrowUpRight className="w-12 h-12 text-slate-200 group-hover:text-white transition-colors duration-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </Container>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-[#002147] z-[150] lg:hidden flex flex-col p-8 pt-32"
          >
            <button
              onClick={closeMenu}
              className="absolute top-8 right-8 text-white p-2 border border-white/20 rounded-full"
              aria-label="Close navigation menu"
            >
              <X className="w-8 h-8" />
            </button>

            <nav aria-label="Mobile navigation">
              <div className="flex flex-col gap-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavigate(item.href)}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="group flex justify-between items-end border-b border-white/10 pb-6 w-full text-left"
                  >
                    <span className="text-6xl font-black text-white italic uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                    {navigatingTo === item.href ? (
                      <Loader2 className="text-white w-10 h-10 animate-spin" />
                    ) : (
                      <ArrowUpRight className="text-white/20 w-12 h-12 group-hover:text-white/60 transition-colors" />
                    )}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}