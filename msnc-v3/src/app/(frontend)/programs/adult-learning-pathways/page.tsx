/**
 * MSNC Global Impact: Rebuilding Futures
 * ─────────────────────────────────────────────────────────────────────────
 * ACCESSIBILITY & CONTRAST FIXES:
 * • Background: Deep Navy (#002147).
 * • Primary Text: Pure White (#FFFFFF) for H1 and Body.
 * • Accents: Switched to Luminous Blue (#93C5FD) for visibility on dark BG.
 * • Iconography: High-contrast icons with white/blue split.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Globe, ArrowLeft, ArrowRight, 
  Zap, Flame, Star, ShieldCheck, 
  Construction, Drill, Hammer, Cpu 
} from 'lucide-react';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Rebuilding Futures Initiative | MSNC',
  description: 'Delivering vocational training in high-demand trades to Banyamulenge youth in refugee camps across East Africa.',
};

const TRADES = [
  { title: "Construction", icon: Construction, desc: "Building the foundations of physical community." },
  { title: "Electrical Work", icon: Zap, desc: "Powering the next generation of infrastructure." },
  { title: "Plumbing", icon: Drill, desc: "Essential sanitation and water systems management." },
  { title: "Mechanics", icon: Hammer, desc: "Maintenance and repair of transportation/machinery." },
  { title: "IT Literacy", icon: Cpu, desc: "Digital entry into the modern global economy." },
  { title: "Heavy Equipment", icon: Star, desc: "High-earning operation certifications." }
];

export default function RebuildingFuturesPage() {
  return (
    <div className="min-h-screen bg-[#002147] text-white selection:bg-[#93C5FD]/30">
      
      {/* ════════════════════════════════════════════════════════════
          HIGH-CONTRAST HERO: THE GLOBAL REACH
      ════════════════════════════════════════────────────────────── */}
      <section className="relative pt-40 pb-32 overflow-hidden border-b border-white/10">
        {/* Abstract "Global Network" background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.03] font-display select-none pointer-events-none uppercase">
          Impact
        </div>

        <Container className="relative z-10">
          <Link 
            href="/programs" 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-[#93C5FD] transition-all mb-16"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Framework
          </Link>

          <div className="max-w-6xl space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/20 shadow-lg">
              <Globe className="w-4 h-4 text-[#93C5FD]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#93C5FD]">
                Pillar 04: Kenya · Uganda · Burundi
              </span>
            </div>
            {/* Contrast Fix: Pure white H1 with Luminous Blue accent */}
            <h1 className="text-5xl md:text-8xl font-black text-white font-display leading-[0.95] tracking-tighter">
              Rebuilding <br />
              <em className="not-italic text-[#93C5FD]">Futures.</em>
            </h1>

            <div className="max-w-4xl border-l-4 border-[#93C5FD] pl-8">
              <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed">
                "The crisis did not end at the border. We deliver vocational training in high-demand trades so that wherever youth land next, they land with a future."
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          VOCATIONAL CLOUD: HIGH LEGIBILITY GRID
      ════════════════════════════════════════────────────────────── */}
      <section className="py-24 md:py-40 bg-white text-[#002147]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
             <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight">Skills that Travel.</h2>
             <p className="text-lg text-slate-500 font-medium">
               We focus on vocational trades with universal demand, ensuring scholars in refugee camps gain skills recognized across the continent.
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRADES.map((trade, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-[#F8FAFC] border border-slate-100 hover:border-[#93C5FD] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#002147] transition-colors duration-500">
                  <trade.icon className="w-6 h-6 text-[#002147] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-black font-display mb-4">{trade.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{trade.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          GLOBAL REACH FOOTER: DARK MODE CONTRAST
      ════════════════════════════════════════────────────────────── */}
      <section className="py-24 md:py-32 bg-[#001530] border-t border-white/10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black font-display text-white">Direct Intervention.</h2>
              <div className="space-y-6">
                {[
                  "On-site vocational trainers in regional camps",
                  "Certification recognized by local labor ministries",
                  "Tools and safety equipment provided for all scholars",
                  "Direct pathway to local infrastructure projects"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/70 font-medium">
                    <ShieldCheck className="w-5 h-5 text-[#93C5FD] shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#93C5FD] p-12 md:p-16 rounded-[4rem] text-[#002147]">
              <h3 className="text-3xl font-black font-display mb-6">Support This Initiative</h3>
              <p className="text-lg font-bold mb-10 text-[#002147]/80">
                Your partnership helps us procure training equipment and expand our vocational reach to more youth in need.
              </p>
              <Link 
                href="/donate" 
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#002147] text-white font-bold hover:bg-white hover:text-[#002147] transition-all group"
              >
                Donate to Rebuilding Futures
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}