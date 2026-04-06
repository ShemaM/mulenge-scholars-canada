/**
 * MSNC Dynamic Program Pillar Template
 * ─────────────────────────────────────────────────────────────────────────
 * STRATEGIC ALIGNMENT:
 * • Direct content pull from MSNC PDF.
 * • Context-aware branding (Unity Plum for Adult/Partners, Sky Blue for Workshops).
 * • Hybrid Data: Merges CMS Program data with hard-coded strategic narrative.
 */

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, GraduationCap, Briefcase, Globe, 
  ArrowLeft, ArrowRight, CheckCircle2, Star, 
  Heart, MapPin, Zap, Flame, Shield 
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { getPrograms } from '@/lib/payload';

// ─── Content Mapping (Exact PDF Match) ────────────────────────────────────

const STRATEGIC_CONTENT: Record<string, any> = {
  'workshops': {
    index: '01',
    title: 'Workshops & Community Engagement',
    tagline: 'Cultivating Growth',
    icon: Users,
    color: '#4A90D9',
    bgTint: 'bg-[#EEF5FD]',
    story: 'Creating culturally grounded rooms where questions are welcomed, identities are celebrated, and knowledge flows freely.',
    features: [
      { label: 'Academic Success', desc: 'Exam prep and navigating new education systems.', icon: Star },
      { label: 'Career Networking', desc: 'Industry panels and resume clinics with professionals.', icon: Briefcase },
      { label: 'Student Well-being', desc: 'Mental health resources and peer support circles.', icon: Heart },
    ],
    stat: '300+ Youth Reached'
  },
  'high-school': {
    index: '02',
    title: 'High School Support Program',
    tagline: 'Grades 11 – 12',
    icon: GraduationCap,
    color: '#002147',
    bgTint: 'bg-[#F8FAFC]',
    story: 'Targeted support for Grade 11 & 12 scholars, ensuring a seamless transition to post-secondary education.',
    features: [
      { label: '1-on-1 Tutoring', desc: 'University mentors matched by subject and background.', icon: Users },
      { label: 'Post-Secondary Planning', desc: 'Realistic university roadmaps and course guidance.', icon: MapPin },
      { label: 'Application Help', desc: 'Hands-on assistance with OUAC and scholarships.', icon: CheckCircle2 },
    ],
    stat: '92% Placement Rate'
  },
  'adult-learning': {
    index: '03',
    title: 'Adult Learning & Career Pathways',
    tagline: 'Lifelong Education',
    icon: Briefcase,
    color: '#6F4763', // Unity Plum
    bgTint: 'bg-[#FAF7F9]',
    story: 'Helping adults restart their ambitions through GED completion, trades programs, and career charting.',
    features: [
      { label: 'Prerequisite Guidance', desc: 'Identifying upgrading courses to unlock your path.', icon: Shield },
      { label: 'Skilled Trades', desc: 'Red Seal trades and high-demand certification info.', icon: Zap },
      { label: 'Adult Education', desc: 'Navigating school board programs and night schools.', icon: GraduationCap },
    ],
    stat: '6 Career Sectors'
  },
  'rebuilding-futures': {
    index: '04',
    title: 'Rebuilding Futures Initiative',
    tagline: 'Global Impact',
    icon: Globe,
    color: '#dc2626', // Canadian Red
    bgTint: 'bg-[#FDF0F1]',
    story: 'Delivering vocational training in high-demand trades to youth in refugee camps across East Africa.',
    features: [
      { label: 'Construction', desc: 'Hands-on training in trades that build communities.', icon: Flame },
      { label: 'Technical Skills', desc: 'Electrical work, plumbing, and mechanics.', icon: Zap },
      { label: 'IT Literacy', desc: 'Digital credentials for the modern global economy.', icon: Star },
    ],
    stat: '3 Countries Active'
  }
};

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pillar = STRATEGIC_CONTENT[slug];
  return {
    title: pillar ? `${pillar.title} | MSNC` : 'Program Detail | MSNC',
    description: pillar?.story,
  };
}

// ─── Component ─────────────────────────────────────────────────────────────

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Fetch CMS data for dynamic properties
  const allPrograms = await getPrograms().catch(() => []);
  const cmsProgram = allPrograms.find((p: any) => p.slug === slug);
  
  // 2. Fetch Strategic/Editorial overlay
  const strategic = STRATEGIC_CONTENT[slug];

  if (!strategic && !cmsProgram) notFound();

  const Icon = strategic?.icon || Briefcase;
  const brandColor = strategic?.color || '#002147';

  return (
    <main className="min-h-screen bg-white selection:bg-[#4A90D9]/20">
      
      {/* Editorial Header */}
      <section className={`relative pt-40 pb-24 overflow-hidden ${strategic?.bgTint || 'bg-slate-50'}`}>
        {/* Large Watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[25vw] font-black text-black/[0.02] font-display pointer-events-none select-none">
          {strategic?.index || '00'}
        </div>
        
        <Container className="relative z-10">
          <Link 
            href="/programs" 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#002147] transition-colors mb-12"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Programs
          </Link>
          
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-slate-300" />
              <span className="font-bold text-[10px] uppercase tracking-[0.4em] text-slate-400">
                Strategic Pillar {strategic?.index}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-[#002147] font-display leading-[0.9] tracking-tighter">
              {strategic?.title || cmsProgram?.title}
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl leading-relaxed border-l-4 pl-8" style={{ borderColor: brandColor }}>
              {strategic?.story || cmsProgram?.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Deep Dive Content */}
      <section className="py-24 md:py-40 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: The "Approach" */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 bg-white">
                <Icon className="w-10 h-10" style={{ color: brandColor }} />
              </div>
              <h2 className="text-4xl font-black text-[#002147] font-display tracking-tight">
                Our Strategic <br/> Approach.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                {strategic?.tagline || 'Education Pathways'} — Building sustainable results for our scholars through structured, culturally-aware intervention.
              </p>
              
              {/* Stat Card */}
              <div className="p-8 rounded-[2.5rem] border border-slate-100 bg-[#F8FAFC]">
                <span className="text-4xl font-black font-display tracking-tighter" style={{ color: brandColor }}>
                  {strategic?.stat?.split(' ')[0] || '100%'}
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">
                  {strategic?.stat?.split(' ').slice(1).join(' ') || 'Commitment'}
                </p>
              </div>
            </div>

            {/* Right: Feature Cloud */}
            <div className="lg:col-span-7 space-y-6">
              {(strategic?.features || []).map((feat: any, i: number) => (
                <div key={i} className="group p-10 rounded-[3rem] border border-slate-100 hover:border-slate-200 transition-all bg-white hover:shadow-xl hover:shadow-slate-200/40">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-[#EEF5FD] transition-colors">
                      <feat.icon className="w-5 h-5 text-slate-400 group-hover:text-[#4A90D9]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#002147] font-display mb-2">{feat.label}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Action Call */}
              <div className="pt-12">
                <Link 
                  href="/join"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#002147] text-white font-bold hover:bg-[#4A90D9] transition-all shadow-xl shadow-slate-200 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </section>
      
    </main>
  );
}