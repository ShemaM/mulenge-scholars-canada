/**
 * MSNC Adult Learning & Career Pathways - Long-Form Editorial
 * Architecture: Swiss Editorial, Narrative Flow, Deep Reading
 * Content: Exact Dictionary items expanded via rich, empathetic storytelling.
 */

import { Metadata } from 'next';
import { Link } from '@/navigation';
import { 
  BookOpen, ArrowLeft, ArrowRight, 
  Map, GraduationCap, Briefcase, Compass, 
  Quote
} from 'lucide-react';
import { normalizeSiteLocale } from '@/lib/site-copy';

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600';

export const metadata: Metadata = {
  title: 'Adult Learning & Career Pathways | MSNC',
  description: 'Empowering adult learners to upgrade their education, explore skilled trades, and redefine their career trajectories in Canada.',
};

export default async function AdultLearningPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const activeLocale = normalizeSiteLocale(locale);
  const copy =
    activeLocale === 'fr'
      ? {
          back: 'Retour au repertoire',
          objective: 'La norme MSNC',
          ctaPrimary: 'Commencer votre parcours',
          ctaSecondary: 'Parler a un conseiller',
        }
      : {
          back: 'Back to Directory',
          objective: 'The MSNC Standard',
          ctaPrimary: 'Start Your Journey',
          ctaSecondary: 'Speak to an Advisor',
        };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white pb-32">
      
      {/* ─── PROLOGUE: EDITORIAL HERO ─── */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-[#FAFAFA] border-b border-slate-200 overflow-hidden">
        
        {/* Typographic Watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[30vw] font-black text-slate-900/[0.03] leading-none pointer-events-none select-none tracking-tighter">
          03
        </div>
        
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto relative z-10">
          
          <Link 
            href="/programs" 
            className={`group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-blue-600 transition-colors duration-300 mb-16 ${FOCUS_BASE}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" /> 
            {copy.back}
          </Link>
          
          <div className="max-w-5xl space-y-10">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> Career Pathways
              </span>
              <span className="w-12 h-px bg-slate-300" aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                Lifelong Education
              </span>
            </div>
            
            <h1 className="text-[clamp(3rem,6vw,7rem)] font-black text-slate-900 leading-[0.9] tracking-tighter">
              Redefining the <br />
              <span className="font-serif italic font-light text-slate-500 tracking-normal">Trajectory.</span>
            </h1>

            <div className="border-l-4 border-blue-600 pl-6 md:pl-10 max-w-4xl mt-12">
              <p className="text-2xl md:text-3xl text-slate-700 font-medium leading-[1.4] tracking-tight">
                We support adult learners who want to upgrade their education or explore new career opportunities, honoring their lived experience while building practical bridges to the future.
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
                The Adult Advantage
              </h2>
            </div>

            <div className="lg:col-span-8 max-w-prose text-xl text-slate-600 font-medium leading-[1.8] space-y-8">
              <p>
                <span className="float-left text-7xl font-serif text-slate-900 leading-[0.8] pr-3 pt-1">
                  R
                </span>
                eturning to education as an adult requires a profound kind of courage. Adult learners often carry the dual burdens of providing for their families while attempting to navigate a system designed primarily for 18-year-olds. They do not have the luxury of time to make administrative mistakes.
              </p>
              <p>
                Our approach to adult education is rooted in deep respect. We do not treat our adult scholars like students; we treat them like peers. Whether the goal is acquiring missing high school prerequisites, shifting into a highly-paid skilled trade, or pursuing a university degree, we provide the streamlined, highly strategic guidance necessary to turn ambition into stability.
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
              The Four Pillars <br/> of Advancement.
            </h2>
          </div>

          {/* Bento-style grid for the 4 modules */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Module 1 */}
            <article className="bg-white p-10 lg:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8">
                <Map className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6">Guidance on prerequisite courses</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                The biggest hurdle for adult learners is often missing a single, specific credential from their youth. We meticulously audit your academic history to identify the exact prerequisite courses needed to unlock your desired program, ensuring no time or money is wasted on unnecessary classes.
              </p>
            </article>

            {/* Module 2 */}
            <article className="bg-white p-10 lg:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-8">
                <GraduationCap className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6">Support with adult education programs</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Navigating the bureaucracy of continuing education centers, night schools, and online bridging programs can be overwhelming. We provide hands-on assistance with enrollment processes, financial aid applications, and transcript evaluations.
              </p>
            </article>

            {/* Module 3 */}
            <article className="bg-white p-10 lg:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-8">
                <Briefcase className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6">Skilled trades & alternative paths</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                A four-year degree is not the only path to economic stability. We connect scholars with high-demand, lucrative opportunities in the skilled trades, providing clear information on apprenticeships, Red Seal certification, and college diploma pathways.
              </p>
            </article>

            {/* Module 4 */}
            <article className="bg-white p-10 lg:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-6">Personalized mentorship & planning</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Adults require strategy. We offer 1-on-1 strategic planning sessions that take into account your entire life picture—balancing work schedules, family commitments, and financial realities to create a sustainable roadmap to graduation.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ─── CHAPTER III: THE ENVIRONMENT (Pull Quote) ─── */}
      <section className="py-24 md:py-40 bg-white">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Quote className="w-12 h-12 text-slate-200 mx-auto mb-10 rotate-180" strokeWidth={2} />
            <h2 className="text-3xl md:text-5xl font-serif italic text-slate-900 leading-[1.3] mb-12">
              "We equip youth and adults alike with the knowledge, confidence, and resources they need to succeed academically and professionally."
            </h2>
            <div className="w-24 h-px bg-blue-600 mx-auto mb-6" />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
              {copy.objective}
            </p>
          </div>
        </div>
      </section>

      {/* ─── EPILOGUE: THE CALL TO ACTION ─── */}
      <section className="pt-16 pb-32">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative">
            
            {/* Abstract Background Element */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Your second act <br/> starts here.
              </h2>
              <p className="text-xl text-slate-300 font-medium">
                Whether you are looking to finish high school credits or transition into a new career, our network is ready to support your ambition.
              </p>
              
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/join?role=student"
                  className={`inline-flex h-16 w-full sm:w-auto items-center justify-center gap-4 px-10 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/50 transition-all duration-500 group ${FOCUS_BASE}`}
                >
                  {copy.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
                <Link 
                  href="/contact"
                  className={`inline-flex h-16 w-full sm:w-auto items-center justify-center px-10 bg-transparent border border-slate-700 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-slate-800 transition-all duration-500 ${FOCUS_BASE}`}
                >
                  {copy.ctaSecondary}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </main>
  );
}