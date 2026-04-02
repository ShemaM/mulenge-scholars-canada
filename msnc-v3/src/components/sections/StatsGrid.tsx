import React from 'react';
import { cn } from '@/lib/utils';

interface StatsGridProps {
  settings?: {
    youthEmpowered?: string;
    successRate?: string;
    scholarshipsAwarded?: string;
    globalPartners?: string;
  };
}

export default function StatsGrid({ settings }: StatsGridProps) {
  // HEURISTIC #4: Consistency & Standards
  // Centralizing data mapping to ensure UI predictability
  const impactData = [
    {
      label: "Youth Empowered",
      value: settings?.youthEmpowered ?? "500+",
      description: "Direct mentorship and academic training.",
      color: "var(--color-primary)",
      delay: "delay-0",
    },
    {
      label: "Success Rate",
      value: settings?.successRate ?? "94%",
      description: "Enrollment in prestigious higher education.",
      color: "var(--color-secondary)",
      delay: "delay-100",
    },
    {
      label: "Scholarships",
      value: settings?.scholarshipsAwarded ?? "42",
      description: "Financial capital for high-potential scholars.",
      color: "var(--color-accent)",
      delay: "delay-200",
    },
    {
      label: "Global Partners",
      value: settings?.globalPartners ?? "12",
      description: "Strategic institutional collaborations.",
      color: "var(--color-primary)",
      delay: "delay-300",
    }
  ];

  return (
    <section className="container-editorial">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {impactData.map((stat) => (
          <article 
            key={stat.label}
            className={cn(
              "group relative p-10 rounded-3xl bg-white border border-slate-100 transition-all duration-700",
              "hover:border-slate-200 hover:shadow-brand hover:-translate-y-2",
              "animate-in fade-in slide-in-from-bottom-8",
              stat.delay
            )}
          >
            {/* NORMAN'S PRINCIPLE: Signifier (The Brand Mark) */}
            <div className="relative mb-8">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                style={{ backgroundColor: stat.color }}
              />
              <div 
                className="absolute top-0 left-0 w-14 h-14 rounded-2xl border-2 opacity-20 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700"
                style={{ borderColor: stat.color }}
              />
            </div>

            {/* HEURISTIC #8: Aesthetic & Minimalist Design */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-display font-black text-6xl text-primary tracking-tighter leading-none">
                  {stat.value}
                </h3>
                <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </p>
              </div>
              
              <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-[20ch]">
                {stat.description}
              </p>
            </div>

            {/* SHNEIDERMAN #3: Informative Feedback (Interactive Border) */}
            <div 
              className="absolute bottom-0 left-10 right-10 h-1.5 rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              style={{ backgroundColor: stat.color }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}