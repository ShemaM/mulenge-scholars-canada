'use client';

/**
 * MSNC GlobalImpact — Radial Tree Vision
 * Structure: Central node → 4 animated branch arms → outcome nodes
 * Content: 100% from MSNC PDF. No cards.
 */

import { useState } from 'react';
import { Eye } from 'lucide-react';

const BRAND = {
  navy:  '#002147',
  blue:  '#1d4ed8',
  sky:   '#0369a1',
  red:   '#E31937',
};

const visionPoints = [
  {
    id: 0,
    index: '01',
    title: 'Confident in\ntheir abilities',
    titleFlat: 'Confident in their abilities',
    body: 'Youth equipped with self-assurance to pursue ambitious goals and overcome the barriers of displacement.',
    accent: BRAND.navy,
    angle: -120, // degrees from center
  },
  {
    id: 1,
    index: '02',
    title: 'Successful in their\nacademic journeys',
    titleFlat: 'Successful in their academic journeys',
    body: 'Students thriving in Canadian classrooms and post-secondary institutions — from Grade 11 through to graduation.',
    accent: BRAND.blue,
    angle: -60,
  },
  {
    id: 2,
    index: '03',
    title: 'Established in\nmeaningful careers',
    titleFlat: 'Established in meaningful and sustainable careers',
    body: 'Graduates building purposeful careers in skilled trades, professional fields, and leadership roles.',
    accent: BRAND.sky,
    angle: 60,
  },
  {
    id: 3,
    index: '04',
    title: 'Leaders who give\nback to communities',
    titleFlat: 'Leaders who give back to their communities',
    body: 'A generation of Banyamulenge leaders who uplift others — mentoring the next cohort and expanding the circle of opportunity.',
    accent: BRAND.red,
    angle: 120,
  },
];

// Convert polar (angle in degrees, radius) to cartesian from center
function polar(cx: number, cy: number, angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function GlobalImpact() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const CX = 340; // SVG center x
  const CY = 310; // SVG center y
  const BRANCH_R = 200; // branch arm radius
  const NODE_R = 52;    // outer node circle radius

  return (
    <section
      className="relative py-24 md:py-40 border-t border-slate-200 overflow-hidden"
      style={{ background: '#f8fafc' }}
      aria-labelledby="vision-heading"
    >
      {/* Subtle bg gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,33,71,0.03) 0%, transparent 100%)' }}
      />

      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">

        {/* ── HEADER ── */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-20 items-end">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1d4ed8] mb-6">
              <Eye className="w-4 h-4" strokeWidth={2.5} />
              Final Perspective
            </span>
            <h2
              id="vision-heading"
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.88]"
            >
              Our Impact
              <br />
              <span className="font-serif italic font-light text-slate-300">Vision.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 pb-2 flex flex-col justify-end">
            <p className="text-xl text-slate-500 font-medium leading-relaxed border-l-2 pl-6" style={{ borderColor: BRAND.navy }}>
              We envision a future where{' '}
              <span
                className="font-bold"
                style={{ color: BRAND.navy, textDecoration: 'underline', textDecorationColor: BRAND.blue, textUnderlineOffset: '4px' }}
              >
                Banyamulenge youth
              </span>{' '}
              are:
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full mb-16">
          <div className="h-0.75 w-full" style={{ background: BRAND.navy }} />
          <div className="h-px bg-slate-200 w-full mt-1" />
        </div>

        {/* ── TREE + DETAIL LAYOUT ── */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* SVG Tree — 7 cols */}
          <div className="lg:col-span-7">
            <svg
              viewBox="0 0 680 620"
              width="100%"
              role="img"
              aria-label="Radial tree diagram showing four vision outcomes branching from Banyamulenge youth at the center"
            >
              <defs>
                {/* Radial pulse rings on center node */}
                <style>{`
                  @keyframes pulse-ring {
                    0%   { r: 36; opacity: 0.35; }
                    100% { r: 72; opacity: 0; }
                  }
                  .pulse { animation: pulse-ring 2.4s ease-out infinite; }
                  .pulse-2 { animation: pulse-ring 2.4s ease-out infinite 0.8s; }
                  .pulse-3 { animation: pulse-ring 2.4s ease-out infinite 1.6s; }
                  @keyframes branch-draw {
                    from { stroke-dashoffset: 220; }
                    to   { stroke-dashoffset: 0; }
                  }
                  .branch-line {
                    stroke-dasharray: 220;
                    stroke-dashoffset: 220;
                    animation: branch-draw 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
                  }
                `}</style>
              </defs>

              {/* ── BRANCH ARMS ── */}
              {visionPoints.map((pt, i) => {
                const end = polar(CX, CY, pt.angle, BRANCH_R);
                const mid = polar(CX, CY, pt.angle, BRANCH_R * 0.5);
                const isActive = activeId === pt.id;

                // Bezier control point — slight curve
                const ctrl = polar(CX, CY, pt.angle + (pt.angle < 0 ? 15 : -15), BRANCH_R * 0.55);

                return (
                  <g key={pt.id}>
                    {/* Branch line */}
                    <path
                      d={`M ${CX} ${CY} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`}
                      fill="none"
                      stroke={isActive ? pt.accent : '#cbd5e1'}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      className="branch-line"
                      style={{
                        transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />

                    {/* Tick mark at midpoint */}
                    <circle
                      cx={mid.x}
                      cy={mid.y}
                      r={3}
                      fill={isActive ? pt.accent : '#cbd5e1'}
                      style={{ transition: 'fill 0.3s ease' }}
                    />

                    {/* Index label along branch */}
                    <text
                      x={polar(CX, CY, pt.angle, BRANCH_R * 0.72).x}
                      y={polar(CX, CY, pt.angle, BRANCH_R * 0.72).y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        fill: isActive ? pt.accent : '#94a3b8',
                        letterSpacing: '0.1em',
                        transition: 'fill 0.3s ease',
                      }}
                    >
                      {pt.index}
                    </text>

                    {/* Outer node — interactive circle */}
                    <g
                      onClick={() => setActiveId(prev => (prev === pt.id ? null : pt.id))}
                      style={{ cursor: 'pointer' }}
                      role="button"
                      aria-pressed={isActive}
                      aria-label={pt.titleFlat}
                    >
                      {/* Halo */}
                      <circle
                        cx={end.x}
                        cy={end.y}
                        r={NODE_R + 8}
                        fill={pt.accent}
                        opacity={isActive ? 0.1 : 0}
                        style={{ transition: 'opacity 0.3s ease' }}
                      />
                      {/* Circle bg */}
                      <circle
                        cx={end.x}
                        cy={end.y}
                        r={NODE_R}
                        fill={isActive ? pt.accent : '#ffffff'}
                        stroke={isActive ? pt.accent : '#e2e8f0'}
                        strokeWidth={isActive ? 0 : 1.5}
                        style={{ transition: 'fill 0.35s ease, stroke 0.35s ease' }}
                      />

                      {/* Multi-line label inside circle */}
                      {pt.title.split('\n').map((line, li, arr) => {
                        const lineHeight = 16;
                        const totalH = arr.length * lineHeight;
                        const offsetY = -totalH / 2 + li * lineHeight + lineHeight / 2;
                        return (
                          <text
                            key={li}
                            x={end.x}
                            y={end.y + offsetY}
                            textAnchor="middle"
                            dominantBaseline="central"
                            style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              fill: isActive ? '#ffffff' : '#0f172a',
                              fontFamily: 'system-ui, sans-serif',
                              lineHeight: 1.3,
                              transition: 'fill 0.3s ease',
                            }}
                          >
                            {line}
                          </text>
                        );
                      })}
                    </g>
                  </g>
                );
              })}

              {/* ── CENTER NODE ── */}
              {/* Pulse rings */}
              <circle cx={CX} cy={CY} r={36} fill={BRAND.navy} className="pulse" />
              <circle cx={CX} cy={CY} r={36} fill={BRAND.navy} className="pulse-2" />
              <circle cx={CX} cy={CY} r={36} fill={BRAND.navy} className="pulse-3" />

              {/* Center solid circle */}
              <circle cx={CX} cy={CY} r={52} fill={BRAND.navy} />
              <circle cx={CX} cy={CY} r={52} fill="none" stroke="#1d4ed8" strokeWidth={1.5} />

              {/* Center label */}
              <text
                x={CX} y={CY - 9}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '11px', fontWeight: 900, fill: '#ffffff', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.04em' }}
              >
                Banyamulenge
              </text>
              <text
                x={CX} y={CY + 9}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '11px', fontWeight: 900, fill: '#93c5fd', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.04em' }}
              >
                Youth
              </text>

              {/* Hint text */}
              <text
                x={CX} y={580}
                textAnchor="middle"
                style={{ fontSize: '11px', fill: '#94a3b8', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.05em' }}
              >
                Select any branch to explore
              </text>
            </svg>
          </div>

          {/* Detail panel — 5 cols */}
          <div className="lg:col-span-5">
            {activeId === null ? (
              /* Default state */
              <div className="flex flex-col gap-8">
                <div
                  className="h-px w-16"
                  style={{ background: BRAND.navy }}
                />
                <p className="text-3xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  Four outcomes.<br />
                  <span className="text-slate-300 font-serif italic font-light">One community.</span>
                </p>
                <p className="text-base text-slate-500 leading-relaxed">
                  Click any branch in the tree to explore each vision outcome — what it means for Banyamulenge youth and how MSNC is working toward it.
                </p>

                {/* All four outcome titles as a quick-nav list */}
                <ul className="space-y-3 mt-2">
                  {visionPoints.map(pt => (
                    <li key={pt.id}>
                      <button
                        onClick={() => setActiveId(pt.id)}
                        className="w-full flex items-center gap-4 text-left group"
                      >
                        <span
                          className="shrink-0 text-[10px] font-black font-mono transition-colors duration-200"
                          style={{ color: '#cbd5e1' }}
                        >
                          {pt.index}
                        </span>
                        <span
                          className="h-px flex-1 transition-all duration-300 group-hover:flex-none group-hover:w-8"
                          style={{ background: pt.accent, opacity: 0.3 }}
                        />
                        <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors duration-200 leading-snug">
                          {pt.titleFlat}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              /* Active outcome detail */
              (() => {
                const pt = visionPoints[activeId];
                return (
                  <div className="flex flex-col gap-6" key={pt.id}>
                    {/* Accent bar */}
                    <div className="h-1 w-12 rounded-full" style={{ background: pt.accent }} />

                    {/* Index */}
                    <span
                      className="text-[11px] font-black font-mono tracking-[0.2em]"
                      style={{ color: pt.accent }}
                    >
                      OUTCOME {pt.index}
                    </span>

                    {/* Title */}
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-[1.1]">
                      {pt.titleFlat}
                    </h3>

                    {/* Divider */}
                    <div className="h-px w-full bg-slate-100" />

                    {/* Body */}
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {pt.body}
                    </p>

                    {/* Navigation */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => setActiveId((activeId - 1 + visionPoints.length) % visionPoints.length)}
                        className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 hover:border-slate-400 transition-colors text-slate-400 hover:text-slate-700"
                        aria-label="Previous outcome"
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                          <path d="M10 12L6 8l4-4" />
                        </svg>
                      </button>
                      <div className="flex gap-1.5">
                        {visionPoints.map(v => (
                          <button
                            key={v.id}
                            onClick={() => setActiveId(v.id)}
                            className="rounded-full transition-all duration-300"
                            style={{
                              width: activeId === v.id ? 20 : 6,
                              height: 6,
                              background: activeId === v.id ? pt.accent : '#e2e8f0',
                            }}
                            aria-label={`Go to outcome ${v.index}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setActiveId((activeId + 1) % visionPoints.length)}
                        className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 hover:border-slate-400 transition-colors text-slate-400 hover:text-slate-700"
                        aria-label="Next outcome"
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                          <path d="M6 4l4 4-4 4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveId(null)}
                        className="ml-auto text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors"
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>

        {/* Closing anchor */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <div
            className="h-16 w-px"
            style={{ background: `linear-gradient(to bottom, ${BRAND.navy}, transparent)` }}
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-300">
            End of Vision
          </p>
        </div>
      </div>
    </section>
  );
}