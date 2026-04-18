/**
 * MSNC Workshops & Community Engagement - Long-Form Editorial
 * Architecture: Swiss Editorial, Narrative Flow, Pull-Quotes, Deep Reading
 * Content: Exact Dictionary items expanded via rich, empathetic storytelling.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, ArrowLeft, ArrowRight, 
  Lightbulb, Briefcase, Heart, MessageCircle
} from 'lucide-react';

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600';

export const metadata: Metadata = {
  title: 'Workshops & Community Engagement | MSNC',
  description: 'We organize interactive workshops focused on academic success, career development, and student life. Creating safe spaces for youth to connect and grow.',
};

export default function WorkshopsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white pb-32">
      
      {/* ─── PROLOGUE: EDITORIAL HERO ─── */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-[#FAFAFA] border-b border-slate-200 overflow-hidden">
        
        {/* Typographic Watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[30vw] font-black text-slate-900/[0.03] leading-none pointer-events-none select-none tracking-tighter">
          01
        </div>
        
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto relative z-10">
          
          <Link 
            href="/programs" 
            className={`group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-blue-600 transition-colors duration-300 mb-16 ${FOCUS_BASE}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" /> 
            Back to Directory
          </Link>
          
          <div className="max-w-5xl space-y-10">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 flex items-center gap-2">
                <Users className="w-3 h-3" /> Community Pillar
              </span>
              <span className="w-12 h-px bg-slate-300" aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                Est. 2025
              </span>
            </div>
            
            <h1 className="text-[clamp(3rem,6vw,7rem)] font-black text-slate-900 leading-[0.9] tracking-tighter">
              The Power of <br />
              <span className="font-serif italic font-light text-slate-500 tracking-normal">Shared Spaces.</span>
            </h1>

            <div className="border-l-4 border-blue-600 pl-6 md:pl-10 max-w-4xl mt-12">
              <p className="text-2xl md:text-3xl text-slate-700 font-medium leading-[1.4] tracking-tight">
                Navigating a new education system shouldn't be a solo journey. We organize interactive workshops—both virtual and in-person—designed to equip youth with the holistic tools they need to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER I: THE CONTEXT ─── */}
      <section className="pt-24 md:pt-32">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-200 pb-4 mb-8">
                The Philosophy
              </h2>
            </div>

            <div className="lg:col-span-8 max-w-prose text-xl text-slate-600 font-medium leading-[1.8] space-y-8">
              <p>
                <span className="float-left text-7xl font-serif text-slate-900 leading-[0.8] pr-3 pt-1">
                  F
                </span>
                or Banyamulenge youth arriving in Canada, the classroom can often feel like a foreign landscape. The academic rules are different, the social dynamics are unfamiliar, and the pressure to succeed while adapting to a new culture is immense.
              </p>
              <p>
                Our Workshops & Community Engagement pillar was born from a simple truth: <strong className="text-slate-900">potential requires an environment to flourish.</strong> We recognized that academic tutoring alone isn't enough. Youth need a sanctuary—a place where questions are welcomed, cultural identities are celebrated, and knowledge flows freely among peers who understand the journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CHAPTER II: THE METHODOLOGY (Expanded Curriculum) ─── */}
      <section className="pt-24 md:pt-32 mt-24 md:mt-32 bg-slate-50 border-y border-slate-200 pb-24 md:pb-32">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              The Three Pillars <br/> of Engagement.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Module 1 */}
            <article className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-8">
                <Lightbulb className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6">Academic Success</h3>
              <p className="text-slate-600 leading-relaxed font-medium flex-grow">
                Excellence requires strategy. We break down the mechanics of the Canadian education system, offering focused sessions on effective study techniques, exam preparation, and classroom navigation. We demystify the academic process so students can focus on learning.
              </p>
            </article>

            {/* Module 2 */}
            <article className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-8">
                <Briefcase className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6">Career Development</h3>
              <p className="text-slate-600 leading-relaxed font-medium flex-grow">
                Bridging the gap between the classroom and the professional world. These workshops feature resume building, interview preparation, and intimate panel discussions with established professionals, providing scholars with a tangible roadmap to their future careers.
              </p>
            </article>

            {/* Module 3 */}
            <article className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8">
                <Heart className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6">Student Life</h3>
              <p className="text-slate-600 leading-relaxed font-medium flex-grow">
                We support the holistic scholar. Beyond grades and jobs, we focus on mental well-being, cultural identity, and peer-to-peer support. We ensure that our youth build the emotional resilience needed to thrive in all aspects of their lives.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ─── CHAPTER III: THE ENVIRONMENT (Pull Quote) ─── */}
      <section className="py-24 md:py-40 bg-white">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <MessageCircle className="w-12 h-12 text-slate-200 mx-auto mb-10" strokeWidth={1} />
            <h2 className="text-3xl md:text-5xl font-serif italic text-slate-900 leading-[1.3] mb-12">
              "These sessions create safe and engaging spaces where youth can learn, connect, and grow."
            </h2>
            <div className="w-24 h-px bg-blue-600 mx-auto mb-6" />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
              The MSNC Promise
            </p>
          </div>
        </div>
      </section>

      {/* ─── EPILOGUE: THE CALL TO ACTION ─── */}
      <section className="pt-16 pb-32">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative">
            
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Join the <br/> Conversation.
              </h2>
              <p className="text-xl text-slate-300 font-medium">
                Our community is expanding. Whether you are a student looking for guidance, or a professional ready to lead a session, there is a seat at the table for you.
              </p>
              
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/events"
                  className={`inline-flex h-16 w-full sm:w-auto items-center justify-center gap-4 px-10 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/50 transition-all duration-500 group ${FOCUS_BASE}`}
                >
                  View Upcoming Workshops
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
                <Link 
                  href="/join"
                  className={`inline-flex h-16 w-full sm:w-auto items-center justify-center px-10 bg-transparent border border-slate-700 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-slate-800 transition-all duration-500 ${FOCUS_BASE}`}
                >
                  Become a Mentor
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </main>
  );
}