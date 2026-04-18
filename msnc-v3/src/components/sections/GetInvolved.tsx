'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Users, Gift, HandHeart, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────

const actions = [
  {
    id: '01',
    title: 'Students',
    role: 'Scholars',
    desc: 'Access mentorship, academic support, and specialized career guidance.',
    detail:
      'Whether you are in high school or navigating adult education—MSNC has a program designed for your current academic stage.',
    link: '/join?role=student',
    icon: Users,
    brandColor: 'text-[#002147]',
    brandBg: 'bg-[#002147]',
    brandBorder: 'border-[#002147]',
    accentLight: 'bg-slate-50',
  },
  {
    id: '02',
    title: 'Partners',
    role: 'Institutions',
    desc: 'Support our mission and help us expand opportunities for underserved youth.',
    detail:
      'Your partnership enables workshops and the Rebuilding Futures Initiative—directly changing the trajectory of young lives.',
    link: '/join?role=partner',
    icon: Gift,
    brandColor: 'text-blue-600',
    brandBg: 'bg-blue-600',
    brandBorder: 'border-blue-600',
    accentLight: 'bg-blue-50/30',
  },
  {
    id: '03',
    title: 'Volunteers',
    role: 'Mentors',
    desc: 'Become a mentor and make a meaningful impact in the lives of young people.',
    detail:
      'Share your experience, guide a student through their journey, and become part of the community network that makes MSNC possible.',
    link: '/join?role=volunteer',
    icon: HandHeart,
    brandColor: 'text-slate-600',
    brandBg: 'bg-slate-600',
    brandBorder: 'border-slate-400',
    accentLight: 'bg-slate-50',
  },
]

export default function GetInvolved() {
  const [activeId, setActiveId] = useState<string>('01')

  return (
    <section
      className="relative py-24 md:py-32 bg-white overflow-hidden"
      aria-labelledby="gi-heading"
    >
      {/* Structural Grid Background (Matches About/Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.5] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 mx-auto max-w-[1700px]">
        {/* ─── MASTHEAD (PHASE 04) ─── */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-16">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              Engagement
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Phase_04: Call to Action
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-mono font-black text-slate-900">REF_ACTIVATE</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-8">
            <h2
              id="gi-heading"
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.85] text-[#002147]"
            >
              Become the <br />
              <span className="font-serif italic font-light text-slate-300">Next Chapter.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p className="text-xl text-slate-600 font-medium border-l-4 border-blue-600 pl-8 leading-tight">
              Whether you are a student seeking a path or a professional looking to lead, there is a
              role for you.
            </p>
          </div>
        </div>

        {/* ─── INTERACTIVE SPOTLIGHT ACCORDION ─── */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[580px]">
          {actions.map((action) => {
            const isActive = activeId === action.id
            const Icon = action.icon

            return (
              <motion.div
                key={action.id}
                layout
                onMouseEnter={() => setActiveId(action.id)}
                onClick={() => setActiveId(action.id)}
                className={cn(
                  'relative rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 bg-white border-2',
                  isActive
                    ? cn(action.brandBorder, 'shadow-2xl shadow-blue-900/10')
                    : 'border-slate-100 hover:border-slate-200',
                )}
                style={{ flex: isActive ? 4.5 : 1 }}
              >
                {/* Subtle Radial Glow on Active Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.03),transparent)]"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 h-full flex flex-col p-8 md:p-12">
                  {/* INACTIVE STATE: Scholarly Vertical Label */}
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-between py-6"
                    >
                      <span className="text-[11px] font-mono font-bold text-slate-300">
                        MOD_0{action.id}
                      </span>
                      <span className="text-sm font-black uppercase tracking-[0.25em] text-[#002147] [writing-mode:vertical-lr] rotate-180">
                        {action.title}
                      </span>
                      <Icon className="w-6 h-6 text-slate-200" strokeWidth={1.5} />
                    </motion.div>
                  )}

                  {/* ACTIVE STATE: High-Contrast Scholarly Content */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-4">
                          <span
                            className={cn(
                              'inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border',
                              action.brandBorder,
                              action.brandColor,
                            )}
                          >
                            STAKEHOLDER: {action.role}
                          </span>
                          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-[#002147]">
                            {action.title}
                          </h3>
                        </div>
                        <div
                          className={cn(
                            'p-5 rounded-[1.5rem] text-white shadow-xl shadow-blue-900/5',
                            action.brandBg,
                          )}
                        >
                          <Icon className="w-10 h-10" strokeWidth={2} />
                        </div>
                      </div>

                      <div className="max-w-2xl border-l-2 border-slate-100 pl-8 ml-2">
                        <p className="text-2xl font-bold text-[#002147] leading-tight mb-6">
                          {action.desc}
                        </p>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed italic font-serif">
                          &ldquo;{action.detail}&rdquo;
                        </p>
                      </div>

                      <div className="pt-10 mt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                        <Link
                          href={action.link}
                          className={cn(
                            'group/btn flex items-center justify-between gap-6 h-16 px-10 rounded-full font-black uppercase tracking-widest text-[11px] text-white transition-all w-full md:w-auto shadow-xl shadow-blue-900/10',
                            action.brandBg,
                          )}
                        >
                          {action.title === 'Students'
                            ? 'Start Application'
                            : action.title === 'Volunteers'
                              ? 'Mentor a Scholar'
                              : 'Inquire Partnership'}
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>

                        {/* Progress Indicators */}
                        <div className="hidden md:flex items-center gap-3">
                          {actions.map((dot) => (
                            <div
                              key={dot.id}
                              className={cn(
                                'h-1.5 rounded-full transition-all duration-700',
                                dot.id === action.id ? 'w-12 bg-[#002147]' : 'w-3 bg-slate-200',
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ─── FOOTER LABELS ─── */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
            © 2024 MSNC Canada Engagement Module
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Scroll to explore
            </span>
            <ChevronRight className="w-4 h-4 text-slate-200" />
          </div>
        </div>
      </div>
    </section>
  )
}
