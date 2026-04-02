import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Target, Shield, Users2, 
  Star, TrendingUp, Globe, 
  MapPin, BookOpen, Anchor,
  Handshake, ArrowRight
} from 'lucide-react';

import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Our Story & Mission | Mulenge Scholars Network Canada',
  description: 'Founded by Mulenge scholars in Canada, we bridge the gap between refugee camps and global opportunities through education and mentorship.',
};

const coreValues = [
  {
    title: 'Empowerment',
    icon: TrendingUp,
    badge: 'Agency & Growth',
    description: 'Equipping Mulenge youth with the knowledge and skills to achieve their absolute potential.',
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary/10',
    borderClass: 'border-secondary/20'
  },
  {
    title: 'Community',
    icon: Users2,
    badge: 'Unity in Action',
    description: 'We believe in the sheer strength of unity. Fostering an inclusive space for lifelong connections.',
    colorClass: 'text-red-500',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-100'
  },
  {
    title: 'Integrity',
    icon: Shield,
    badge: 'Unwavering Trust',
    description: 'Upholding relentless honesty and transparency in every program we deliver.',
    colorClass: 'text-primary',
    bgClass: 'bg-primary/5',
    borderClass: 'border-primary/10'
  },
  {
    title: 'Collaboration',
    icon: Handshake,
    badge: 'Strategic Alliances',
    description: 'Building bridges with global institutions to expand horizons for our scholars.',
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary/10',
    borderClass: 'border-secondary/20'
  },
  {
    title: 'Resilience',
    icon: Anchor,
    badge: 'Persistent Spirit',
    description: 'Turning challenges into stepping stones through unwavering adaptability and grit.',
    colorClass: 'text-red-500',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-100'
  },
  {
    title: 'Excellence',
    icon: Star,
    badge: 'High Standards',
    description: 'Refusing mediocrity in academic pursuits and community leadership roles.',
    colorClass: 'text-primary',
    bgClass: 'bg-primary/5',
    borderClass: 'border-primary/10'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--secondary)_0%,transparent_40%),radial-gradient(circle_at_bottom_left,_#EF4444_0%,transparent_40%)]" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8">
              <Globe className="w-4 h-4 text-secondary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Across Borders</span>
            </div>
            
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-primary leading-[0.85] tracking-tighter mb-10">
              Rooted in <span className="italic text-secondary">Heritage.</span><br/>
              Driven by <span className="text-secondary">Future.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium leading-relaxed border-l-2 border-secondary pl-8 mb-12">
              Founded by Mulenge scholars in Canada, MSNC is a defiant response to the barriers facing our youth. We are architects of opportunity.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-slate-100 shadow-sm" />
                ))}
              </div>
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-tight">
                Global Network <br/>
                <span className="text-secondary font-black">Of Scholars</span>
              </div>
            </div>
          </div>
        </Container>

        <div className="container mx-auto px-6 mt-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky top-32">
              <div className="w-16 h-1 bg-secondary mb-8" />
              <h2 className="font-display text-5xl md:text-6xl font-black text-primary leading-none tracking-tighter mb-8">
                The Gap We <br/>
                <span className="italic text-secondary">Refused to Ignore.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
                MSNC was born from a shared reality. We saw brilliant Mulenge youth struggling to access academic guidance and navigate complex systems alone.
              </p>
              
              <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative">
                <blockquote className="text-2xl text-primary italic font-display font-medium leading-snug">
                  "We connect youth across borders to the network that empowers them to rise."
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              {[
                { 
                  title: 'The Diaspora Challenge', 
                  icon: BookOpen, 
                  color: 'text-secondary', 
                  text: 'For youth arriving in Canada, the education system can feel like an unsolvable maze. We provide the roadmap—demystifying university admissions and networking.' 
                },
                { 
                  title: 'The Camp Reality', 
                  icon: MapPin, 
                  color: 'text-red-500', 
                  text: 'We are deeply aware of the realities in refugee camps. We act as a digital bridge back home, offering the tools required to rise.' 
                }
              ].map((item, idx) => (
                <article key={idx} className="p-12 rounded-[3rem] border border-slate-100 bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform ${item.color}`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-primary tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-xl text-slate-600 font-medium leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <div className="relative h-24 w-full flex items-center overflow-hidden">
        <div className="absolute left-0 w-1/2 h-px bg-slate-100" />
        <div className="mx-auto px-6">
          <Star className="w-6 h-6 text-slate-200" />
        </div>
        <div className="absolute right-0 w-1/2 h-px bg-slate-100" />
      </div>

      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary rounded-[3.5rem] p-12 md:p-16 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest mb-10">
                <Star className="w-3 h-3 text-secondary" /> Our Vision
              </div>
              <p className="text-3xl md:text-4xl font-display font-black leading-tight relative z-10">
                "To build a united community where Mulenge youth discover their absolute potential and grow into global leaders."
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[3.5rem] p-12 md:p-16 relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/5 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-[10px] font-black uppercase tracking-widest mb-10 text-primary">
                <Target className="w-3 h-3 text-red-500" /> Our Mission
              </div>
              <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed relative z-10">
                To support and uplift Mulenge youth globally through rigorous mentorship, academic guidance, and leadership development.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32 bg-white">
        <Container>
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-display text-5xl md:text-7xl font-black text-primary tracking-tighter">
              The Principles <br/>
              <span className="italic text-secondary">We Defend.</span>
            </h2>
            <div className="hidden md:block h-px flex-grow bg-slate-100 mx-12 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Values 01—06</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <article key={idx} className="p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:border-secondary/30 transition-all group">
                <div className={`${value.bgClass} w-14 h-14 rounded-2xl flex items-center justify-center mb-10`}>
                  <value.icon className={`${value.colorClass} w-7 h-7`} />
                </div>
                <h3 className="text-2xl font-black text-primary mb-4">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-32 bg-white">
        <Container>
          <div className="flex items-center justify-center gap-4 mb-20 opacity-20">
            <div className="h-px w-20 bg-primary" />
            <Globe className="w-5 h-5 text-primary" />
            <div className="h-px w-20 bg-primary" />
          </div>

          <div className="bg-primary rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-red-500/10 opacity-30" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-10 tracking-tighter leading-none">
                Ready to Make <br />
                <span className="italic text-secondary">An Impact?</span>
              </h2>
              <p className="text-xl text-white/50 mb-16 font-medium leading-relaxed max-w-2xl mx-auto">
                Whether you are a scholar seeking light or a partner offering strength, we are listening.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/join" 
                  className="px-10 py-5 bg-secondary text-primary font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all shadow-xl shadow-secondary/20"
                >
                  Join the Network
                </Link>
                <Link 
                  href="/contact" 
                  className="px-10 py-5 border border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all"
                >
                  Contact Leadership
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

