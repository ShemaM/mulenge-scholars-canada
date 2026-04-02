import Link from 'next/link';
import { 
  GraduationCap, Users, Award, Globe, 
  Network, ShieldCheck, Wrench, ArrowRight,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 1. Map string names from Payload to actual Lucide components
const ICON_MAP: Record<string, any> = {
  graduation: GraduationCap,
  users: Users,
  award: Award,
  globe: Globe,
  network: Network,
  shield: ShieldCheck,
  wrench: Wrench,
};

// 2. Define the props to match what HomePage passes
interface ProgramsProps {
  items?: any[];
  phase?: string;
}

export default async function Programs({ items = [], phase }: ProgramsProps) {
  // Use the passed items, or filter them if a phase is provided
  const displayPrograms = phase 
    ? items.filter((p) => p.phase === phase) 
    : items;

  if (displayPrograms.length === 0) return null;

  return (
    <section className="relative py-24 md:py-40 bg-white" id="programs">
      
      {/* Background Section Identifier */}
      <div className="absolute top-40 left-0 right-0 text-center pointer-events-none select-none opacity-[0.03]">
        <h2 className="text-[20vw] font-display font-black text-primary leading-none uppercase">
          Ecosystem
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-24">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-12 h-px bg-sky-500" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-sky-600">Strategy</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
              A Roadmap <br />
              <span className="text-slate-500 italic font-bold">to Power.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="text-xl text-slate-600 font-medium leading-relaxed border-l-4 border-amber-400 pl-8">
              We operate through seven strategic pillars, divided into three transformative phases. Every program is a building block for sustainable leadership.
            </p>
          </div>
        </div>

        {/* The Narrative Timeline Grid */}
        <div className="space-y-12">
          {displayPrograms.map((program, index) => {
            // Get the correct icon component based on the string saved in Payload
            const IconComponent = ICON_MAP[program.icon] || Wrench;
            
            return (
              <Link 
                href={`/programs/${program.slug || '#'}`}
                key={program.id || index}
                className="group block"
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  
                  {/* Pillar Meta */}
                  <div className="lg:col-span-2 hidden lg:flex flex-col items-center">
                      <div className="text-7xl font-display font-black opacity-10 transition-opacity group-hover:opacity-30 text-slate-900">
                        0{index + 1}
                      </div>
                      <div className="h-20 w-px bg-slate-100 group-hover:bg-sky-500/20 transition-colors" />
                  </div>

                  {/* Main Card */}
                  <div className="lg:col-span-10">
                    <div className="relative p-8 md:p-12 rounded-[3rem] border-2 border-slate-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-10 items-center hover:border-sky-500/30 hover:shadow-xl bg-white">
                      
                      {/* Icon Section */}
                      <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500 bg-slate-50">
                        <IconComponent className="w-10 h-10 text-sky-600" />
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 space-y-4 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 shadow-sm">
                             Phase: {program.phase}
                           </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 font-display leading-tight group-hover:text-sky-600 transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-3xl">
                          {program.description}
                        </p>
                      </div>

                      {/* Action Arrow */}
                      <div className="w-16 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-500 shrink-0">
                         <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Bridge CTA */}
        <div className="mt-32 p-12 md:p-20 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-white md:text-5xl font-bold font-display leading-tight">
                Not sure where <br />
                <span className="text-sky-400 italic font-normal">to start?</span>
              </h3>
              <p className="text-slate-400 text-lg font-medium max-w-md">
                Our advisors will help you navigate our seven pillars to build a personalized journey that aligns with your specific goals.
              </p>
            </div>
            <div className="flex lg:justify-end">
               <Link 
                href="/contact"
                className="group inline-flex items-center gap-6 px-10 py-6 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-sky-500 hover:text-white transition-all shadow-xl"
              >
                Get Guidance
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}