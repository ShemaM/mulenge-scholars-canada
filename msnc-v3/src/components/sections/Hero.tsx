'use client';

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  settings?: any; // Data from SiteSettings Global
}

export default function Hero({ settings }: HeroProps) {
  const [currentStat, setCurrentStat] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 1. Dynamic Stats derived from Payload Global
  const stats = [
    { value: settings?.youthEmpowered ?? '500', label: 'Youth Empowered', suffix: '+' },
    { value: '7', label: 'Strategic Pillars' },
    { value: settings?.successRate ?? '94', label: 'Success Rate', suffix: '%' },
  ];

  // 2. Dynamic Content with Fallbacks
  const heroTitle = settings?.heroTitle || "Empowering Mulenge Youth Through Education.";
  const featuredQuote = settings?.featuredQuote || "MSNC showed me I belonged. They helped me navigate the system.";

  useEffect(() => {
    setMounted(true);
    if (stats.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white pt-32 pb-20 selection:bg-sky-100">
      
      {/* Background Watermark */}
      <div className="absolute top-20 left-0 right-0 text-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <h1 className="font-display font-black text-[25vw] leading-none text-slate-900 uppercase">
          MSNC
        </h1>
      </div>

      {/* Abstract Background Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-sky-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,33,71,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,33,71,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Branded Eyebrow */}
            <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇨Ａ</span>
                <span className="text-lg">🇨🇩</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">
                Bridging Borders, Building Futures
              </span>
            </div>

            {/* Massive Editorial Headline */}
            <div className="space-y-6">
              <h1 className="font-display font-black text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.9] tracking-tighter text-slate-900">
                {heroTitle.split(' ').map((word: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                  <span key={i} className={i === 1 ? "text-sky-600 italic font-normal block" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <div className="flex items-center gap-4 pl-1">
                <div className="h-1.5 w-24 bg-amber-400 rounded-full" />
                <div className="h-1.5 w-16 bg-sky-500 rounded-full" />
              </div>
            </div>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl font-medium">
              Founded by Mulenge scholars in Canada, we connect youth to{' '}
              <span className="text-slate-900 font-bold underline decoration-sky-500/30">mentorship and knowledge</span> that empowers them to rise.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button asChild size="lg" className="group h-16 px-10 rounded-2xl bg-slate-900 hover:bg-sky-600 text-white shadow-xl transition-all duration-500 text-lg font-bold">
                <Link href="/join">
                  Join the Network
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-2 border-slate-200 text-slate-900 hover:border-slate-900 font-bold text-lg transition-all">
                <Link href="/about">Our Story</Link>
              </Button>
            </div>

            {/* Rotating Hero Stats */}
            {mounted && (
              <div className="pt-12 border-t border-slate-100">
                <div key={currentStat} className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <div className="font-display font-black text-7xl md:text-8xl text-slate-900 tracking-tighter">
                    {stats[currentStat].value}{stats[currentStat].suffix}
                  </div>
                  <div className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">
                    {stats[currentStat].label}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Featured Testimonial Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-50">
              <div className="relative h-full flex flex-col justify-end p-10">
                <div className="bg-white/90 p-8 rounded-3xl border border-slate-200 backdrop-blur-xl shadow-xl">
                  <p className="text-xl font-bold leading-relaxed text-slate-900 italic mb-8">
                    "{featuredQuote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">
                      J
                    </div>
                    <div>
                      <div className="font-black text-slate-900 uppercase text-sm tracking-tight">Jean-Claude N.</div>
                      <div className="text-xs font-bold text-sky-600">University of Toronto</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Success Badge */}
            <div className="absolute -top-6 -right-6 bg-white rounded-[2rem] p-6 shadow-2xl border-4 border-white animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{stats[2].value}%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}