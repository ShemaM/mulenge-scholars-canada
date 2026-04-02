"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  Handshake, 
  Megaphone, 
  Wrench,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: GraduationCap,
    title: "Academic Support",
    subtitle: "Educational Access",
    description: "Guidance on navigating the Canadian education system, scholarships, and university applications.",
    pillar: "01",
    color: "text-secondary",
    bg: "bg-secondary/5"
  },
  {
    icon: Users,
    title: "Mentorship",
    subtitle: "Career Development",
    description: "Structured mentorship connecting youth with professionals for real-world insights and professional growth.",
    pillar: "02",
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    icon: Award,
    title: "Leadership",
    subtitle: "Purpose-Driven Training",
    description: "Workshops to build communication and decision-making skills for tomorrow's community leaders.",
    pillar: "03",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Globe,
    title: "Global Connection",
    subtitle: "Community Empowerment",
    description: "Fostering meaningful connections globally, creating a sense of belonging for youth in refugee camps.",
    pillar: "04",
    color: "text-cyan-600",
    bg: "bg-cyan-50"
  },
  {
    icon: Handshake,
    title: "Partnerships",
    subtitle: "Strategic Collaboration",
    description: "Building alliances with institutions to expand access to resources, expertise, and opportunities.",
    pillar: "05",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    icon: Megaphone,
    title: "Advocacy",
    subtitle: "Access to Opportunity",
    description: "Amplifying youth voices and addressing systemic barriers to promote equitable access to education.",
    pillar: "06",
    color: "text-accent",
    bg: "bg-accent/5"
  },
  {
    icon: Wrench,
    title: "Technical Skills",
    subtitle: "Vocational Development",
    description: "Job-ready training in construction, IT, and mechanics for immediate self-reliance.",
    pillar: "07",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
];

export default function Services() {
  return (
    <section className="relative py-24 md:py-40 bg-white overflow-hidden">
      
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 transform origin-top pointer-events-none" />

      <div className="container-editorial relative z-10">
        
        {/* Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24 items-start">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Service Index</span>
            </div>
            <h2 className="font-display font-black text-6xl md:text-8xl text-primary leading-[0.9] tracking-tighter">
              A Comprehensive <br />
              <span className="text-secondary italic font-normal">Support Engine.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <p className="text-xl text-primary/70 font-medium leading-relaxed">
              We provide the framework. You provide the ambition. Seven distinct pathways engineered for the Mulenge diaspora.
            </p>
          </div>
        </div>

        {/* Services Index List - High End Magazine Layout */}
        <div className="border-t border-slate-100">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={`/programs#pillar-${service.pillar}`}
              className="group block border-b border-slate-100 py-12 md:py-16 transition-all duration-500 hover:bg-slate-50/50 px-4"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* 01. The Number */}
                <div className="lg:col-span-1">
                   <span className={cn("font-display text-4xl font-black opacity-20 group-hover:opacity-100 transition-all duration-500", service.color)}>
                     {service.pillar}
                   </span>
                </div>

                {/* 02. The Title & Subtitle */}
                <div className="lg:col-span-4">
                   <h3 className="text-3xl font-black text-primary font-display tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                     {service.title}
                   </h3>
                   <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mt-2 block">
                     {service.subtitle}
                   </span>
                </div>

                {/* 03. The Description */}
                <div className="lg:col-span-5">
                  <p className="text-lg text-primary/60 font-medium leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>

                {/* 04. The Icon & Action */}
                <div className="lg:col-span-2 flex justify-end items-center gap-6">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110", service.bg)}>
                    <service.icon className={cn("w-6 h-6", service.color)} />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-slate-200 group-hover:text-primary transition-colors" />
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA - Narrative Break */}
        <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-primary p-12 md:p-16 rounded-[3rem] text-white shadow-brand relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 blur-3xl -mr-20 -mt-20" />
                <h3 className="text-4xl font-black font-display mb-6 text-white">Built for impact.</h3>
                <p className="text-white/70 text-lg font-medium mb-10 leading-relaxed">
                  Join a network that understands your background and is committed to your professional and academic trajectory.
                </p>
                <Link 
                  href="/join"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary hover:text-white transition-all shadow-xl"
                >
                  Apply to Join
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
            
            <div className="space-y-8">
                <h4 className="text-2xl font-black text-primary font-display uppercase tracking-tight">Direct Access</h4>
                <p className="text-lg text-primary/60 font-medium leading-relaxed">
                  Our programs are designed by scholars who have navigated these systems themselves. We don't just provide services; we provide shortcuts to success.
                </p>
                <Link href="/programs" className="group inline-flex items-center gap-4 font-black uppercase tracking-widest text-xs text-primary">
                  Explore Full Pillar Details
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
