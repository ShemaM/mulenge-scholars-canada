import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import { getPrograms } from '@/lib/payload';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProgramItem {
  id: string | number;
  index?: string;
  pillar: 'workshops' | 'high-school' | 'adult-learning' | 'rebuilding-futures';
  title: string;
  description?: string;
  slug?: string;
  color: 'sky' | 'navy' | 'slate' | 'red';
  featuredImage?: { url: string };
  statValue?: string;
  statLabel?: string;
  tagline?: string;
}

export default async function Programs() {
  const data = await getPrograms() as ProgramItem[];

  if (!data || data.length === 0) return null;

  const colors: Record<NonNullable<ProgramItem['color']>, string> = {
    sky: 'border-blue-500 bg-blue-50',
    navy: 'border-indigo-500 bg-indigo-50',
    slate: 'border-slate-500 bg-slate-50',
    red: 'border-red-500 bg-red-50',
  };

  return (
    <section className="py-20 bg-slate-50/50 rounded-3xl">
      <div className="container-editorial mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((program) => {
            const colorClass = colors[program.color];
            return (
              <Card key={program.id} className={`group hover:shadow-xl transition-all border-2 ${colorClass}`}>
                {program.featuredImage && (
                  <Image 
                    src={program.featuredImage.url} 
                    alt={program.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {program.index || program.pillar.slice(0,2).toUpperCase()}
                    </span>
                    {program.tagline && (
                      <span className="text-xs bg-white px-2 py-1 rounded-full text-slate-600 font-medium">
                        {program.tagline}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </CardTitle>
                  {program.description && (
                    <CardDescription className="mt-3 text-lg leading-relaxed">
                      {program.description.slice(0, 120)}...
                    </CardDescription>
                  )}
                  {program.statValue && (
                    <div className="mt-6 p-4 bg-white rounded-2xl">
                      <div className="text-2xl font-black text-gray-900">{program.statValue}</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wide">{program.statLabel}</div>
                    </div>
                  )}
                  <Link 
                    href={`/programs#${program.pillar}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                  >
                    View Pillar Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
