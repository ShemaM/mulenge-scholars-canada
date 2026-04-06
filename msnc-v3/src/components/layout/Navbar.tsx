'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, ArrowRight, LogOut, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { User } from '@/types/payload-types'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Impact', href: '/impact/rebuilding-futures' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Journal', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar({ user }: { user?: User | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()

  // Handle scroll events and progress bar logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const h = document.documentElement
      const b = document.body
      const progress =
        ((h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight)) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset navigation state when pathname changes
  useEffect(() => {
    setIsOpen(false)
    setIsNavigating(false)
  }, [pathname])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    if (pathname !== href) setIsNavigating(true)
  }

  return (
    <>
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-white/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-6">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/10 border-t-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">
              Architecting Excellence
            </span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={cn(
          'fixed top-0 z-[100] w-full transition-all duration-700',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/60 py-3 shadow-sm'
            : 'bg-transparent py-8',
        )}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-secondary z-50 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />

        <Container>
          <nav className="flex items-center justify-between">
            {/* Fixed Logo JSX */}
            <Link
              href="/"
              className="relative flex items-center gap-3 group z-[110]"
              onClick={() => handleNavClick('/')}
            >
              <div className="relative h-10 w-24 md:h-12 md:w-32 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/media/logo.png"
                  alt="MSNC Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center bg-slate-100/40 border border-slate-200/40 p-1 rounded-full backdrop-blur-md">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500',
                    pathname === item.href
                      ? 'text-white bg-primary shadow-md'
                      : 'text-primary/70 hover:text-primary hover:bg-white/50',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right-Side Actions (User / CTA) */}
            <div className="flex items-center gap-4">
              {user ? (
                /* Authenticated User Pill */
                <div className="hidden lg:flex items-center gap-3 bg-white border border-slate-200 py-1.5 pl-4 pr-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                        {user.email.split('@')[0]}
                      </span>
                      {user.role === 'super-admin' && (
                        <ShieldCheck className="w-3 h-3 text-secondary" />
                      )}
                    </div>
                    <span className="text-[8px] text-slate-500 font-medium lowercase leading-none">
                      {user.email}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <a href="/admin/logout" title="Sign Out">
                      <LogOut className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              ) : (
                /* Unauthenticated "Support Us" Button */
                <Button
                  asChild
                  variant="accent"
                  className="hidden md:flex rounded-full px-8 h-12 font-black uppercase tracking-widest text-[10px] shadow-secondary/10 hover:shadow-secondary/30 transition-all active:scale-95"
                >
                  <Link href="/donate" onClick={() => handleNavClick('/donate')}>
                    Support Us <Heart className="ml-2 w-3.5 h-3.5 fill-current" />
                  </Link>
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 text-primary bg-white border border-slate-100 shadow-sm rounded-2xl z-[110] active:scale-90 transition-transform"
                aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-[99] lg:hidden transition-all duration-700 ease-in-out',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        )}
      >
        <div className="h-full flex flex-col justify-center px-10">
          <nav className="flex flex-col space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="group flex items-center justify-between py-4 border-b border-slate-100"
              >
                <span className="text-5xl font-display font-black text-primary group-hover:text-secondary group-hover:italic transition-all duration-500">
                  {item.name}
                </span>
                <ArrowRight className="w-8 h-8 text-slate-200 group-hover:text-secondary group-hover:translate-x-4 transition-all duration-500" />
              </Link>
            ))}

            {/* Show Logout in Mobile Menu if authenticated */}
            {user && (
              <a href="/admin/logout" className="text-xl font-bold text-red-500 pt-6">
                Log Out of Console
              </a>
            )}
          </nav>

          <div className="mt-16">
            <Button
              asChild
              size="lg" // Changed from non-standard "xl" to standard "lg"
              variant="accent"
              className="w-full h-20 text-lg shadow-2xl rounded-3xl"
            >
              <Link href="/donate" onClick={() => handleNavClick('/donate')}>
                Empower a Scholar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
