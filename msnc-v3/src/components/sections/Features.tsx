"use client";

import { 
  Lightbulb, 
  Users, 
  Shield, 
  Handshake, 
  Trophy, 
  Heart,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Lightbulb,
    title: "Empowerment",
    description: "Equipping Mulenge youth with knowledge, skills, and the radical confidence to redefine their own boundaries.",
    className: "lg:col-span-2 lg:row-span-2 bg-secondary text-white", // Featured Large Card
    iconBg: "bg-white/10",
    accent: "text-secondary",
    descriptionClass: "text-white/80"
  },
  {
    icon: Users,
    title: "Community",
    description: "A borderless, inclusive network where every scholar is seen, valued, and safe.",
    className: "lg:col-span-1 lg:row-span-2 bg-slate-50 border-slate-200", // Tall Card
    iconBg: "bg-primary/10",
    accent: "text-primary",
    descriptionClass: "text-slate-600"
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Honesty and transparency are our non-negotiables.",
    className: "lg:col-span-1 bg-white border-slate-100",
    iconBg: "bg-emerald-50 text-emerald-600",
    accent: "text-emerald-600",
    descriptionClass: "text-slate-600"
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Strength found in collective effort and strategic partnership.",
    className: "lg:col-span-1 bg-white border-slate-100",
    iconBg: "bg-blue-50 text-blue-600",
    accent: "text-blue-600",
    descriptionClass: "text-slate-600"
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "Refusing mediocrity in every academic and professional pursuit.",
    className: "lg:col-span-1 bg-white border-slate-100",
    iconBg: "bg-amber-50 text-amber-600",
    accent: "text-amber-600",
    descriptionClass: "text-slate-600"
  },
  {
    icon: Heart,
    title: "Resilience",
    description: "Adaptability as a superpower for building a better future.",
    className: "lg:col-span-1 bg-white border-slate-100",
    iconBg: "bg-red-50 text-red-600",
    accent: "text-red-600",
    descriptionClass: "text-slate-600"
  },
];

export default function Features() {
  return (
    <section className="relative py-24 md:py-40 bg-white overflow-hidden">
      
      {/* Narrative Header */}
      <div className="container mx-auto px-6 mb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-12 h-px bg-secondary" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-secondary">Our DNA</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.9] tracking-tighter">
              Values Beyond <br />
              <span className="text-primary/70 italic">Intentions.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-4">
            <p className="text-xl text-slate-500 font-medium leading-relaxed border-l-2 border-slate-100 pl-8">
              We don’t just list values; we architect programs around them. These are the non-negotiables that turn potential into leadership.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-6">
          {features.map((item, idx) => (
            <div
              key={item.title}
              className={cn(
                "group relative p-8 rounded-[2.5rem] border transition-all duration-700 overflow-hidden flex flex-col justify-between",
                item.className
              )}
            >
              {/* Background Watermark */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                <item.icon className="w-40 h-40" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                  item.iconBg
                )}>
                  <item.icon className={cn("w-6 h-6", item.accent)} />
                </div>
                
                <div>
                  <h3 className="text-2xl font-black font-display tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className={cn(
                    "text-sm leading-relaxed font-medium",
                    item.descriptionClass
                  )}>
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex justify-end">
                <ArrowUpRight className={cn(
                  "w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all",
                  item.accent
                )} />
              </div>
            </div>
          ))}
        </div>

        {/* The Footer */}
        <div className="mt-24 grid md:grid-cols-2 items-center gap-12 py-12 border-t border-slate-100">
          <div>
            <h4 className="text-2xl font-black text-primary font-display tracking-tight">Deeply Rooted.</h4>
            <p className="text-slate-500 mt-2 font-medium">Every scholarship and mentorship hour is a reflection of these pillars.</p>
          </div>
          <div className="flex md:justify-end">
            <Link 
              href="/about" 
              className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest text-primary"
            >
              <span className="relative">
                Our Full Narrative
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </span>
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}