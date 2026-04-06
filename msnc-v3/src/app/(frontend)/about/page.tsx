/**
 * MSNC About Page (Light Theme)
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THEME & HCI UPDATE:
 * • 100% Light/Airy aesthetic. No heavy dark backgrounds.
 * • "Heritage Context" gets a premium, editorial Serif treatment.
 * • Challenge, Solution, and Core Values converted to interactive Bento Grids.
 * • Full SEO Metadata + Accessibility attributes included.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { 
  Target, Shield, Users, 
  Star, TrendingUp, Globe, 
  MapPin, BookOpen, Anchor,
  Handshake, ArrowRight, Quote, Sparkles, Compass
} from 'lucide-react';

import Container from '@/components/ui/Container';

// ─── Metadata & SEO ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Our Heritage & Mission | MSNC',
  description: 'MSNC is a youth-led organization founded by Banyamulenge students. We empower refugee youth in Canada and globally through mentorship and academic guidance.',
  keywords: [
    'Banyamulenge', 
    'Mulenge Scholars', 
    'Refugee Youth Mentorship', 
    'Canada Education Pathways', 
    'DRC Highlands Pastoralists',
    'Youth Empowerment'
  ],
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4A90D9]';

// ─── Data ─────────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    title: 'Empowerment',
    icon: TrendingUp,
    badge: 'Agency & Growth',
    description: 'We equip youth with the knowledge, skills, and confidence to achieve their full potential.',
  },
  {
    title: 'Community',
    icon: Users,
    badge: 'Unity in Action',
    description: 'We foster a supportive and inclusive network where every individual feels valued and inspired.',
  },
  {
    title: 'Integrity',
    icon: Shield,
    badge: 'Unwavering Trust',
    description: 'We act with honesty, transparency, and accountability in all that we do.',
  },
  {
    title: 'Collaboration',
    icon: Handshake,
    badge: 'Strategic Alliances',
    description: 'We believe in the power of partnerships and teamwork to create greater impact.',
  },
  {
    title: 'Excellence',
    icon: Star,
    badge: 'High Standards',
    description: 'We strive for continuous growth and high standards in our programs and services.',
  },
  {
    title: 'Resilience',
    icon: Anchor,
    badge: 'Persistent Spirit',
    description: 'We promote perseverance and strength in overcoming challenges and building a better future.',
  }
];

// ─── Page Component ───────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <a href="#about-content" className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#002147] focus:text-white focus:text-sm focus:font-bold ${FOCUS_BASE}`}>
        Skip to content
      </a>

      <main id="about-content" className="min-h-screen bg-white overflow-x-hidden selection:bg-[#4A90D9]/20">
        
        {/* ════════════════════════════════════════════════════════════
            LIGHT HERO SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85svh] flex flex-col justify-end pb-24 overflow-hidden bg-[#F8FAFC]" aria-label="About MSNC">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-60" aria-hidden />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[25vw] font-black text-slate-900/[0.02] leading-none select-none pointer-events-none font-display tracking-tighter" aria-hidden>ABOUT</div>

          <Container className="relative z-10 space-y-10 mt-32">
            <div className="flex items-center gap-3" role="presentation">
              <span className="block w-8 h-px bg-[#4A90D9]" aria-hidden />
              <span className="text-[#4A90D9] font-bold text-[10px] uppercase tracking-[0.35em]">Who We Are</span>
            </div>
            
            <h1 className="text-[clamp(3.5rem,8vw,8.5rem)] font-black text-[#002147] leading-[0.9] tracking-tighter font-display max-w-5xl">
              Youth-Led. <br />
              <em className="not-italic text-[#4A90D9]">Resilient.</em> Empowered.
            </h1>
            
            <div className="max-w-3xl border-l-4 border-[#4A90D9]/30 pl-6 space-y-6">
              <p className="text-xl text-slate-600 font-medium leading-relaxed">
                Mulenge Scholars' Network Canada (MSNC) is a youth-led organization founded by Banyamulenge students who understand firsthand the challenges of navigating new education systems.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#F8FAFC] bg-slate-200 shadow-sm" aria-hidden />
                  ))}
                </div>
                <div className="text-[10px] font-bold text-[#002147] uppercase tracking-[0.2em] leading-tight">
                  Global Network <br/>
                  <span className="text-[#4A90D9]">Of Scholars</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════════════════════════
            HERITAGE CONTEXT (Editorial Chronicle Layout)
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 bg-white relative border-b border-slate-100" aria-labelledby="heritage-heading">
          <Container>
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              
              <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center border bg-[#EEF5FD] border-[#4A90D9]/20 shadow-sm" aria-hidden>
                  <Globe className="w-8 h-8 text-[#4A90D9]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 id="heritage-heading" className="text-4xl lg:text-5xl font-black font-display text-[#002147] leading-tight mb-4">
                    Our Heritage <br/> Context.
                  </h2>
                  <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">
                    The Eastern DRC Highlands
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-12">
                <Quote className="w-16 h-16 text-slate-100 mb-8" aria-hidden />
                <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-display text-[#002147] leading-[1.4] italic font-medium">
                  The Banyamulenge, also known as the Mulenge people, are a community originally from the highlands of eastern Democratic Republic of Congo.
                </p>
                <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                  <p>
                    Their ancestors migrated to this region generations ago, primarily as pastoralists from neighboring areas such as Rwanda and Burundi. 
                  </p>
                  <p>
                    Despite their long history in Congo, many Banyamulenge have faced cycles of displacement due to conflict and instability, leading families to seek refuge in different countries across Africa and beyond.
                  </p>
                  <p className="text-[#4A90D9] font-bold">
                    These experiences of migration and adaptation have shaped a resilient and diverse global community, one that is now growing in Canada.
                  </p>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════════════════════════
            THE CHALLENGE & SOLUTION (Bento Box Grid)
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 bg-[#F8FAFC] relative" aria-label="The Challenge and Our Solution">
          <Container>
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Challenge Card */}
              <article className="p-10 md:p-14 rounded-[3rem] bg-white border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgba(0,33,71,0.06)] transition-all duration-500 flex flex-col group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 bg-slate-50 mb-8 group-hover:bg-[#EEF5FD] group-hover:border-[#4A90D9]/30 transition-colors">
                  <Compass className="w-7 h-7 text-slate-400 group-hover:text-[#4A90D9] transition-colors" />
                </div>
                <h3 className="text-3xl font-black text-[#002147] font-display tracking-tight mb-6">The Challenge</h3>
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                  Many Banyamulenge families arrived in Canada after experiencing displacement and living in multiple countries, each with different education systems. As a result:
                </p>
                <ul className="space-y-4 mt-auto">
                  {[
                    "Students often lack guidance on academic pathways.",
                    "Many struggle to transition into post-secondary education.",
                    "Financial pressures push youth toward short-term jobs.",
                    "Families face unfamiliarity with the Canadian system."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4A90D9] mt-2.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              {/* Solution Card */}
              <article className="p-10 md:p-14 rounded-[3rem] bg-white border border-slate-200 shadow-sm hover:border-[#4A90D9]/40 hover:shadow-[0_8px_30px_rgba(0,33,71,0.06)] transition-all duration-500 flex flex-col group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 bg-slate-50 mb-8 group-hover:bg-[#EEF5FD] group-hover:border-[#4A90D9]/30 transition-colors">
                  <MapPin className="w-7 h-7 text-slate-400 group-hover:text-[#4A90D9] transition-colors" />
                </div>
                <h3 className="text-3xl font-black text-[#002147] font-display tracking-tight mb-6">Our Solution</h3>
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                  We equip youth with the knowledge, confidence, and resources they need to succeed academically and professionally. MSNC bridges these gaps by providing:
                </p>
                <ul className="space-y-4 mt-auto">
                  {[
                    "Mentorship from experienced students and professionals.",
                    "Academic guidance and localized tutoring.",
                    "Post-secondary university application support.",
                    "Career and leadership development opportunities.",
                    "A strong, culturally supportive community network."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4A90D9] mt-2.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════════════════════════
            VISION & MISSION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white border-y border-slate-100">
          <Container>
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-[#EEF5FD] border border-[#4A90D9]/20 rounded-[3.5rem] p-12 md:p-16 relative overflow-hidden group">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/50 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[10px] font-bold uppercase tracking-widest mb-10 text-[#002147] shadow-sm">
                  <Star className="w-3 h-3 text-[#4A90D9]" /> Our Impact Vision
                </div>
                <p className="text-3xl md:text-4xl font-display font-black text-[#002147] leading-tight relative z-10">
                  We envision a future where Banyamulenge youth are confident in their abilities, successful in their academic journeys, established in careers, and leaders who give back.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-[3.5rem] p-12 md:p-16 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,33,71,0.06)] transition-all duration-500">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest mb-10 text-slate-500">
                  <Target className="w-3 h-3 text-slate-400" /> Our Mission
                </div>
                <p className="text-2xl md:text-3xl font-medium text-slate-600 leading-relaxed relative z-10">
                  Dedicated to empowering youth across Canada through mentorship, academic guidance, and leadership development, while fostering a strong sense of community and belonging.
                </p>
              </div>

            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CORE VALUES
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 bg-[#F8FAFC]" aria-labelledby="values-heading">
          <Container>
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 id="values-heading" className="font-display text-5xl md:text-7xl font-black text-[#002147] tracking-tighter">
                Our Core Values.
              </h2>
              <div className="hidden md:block h-px flex-grow bg-slate-200 mx-12 mb-6" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Values 01—06</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_VALUES.map((value, idx) => (
                <article key={idx} className="p-10 rounded-[2.5rem] border border-slate-200 bg-white hover:border-[#4A90D9]/40 hover:shadow-[0_8px_30px_rgba(0,33,71,0.06)] transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-[#EEF5FD] group-hover:border-[#4A90D9]/20 transition-colors">
                    <value.icon className="w-6 h-6 text-slate-400 group-hover:text-[#4A90D9] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-[#002147] mb-2">{value.title}</h3>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#4A90D9] mb-4">
                    {value.badge}
                  </span>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════════════════════════
            LIGHT CTA SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 bg-white relative overflow-hidden border-t border-[#4A90D9]/20" aria-labelledby="cta-heading">
          <div className="absolute inset-0 opacity-[0.3] bg-[radial-gradient(#4A90D9_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden />

          <Container className="relative z-10 text-center space-y-10">
            <div className="max-w-4xl mx-auto space-y-6 bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white shadow-xl shadow-[#4A90D9]/5">
              <p className="font-bold text-[10px] text-[#4A90D9] uppercase tracking-[0.35em] mb-4">Join the Network</p>
              <h2 id="cta-heading" className="text-5xl md:text-7xl font-black text-[#002147] font-display tracking-tight leading-[1.05]">
                Ready to Make <br />
                <em className="not-italic text-[#4A90D9]">An Impact?</em>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
                Students: Join our programs and access mentorship. Partners & Donors: Support our mission globally. Volunteers: Become a mentor and shape the future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6" role="group" aria-label="Ways to get involved">
<Link 
                  href="/join?role=student" 
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#002147] text-white text-sm font-bold hover:bg-[#4A90D9] shadow-lg hover:shadow-xl transition-all duration-300 group ${FOCUS_BASE}`}
                >
                  Students - Join Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
<Link 
                  href="/join?role=partner" 
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-[#002147] text-sm font-bold hover:bg-[#F8FAFC] hover:border-[#002147]/30 shadow-sm transition-all duration-300 group ${FOCUS_BASE}`}
                >
                  Partners & Volunteers
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#4A90D9]" aria-hidden />
                </Link>
              </div>
            </div>
          </Container>
        </section>

      </main>
    </>
  );
}