import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { 
  ArrowRight, BookOpen, Users, Megaphone, 
  HeartHandshake, Award, Globe2, Wrench 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Our Ecosystem | MSNC',
  description: 'Explore the MSNC journey. From academic grounding to systemic advocacy.',
};

const journeyPhases = [
  {
    phase: "Phase 01: Grounding & Growth",
    description: "Building the foundational skills required to navigate new economic landscapes.",
    programs: [
      {
        id: "01",
        anchor: "pillar-01", // FIXED: Matches your incoming links
        title: "Academic Support",
        desc: "Transforming academic barriers into launchpads through strategic tutoring and resource mapping.",
        icon: BookOpen,
        href: "/programs/academic-support",
        color: "text-blue-600",
        bg: "bg-blue-50"
      },
      {
        id: "02",
        anchor: "pillar-02", // FIXED: Matches the 404 URL
        title: "Technical & Vocational",
        desc: "Facilitating practical, high-demand skills training for immediate pathways to independence.",
        icon: Wrench,
        href: "/programs/technical-vocational",
        color: "text-slate-700",
        bg: "bg-slate-100"
      }
    ]
  },
  {
    phase: "Phase 02: Connection & Culture",
    description: "Weaving a safety net of shared experience and intergenerational wisdom.",
    programs: [
      {
        id: "03",
        anchor: "pillar-03",
        title: "Global Mentorship",
        desc: "Pairing ambitious youth with established Mulenge professionals for 1-on-1 career guidance.",
        icon: Users,
        href: "/programs/mentorship",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
      },
      {
        id: "04",
        anchor: "pillar-04",
        title: "Community Empowerment",
        desc: "Rebuilding a sense of belonging through workshops that ensure youth remain deeply rooted.",
        icon: HeartHandshake,
        href: "/programs/community-empowerment",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
      }
    ]
  },
  {
    phase: "Phase 03: Power & Purpose",
    description: "Equipped and connected, our youth transition from navigating the system to leading it.",
    programs: [
      {
        id: "05",
        anchor: "pillar-05",
        title: "Leadership Pipeline",
        desc: "Equipping the next generation with strategic tools and platforms to lead their communities.",
        icon: Award,
        href: "/programs/leadership",
        color: "text-amber-600",
        bg: "bg-amber-50"
      },
      {
        id: "06",
        anchor: "pillar-06",
        title: "Systemic Advocacy",
        desc: "Dismantling systemic barriers by taking lived experiences directly to global policymakers.",
        icon: Megaphone,
        href: "/programs/advocacy",
        color: "text-red-600",
        bg: "bg-red-50"
      },
      {
        id: "07",
        anchor: "pillar-07",
        title: "Strategic Partnerships",
        desc: "Collaborating with global NGOs and corporations to unlock exclusive scholarships.",
        icon: Globe2,
        href: "/programs/partnerships",
        color: "text-cyan-600",
        bg: "bg-cyan-50"
      }
    ]
  }
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900">
      
      {/* Editorial Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 transform origin-top pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-xs">
                <span className="w-8 h-0.5 bg-red-600" />
                The MSNC Ecosystem
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tight font-display">
                Not Just Programs. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  A Pathway to Power.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg text-slate-600 leading-relaxed font-medium border-l-4 border-red-500 pl-6">
                Our 7 strategic pillars form a holistic ecosystem designed to take youth from survival to systemic leadership.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The Journey */}
      <section className="relative py-24 bg-white">
        <Container>
          <div className="max-w-7xl mx-auto space-y-40">
            {journeyPhases.map((phaseData, phaseIndex) => (
              <div key={phaseIndex} className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                
                {/* HEURISTIC #1: System Status (Sticky Phase Indicator) */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                      {phaseData.phase.split(':')[0]}
                    </h2>
                    <h3 className="text-4xl font-black text-primary font-display leading-tight">
                      {phaseData.phase.split(':')[1]}
                    </h3>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {phaseData.description}
                  </p>
                </div>

                {/* Staggered Cards */}
                <div className="lg:col-span-8 space-y-12">
                  {phaseData.programs.map((program, progIndex) => (
                    <div 
                      key={program.id} 
                      id={program.anchor} // CRITICAL FIX: Resolves the Hash 404
                      className="scroll-mt-32" // Prevents being hidden by the fixed Navbar
                    >
                      <Link 
                        href={program.href}
                        className={cn(
                          "group block relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 hover:border-primary/10 hover:shadow-brand transition-all duration-500 overflow-hidden",
                          progIndex % 2 !== 0 ? 'lg:ml-12' : 'lg:mr-12'
                        )}
                      >
                        <div className="absolute -bottom-10 -right-4 text-[12rem] font-black text-slate-50 leading-none pointer-events-none font-display group-hover:text-slate-100 transition-colors z-0">
                          {program.id}
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-10">
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500", program.bg)}>
                              <program.icon className={cn("w-8 h-8", program.color)} />
                            </div>
                            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
                            </div>
                          </div>

                          <h4 className="text-3xl font-black text-primary mb-4 font-display group-hover:text-secondary transition-colors">
                            {program.title}
                          </h4>
                          <p className="text-lg text-slate-600 leading-relaxed font-medium max-w-lg">
                            {program.desc}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3.5rem] shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 font-display">
              Ready to join the network?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-14 px-10 rounded-full bg-accent text-white font-bold hover:shadow-brand transition-all">
                <Link href="/join">Apply as a Scholar</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/5 font-bold">
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}