/**
 * MSNC StrategicPillars - Editorial Image Grid (bg-slate-50)
 * Content: 100% Exact Content Dictionary text parsed into intros and bullets.
 * Architecture: Swiss Minimalist, Magazine-style image cards.
 */

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600';

// Using high-quality Unsplash placeholders to give the client a realistic feel of the final UI
const PILLARS = [
  {
    id: "01",
    title: "Workshops & Community Engagement",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    intro: "We organize interactive workshops both virtual and in-person focused on:",
    bullets: [
      "Academic success",
      "Career development",
      "Student life"
    ],
    footer: "These sessions create safe and engaging spaces where youth can learn, connect, and grow.",
    link: "/programs/workshops-community"
  },
  {
    id: "02",
    title: "High School Support (Grades 11-12)",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
    intro: "We provide targeted support to help students transition successfully into post-secondary education:",
    bullets: [
      "Tutoring and mentorship",
      "Course selection guidance",
      "Post-secondary planning",
      "College and university application support",
      "Access to leadership and volunteer opportunities"
    ],
    link: "/programs/high-school-support"
  },
  {
    id: "03",
    title: "Adult Learning & Career Pathways",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    intro: "We support adult learners who want to upgrade their education or explore new career opportunities:",
    bullets: [
      "Guidance on prerequisite courses",
      "Support with enrolling in adult education programs",
      "Information on skilled trades and alternative career paths",
      "Personalized mentorship and academic planning"
    ],
    link: "/programs/adult-learning-pathways"
  },
  {
    id: "04",
    title: "Rebuilding Futures Initiative",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    intro: "We are committed to expanding our impact globally by supporting Banyamulenge youth living in refugee camps, particularly in Kenya, Uganda, and Burundi. This initiative focuses on vocational training in high demand fields such as:",
    bullets: [
      "Construction",
      "Electrical work",
      "Plumbing",
      "Mechanics",
      "Heavy equipment operation",
      "Information technology"
    ],
    footer: "Our goal is to equip youth with practical, employable skills that promote self-reliance and long-term stability.",
    link: "/impact/rebuilding-futures"
  }
];

export default function StrategicPillars() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200 overflow-hidden" aria-labelledby="programs-heading">
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 id="programs-heading" className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
              Our Programs
            </h2>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 pb-2">
            Strategic Pillars
          </p>
        </div>

        {/* Editorial Divider */}
        <div className="w-full mb-16">
          <div className="h-[3px] bg-slate-900 w-full" />
          <div className="h-px bg-slate-200 w-full mt-1" />
        </div>

        {/* Editorial Image Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PILLARS.map((pillar) => (
            <Link 
              key={pillar.id} 
              href={pillar.link}
              className={`group flex flex-col bg-white border border-slate-200 rounded-[2.5rem] hover:-translate-y-2 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 ease-out overflow-hidden ${FOCUS_BASE}`}
            >
              {/* Image Header */}
              <div className="relative w-full h-64 md:h-72 overflow-hidden bg-slate-100 border-b border-slate-200">
                <img 
                  src={pillar.image} 
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm border border-white/20 text-slate-900 font-serif italic text-xl flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  {pillar.id}
                </div>
              </div>
              
              {/* Content Body */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col flex-grow relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors duration-500">
                  {pillar.title}
                </h3>
                
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {pillar.intro}
                </p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {pillar.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-800 font-medium">
                      <span className="text-blue-600 font-serif italic font-bold mt-0.5">›</span>
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {pillar.footer && (
                  <div className="mb-8 pt-6 border-t border-slate-100">
                    <p className="text-slate-500 italic text-sm font-medium leading-relaxed">
                      {pillar.footer}
                    </p>
                  </div>
                )}
                
                {/* CTA Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 group-hover:text-blue-600 transition-colors duration-500">
                    Explore Initiative
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-500">
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:rotate-12 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}