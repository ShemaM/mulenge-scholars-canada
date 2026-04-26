"use client";

import { Heart, Globe, Zap, ArrowRight, Award, ArrowUpRight, Target, TrendingUp, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const impactTiers = [
  {
    amount: "50",
    label: "Sustain",
    description: "Covers essential academic resources, software licenses, and university application fees for one semester.",
    icon: Zap,
    isFeatured: false,
  },
  {
    amount: "250",
    label: "Empower",
    description: "Funds a dedicated tech mentorship cycle, professional certifications, and housing stipends for a high-potential scholar.",
    icon: Award,
    isFeatured: true,
  },
  {
    amount: "1000",
    label: "Transform",
    description: "Underwrites a full annual tuition scholarship, direct community action project funding, and leadership development.",
    icon: Globe,
    isFeatured: false,
  },
];

const pastImpact = [
  {
    metric: "150+",
    label: "Scholars Mentored",
    description: "Successfully guided youth through academic transitions, advanced tech training, and professional development."
  },
  {
    metric: "12",
    label: "Community Action Projects",
    description: "Funded and executed grassroots initiatives, including climate change mitigation workshops and days of service."
  },
  {
    metric: "100%",
    label: "Direct Allocation",
    description: "Every dollar bypasses overhead, directly funding the academic and professional survival of the Mulenge diaspora."
  }
];

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] selection:bg-secondary/20">

      {/* ─── 1. HERO ─── */}
      <section className="pt-32 pb-24 border-b-4 border-primary animate-in fade-in duration-700 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start w-full">
            <div className="lg:col-span-8 w-full">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/10 text-secondary">
                  <Heart className="w-3 h-3 fill-current" aria-hidden="true" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  The Case for Support
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-primary leading-[0.85] tracking-tighter uppercase mb-8 w-full">
                Fund the <br />
                <span className="font-serif italic text-secondary lowercase tracking-normal">Future.</span>
              </h1>
              <p className="text-2xl md:text-3xl font-serif text-slate-700 leading-snug w-full">
                The Mulenge diaspora possesses immense intellectual capital. We are not asking for charity; we are securing venture capital for our next generation of leaders, engineers, and healers.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8 lg:pt-12 w-full">
              {/* Coming Soon Badge */}
              <div className="inline-flex h-16 w-full items-center justify-between px-8 bg-slate-100 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-full border border-slate-200 cursor-not-allowed">
                <span>Donations Opening Soon</span>
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-lg text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 pl-6 w-full">
                "We bridge the gap between systemic marginalization and unprecedented academic excellence. Your investment builds the infrastructure of our community."
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. TRACK RECORD ─── */}
      <section className="py-24 bg-[#FAFAFA] border-b border-slate-200">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end w-full">
            <div className="lg:col-span-8 w-full">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Proof of Impact
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tight w-full">
                Our Track Record.
              </h3>
            </div>
            <div className="lg:col-span-4 pb-2 w-full">
              <p className="text-slate-500 font-serif italic text-xl leading-relaxed w-full">
                We do not just formulate ideas; we execute them. Here is what the network has achieved to date.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {pastImpact.map((impact, i) => (
              <div key={i} className="p-10 rounded-[2rem] bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 w-full">
                <div className="text-6xl lg:text-7xl font-black text-primary tracking-tighter mb-6">{impact.metric}</div>
                <h4 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4">{impact.label}</h4>
                <p className="text-slate-600 font-serif leading-relaxed text-lg">{impact.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 3. ROADMAP ─── */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start w-full">
            <div className="lg:col-span-5 w-full">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-6 flex items-center gap-2">
                <Target className="w-4 h-4" /> The 2026-2030 Roadmap
              </h2>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter uppercase mb-8 leading-[0.9] w-full">
                Future <br />
                <span className="font-serif italic text-slate-400 lowercase tracking-normal">Initiatives.</span>
              </h3>
              <p className="text-2xl font-serif italic text-slate-600 leading-relaxed w-full">
                Our upcoming strategic plan requires a robust endowment to scale our operational capacity.
              </p>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-10 w-full">
              {[
                { n: '01', title: 'The Global Tech Fellowship', body: 'Expanding our software engineering and IT mentorship programs, providing laptops, internet access, and tuition for advanced technical training for 50 new scholars.' },
                { n: '02', title: 'Medical & Translation Aid', body: 'Establishing a professional translation consortium to assist community members in navigating medical, legal, and academic institutions in English, French, and Kinyarwanda.' },
                { n: '03', title: 'Independent Housing Grants', body: 'Subsidizing off-campus accommodation transitions for university students to ensure safe, stable environments conducive to high-level academic research and study.' },
              ].map(({ n, title, body }) => (
                <div key={n} className="group border-t-2 border-slate-100 pt-10 w-full">
                  <div className="flex flex-col md:flex-row items-start gap-8 w-full">
                    <span className="text-secondary font-black text-3xl tracking-tighter md:w-16">{n}</span>
                    <div className="flex-1">
                      <h4 className="text-3xl font-bold text-primary uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors w-full">{title}</h4>
                      <p className="text-slate-600 font-serif leading-relaxed text-lg w-full">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 4. TIERS — COMING SOON ─── */}
      <section className="py-24 bg-[#FAFAFA]">
        <Container>
          <div className="flex flex-col w-full mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
              Direct Allocation
            </h2>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
              <h3 className="text-5xl lg:text-7xl font-black text-primary uppercase tracking-tight leading-none w-full md:w-1/2">
                Fund the Roadmap.
              </h3>
              <p className="text-slate-500 font-serif italic text-2xl w-full md:w-1/2 md:text-right pb-2">
                Our secure donation portal is currently being configured. Check back soon.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 w-full">
            {impactTiers.map((tier) => (
              <div
                key={tier.label}
                className={cn(
                  "group relative p-10 rounded-[2.5rem] flex flex-col bg-white w-full opacity-60 cursor-not-allowed",
                  tier.isFeatured
                    ? "border-2 border-primary shadow-2xl"
                    : "border border-slate-200"
                )}
              >
                {tier.isFeatured && (
                  <div className="absolute top-0 right-10 -translate-y-1/2">
                    <span className="inline-block px-4 py-1.5 bg-slate-300 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="mb-12 w-full">
                  <tier.icon className="w-10 h-10 mb-6 text-slate-300" aria-hidden="true" />
                  <h3 className="text-3xl font-black text-slate-400 tracking-tight mb-4 uppercase w-full">{tier.label}</h3>
                  <p className="text-lg text-slate-400 font-serif italic line-clamp-4 w-full">{tier.description}</p>
                </div>
                <div className="mt-auto w-full">
                  <div className="flex items-baseline gap-1 mb-8 w-full">
                    <span className="text-3xl font-bold text-slate-300">$</span>
                    <span className="text-7xl font-black tracking-tighter leading-none text-slate-300">{tier.amount}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-2">USD</span>
                  </div>
                  <div className="w-full h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Clock className="w-4 h-4 mr-2" /> Coming Soon
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 5. NOTIFY ME ─── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest mb-8">
              <Clock className="w-3 h-3" /> Donation Portal Opening Soon
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight mb-6">
              Be the First to Know.
            </h2>
            <p className="text-xl font-serif text-slate-600 italic leading-relaxed mb-4">
              Our secure payment portal is being set up. In the meantime, reach out to us directly to discuss how you can support our scholars.
            </p>
            
              href="/contact"
              className="inline-flex items-center gap-3 h-16 px-10 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-secondary transition-all shadow-xl group"
            >
              <span>Contact Us Directly</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Container>
      </section>

    </main>
  );
}
