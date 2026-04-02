import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, Users, Megaphone, HeartHandshake, Award, Globe2, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Ecosystem | Mulenge Scholars Network Canada',
  description: 'Explore the MSNC journey. From academic grounding to systemic advocacy, discover our holistic approach to empowering Mulenge youth.',
};

// Grouping the 7 pillars into a narrative journey
const journeyPhases = [
  {
    phase: "Phase 01: Grounding & Growth",
    description: "Building the foundational skills and knowledge required to navigate and succeed in new educational and economic landscapes.",
    programs: [
      {
        id: "01",
        title: "Academic Support",
        desc: "Navigating a new education system is daunting. We provide the crucial tutoring, resource mapping, and strategic guidance Mulenge youth need to transform academic barriers into launchpads.",
        icon: BookOpen,
        href: "/programs/academic-support",
        color: "text-blue-600",
        border: "border-blue-200",
        bg: "bg-blue-50"
      },
      {
        id: "02",
        title: "Technical & Vocational",
        desc: "University isn't the only path to power. We facilitate practical, high-demand skills training and certifications to create immediate, sustainable pathways to employment and independence.",
        icon: Wrench,
        href: "/programs/technical-vocational",
        color: "text-slate-700",
        border: "border-slate-300",
        bg: "bg-slate-100"
      }
    ]
  },
  {
    phase: "Phase 02: Connection & Culture",
    description: "No scholar succeeds in isolation. We weave a safety net of shared experience, mutual support, and intergenerational wisdom.",
    programs: [
      {
        id: "03",
        title: "Global Mentorship",
        desc: "We pair ambitious youth with established Mulenge professionals. It's more than career advice; it's a 1-on-1 relationship proving that success is possible because someone who looks like you has already achieved it.",
        icon: Users,
        href: "/programs/mentorship",
        color: "text-indigo-600",
        border: "border-indigo-200",
        bg: "bg-indigo-50"
      },
      {
        id: "04",
        title: "Community Empowerment",
        desc: "Displacement often fragments identity. Our community workshops and cultural programs rebuild that profound sense of belonging, ensuring our youth remain deeply rooted while reaching globally.",
        icon: HeartHandshake,
        href: "/programs/community-empowerment",
        color: "text-emerald-600",
        border: "border-emerald-200",
        bg: "bg-emerald-50"
      }
    ]
  },
  {
    phase: "Phase 03: Power & Purpose",
    description: "Equipped and connected, our youth transition from navigating the system to leading and changing it.",
    programs: [
      {
        id: "05",
        title: "Leadership Pipeline",
        desc: "We don't just find leaders; we forge them. This program equips the next generation with the strategic tools, confidence, and platforms to take charge of their communities' futures.",
        icon: Award,
        href: "/programs/leadership",
        color: "text-amber-600",
        border: "border-amber-200",
        bg: "bg-amber-50"
      },
      {
        id: "06",
        title: "Systemic Advocacy",
        desc: "We refuse to accept the status quo. Our advocacy arm champions educational equity, taking the lived experiences of refugee youth directly to the policymakers capable of dismantling systemic barriers.",
        icon: Megaphone,
        href: "/programs/advocacy",
        color: "text-red-600",
        border: "border-red-200",
        bg: "bg-red-50"
      },
      {
        id: "07",
        title: "Strategic Partnerships",
        desc: "Multiplying our impact by collaborating with universities, global NGOs, and corporations to unlock exclusive scholarships, internships, and resources for the MSNC network.",
        icon: Globe2,
        href: "/programs/partnerships",
        color: "text-cyan-600",
        border: "border-cyan-200",
        bg: "bg-cyan-50"
      }
    ]
  }
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900">
      
      {/* Editorial Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 transform origin-top pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-sm">
                <span className="w-8 h-0.5 bg-red-600" />
                The MSNC Ecosystem
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#002147] leading-[1.05] tracking-tight font-display">
                Not Just Programs. <br />
                <span className="text-transparent bg-clip-text text-transparent bg-gradient-to-r from-[#002147] to-blue-600">
                  A Pathway to Power.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-xl text-primary leading-relaxed font-medium border-l-4 border-red-500 pl-6">
                We don't believe in isolated solutions. Our 7 strategic pillars form a holistic ecosystem designed to take Mulenge youth from survival to systemic leadership.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The Journey Section - Asymmetrical & Sticky */}
      <section className="relative py-24 bg-white">
        <Container>
          <div className="max-w-7xl mx-auto space-y-32">
            
            {journeyPhases.map((phaseData, phaseIndex) => (
              <div key={phaseIndex} className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                
                {/* Sticky Phase Header (Left Column) */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6 z-10">
                  <h2 className="text-sm font-black text-primary/90 uppercase tracking-[0.2em]">
                    {phaseData.phase.split(':')[0]}
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-black text-[#002147] font-display leading-tight">
                    {phaseData.phase.split(':')[1]}
                  </h3>
                  <p className="text-lg text-primary leading-relaxed">
                    {phaseData.description}
                  </p>
                </div>

                {/* Staggered Program Cards (Right Column) */}
                <div className="lg:col-span-8 space-y-8 md:space-y-12">
                  {phaseData.programs.map((program, progIndex) => (
                    <Link 
                      key={program.id}
                      href={program.href}
                      className={`group block relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 hover:border-[#002147]/20 hover:shadow-2xl hover:shadow-[#002147]/5 transition-all duration-500 overflow-hidden ${
                        // Stagger effect for even items on desktop
                        progIndex % 2 !== 0 ? 'lg:ml-12' : 'lg:mr-12'
                      }`}
                    >
                      {/* Giant background number watermark */}
                      <div className="absolute -bottom-10 -right-4 text-[10rem] md:text-[14rem] font-black text-slate-50 leading-none pointer-events-none font-display group-hover:text-slate-100 transition-colors duration-500 z-0">
                        {program.id}
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-8">
                          <div className={`w-16 h-16 rounded-2xl ${program.bg} flex items-center justify-center border border-white shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                            <program.icon className={`w-8 h-8 ${program.color}`} />
                          </div>
                          <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#002147] group-hover:border-[#002147] transition-colors duration-300">
                            <ArrowRight className="w-5 h-5 text-primary/90 group-hover:text-white transition-colors" />
                          </div>
                        </div>

                        <h4 className="text-3xl font-black text-[#002147] mb-4 font-display group-hover:text-blue-700 transition-colors">
                          {program.title}
                        </h4>
                        
                        <p className="text-lg text-primary leading-relaxed font-medium max-w-lg">
                          {program.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </Container>
      </section>

      {/* Immersive CTA Section */}
      <section className="relative py-32 bg-[#002147] overflow-hidden">
        {/* SVG Pattern Background from Hero */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-[#001530]/50 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-display leading-tight">
              Ready to take your place in the network?
            </h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto font-medium">
              Whether you are a student looking for guidance, a professional ready to mentor, or a partner wanting to fund the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-14 px-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg shadow-xl shadow-red-600/20 hover:-translate-y-1 transition-all">
                <Link href="/join">Apply as a Scholar</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-full border-2 border-white/20 hover:border-white text-white hover:bg-white/5 font-bold text-lg transition-all">
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
