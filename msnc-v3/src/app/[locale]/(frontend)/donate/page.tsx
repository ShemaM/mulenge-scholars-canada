"use client";

import { useActionState, useEffect } from "react";
import { initiateDonation } from "@/actions/donate";
import { Heart, ShieldCheck, Globe, Zap, ArrowRight, Award, Loader2, ArrowUpRight, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ─── DATA: THE IMPACT TIERS ───
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

// ─── DATA: PAST IMPACT (Track Record) ───
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
  const [state, formAction, isPending] = useActionState(initiateDonation, null);
  const router = useRouter();

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
      if (state.redirectUrl) {
        window.location.href = state.redirectUrl;
        return;
      }
      router.push('/success/donate');
      return;
    }
    toast.error(state.message);
  }, [state, router]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] selection:bg-secondary/20">
      
      {/* ─── 1. THE THESIS: Editorial Hero ─── */}
      <section className="pt-32 pb-24 border-b-4 border-primary animate-in fade-in duration-700 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start w-full">
            {/* Left Column spans 8 columns, no max-width restriction */}
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
            
            {/* Right Column spans 4 columns */}
            <div className="lg:col-span-4 flex flex-col gap-8 lg:pt-12 w-full">
              <a href="#secure-portal" className="inline-flex h-16 w-full items-center justify-between px-8 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-secondary transition-all shadow-xl group">
                <span>Make a Contribution</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-lg text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 pl-6 w-full">
                "We bridge the gap between systemic marginalization and unprecedented academic excellence. Your investment builds the infrastructure of our community."
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. THE TRACK RECORD ─── */}
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

      {/* ─── 3. THE ROADMAP ─── */}
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
                Our upcoming strategic plan requires a robust endowment to scale our operational capacity. This is exactly where your funds will be deployed.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-10 w-full">
              <div className="group border-t-2 border-slate-100 pt-10 w-full">
                <div className="flex flex-col md:flex-row items-start gap-8 w-full">
                  <span className="text-secondary font-black text-3xl tracking-tighter md:w-16">01</span>
                  <div className="flex-1">
                    <h4 className="text-3xl font-bold text-primary uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors w-full">The Global Tech Fellowship</h4>
                    <p className="text-slate-600 font-serif leading-relaxed text-lg w-full">
                      Expanding our software engineering and IT mentorship programs, providing laptops, internet access, and tuition for advanced technical training (e.g., ALX programs) for 50 new scholars.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group border-t-2 border-slate-100 pt-10 w-full">
                <div className="flex flex-col md:flex-row items-start gap-8 w-full">
                  <span className="text-secondary font-black text-3xl tracking-tighter md:w-16">02</span>
                  <div className="flex-1">
                    <h4 className="text-3xl font-bold text-primary uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors w-full">Medical & Translation Aid</h4>
                    <p className="text-slate-600 font-serif leading-relaxed text-lg w-full">
                      Establishing a professional translation consortium to assist community members in navigating medical, legal, and academic institutions in English, French, and Kinyarwanda.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group border-t-2 border-slate-100 pt-10 w-full">
                <div className="flex flex-col md:flex-row items-start gap-8 w-full">
                  <span className="text-secondary font-black text-3xl tracking-tighter md:w-16">03</span>
                  <div className="flex-1">
                    <h4 className="text-3xl font-bold text-primary uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors w-full">Independent Housing Grants</h4>
                    <p className="text-slate-600 font-serif leading-relaxed text-lg w-full">
                      Subsidizing off-campus accommodation transitions for university students to ensure safe, stable environments conducive to high-level academic research and study.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 4. THE IMPACT TIERS ─── */}
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
                Select a tier below to immediately fund our initiatives, or use the secure portal below for custom endowments.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 w-full">
            {impactTiers.map((tier) => (
              <div 
                key={tier.label}
                className={cn(
                  "group relative p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col bg-white w-full",
                  tier.isFeatured 
                    ? "border-2 border-primary shadow-2xl" 
                    : "border border-slate-200 hover:border-slate-300 hover:shadow-xl"
                )}
              >
                {tier.isFeatured && (
                  <div className="absolute top-0 right-10 -translate-y-1/2">
                    <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                      Highest Impact
                    </span>
                  </div>
                )}
                
                <div className="mb-12 w-full">
                  <tier.icon className={cn("w-10 h-10 mb-6", tier.isFeatured ? "text-secondary" : "text-primary")} aria-hidden="true" />
                  <h3 className="text-3xl font-black text-primary tracking-tight mb-4 uppercase w-full">{tier.label}</h3>
                  <p className="text-lg text-slate-600 font-serif italic line-clamp-4 w-full">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-auto text-primary w-full">
                  <div className="flex items-baseline gap-1 mb-8 w-full">
                    <span className="text-3xl font-bold text-slate-400">$</span>
                    <span className="text-7xl font-black tracking-tighter leading-none">{tier.amount}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                      USD
                    </span>
                  </div>

                  <form action={formAction} className="w-full">
                    <input type="hidden" name="amount" value={tier.amount} />
                    <input type="hidden" name="tier" value={tier.label} />
                    <input type="hidden" name="name" value="Anonymous" />
                    <Button 
                      type="submit"
                      disabled={isPending}
                      className={cn(
                        "w-full h-16 rounded-full font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-between px-8",
                        tier.isFeatured 
                          ? "bg-primary text-white hover:bg-secondary" 
                          : "bg-[#FAFAFA] border border-slate-200 text-primary hover:border-primary hover:bg-white"
                      )}
                    >
                      {isPending ? (
                        <div className="w-full flex justify-center"><Loader2 className="w-4 h-4 animate-spin text-current" /></div>
                      ) : (
                        <>
                          <span>Commit ${tier.amount}</span>
                          <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 5. SECURE INSTITUTIONAL PORTAL ─── */}
      <section id="secure-portal" className="py-24 bg-white border-t border-slate-200">
        <Container>
          <div className="bg-[#FAFAFA] rounded-[3rem] overflow-hidden shadow-sm border border-slate-200 w-full">
            <div className="grid lg:grid-cols-2 w-full">
              
              <div className="p-12 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 bg-white w-full">
                <div className="relative z-10 mb-16 w-full">
                  <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tight uppercase mb-8 w-full">
                    Custom <br />
                    <span className="font-serif italic text-secondary lowercase tracking-normal">Endowments.</span>
                  </h2>
                  <p className="text-slate-600 font-serif text-xl italic leading-relaxed w-full">
                    For corporate matching, bespoke legacy endowments, or recurring monthly allocations, utilize our secure terminal below.
                  </p>
                </div>

                <div className="flex flex-col gap-4 items-start w-full">
                  <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 w-full md:w-auto">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    256-Bit Secure Transaction
                  </div>
                  <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 w-full md:w-auto">
                    <Globe className="w-4 h-4 text-secondary" aria-hidden="true" />
                    Official Tax Deductible Receipt
                  </div>
                </div>
              </div>

              <div className="p-12 lg:p-20 flex flex-col justify-center bg-[#FAFAFA] w-full">
                {state?.message && (
                  <div className={cn(
                    "p-6 rounded-xl text-xs font-bold uppercase tracking-wider mb-10 border w-full",
                    state.success ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"
                  )}>
                    {state.message}
                  </div>
                )}

                <form action={formAction} className="space-y-8 w-full">
                  <div className="w-full">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 w-full">
                      Allocation Amount (USD)
                    </label>
                    <div className="relative w-full">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-3xl">$</span>
                      <input 
                        name="amount"
                        type="number" 
                        placeholder="0.00" 
                        min="1"
                        step="0.01"
                        required
                        className="w-full h-24 bg-white rounded-2xl pl-14 pr-6 text-primary font-black text-4xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all placeholder:text-slate-300 border border-slate-200 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 w-full">
                    <div className="w-full">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 w-full">
                        Benefactor Name
                      </label>
                      <Input
                        name="name"
                        placeholder="Optional"
                        className="w-full h-16 rounded-xl bg-white border-slate-200 text-primary placeholder:text-slate-400 px-6 focus:border-secondary/50 shadow-sm text-lg"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 w-full">
                        Receipt Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Optional"
                        className="w-full h-16 rounded-xl bg-white border-slate-200 text-primary placeholder:text-slate-400 px-6 focus:border-secondary/50 shadow-sm text-lg"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isPending}
                    className="w-full h-20 mt-6 bg-primary hover:bg-secondary rounded-xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all shadow-lg flex items-center justify-between px-10"
                  >
                    {isPending ? (
                      <div className="w-full flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
                    ) : (
                      <>
                        <span>Initiate Secure Transfer</span>
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}