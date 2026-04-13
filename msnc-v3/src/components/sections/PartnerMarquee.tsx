"use client";
import React from 'react';

interface Partner {
  id: string | number;
  name: string;
  logoUrl: string;
}

export default function PartnerMarquee({ partners = [] }: { partners?: Partner[] }) {

  if (partners.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200 border-b overflow-hidden transition-all duration-500">
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 mb-12 md:mb-16">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
            Our Network
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
            Trusted By Global Institutions
          </h3>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden [--marquee-duration:60s]">
          <div 
            className="flex animate-marquee whitespace-nowrap gap-20" 
            style={{ '--marquee-duration': '60s' } as React.CSSProperties}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={`${partner.id}-${i}`}
                className="flex items-center justify-center min-w-[200px] p-8 opacity-50 group hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer ${FOCUS_BASE}"
              >
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-16 w-auto object-contain max-h-20 max-w-[220px] filter grayscale-[50%] group-hover:grayscale-0 group-hover:contrast-110 group-hover:drop-shadow-lg transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pause on hover */}
        <div className="absolute inset-0 group-hover:pause-marquee pointer-events-none" />

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee var(--marquee-duration, 60s) linear infinite;
        }
        .pause-marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

