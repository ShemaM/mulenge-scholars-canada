'use client';

/**
 * MSNC TheChallenge — 3D Flip Card Solution Explorer
 * Fixes: centered heading, larger left text, brand colors only, real content from PDF, bigger buttons
 */

import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { ArrowRight, Compass, ArrowDown, Users, BookOpen, GraduationCap, Briefcase, Globe, RotateCcw } from 'lucide-react';

const FOCUS_BASE =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#002147]';

// Brand palette: navy #002147, sky blue, Canadian red #E31937
const BRAND = {
  navy:    '#002147',
  blue:    '#1d4ed8',
  skyBlue: '#0369a1',
  teal:    '#0f766e',
  red:     '#E31937',
};

const challengeBullets = [
  'Students often lack guidance on academic pathways',
  'Many struggle to transition into post-secondary education',
  'Financial pressures push youth toward short-term jobs instead of long-term careers',
  'Families may be unable to provide support due to unfamiliarity with the system',
];

// Content 100% from the PDF — no dummy stats
const solutionItems = [
  {
    id: 0,
    icon: Users,
    index: '01',
    title: 'Mentorship',
    tagline: 'Guided by those who came before',
    detail:
      'Mentorship from experienced students and professionals who understand firsthand the challenges of navigating new education systems.',
    highlight: 'Youth-led & peer-driven',
    accent: BRAND.navy,
  },
  {
    id: 1,
    icon: BookOpen,
    index: '02',
    title: 'Academic Guidance',
    tagline: 'From confusion to confidence',
    detail:
      'Academic guidance and tutoring — including course selection, study support, and targeted help for students in Grades 11–12 transitioning to post-secondary.',
    highlight: 'Grades 11–12 focus',
    accent: BRAND.blue,
  },
  {
    id: 2,
    icon: GraduationCap,
    index: '03',
    title: 'Post-Secondary Support',
    tagline: 'Every application, every step',
    detail:
      'Post-secondary application support, college and university planning, and access to leadership and volunteer opportunities so no opportunity is missed.',
    highlight: 'College & university ready',
    accent: BRAND.skyBlue,
  },
  {
    id: 3,
    icon: Briefcase,
    index: '04',
    title: 'Career Pathways',
    tagline: 'Not just a diploma — a direction',
    detail:
      'Career and leadership development including guidance on skilled trades, adult education programs, and personalized mentorship for adult learners.',
    highlight: 'Trades & professional tracks',
    accent: BRAND.teal,
  },
  {
    id: 4,
    icon: Globe,
    index: '05',
    title: 'Rebuilding Futures',
    tagline: 'Expanding impact globally',
    detail:
      'Supporting Banyamulenge youth in refugee camps in Kenya, Uganda, and Burundi through vocational training in construction, IT, electrical work, and more.',
    highlight: 'Kenya · Uganda · Burundi',
    accent: BRAND.red,
  },
];

type Item = typeof solutionItems[0];

function FlipCard({ item }: { item: Item }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -9, y: dx * 9 });
  }, [flipped]);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={cardRef}
      className="relative w-full"
      style={{ perspective: '1100px', aspectRatio: '3/4' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: flipped
            ? 'rotateY(180deg)'
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: flipped
            ? 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)'
            : 'transform 0.12s ease-out',
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer select-none"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 4px 24px rgba(0,33,71,0.07)',
          }}
          onClick={() => setFlipped(true)}
          role="button"
          tabIndex={0}
          aria-label={`${item.title} — click to learn more`}
          onKeyDown={e => e.key === 'Enter' && setFlipped(true)}
        >
          {/* Brand accent top strip */}
          <div className="h-1.5 w-full" style={{ background: item.accent }} />

          <div className="p-6 flex flex-col h-[calc(100%-6px)]">
            <div className="flex items-start justify-between mb-auto">
              <span
                className="text-xs font-black tracking-[0.18em] font-mono"
                style={{ color: item.accent }}
              >
                {item.index}
              </span>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${item.accent}14` }}
              >
                <Icon className="w-5 h-5" style={{ color: item.accent }} strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-snug font-medium italic">
                {item.tagline}
              </p>
            </div>

            {/* Highlight badge */}
            <div
              className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full self-start"
              style={{ background: `${item.accent}10` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.accent }} />
              <span className="text-[10px] font-bold tracking-wide" style={{ color: item.accent }}>
                {item.highlight}
              </span>
            </div>

            {/* Flip cue */}
            <div className="mt-5 flex items-center gap-1.5">
              <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3" stroke={item.accent} strokeWidth="2.5">
                <path d="M2 5h6M5 2l3 3-3 3" />
              </svg>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: item.accent }}>
                Click to explore
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer select-none flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: item.accent,
          }}
          onClick={() => setFlipped(false)}
          role="button"
          tabIndex={flipped ? 0 : -1}
          aria-label={`${item.title} detail — click to flip back`}
          onKeyDown={e => e.key === 'Enter' && setFlipped(false)}
        >
          {/* Dot grid overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />

          <div className="relative z-10 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-black tracking-[0.2em] font-mono text-white/60 uppercase">
                {item.index} / {item.title}
              </span>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <RotateCcw className="w-3.5 h-3.5 text-white/70" strokeWidth={2} />
              </div>
            </div>

            <p className="text-white/95 text-sm leading-relaxed flex-1">
              {item.detail}
            </p>

            <div className="mt-auto pt-5 border-t border-white/20">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.15em] mb-1">
                Program focus
              </p>
              <p className="text-white text-base font-black leading-snug">
                {item.highlight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TheChallenge() {
  return (
    <section
      className="py-24 md:py-32 border-t border-slate-200 overflow-hidden"
      style={{ background: '#f8fafc' }}
      aria-labelledby="challenge-heading"
    >
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">

        {/* ── CENTERED MASTHEAD ── */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#1d4ed8] block mb-5">
            Context & Resolution
          </span>
          <h2
            id="challenge-heading"
            className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none inline-block"
          >
            The Challenge<span className="text-slate-300 font-serif italic">.</span>
          </h2>
        </div>

        {/* Centered decorative arrow */}
        <div className="flex justify-center mb-12">
          <ArrowDown className="w-10 h-10 text-slate-200 animate-bounce" strokeWidth={1} />
        </div>

        {/* Divider */}
        <div className="w-full mb-16 lg:mb-24">
          <div className="h-0.75 bg-slate-900 w-full" />
          <div className="h-px bg-slate-200 w-full mt-1" />
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* ── LEFT — larger, more visible text ── */}
          <div className="lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-32">
            <Compass className="w-10 h-10 text-slate-300 mb-8" strokeWidth={1.5} />

            <p className="text-2xl md:text-3xl text-slate-900 font-semibold leading-[1.4] tracking-tight mb-6">
              Many Banyamulenge families arrived in Canada after displacement through multiple
              countries — each with a different education system.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed italic font-serif mb-10">
              Transitioning into the Canadian system is difficult for both students and their
              families. As a result:
            </p>

            <ul className="space-y-5">
              {challengeBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span
                    className="text-xs font-black font-mono mt-0.5 w-6 shrink-0 transition-colors"
                    style={{ color: BRAND.blue }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base text-slate-700 font-medium leading-snug group-hover:text-slate-900 transition-colors">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — flip cards + CTA ── */}
          <div className="lg:col-span-8">
            {/* Section rule */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 shrink-0">
                Our Solution — 5 Modules
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-sm text-slate-400 text-center mb-8 font-medium">
              Hover to tilt · Click to flip
            </p>

            {/* 5-card grid: 2 cols mobile → 3 cols md+ */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-14">
              {solutionItems.map(item => (
                <FlipCard key={item.id} item={item} />
              ))}
            </div>

            {/* ── CTA block ── */}
            <div
              className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 justify-between"
              style={{ background: BRAND.navy }}
            >
              <p className="text-white text-xl md:text-2xl font-black tracking-tight leading-snug max-w-sm">
                We equip youth with the knowledge, confidence, and resources to succeed academically and professionally.
              </p>

              {/* Bigger button */}
              <Link
                href="/programs"
                className={`inline-flex items-center justify-center gap-3 h-16 px-10 bg-white text-[#002147] text-sm font-black uppercase tracking-widest hover:bg-blue-50 transition-colors shrink-0 rounded group/btn ${FOCUS_BASE}`}
              >
                Explore Our Programs
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}