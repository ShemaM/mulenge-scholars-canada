'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Users, BookOpen, GraduationCap, 
  Briefcase, Globe, Plus, X, AlertCircle 
} from 'lucide-react';
import { cn } from "@/lib/utils";

const BRAND = { navy: '#002147', blue: '#1d4ed8', red: '#E31937' };

const SOLUTIONS = [
  {
    id: 'mentorship',
    icon: Users,
    title: 'Mentorship',
    tagline: 'Guided by Experience',
    detail: 'Direct mentorship from experienced students and professionals who understand the unique challenges of navigating the Canadian system.',
    color: BRAND.navy,
  },
  {
    id: 'academic',
    icon: BookOpen,
    title: 'Academic Guidance',
    tagline: 'Pathways to Success',
    detail: 'Course selection and tutoring for Grades 11–12, ensuring a smooth transition into high-level post-secondary education.',
    color: BRAND.blue,
  },
  {
    id: 'post-sec',
    icon: GraduationCap,
    title: 'Post-Secondary',
    tagline: 'Application Support',
    detail: 'Full support for college and university planning, applications, and accessing leadership or volunteer opportunities.',
    color: '#0369a1',
  },
  {
    id: 'career',
    icon: Briefcase,
    title: 'Career Pathways',
    tagline: 'Future Direction',
    detail: 'Guidance on skilled trades, adult education programs, and personalized career planning for adult learners.',
    color: '#0f766e',
  },
  {
    id: 'global',
    icon: Globe,
    title: 'Global Impact',
    tagline: 'Vocational Focus',
    detail: 'Supporting youth in refugee camps across Kenya, Uganda, and Burundi with training in Construction, IT, and Mechanics.',
    color: BRAND.red,
  },
];

function SolutionCard({ item }: { item: typeof SOLUTIONS[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:shadow-lg">
      {/* Front: Dense Content */}
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${item.color}10`, color: item.color }}
          >
            <item.icon className="w-5 h-5" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-tight mb-1">
            {item.title}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.tagline}</p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 group"
        >
          <Plus className="w-3 h-3 transition-transform group-hover:rotate-90" />
          Learn More
        </button>
      </div>

      {/* Back Overlay */}
      <div 
        className={cn(
          "absolute inset-0 z-20 p-6 flex flex-col justify-between transition-transform duration-500 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{ backgroundColor: item.color }}
      >
        <button onClick={() => setIsOpen(false)} className="self-end p-1 rounded-full bg-white/10 hover:bg-white/20">
          <X className="w-4 h-4 text-white" />
        </button>
        <p className="text-white text-sm font-medium leading-relaxed mb-4">{item.detail}</p>
        <div className="h-1 w-8 bg-white/40 rounded-full" />
      </div>
    </div>
  );
}

export default function TheChallenge() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] border-t border-slate-200">
      <div className="w-full px-6 md:px-12 lg:px-16 mx-auto max-w-[1600px]">
        
        {/* TOP ROW: Header & Primary Narrative */}
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16 pb-12 border-b border-slate-200">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-blue-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600">The Challenge</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-8">
              Navigating <br /> New Systems<span className="text-slate-300">.</span>
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight max-w-2xl">
              For Banyamulenge families, displacement results in fragmented academic journeys. Transitioning into Canada is a multi-generational hurdle.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex flex-col justify-end lg:pl-12">
             <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Critical Awareness</h4>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Financial pressures often push our youth toward short-term labor instead of long-term professional careers. MSNC exists to rewrite this trajectory.
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* BOTTOM ROW: Content & Solutions Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Tight List */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Barrier Analysis</h4>
            <div className="grid gap-4">
              {[
                'Lack of guidance on academic pathways',
                'Difficulty transitioning to post-secondary',
                'Systemic unfamiliarity within families'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                  <span className="text-blue-600 font-black text-xs">0{i+1}</span>
                  <span className="text-slate-800 font-bold text-sm tracking-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Dense Solutions Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              {SOLUTIONS.map(item => <SolutionCard key={item.id} item={item} />)}
              
              {/* Call to Action Module */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-2xl bg-slate-900 p-8 flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ArrowRight className="w-32 h-32 rotate-[-45deg] text-white" />
                </div>
                <h3 className="text-xl font-black text-white leading-tight uppercase relative z-10">
                  Join the <br /> Scholars <br /> Network
                </h3>
                <Link
                  href="/programs"
                  className="flex items-center justify-between w-full h-12 px-5 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors relative z-10"
                >
                  View All Programs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}