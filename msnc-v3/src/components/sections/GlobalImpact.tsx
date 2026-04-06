import Container from '@/components/ui/Container';
import { Globe, ShieldCheck, Zap } from 'lucide-react';

const SKILLS = [
  "Construction", "Electrical Work", "Plumbing", 
  "Mechanics", "Heavy Equipment", "Information Technology"
];

export default function GlobalImpact() {
  return (
    <section className="py-24 md:py-40 bg-[#002147] text-white relative overflow-hidden">
      {/* Background Synthesis (Red meets Blue) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4A90D9]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#dc2626]/5 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-[#4A90D9]">
              <Globe className="w-3 h-3" /> Rebuilding Futures
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter">
              Impact Without <br />
              <span className="italic text-[#4A90D9]">Borders.</span>
            </h2>

            <p className="text-xl text-slate-300 font-light leading-relaxed max-w-lg">
              We are committed to supporting Banyamulenge youth living in refugee camps across <span className="text-white font-bold">Kenya, Uganda, and Burundi</span>. We equip them with practical, employable skills for long-term stability.
            </p>

            <div className="flex gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-4xl font-black font-display text-[#4A90D9]">03</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Countries</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-black font-display text-[#4A90D9]">06</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Trades</span>
              </div>
            </div>
          </div>

          {/* Vocational Skill Tags - Not a grid, but a "Cloud" */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
            {SKILLS.map((skill) => (
              <div 
                key={skill} 
                className="px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-[#4A90D9] hover:border-[#4A90D9] transition-all duration-500 group"
              >
                <div className="flex items-center gap-4">
                  <Zap className="w-5 h-5 text-[#4A90D9] group-hover:text-white" />
                  <span className="text-lg font-bold font-display group-hover:text-white">{skill}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}