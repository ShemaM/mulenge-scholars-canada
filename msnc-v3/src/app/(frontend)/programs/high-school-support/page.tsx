/**
 * MSNC High School Support Deep-Dive
 * ─────────────────────────────────────────────────────────────────────────
 * STRATEGIC NARRATIVE:
 * • The Gateway: Framing Grade 11-12 as the pivot point for future success.
 * • The Roadmap: A step-by-step breakdown of the intervention (Tutoring -> Apps).
 * • Professional Trust: Using clean grids and bold checks to signal reliability.
 * • Production: Full SEO Metadata, responsive editorial scales.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { 
  GraduationCap, CheckCircle2, ArrowLeft, 
  ArrowRight, Target, ShieldCheck, 
  MapPin, BookOpen, Sparkles, 
  UserCheck, Milestone, Trophy
} from 'lucide-react';
import Container from '@/components/ui/Container';

// ─── Metadata & SEO ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'High School Support (Grades 11–12) | MSNC',
  description: 'Specialized mentorship and academic planning to help Banyamulenge students successfully transition into Canadian post-secondary education.',
  keywords: ['Grade 11 support', 'University application help Canada', 'Scholarship guidance', 'Banyamulenge students', 'High school mentorship'],
};

const SUPPORT_PILLARS = [
  {
    title: "Tutoring & Mentorship",
    desc: "Academic support paired with university mentors who share similar backgrounds and have successfully navigated the same path.",
    icon: UserCheck
  },
  {
    title: "Course Selection Guidance",
    desc: "Ensuring prerequisite courses align with long-term career goals to avoid delays in university eligibility.",
    icon: MapPin
  },
  {
    title: "Post-Secondary Planning",
    desc: "Detailed roadmaps mapping out the transition from high school to specialized college or university programs.",
    icon: Milestone
  },
  {
    title: "Application Support",
    desc: "Hands-on help with OUAC/College applications, personal statements, and high-value scholarship submissions.",
    icon: Target
  },
  {
    title: "Leadership Pathways",
    desc: "Access to volunteer opportunities that build the extracurricular profile required for competitive admissions.",
    icon: Trophy
  }
];

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#002147]';

export default function HighSchoolSupportPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#002147]/10">
      
      {/* ════════════════════════════════════════════════════════════
          EDITORIAL HERO: THE GATEWAY
      ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#F8FAFC] border-b border-slate-100">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#002147_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[15vw] font-black text-slate-900/[0.02] font-display select-none pointer-events-none">
          GATEWAY
        </div>

        <Container className="relative z-10">
          <Link 
            href="/programs" 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#002147] transition-all mb-16"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Pillars
          </Link>

          <div className="max-w-4xl space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <GraduationCap className="w-4 h-4 text-[#002147]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#002147]">
                Pillar 02: Grades 11 — 12
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-[#002147] font-display leading-[0.95] tracking-tighter">
              The Bridge to <br />
              <em className="not-italic text-slate-400">Higher Ed.</em>
            </h1>

            <div className="max-w-2xl border-l-4 border-[#002147] pl-8">
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                "Grade 11 is the year that quietly determines futures. We provide the targeted support required to ensure every scholar reaches the gate with confidence."
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          THE INTERVENTION: BENTO ROADMAP
      ════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Sticky Context Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
              <div className="w-16 h-16 rounded-[1.25rem] bg-[#002147] flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black font-display text-[#002147] leading-tight">
                Academic <br /> Precision.
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                The Canadian university system is a complex landscape of prerequisites and deadlines. Our intervention is designed to remove the guesswork.
              </p>
              
              <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-[#002147]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#002147]">Success Metric</span>
                </div>
                <div className="text-4xl font-black font-display text-[#002147]">92%</div>
                <p className="text-sm text-slate-500 font-medium mt-1">Post-secondary placement rate for mentored scholars.</p>
              </div>
            </div>

            {/* List of services (PDF Content) */}
            <div className="lg:col-span-8 space-y-4">
              {SUPPORT_PILLARS.map((pillar, i) => (
                <div key={i} className="group p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#002147]/20 transition-all duration-300">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#002147] transition-colors duration-500">
                      <pillar.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#002147] font-display mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ACTION BAR: THE COMMITMENT
      ════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#002147] text-white relative overflow-hidden">
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
              <h2 className="text-4xl md:text-6xl font-black font-display leading-tight">
                Secure your <br /> <span className="italic text-[#4A90D9]">academic future.</span>
              </h2>
              <p className="text-lg text-slate-300 font-medium">
                Enrollment for Grade 11 and 12 cohorts is now open. Space is limited to ensure personalized quality of mentorship.
              </p>
            </div>
            
            <div className="shrink-0 flex flex-col gap-4 w-full md:w-auto">
              <Link 
                href="/join?role=student" 
                className={`inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#4A90D9] text-white font-bold hover:bg-white hover:text-[#002147] transition-all shadow-xl shadow-[#4A90D9]/10 group ${FOCUS_BASE} focus-visible:ring-white`}
              >
                Apply for Support
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}