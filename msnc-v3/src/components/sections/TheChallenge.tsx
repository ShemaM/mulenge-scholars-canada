import Container from '@/components/ui/Container';
import { Quote } from 'lucide-react';

export default function TheChallenge() {
  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Content Block */}
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-2 text-[#6F4763] font-bold text-[10px] uppercase tracking-[0.35em]">
              <span className="w-8 h-px bg-[#6F4763]" /> 
              The Crisis of Transition
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl font-black text-[#002147] leading-[0.95] tracking-tighter">
              Navigating an <br />
              <span className="italic text-[#4A90D9]">Unknown System.</span>
            </h2>

            <div className="space-y-6 text-xl text-slate-600 font-medium leading-relaxed border-l-4 border-slate-100 pl-8">
              <p>
                Many Banyamulenge families arrived in Canada after experiencing displacement across multiple countries, each with vastly different education systems. 
              </p>
              <p>
                As a result, students often lack guidance on academic pathways, and financial pressures push youth toward short-term survival jobs instead of long-term professional careers.
              </p>
            </div>
          </div>

          {/* Right: The Aesthetic "Board" */}
          <div className="lg:col-span-5 relative">
            <div className="p-12 rounded-[3.5rem] bg-[#FAF7F9] border border-[#6F4763]/10 relative shadow-sm">
              <Quote className="w-16 h-16 text-[#6F4763]/10 absolute top-10 right-10" />
              <p className="text-2xl font-display font-bold text-[#002147] leading-tight italic relative z-10">
                "We understand firsthand the challenges of navigating new education systems because we are those students."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#002147] flex items-center justify-center text-white font-bold text-xs">
                  MSNC
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Founding Principle
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}