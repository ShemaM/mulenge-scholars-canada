/**
 * MSNC Global Impact: Rebuilding Futures
 */

import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap, Wrench, Settings, Truck, Code2,
  Globe, GraduationCap,
  ArrowLeft, ShieldCheck, Factory, HardHat
} from 'lucide-react';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Rebuilding Futures | MSNC Global Vocational Training',
  description:
    'Empowering Banyamulenge youth in Kenya, Uganda, and Burundi refugee camps through high-demand vocational training.',
};

const VOCATIONAL_FIELDS = [
  { title: "Construction",        icon: HardHat,  desc: "Framing, infrastructure development, and community rebuilding." },
  { title: "Electrical Work",     icon: Zap,      desc: "Wiring, solar installation, and power system maintenance." },
  { title: "Plumbing",            icon: Wrench,   desc: "Sanitation systems and water facility management." },
  { title: "Mechanics",           icon: Settings, desc: "Vehicle repair and heavy machinery diagnostics." },
  { title: "Equipment Operation", icon: Truck,    desc: "Heavy machinery operation for large-scale development." },
  { title: "Information Tech",    icon: Code2,    desc: "Computer networking and hardware repair for the digital economy." },
];

const FOCUS_BASE =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#93C5FD]';

export default function RebuildingFuturesPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#93C5FD]/30">

      {/* ─── 1. HERO ─── */}
      <section className="relative pt-8 pb-24 overflow-hidden bg-[#002147] text-white">
        {/* Technical Grid Overlay */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] font-display select-none pointer-events-none uppercase"
          aria-hidden="true"
        >
          Impact
        </div>

        <Container className="relative z-10">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-[#93C5FD] transition-all mb-8 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Pillars
          </Link>

          {/* Full-width headline block — no max-w constraint */}
          <div className="w-full">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/20 shadow-lg mb-10">
              <Globe className="w-4 h-4 text-[#93C5FD]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#93C5FD]">
                Kenya · Uganda · Burundi
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[clamp(6rem,12vw,11rem)] font-black leading-[0.85] tracking-tighter font-display mb-10">
              Rebuilding <br />
              <span className="italic text-[#93C5FD]">Futures.</span>
            </h1>

            <div className="max-w-2xl border-l-4 border-[#93C5FD] pl-8 mb-16">
              <p className="text-xl md:text-2xl text-white/80 font-medium leading-tight">
                &ldquo;We deliver vocational training in high-demand trades so that
                wherever these young people land next, they land with a future.&rdquo;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/contact"
                className={`h-16 px-12 inline-flex items-center justify-center rounded-full bg-[#93C5FD] text-[#002147] font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#93C5FD]/10 ${FOCUS_BASE}`}
              >
                Partner With Us
              </Link>
              <Link
                href="/donate"
                className={`h-16 px-12 inline-flex items-center justify-center rounded-full border border-white/20 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all ${FOCUS_BASE}`}
              >
                Support Training
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. MISSION: SELF-RELIANCE ─── */}
      <section className="py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[#002147]">
                <Factory className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Economic Sovereignty
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[#002147] font-display tracking-tight leading-[0.95]">
                From Camps to <br />
                <span className="italic text-slate-400">Self-Reliance.</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed">
                The crisis did not end at the border. Thousands of youth remain
                in refugee camps, waiting for a chance to contribute. We believe
                the best way to support them is to equip them with skills that
                are{' '}
                <strong>portable, practical, and profitable.</strong>
              </p>
            </div>

            {/* Visual placeholder — readable at all sizes */}
            <div className="relative aspect-square rounded-[4rem] overflow-hidden bg-[#002147] border-8 border-white shadow-2xl flex items-center justify-center">
              <div className="text-center space-y-4 px-8">
                <ShieldCheck className="w-20 h-20 text-[#93C5FD] mx-auto" strokeWidth={1} />
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                  Program Photo
                </p>
                <p className="text-white/30 text-xs font-medium">
                  Image coming soon
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 3. THE FIELDS: VOCATIONAL GRID ─── */}
      <section className="py-32 bg-[#F8FAFC]">
        <Container>
          <div className="mb-24 text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-4xl md:text-6xl font-black text-[#002147] font-display tracking-tight">
              High-Demand Trades
            </h3>
            <p className="text-lg text-slate-500 font-medium">
              Training programs designed for immediate employability within
              regional infrastructure and construction sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VOCATIONAL_FIELDS.map((field, idx) => (
              <div
                key={idx}
                className="group bg-white p-12 rounded-[3rem] border border-slate-200 hover:border-[#93C5FD] transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-[#002147] transition-colors duration-500">
                  <field.icon className="w-7 h-7 text-[#002147] group-hover:text-[#93C5FD] transition-colors" />
                </div>
                <h4 className="text-2xl font-black text-[#002147] font-display mb-4 group-hover:text-[#4A90D9] transition-colors">
                  {field.title}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {field.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 4. METRICS ─── */}
      <section className="py-24 border-y border-slate-100">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { val: "03",   label: "Countries Active", desc: "Kenya, Uganda, Burundi" },
              { val: "06",   label: "Trade Sectors",    desc: "Technical focus areas" },
              { val: "100%", label: "Placement Goal",   desc: "Direct route to work" },
            ].map((m, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="text-7xl font-black text-[#002147] font-display leading-none">
                  {m.val}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.4em] text-[#4A90D9]">
                  {m.label}
                </div>
                <p className="text-slate-400 text-sm font-medium">{m.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 5. CTA ─── */}
      <section className="py-32 md:py-48 bg-white overflow-hidden">
        <Container>
          <div className="bg-[#002147] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-1/2 h-full bg-[#93C5FD]/5 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white">
                <GraduationCap className="w-5 h-5 text-[#93C5FD]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Join the Global Mission
                </span>
              </div>

              <h2 className="text-5xl md:text-[5rem] font-black text-white font-display leading-[0.9] tracking-tighter">
                Transform Lives <br />
                <span className="italic text-[#93C5FD]">One Skill at a Time.</span>
              </h2>

              <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                Your partnership allows us to procure high-grade tools, safety
                equipment, and expert trainers to ensure these youth gain
                professional-grade skills.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/donate"
                  className={`h-16 px-12 inline-flex items-center justify-center rounded-full bg-[#93C5FD] text-[#002147] font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl ${FOCUS_BASE}`}
                >
                  Fund Training Programs
                </Link>
                <Link
                  href="/contact"
                  className={`h-16 px-12 inline-flex items-center justify-center rounded-full border border-white/20 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all ${FOCUS_BASE}`}
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}