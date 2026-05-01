// Dynamic server component
import { ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getPrograms } from "@/lib/payload";
import { Suspense } from 'react';

type PillarType = 'workshops' | 'high-school' | 'adult-learning' | 'rebuilding-futures';

interface ServiceItem {
  id: string;
  pillar: PillarType;
  title: string;
  description?: string;
  tagline?: string;
  index?: string;
}

const dynamicIcons: Record<PillarType, string> = {
  workshops: 'Users',
  'high-school': 'GraduationCap',
  'adult-learning': 'Briefcase',
  'rebuilding-futures': 'Globe',
};

async function getServicesData() {
  const programs = await getPrograms();
  return programs.slice(0,7) as ServiceItem[];
}

export default function Services() {
  return (
    <section className="relative py-24 md:py-40 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 transform origin-top pointer-events-none" />
      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-24 items-start">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Service Index</span>
            </div>
            <h2 className="font-display text-6xl md:text-8xl text-primary leading-none tracking-tighter">
              Comprehensive <br />
              <span className="text-secondary italic font-normal">Support Engine.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <p className="text-xl text-primary/70 font-medium leading-relaxed">
              Dynamic services powered by Programs collection.
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="animate-pulse space-y-8"><div className="h-20 bg-slate-200 rounded-xl" /><div className="h-20 bg-slate-200 rounded-xl" /></div>}>
          <ServicesList />
        </Suspense>
      </div>
    </section>
  );
}

async function ServicesList() {
  const services = await getServicesData();

  return (
    <>
      <div className="border-t border-slate-100 space-y-0">
        {services.map((service, index) => (
          <Link
            key={service.id}
            href={`/programs#${service.pillar}`}
            className="group block border-b border-slate-100 py-12 md:py-16 transition-all duration-500 hover:bg-slate-50/50 px-4"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-1">
                <span className="font-display text-4xl opacity-20 group-hover:opacity-100 transition-all duration-500 text-primary">
                  {service.index || String(index +1).padStart(2,'0')}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-3xl text-primary font-display tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2 block">
                  {service.tagline || 'Pillar Service'}
                </span>
              </div>
              <div className="lg:col-span-5">
                <p className="text-lg text-primary/60 font-medium leading-relaxed max-w-md">
                  {service.description?.slice(0,200)}...
                </p>
              </div>
              <div className="lg:col-span-2 flex justify-end items-center gap-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10">
                  <span className="text-primary font-bold text-sm">{dynamicIcons[service.pillar]}</span>
                </div>
                <ArrowUpRight className="w-6 h-6 text-slate-200 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
