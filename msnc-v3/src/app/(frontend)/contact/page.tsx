"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import { Sparkles, ShieldCheck, ArrowRight, MessageSquare, Globe, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Define Types for Editorial Consistency
interface ContactRole {
  title: string;
  email: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const contactRoles: ContactRole[] = [
  { 
    title: "General Inquiries", 
    email: "info@msnc.ca", 
    description: "Questions about our mission, vision, and high-level strategy.",
    icon: MessageSquare,
    color: "text-secondary"
  },
  { 
    title: "Scholarship Programs", 
    email: "scholarships@msnc.ca", 
    description: "Support with active applications and educational requirements.",
    icon: Sparkles,
    color: "text-accent"
  },
  { 
    title: "Partnerships", 
    email: "partnerships@msnc.ca", 
    description: "Collaborate with us to expand our global impact ecosystem.",
    icon: Globe,
    color: "text-primary"
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-secondary/20">
      
      {/* 1. Editorial Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 transform origin-top pointer-events-none" />
        
        {/* Brand Grid Pattern */}
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
              <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full glass border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                  {/* Flag Placeholders to prevent build errors if SVGs missing */}
                  <div className="relative w-5 h-4 rounded-sm overflow-hidden bg-slate-200 border border-slate-100 shadow-sm">
                    <div className="absolute inset-0 bg-red-600 flex items-center justify-center text-[6px] text-white font-bold">CA</div>
                  </div>
                  <div className="relative w-5 h-4 rounded-sm overflow-hidden bg-slate-200 border border-slate-100 shadow-sm">
                    <div className="absolute inset-0 bg-blue-600 flex items-center justify-center text-[6px] text-white font-bold">CD</div>
                  </div>
                </div>
                <div className="h-4 w-px bg-primary/20" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  Direct Access to Leadership
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tighter font-display">
                Bridge the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Connection.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-xl text-slate-500 font-medium leading-relaxed border-l-4 border-accent pl-8 italic">
                Every global initiative starts with a simple dialogue. Whether you are a scholar seeking light or a partner offering strength, we are listening.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Dual-Layer Content Section */}
      <section className="relative py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Direct Channels (Sticky) */}
            <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-primary font-display leading-tight">
                  Targeted <br />
                  <span className="text-secondary italic font-normal underline decoration-secondary/20 underline-offset-8">Response Teams</span>
                </h2>
              </div>

              <div className="space-y-4">
                {contactRoles.map((role, i) => (
                  <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-secondary/30 transition-all duration-500 hover:shadow-brand">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                        <role.icon className={cn("w-6 h-6", role.color)} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-primary mb-2 tracking-tight">{role.title}</h4>
                        <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">{role.description}</p>
                        <a 
                          href={`mailto:${role.email}`} 
                          className="inline-flex items-center gap-2 text-xs font-black text-secondary hover:text-primary transition-colors uppercase tracking-widest"
                        >
                          {role.email}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Humanity Guarantee */}
              <div className="p-8 rounded-[2.5rem] bg-primary text-white shadow-brand relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-black text-lg uppercase tracking-tight">Verified Humanity</div>
                    <div className="text-sm text-white/50 font-medium">No automated queues. Reviewed by our executive board.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-14 rounded-[3rem] border border-slate-100 shadow-brand relative lg:-mt-20">
                <div className="mb-12">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">02. Digital Dispatch</h2>
                  <h3 className="text-4xl font-black text-primary font-display leading-tight">
                    Start the <span className="text-accent italic font-normal">Conversation.</span>
                  </h3>
                </div>
                
                <ContactForm />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 3. Global Reach Visual Separator */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <Container>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-black text-primary font-display tracking-tighter">24H</div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Response Window</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-secondary font-display tracking-tighter">GLOBAL</div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Collaboration Model</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-accent font-display tracking-tighter">BILINGUAL</div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Support Availability</div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}