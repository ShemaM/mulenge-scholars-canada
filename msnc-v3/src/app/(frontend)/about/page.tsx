/**
 * MSNC About Page - Production Ready (Light Theme)
 * Architecture: High-Contrast Swiss Minimalist, Edge-to-Edge Fluidity
 */

import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import {
  Shield, Users, TrendingUp, Globe,
  MapPin, Anchor, Handshake, ArrowRight,
  Quote, Compass, Star, BookOpen, GraduationCap, 
  Wrench
} from 'lucide-react';

// ─── Metadata & SEO ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Our Heritage & Mission | Mulenge Scholars' Network Canada",
  description:
    "Mulenge Scholars' Network Canada (MSNC) is a youth-led organization founded by Banyamulenge students. We empower youth across Canada through mentorship, academic guidance, and leadership development.",
  keywords: [
    'Banyamulenge', 'Mulenge Scholars', 'Refugee Youth Mentorship',
    'Canada Education Pathways', 'DRC Highlands Pastoralists', 'Youth Empowerment'
  ],
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

const FOCUS_BASE =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600';

// ─── Data ─────────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    title: 'Empowerment',
    icon: TrendingUp,
    description: 'We equip youth with the knowledge, skills, and confidence to achieve their full potential.',
  },
  {
    title: 'Community',
    icon: Users,
    description: 'We foster a supportive and inclusive network where every individual feels valued and inspired.',
  },
  {
    title: 'Integrity',
    icon: Shield,
    description: 'We act with honesty, transparency, and accountability in all that we do.',
  },
  {
    title: 'Collaboration',
    icon: Handshake,
    description: 'We believe in the power of partnerships and teamwork to create greater impact.',
  },
  {
    title: 'Excellence',
    icon: Star,
    description: 'We strive for continuous growth and high standards in our programs and services.',
  },
  {
    title: 'Resilience',
    icon: Anchor,
    description: 'We promote perseverance and strength in overcoming challenges and building a better future.',
  },
];

const PROGRAMS = [
  {
    title: 'Workshops & Community Engagement',
    icon: Users,
    description: 'We organize interactive workshops both virtual and in-person focused on:',
    bullets: [
      'Academic success',
      'Career development',
      'Student life'
    ],
    footer: 'These sessions create safe and engaging spaces where youth can learn, connect, and grow.'
  },
  {
    title: 'High School Support (Grades 11-12)',
    icon: GraduationCap,
    description: 'We provide targeted support to help students transition successfully into post-secondary education:',
    bullets: [
      'Tutoring and mentorship',
      'Course selection guidance',
      'Post-secondary planning',
      'College and university application support',
      'Access to leadership and volunteer opportunities'
    ]
  },
  {
    title: 'Adult Learning & Career Pathways',
    icon: BookOpen,
    description: 'We support adult learners who want to upgrade their education or explore new career opportunities:',
    bullets: [
      'Guidance on prerequisite courses',
      'Support with enrolling in adult education programs',
      'Information on skilled trades and alternative career paths',
      'Personalized mentorship and academic planning'
    ]
  },
  {
    title: 'Rebuilding Futures Initiative',
    icon: Wrench,
    description: 'We are committed to expanding our impact globally by supporting Banyamulenge youth living in refugee camps, particularly in Kenya, Uganda, and Burundi. This initiative focuses on vocational training in high demand fields such as:',
    bullets: [
      'Construction',
      'Electrical work',
      'Plumbing',
      'Mechanics',
      'Heavy equipment operation',
      'Information technology'
    ],
    footer: 'Our goal is to equip youth with practical, employable skills that promote self-reliance and long-term stability.'
  }
];

// ─── Page Component ───────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <a
        href="#about-content"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-slate-900 focus:text-white focus:text-sm focus:font-medium focus:tracking-widest focus:uppercase ${FOCUS_BASE}`}
      >
        Skip to main content
      </a>

      <main
        id="about-content"
        className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 pb-24"
      >
        {/* ════════════════════════════════════════════════════════════
            HERO: EDITORIAL COVER
        ════════════════════════════════════════════════════════════ */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-slate-200 bg-[#FAFAFA]">
          <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end mb-16">
              <div className="space-y-4 max-w-4xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-blue-600" aria-hidden />
                  Who We Are
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  Mulenge Scholars&apos; <br />
                  <span className="font-serif italic font-light text-slate-500">Network Canada</span><br />
                  (MSNC)
                </h1>
              </div>
            </div>

            {/* Editorial Divider */}
            <div className="w-full mb-12">
              <div className="h-[3px] bg-slate-900 w-full" />
              <div className="h-px bg-slate-200 w-full mt-1" />
            </div>

            <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="md:col-span-4 flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-full border-4 border-[#FAFAFA] bg-slate-200 shadow-sm"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="md:col-span-8 text-xl lg:text-2xl text-slate-700 font-medium leading-relaxed max-w-4xl">
                Mulenge Scholars&apos; Network Canada (MSNC) is a youth-led organization founded by Banyamulenge students who understand firsthand the challenges of navigating new education systems.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            HERITAGE: THE STORY
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 relative bg-white" aria-labelledby="heritage-heading">
          <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <Globe className="w-10 h-10 text-blue-600 mb-8" strokeWidth={1.5} />
                <h2 id="heritage-heading" className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                  Our Origins
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  The Heritage Context
                </p>
              </div>

              <div className="lg:col-span-8 space-y-16">
                <blockquote className="border-l-4 border-blue-600 pl-8 bg-slate-50 py-8 pr-8 rounded-r-2xl">
                  <Quote className="w-8 h-8 text-blue-300 mb-6" aria-hidden />
                  <p className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-relaxed">
                    "The Banyamulenge, also known as the Mulenge people, are a community originally from the highlands of eastern Democratic Republic of Congo."
                  </p>
                </blockquote>
                
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 text-lg text-slate-700 font-medium leading-relaxed">
                  <p>
                    Their ancestors migrated to this region generations ago, primarily as pastoralists from neighboring areas such as Rwanda and Burundi.
                  </p>
                  <p>
                    Despite their long history in Congo, many Banyamulenge have faced cycles of displacement due to conflict and instability, leading families to seek refuge in different countries across Africa and beyond.
                  </p>
                </div>

                <div className="bg-blue-50/50 p-8 md:p-10 rounded-2xl border border-blue-100">
                  <p className="text-xl text-slate-900 font-bold leading-relaxed mb-6">
                    These experiences of migration and adaptation have shaped a resilient and diverse global community, one that is now growing in Canada.
                  </p>
                  <div className="w-16 h-[2px] bg-blue-600 mb-6" />
                  <p className="text-lg text-slate-700 font-medium leading-relaxed">
                    We are dedicated to empowering youth across Canada through mentorship, academic guidance, and leadership development, while fostering a strong sense of community and belonging.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            THE DIVIDE (Challenge & Solution)
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-200" aria-label="Challenge and Solution">
          <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Challenge Card */}
              <article className="bg-white p-10 md:p-14 lg:p-16 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-8 hover:shadow-lg transition-shadow duration-500 flex flex-col">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-8">
                  <div className="p-4 bg-red-50 rounded-2xl">
                    <Compass className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">The Challenge</h3>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Many Banyamulenge families arrived in Canada after experiencing displacement and living in multiple countries, each with different education systems. Transitioning into the Canadian system can be difficult not only for students, but also for their families. As a result:
                </p>
                <ul className="space-y-6 mt-auto">
                  {[
                    'Students often lack guidance on academic pathways',
                    'Many struggle to transition into post-secondary education',
                    'Financial pressures push youth toward short-term jobs instead of long-term careers',
                    'Families may be unable to provide support due to unfamiliarity with the system'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-800 font-medium">
                      <span className="text-red-600 font-mono font-bold mt-1">0{i + 1}</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Solution Card */}
              <article className="bg-white p-10 md:p-14 lg:p-16 rounded-[2.5rem] shadow-sm border-2 border-blue-100 space-y-8 relative overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-500 flex flex-col">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-full opacity-50 -z-10" />
                <div className="flex items-center gap-4 border-b border-slate-100 pb-8">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Our Solution</h3>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  MSNC bridges these gaps by providing:
                </p>
                <ul className="space-y-6 flex-grow">
                  {[
                    'Mentorship from experienced students and professionals',
                    'Academic guidance and tutoring',
                    'Post-secondary application support',
                    'Career and leadership development opportunities',
                    'A strong, supportive community network'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-800 font-medium">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-8 border-t border-slate-100 mt-auto">
                  <p className="text-lg text-slate-900 font-bold leading-relaxed">
                    We equip youth with the knowledge, confidence, and resources they need to succeed academically and professionally.
                  </p>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            IMPACT VISION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 relative bg-white border-b border-slate-200" aria-labelledby="vision-heading">
          <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="text-center space-y-8 mb-16 md:mb-24">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600">
                Our Impact Vision
              </p>
              
              <h2 id="vision-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
                We envision a future where <br />
                <span className="font-serif italic font-light text-slate-500">Banyamulenge youth</span> are:
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { text: 'Confident in their abilities', num: '01' },
                { text: 'Successful in their academic journeys', num: '02' },
                { text: 'Established in meaningful and sustainable careers', num: '03' },
                { text: 'Leaders who give back to their communities', num: '04' }
              ].map((item, i) => (
                <article key={i} className="p-8 md:p-10 border border-slate-200 bg-[#FAFAFA] rounded-3xl hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[240px]">
                  <span className="block text-3xl font-serif italic text-blue-600/60 mb-6">{item.num}</span>
                  <p className="text-slate-800 font-bold text-xl leading-snug">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            OUR PROGRAMS (Light Editorial Grid)
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-slate-50" aria-labelledby="programs-heading">
          <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <h2 id="programs-heading" className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                Our Programs
              </h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 pb-2">
                Pillars of Support
              </p>
            </div>

            {/* Editorial Divider */}
            <div className="w-full mb-16">
              <div className="h-[3px] bg-slate-900 w-full" />
              <div className="h-px bg-slate-200 w-full mt-1" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {PROGRAMS.map((prog, idx) => (
                <article key={idx} className="bg-white border border-slate-200 p-8 md:p-12 lg:p-16 rounded-[2.5rem] space-y-8 hover:shadow-xl hover:border-blue-200 transition-all duration-500 ease-out flex flex-col">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <prog.icon className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">{prog.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">
                    {prog.description}
                  </p>
                  
                  <ul className="space-y-4 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex-grow">
                    {prog.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-800 font-medium">
                        <span className="text-blue-600 font-bold mt-1 text-sm">✦</span>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {prog.footer && (
                    <div className="pt-2">
                      <p className="text-slate-500 italic font-medium leading-relaxed">
                        {prog.footer}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CORE VALUES
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-white border-t border-slate-200" aria-labelledby="values-heading">
          <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
            
            <div className="mb-12">
              <h2 id="values-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                Our Core Values
              </h2>
            </div>

            {/* Editorial Divider */}
            <div className="w-full mb-16">
              <div className="h-[3px] bg-slate-900 w-full" />
              <div className="h-px bg-slate-200 w-full mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-16">
              {CORE_VALUES.map((value, idx) => (
                <article key={idx} className="group cursor-default border-l-2 border-slate-200 hover:border-blue-600 pl-6 md:pl-8 transition-colors duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors">0{idx + 1}</span>
                    <value.icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:translate-x-1 transition-transform duration-300">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            GET INVOLVED CTA
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 bg-[#FAFAFA] border-t border-slate-200 text-center" aria-labelledby="cta-heading">
          <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto space-y-16">
              
              <h2 id="cta-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                Get Involved
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 text-left">
                {/* Students */}
                <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-500 flex flex-col">
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6">Students</h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-10 flex-grow">
                    Join our programs and access mentorship, academic support, and career guidance.
                  </p>
                  <Link href="/join?role=student" className={`inline-flex w-full justify-center items-center gap-3 bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors duration-500 ${FOCUS_BASE}`}>
                    Join Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Partners & Donors */}
                <div className="bg-slate-900 p-10 lg:p-12 rounded-[2.5rem] border border-slate-800 shadow-sm hover:shadow-xl hover:bg-slate-800 transition-all duration-500 flex flex-col">
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-6">Partners</h3>
                  <p className="text-slate-300 font-medium leading-relaxed mb-10 flex-grow">
                    Support our mission and help us expand opportunities for underserved youth.
                  </p>
                  <Link href="/join?role=partner" className={`inline-flex w-full justify-center items-center gap-3 bg-white text-slate-900 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-50 transition-colors duration-500 ${FOCUS_BASE}`}>
                    Support Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Volunteers */}
                <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-500 flex flex-col">
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6">Volunteers</h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-10 flex-grow">
                    Become a mentor and make a meaningful impact in the lives of young people.
                  </p>
                  <Link href="/join?role=volunteer" className={`inline-flex w-full justify-center items-center gap-3 bg-slate-100 text-slate-900 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors duration-500 ${FOCUS_BASE}`}>
                    Volunteer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}