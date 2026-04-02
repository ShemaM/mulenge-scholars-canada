"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Leadership", href: "/about/team" },
  { name: "Journal", href: "/blog" }, // Changed 'Events' to 'Journal' to match your Blog work
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Reading Progress Calculation
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const progress = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => setIsOpen(false), [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-[100] w-full transition-all duration-500 ease-in-out",
          scrolled 
            ? "bg-white/90 backdrop-blur-md border-b border-slate-100 py-3" 
            : "bg-transparent py-6"
        )}
      >
        {/* Editorial Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-secondary z-50 transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%` }} 
        />

        <Container>
          <nav className="flex items-center justify-between">
            
            {/* Logo Group */}
            <Link href="/" className="flex items-center gap-3 group z-[110]">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-brand group-hover:scale-105 transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7" stroke="currentColor" strokeWidth="3">
                   <path d="M4 19V5L12 13L20 5V19" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black text-primary tracking-tighter font-display leading-none">
                  MSNC
                </span>
                <span className="text-[8px] md:text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mt-1">
                  Network Canada
                </span>
              </div>
            </Link>

            {/* Desktop Nav - Pill Style */}
            <div className="hidden lg:flex items-center bg-slate-100/50 border border-slate-200/20 p-1 rounded-full backdrop-blur-sm">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                      isActive 
                        ? "text-white bg-primary shadow-lg" 
                        : "text-primary/60 hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA Group */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button 
                asChild 
                variant="accent"
                className="hidden md:flex rounded-2xl px-6 h-11 font-black uppercase tracking-widest text-[10px] shadow-xl hover:shadow-secondary/20"
              >
                <Link href="/donate">
                  Donate <Heart className="ml-2 w-3 h-3 fill-current" />
                </Link>
              </Button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 text-primary bg-slate-50 rounded-xl z-[110] active:scale-90 transition-transform"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-white z-[99] lg:hidden transition-transform duration-700 cubic-bezier(0.85, 0, 0.15, 1)",
        isOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="h-full flex flex-col justify-center px-8 pt-12">
          <nav className="flex flex-col space-y-2">
            {navigation.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center justify-between py-6 border-b border-slate-100"
              >
                <span className="text-4xl font-display font-black text-primary group-hover:italic transition-all">
                  {item.name}
                </span>
                <ArrowRight className="w-6 h-6 text-slate-200 group-hover:text-secondary group-hover:translate-x-2 transition-all" />
              </Link>
            ))}
          </nav>
          
          <div className="mt-12 flex flex-col gap-4">
             <Button asChild size="xl" variant="accent" className="w-full shadow-2xl shadow-secondary/20">
                <Link href="/donate">Donate Now</Link>
             </Button>
          </div>
        </div>
      </div>
    </>
  );
}