import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const PILLARS = [
  {
    id: "01",
    title: "Workshops & Community",
    tagline: "Cultivating Academic & Social Success",
    link: "/programs#workshops",
    desc: "Interactive sessions focused on Academic Success, Career Development, and Student Life. We create culturally grounded spaces where youth learn, network, and grow together."
  },
  {
    id: "02",
    title: "High School Support",
    tagline: "Bridging the Gap for Grades 11-12",
    link: "/programs#high-school",
    desc: "Targeted 1-on-1 support ensuring no scholar is left behind. From course selection to post-secondary applications, we guide students through the complexities of the system."
  },
  {
    id: "03",
    title: "Adult Learning Pathways",
    tagline: "Lifelong Education & Trades",
    link: "/programs#adult-learning",
    desc: "Education doesn't stop at high school. We actively support adult learners transitioning into high-demand skilled trades or upgrading their educational prerequisites."
  }
];

export default function StrategicPillars() {
  return (
    <section className="py-24 md:py-40 bg-white border-y border-slate-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[#6F4763] font-bold text-[10px] uppercase tracking-[0.35em] mb-6">
              <span className="w-8 h-px bg-[#6F4763]" /> Core Framework
            </span>
            <h2 className="text-[#002147] tracking-tighter">
              Strategic Pillars.
            </h2>
          </div>
          <p className="max-w-sm text-lg text-slate-500 font-medium pb-2">
            Equipping youth with the knowledge, confidence, and resources to succeed globally.
          </p>
        </div>

        <div className="border-t-2 border-[#002147]">
          {PILLARS.map((pillar) => (
            <Link 
              key={pillar.id} 
              href={pillar.link}
              className="group block border-b border-slate-200 hover:border-[#002147] transition-colors duration-500 py-12 md:py-16 relative overflow-hidden"
            >
              {/* Animated Background Wash */}
              <div className="absolute inset-0 bg-[#FAF7F9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              
              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-1">
                  <span className="text-2xl font-mono font-bold text-slate-300 group-hover:text-[#6F4763] transition-colors duration-500">
                    {pillar.id}
                  </span>
                </div>
                
                <div className="md:col-span-6">
                  <h3 className="text-[#002147] group-hover:-translate-y-1 transition-transform duration-500">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A90D9] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {pillar.tagline}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <p className="text-slate-500 font-medium leading-relaxed group-hover:text-[#002147] transition-colors duration-500">
                    {pillar.desc}
                  </p>
                </div>
                
                <div className="md:col-span-1 flex justify-end">
                  <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#002147] group-hover:border-[#002147] transition-colors duration-500">
                    <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}