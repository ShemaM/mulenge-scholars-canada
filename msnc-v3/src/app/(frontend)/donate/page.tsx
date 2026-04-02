"use client";

import { useActionState } from "react";
import { initiateDonation } from "@/actions/donate";
import { Heart, ShieldCheck, Globe, Zap, ArrowRight, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const impactTiers = [
  {
    amount: "50",
    label: "Sustain",
    description: "Covers essential academic resources and application fees for one semester.",
    icon: Zap,
    color: "text-secondary",
    bgColor: "bg-secondary/5",
  },
  {
    amount: "250",
    label: "Empower",
    description: "Funds a dedicated mentorship cycle and professional certification for a high-potential scholar.",
    icon: Award,
    color: "text-accent",
    bgColor: "bg-accent/5",
    isFeatured: true,
  },
  {
    amount: "1000",
    label: "Transform",
    description: "Underwrites a full annual tuition scholarship at an accredited international institution.",
    icon: Globe,
    color: "text-primary",
    bgColor: "bg-primary/5",
  },
];

export default function DonatePage() {
  const [state, formAction, isPending] = useActionState(initiateDonation, null);

  return (
    <main className="min-h-screen bg-white selection:bg-secondary/20">
      
      {/* 1. Impact Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 transform origin-top pointer-events-none" />
        
        <div 
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002147' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} 
        />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                <Heart className="w-3.5 h-3.5 fill-current" />
                The Founders Circle
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tighter font-display">
                Invest in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Excellence.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-xl text-slate-500 leading-relaxed font-medium border-l-4 border-accent pl-6 italic">
                Your contribution is not a gift; it is a strategic investment in the intellectual capital of the Mulenge community.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Impact Tiers */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {impactTiers.map((tier) => (
              <div 
                key={tier.label}
                className={cn(
                  "group p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden",
                  tier.isFeatured 
                    ? "border-secondary bg-white shadow-brand scale-105 z-10" 
                    : "border-slate-100 bg-slate-50 hover:border-secondary/30 hover:bg-white"
                )}
              >
                {tier.isFeatured && (
                  <div className="absolute top-6 right-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Most Impactful</span>
                  </div>
                )}
                
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner", tier.bgColor)}>
                  <tier.icon className={cn("w-8 h-8", tier.color)} />
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="text-4xl font-black text-primary font-display">${tier.amount}</div>
                  <h3 className="text-xl font-black text-primary tracking-tight">{tier.label} Level</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{tier.description}</p>
                </div>

                <form action={formAction}>
                  <input type="hidden" name="amount" value={tier.amount} />
                  <input type="hidden" name="tier" value={tier.label} />
                  <Button 
                    type="submit"
                    disabled={isPending}
                    className={cn(
                      "w-full h-14 rounded-2xl font-black uppercase tracking-widest transition-all",
                      tier.isFeatured ? "bg-secondary hover:bg-primary text-white" : "bg-white border-2 border-slate-100 hover:border-primary text-primary"
                    )}
                  >
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : `Choose ${tier.label}`}
                  </Button>
                </form>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Secure Portal Call to Action */}
      <section className="pb-32">
        <Container>
          <div className="bg-primary p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 blur-[120px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[80px] -ml-20 -mb-20" />

            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black font-display leading-tight">
                  Custom <br />
                  <span className="text-secondary italic font-normal">Endowments.</span>
                </h2>
                <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                  For corporate matching, legacy endowments, or recurring monthly contributions, our executive board is available for direct consultation.
                </p>
                
                {state?.message && (
                  <div className={cn(
                    "p-4 rounded-2xl text-xs font-bold border max-w-md",
                    state.success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                  )}>
                    {state.message}
                  </div>
                )}

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    Tax Deductible
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest">
                    <Zap className="w-4 h-4 text-accent" />
                    Instant Receipt
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/10">
                <h3 className="text-2xl font-black mb-8 font-display">One-time Contribution</h3>
                <form action={formAction} className="space-y-6">
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black text-xl">$</span>
                    <input 
                      name="amount"
                      type="number" 
                      placeholder="Enter custom amount" 
                      required
                      className="w-full h-16 bg-white rounded-2xl pl-12 pr-6 text-primary font-black text-xl focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isPending}
                    className="w-full h-16 bg-accent hover:bg-white hover:text-accent rounded-2xl text-white font-black uppercase tracking-widest transition-all shadow-xl"
                  >
                    {isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="flex items-center">
                        Initiate Transfer <ArrowRight className="ml-2 w-5 h-5" />
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    Secure Processing via Stripe & PayPal
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}