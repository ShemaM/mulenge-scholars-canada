'use client'

import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Globe,
  Heart,
  Instagram,
  Loader2,
  Mail,
  Menu,
  Mic2,
  Newspaper,
  Shapes,
  Shield,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/navigation'
import { cn } from '@/lib/utils'
import { getUiCopy, normalizeSiteLocale } from '@/lib/site-copy'

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = {
  id: string
  label: string
  href: string
  icon?: React.ReactNode
  desc: string
}

type NavGroup = {
  id: string
  label: string
  tagline: string
  desc: string
  accentColor: string
  items: NavItem[]
}

// ─── Navigation data ──────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ReactNode> = {
  about: <Shield className="h-5 w-5" />,
  mission: <Heart className="h-5 w-5" />,
  leadership: <Users className="h-5 w-5" />,
  impact: <Heart className="h-5 w-5" />,
  programs: <Shapes className="h-5 w-5" />,
  events: <Calendar className="h-5 w-5" />,
  blog: <Newspaper className="h-5 w-5" />,
  join: <UserPlus className="h-5 w-5" />,
  contact: <Mail className="h-5 w-5" />,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const locale = normalizeSiteLocale(useLocale())
  const copy = getUiCopy(locale)

  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)

  const pathname = usePathname()
  const router = useRouter()
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Dynamically load nav groups based on the active locale copy
  const navGroups = useMemo<NavGroup[]>(() => {
    return copy.navbar.megaMenu.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        icon: ICON_MAP[item.id],
      })),
    }))
  }, [copy.navbar.megaMenu])

  useEffect(() => {
    setIsOpen(false)
    setOpenGroup(null)
    setOpenMobileGroup(null)
    setNavigatingTo(null)
  }, [pathname])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleGroupEnter = useCallback((id: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setOpenGroup(id)
  }, [])

  const handleNavLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setOpenGroup(null), 150)
  }, [])

  const handleDropdownEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
  }, [])

  const handleLocaleChange = useCallback(
    (targetLocale: 'en' | 'fr') => {
      if (targetLocale === locale) return
      router.replace(pathname, { locale: targetLocale })
    },
    [locale, pathname, router],
  )

  const activeGroup = navGroups.find((g) => g.id === openGroup) ?? null
  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => pathname === item.href)

  const inactiveLocale = locale === 'en' ? 'fr' : 'en'
  const inactiveLocaleLabel = inactiveLocale === 'en' ? copy.navbar.english : copy.navbar.french

  return (
    <header
      onMouseLeave={handleNavLeave}
      className={cn(
        'fixed top-0 z-120 w-full transition-all duration-500 ease-out',
        scrolled || openGroup || isOpen
          ? 'border-b border-border bg-white/98 shadow-sm backdrop-blur-md'
          : 'bg-white/85 backdrop-blur-sm',
      )}
    >
      <div className="container-editorial">
        <nav
          className="flex items-center justify-between gap-6 py-5 lg:py-6"
          aria-label={copy.navbar.mainNavigation}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="relative z-160 flex min-w-0 shrink-0 items-center gap-3.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label={copy.navbar.homeAria}
          >
            <div className="relative h-13 w-13 shrink-0">
              <Image
                src="/media/logo-emblem-transparent.png"
                alt={copy.navbar.logoAlt}
                fill
                priority
                sizes="56px"
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="block font-display text-[1.6rem] leading-none text-primary md:text-[1.8rem]">
                Mulenge Scholars
              </span>
              <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground">
                Network Canada
              </span>
            </div>
          </Link>

          {/* ── Desktop nav groups ── */}
          <div className="hidden items-center gap-1 lg:flex" role="menubar">
            {navGroups.map((group) => {
              const isActive = isGroupActive(group)
              const isHovered = openGroup === group.id

              return (
                <button
                  key={group.id}
                  type="button"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isHovered}
                  onMouseEnter={() => handleGroupEnter(group.id)}
                  onFocus={() => handleGroupEnter(group.id)}
                  onBlur={handleNavLeave}
                  className={cn(
                    'group relative flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.72rem] font-black uppercase tracking-[0.13em] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-secondary',
                    isHovered || isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary',
                  )}
                >
                  {(isHovered || isActive) && (
                    <motion.span
                      layoutId="nav-group-bg"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      className="absolute inset-0 rounded-full bg-slate-100"
                    />
                  )}
                  <span className="relative z-10">{group.label}</span>
                  <ChevronDown
                    className={cn(
                      'relative z-10 h-3 w-3 transition-transform duration-200',
                      isHovered ? 'rotate-180' : '',
                    )}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          {/* ── Right: locale + hamburger ── */}
          <div className="relative z-160 flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={() => handleLocaleChange(inactiveLocale)}
              className="hidden items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary outline-none focus-visible:underline md:flex"
              aria-label={`Switch to ${inactiveLocaleLabel}`}
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              {inactiveLocaleLabel}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-secondary active:scale-95 lg:hidden',
                isOpen
                  ? 'border-secondary bg-secondary text-white'
                  : 'border-border bg-white text-primary shadow-sm',
              )}
              aria-label={isOpen ? copy.navbar.mobileMenuClose : copy.navbar.mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mega-menu dropdown ── */}
      <AnimatePresence>
        {activeGroup ? (
          <motion.div
            key={activeGroup.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.14 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            className="absolute left-0 top-full hidden w-full border-b border-border bg-white shadow-2xl lg:block"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleNavLeave}
          >
            <div className="grid grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr]">

              {/* Left — intro panel, plain white */}
              <div className="flex flex-col justify-between border-r border-border p-10 xl:p-12">
                <motion.div
                  key={activeGroup.id + '-intro'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <p
                    className="mb-3 text-[10px] font-black uppercase tracking-[0.22em]"
                    style={{ color: activeGroup.accentColor }}
                  >
                    {activeGroup.tagline}
                  </p>
                  <h2 className="mb-4 font-display text-4xl leading-tight text-primary xl:text-5xl">
                    {activeGroup.label}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {activeGroup.desc}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.25 }}
                  className="mt-10"
                >
                  <Link
                    href={activeGroup.items[0].href}
                    onClick={() => setNavigatingTo(activeGroup.items[0].href)}
                    className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
                    style={{ color: activeGroup.accentColor }}
                  >
                    {copy.navbar.exploreFallback}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </div>

              {/* Right — cards, plain white */}
              <div className="p-8 xl:p-10">
                <div
                  className={cn(
                    'grid h-full gap-4',
                    activeGroup.items.length <= 2
                      ? 'grid-cols-2'
                      : activeGroup.items.length === 3
                      ? 'grid-cols-3'
                      : 'grid-cols-2 xl:grid-cols-4',
                  )}
                >
                  {activeGroup.items.map((item, idx) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.045, duration: 0.25, ease: 'easeOut' }}
                        className="h-full"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setNavigatingTo(item.href)}
                          className={cn(
                            'group flex h-full flex-col gap-4 rounded-2xl border p-6 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-secondary',
                            isActive
                              ? 'border-border bg-slate-50'
                              : 'border-border bg-white hover:bg-slate-50',
                          )}
                        >
                          {/* Icon */}
                          <div
                            className={cn(
                              'flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-all duration-200',
                              isActive ? '' : 'text-muted-foreground',
                            )}
                            style={isActive ? { color: activeGroup.accentColor } : undefined}
                          >
                            {navigatingTo === item.href ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              item.icon
                            )}
                          </div>

                          {/* Label + desc */}
                          <div className="flex-1">
                            <div className="mb-1.5 flex items-start justify-between gap-2">
                              <span className="text-[15px] font-bold leading-snug text-primary">
                                {item.label}
                              </span>
                              <ArrowUpRight
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-40"
                                style={{ color: activeGroup.accentColor }}
                              />
                            </div>
                            <p className="text-[13px] leading-relaxed text-muted-foreground">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.28 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-110 h-dvh overflow-y-auto bg-white lg:hidden"
          >
            <div className="flex h-full flex-col px-5 pb-10 pt-28">
              <nav
                className="flex grow flex-col gap-0.5"
                aria-label={copy.navbar.mobileNavigation}
              >
                {navGroups.map((group, gIdx) => {
                  const isMobileOpen = openMobileGroup === group.id
                  return (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + gIdx * 0.07, duration: 0.35, ease: 'easeOut' }}
                    >
                      {/* Group header */}
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(isMobileOpen ? null : group.id)}
                        className="flex w-full items-center justify-between rounded-xl px-2 py-5 transition-colors active:bg-slate-50"
                      >
                        <span className="font-display text-[2rem] leading-tight text-primary sm:text-[2.25rem]">
                          {group.label}
                        </span>
                        <motion.div
                          animate={{ rotate: isMobileOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                      </button>

                      {/* Group items — no background, separated by dividers */}
                      <AnimatePresence initial={false}>
                        {isMobileOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mb-3 flex flex-col">
                              {group.items.map((item, itemIdx) => (
                                <div key={item.id}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      'flex items-center gap-4 rounded-xl px-2 py-4 transition-colors',
                                      pathname === item.href
                                        ? 'text-primary'
                                        : 'hover:bg-slate-50',
                                    )}
                                  >
{/* Icon removed per UX optimization */}
                                    <div className="flex-1">
                                      <p className="text-[15px] font-bold text-primary">{item.label}</p>
                                      <p className="text-[13px] text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <ArrowUpRight
                                      className="h-4 w-4 shrink-0 opacity-40"
                                      style={{ color: group.accentColor }}
                                    />
                                  </Link>
                                  {itemIdx < group.items.length - 1 && (
                                    <div className="mx-2 h-px bg-border" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>

                      {/* Group divider */}
                      {gIdx < navGroups.length - 1 && (
                        <div className="h-px bg-border" />
                      )}
                    </motion.div>
                  )
                })}
              </nav>

              {/* Bottom bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center justify-between border-t border-border pt-6"
              >
                <div className="flex items-center gap-5">
                  <a
                    href="https://instagram.com/msnccanada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-m-2 p-2 text-primary transition-colors hover:text-secondary"
                    aria-label={copy.footer.socialInstagram}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:info@mulengescholars.org"
                    className="-m-2 p-2 text-primary transition-colors hover:text-secondary"
                    aria-label={copy.navbar.emailUs}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => handleLocaleChange(inactiveLocale)}
                  className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`Switch to ${inactiveLocaleLabel}`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  {inactiveLocaleLabel}
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}