'use client';

/**
 * MSNC GetInvolved — Spotlight Accordion
 * Interaction: hover/focus expands active role to dominate, others compress.
 * Content: 100% from MSNC PDF. Brand palette only.
 */

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Users, Gift, HandHeart } from 'lucide-react';

const FOCUS_BASE =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#002147]';

const BRAND = {
  navy:  '#002147',
  blue:  '#1d4ed8',
  sky:   '#0369a1',
  red:   '#E31937',
};

const actions = [
  {
    id: 0,
    title: 'Students',
    role: 'For Youth',
    desc: 'Join our programs and access mentorship, academic support, and career guidance.',
    detail: 'Whether you are in high school, exploring post-secondary options, or navigating adult education — MSNC has a program designed for your stage.',
    link: '/join?role=student',
    icon: Users,
    accent: BRAND.navy,
    lightAccent: '#e8edf4',
    cta: 'Join as a Student',
  },
  {
    id: 1,
    title: 'Partners & Donors',
    role: 'For Organizations',
    desc: 'Support our mission and help us expand opportunities for underserved youth.',
    detail: 'Your partnership enables workshops, mentorship programs, and the Rebuilding Futures Initiative — directly changing the trajectory of young lives.',
    link: '/join?role=partner',
    icon: Gift,
    accent: BRAND.blue,
    lightAccent: '#e8edfc',
    cta: 'Become a Partner',
  },
  {
    id: 2,
    title: 'Volunteers',
    role: 'For Mentors',
    desc: 'Become a mentor and make a meaningful impact in the lives of young people.',
    detail: 'Share your experience, guide a student through their journey, and become part of the community network that makes MSNC possible.',
    link: '/join?role=volunteer',
    icon: HandHeart,
    accent: BRAND.sky,
    lightAccent: '#e6f0f7',
    cta: 'Start Volunteering',
  },
];

export default function GetInvolved() {
  const [activeId, setActiveId] = useState<number>(0);

  return (
    <section
      className="py-24 md:py-32 border-t border-slate-200 overflow-hidden"
      style={{ background: '#f8fafc' }}
      aria-labelledby="get-involved-heading"
    >
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#1d4ed8] block mb-6">
            Take Action
          </span>
          <h2
            id="get-involved-heading"
            className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95]"
          >
            Get Involved<span className="text-slate-300 font-serif italic">.</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full mb-16">
          <div className="h-0.75 w-full" style={{ background: BRAND.navy }} />
          <div className="h-px bg-slate-200 w-full mt-1" />
        </div>

        {/* Spotlight slats */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 lg:h-[520px]">
          {actions.map(action => {
            const Icon = action.icon;
            const isActive = activeId === action.id;

            return (
              <div
                key={action.id}
                onMouseEnter={() => setActiveId(action.id)}
                onFocus={() => setActiveId(action.id)}
                className="relative rounded-2xl overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  /* On desktop: active takes ~55%, others split ~22.5% each */
                  flex: isActive ? '5.5 1 0%' : '2.25 1 0%',
                  minHeight: isActive ? 340 : 120,
                  background: isActive ? action.accent : '#ffffff',
                  border: `1.5px solid ${isActive ? action.accent : '#e2e8f0'}`,
                }}
                role="region"
                aria-label={action.title}
              >
                {/* Dot grid texture on active */}
                {isActive && (
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                )}

                {/* Inactive state — compressed, vertical label */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 lg:p-6 p-5"
                  style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? 'none' : 'auto' }}
                >
                  {/* Vertical index + title on desktop */}
                  <div
                    className="hidden lg:flex flex-col items-center gap-3"
                  >
                    <Icon className="w-6 h-6 mb-1" style={{ color: action.accent }} strokeWidth={1.5} />
                    <span
                      className="text-[10px] font-black tracking-[0.2em] uppercase font-mono"
                      style={{ color: '#94a3b8' }}
                    >
                      0{action.id + 1}
                    </span>
                    {/* Rotated title */}
                    <span
                      className="text-sm font-black text-slate-400 whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.05em' }}
                    >
                      {action.title}
                    </span>
                  </div>

                  {/* Mobile: horizontal compressed */}
                  <div className="flex lg:hidden items-center gap-4 w-full">
                    <Icon className="w-6 h-6 shrink-0" style={{ color: action.accent }} strokeWidth={1.5} />
                    <span className="text-base font-black text-slate-700">{action.title}</span>
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 ml-auto text-slate-300" stroke="currentColor" strokeWidth="2">
                      <path d="M4 8h8M9 5l3 3-3 3" />
                    </svg>
                  </div>
                </div>

                {/* Active state — full content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className="block text-[10px] font-black tracking-[0.25em] uppercase mb-3"
                        style={{ color: 'rgba(255,255,255,0.55)' }}
                      >
                        {action.role}
                      </span>
                      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                        {action.title}
                      </h3>
                    </div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Middle copy */}
                  <div>
                    <p className="text-white/90 text-lg font-medium leading-relaxed mb-3">
                      {action.desc}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {action.detail}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    <Link
                      href={action.link}
                      className={`inline-flex items-center gap-3 h-14 px-8 bg-white text-sm font-black uppercase tracking-widest transition-all duration-300 hover:bg-opacity-90 rounded group/btn ${FOCUS_BASE}`}
                      style={{ color: action.accent }}
                    >
                      {action.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    {/* Step dots */}
                    <div className="flex gap-1.5">
                      {actions.map(a => (
                        <div
                          key={a.id}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: activeId === a.id ? 20 : 6,
                            height: 6,
                            background: activeId === a.id ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom hint */}
        <p className="text-center text-xs text-slate-400 font-medium mt-6 tracking-wide">
          Hover any role to explore
        </p>

      </div>
    </section>
  );
}