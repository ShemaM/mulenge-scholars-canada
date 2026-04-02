import React from 'react';

interface StatsGridProps {
  settings?: any; // You can replace 'any' with your actual Payload type later
}

export default function StatsGrid({ settings }: StatsGridProps) {
  // 1. Define the impact metrics with fallbacks
  // If the CMS field is empty, it uses the hardcoded editorial values.
  const impactData = [
    {
      label: "Youth Empowered",
      value: settings?.youthEmpowered ?? "500+",
      description: "Direct mentorship and training",
      color: "var(--primary)"
    },
    {
      label: "Success Rate",
      value: settings?.successRate ?? "94%",
      description: "Higher education enrollment",
      color: "var(--secondary)"
    },
    {
      label: "Scholarships Awarded",
      value: settings?.scholarshipsAwarded ?? "42",
      description: "Financial support for scholars",
      color: "var(--accent)"
    },
    {
      label: "Global Partners",
      value: settings?.globalPartners ?? "12",
      description: "Institutional collaborations",
      color: "var(--primary)"
    }
  ];

  return (
    <div className="container-editorial">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {impactData.map((stat, index) => (
          <div 
            key={stat.label}
            className="group relative p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-slate-200 transition-all duration-500 hover:shadow-brand"
          >
            {/* Decorative Icon or Circle */}
            <div 
              className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: stat.color }}
            />

            <div className="space-y-2">
              <h3 className="font-display font-black text-5xl text-primary tracking-tighter">
                {stat.value}
              </h3>
              <p className="font-bold text-sm uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {stat.description}
              </p>
            </div>

            {/* Hover Accent Line */}
            <div 
              className="absolute bottom-0 left-8 right-8 h-1 rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{ backgroundColor: stat.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}