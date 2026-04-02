"use client";
import React from 'react';
import Image from 'next/image';

interface Partner {
  id: string | number;
  name: string;
  logoUrl: string;
}

export default function PartnerMarquee({ partners = [] }: { partners?: Partner[] }) {
  // If no data from Payload, the component stays hidden or uses fallbacks
  if (partners.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-50/50 to-white border-y border-slate-200/60 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-200/60 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">
              Institutional Trust
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Proud Partners & Supporters
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden group">
          <div 
            className="flex animate-marquee whitespace-nowrap gap-16 md:gap-20" 
            style={{ animationDuration: '40s' }}
          >
            {/* Double the array for seamless looping */}
            {[...partners, ...partners].map((partner, i) => (
              <div 
                key={`${partner.id}-${i}`}
                className="flex items-center justify-center min-w-[180px] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
              >
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-14 w-auto object-contain max-w-[200px] filter contrast-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}