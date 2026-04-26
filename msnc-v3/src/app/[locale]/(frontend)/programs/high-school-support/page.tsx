/**
 * MSNC High School Support (Grades 11-12) - Long-Form Editorial
 * Architecture: Swiss Editorial, Narrative Flow, Deep Reading
 * Content: Exact Dictionary items expanded via rich, empathetic storytelling.
 */

import { Metadata } from 'next';
import { Link } from '@/navigation';
import { 
  GraduationCap, ArrowLeft, ArrowRight, 
  UserCheck, MapPin, Compass, BookOpen, Trophy, 
  Quote
} from 'lucide-react';
import { normalizeSiteLocale } from '@/lib/site-copy';

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600';

export const metadata: Metadata = {
  title: 'High School Support (Grades 11-12) | MSNC',
  description: 'Targeted support to help Banyamulenge students transition successfully into post-secondary education through mentorship, tutoring, and application guidance.',
};

export default async function HighSchoolSupportPage({
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
          objective: "L'objectif",
          ctaPrimary: 'Demander un accompagnement',
          ctaSecondary: 'Demander une consultation',
        }
      : {
          back: 'Back to Directory',
          objective: 'The Objective',
          ctaPrimary: 'Apply for Support',
          ctaSecondary: 'Request a Consultation',
        };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white pb-32">
      
      {/* ─── PROLOGUE: EDITORIAL HERO ─── */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-[#FAFAFA] border-b border-slate-200 overflow-hidden">
        
        {/* Typographic Watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[30vw] font-black text-slate-900/[0.03] leading-none pointer-events-none select-none tracking-tighter">
          02
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
                <GraduationCap className="w-3 h-3" /> Post-Secondary Prep
              </span>
              <span className="w-12 h-px bg-slate-300" aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                Grades 11–12
              </span>
            </div>
            
            <h1 className="text-[clamp(3rem,6vw,7rem)] font-black text-slate-900 leading-[0.9] tracking-tighter">
              The Gateway to <br />
              <span className="font-serif italic font-light text-slate-500 tracking-normal">Higher Education.</span>
            </h1>

            <div className="border-l-4 border-blue-600 pl-6 md:pl-10 max-w-4xl mt-12">
              <p className="text-2xl md:text-3xl text-slate-700 font-medium leading-[1.4] tracking-tight">
                We provide targeted support to help students transition successfully into post-secondary education, ensuring no scholar is left behind by administrative blind spots.
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
                The Hidden Curriculum
              </h2>
            </div>

            <div className="lg:col-span-8 max-w-prose text-xl text-slate-600 font-medium leading-[1.8] space-y-8">
              <p>
                <span className="float-left text-7xl font-serif text-slate-900 leading-[0.8] pr-3 pt-1">
                  G
                </span>
                rade 11 is the year that quietly dictates a student's future. For many Banyamulenge families navigating the Canadian system for the first time, the high school credit system can feel like a labyrinth. A single misstep in course selection can inadvertently close the door to a desired university program a year later.
              </p>
              <p>
                Our High School Support program acts as a navigational beacon. We don't just offer homework help; we provide a comprehensive, multi-year roadmap. By pairing students with mentors who have successfully walked this exact path, we demystify the admission process, alleviate financial anxiety through scholarship guidance, and build competitive academic profiles.
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
              The Five Stages <br/> of Transition.
            </h2>
          </div>

          {/* Bento-style staggered grid for the 5 points */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Module 1 */}
            <article className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:col-span-2 lg:col-span-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Tutoring and mentorship</h3>
              <p className="text-slate-600 leading-relaxed font-medium max-w-2xl">
                Academic support paired with dedicated university mentors. We match high school students with seniors who share similar backgrounds, providing both subject-specific tutoring and vital psychological proof that success in higher education is attainable.
              </p>
            </article>

            {/* Module 2 */}
            <article className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-8">
                <MapPin className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Course selection guidance</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Strategic alignment of high school prerequisites with long-term career goals, ensuring students maintain university eligibility without wasting time or credits.
              </p>
            </article>

            {/* Module 3 */}
            <article className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-8">
                <Compass className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Post-secondary planning</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Beyond just picking a major, we help scholars build detailed roadmaps that factor in academic strengths, financial realities, and realistic career trajectories.
              </p>
            </article>

            {/* Module 4 */}
            <article className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-8">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">College and university application support</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Hands-on, line-by-line assistance with OUAC/College portals, personal statements, and navigating the complex landscape of high-value entrance scholarships.
              </p>
            </article>

            {/* Module 5 */}
            <article className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-8">
                <Trophy className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Access to leadership and volunteer opportunities</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Modern admissions require well-rounded citizens. We connect students with community service roles that build the extracurricular profile needed for competitive programs.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ─── CHAPTER III: THE ENVIRONMENT (Pull Quote) ─── */}
      <section className="py-24 md:py-40 bg-white">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Quote className="w-12 h-12 text-blue-200 mx-auto mb-10 rotate-180" strokeWidth={2} />
            <h2 className="text-3xl md:text-5xl font-serif italic text-slate-900 leading-[1.3] mb-12">
              "We equip youth with the knowledge, confidence, and resources they need to succeed academically and professionally."
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
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Secure your <br/> academic future.
              </h2>
              <p className="text-xl text-slate-300 font-medium">
                Enrollment for Grade 11 and 12 cohorts is strictly managed to ensure we can provide deeply personalized, high-quality mentorship to every scholar.
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