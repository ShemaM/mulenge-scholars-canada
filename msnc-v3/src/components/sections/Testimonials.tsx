'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export interface TestimonialRecord {
  id: string;
  authorName: string;
  authorRole: string | null;
  institution: string | null;
  location: string | null;
  cohortYear: string | null;
  quote: string;
  imageUrl: string | null;
  journey: string | null;
  stats: any | null;
}

export default function Testimonials({ data }: { data: TestimonialRecord[] }) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  if (!data || data.length === 0) return null;

  const isSingleTestimonial = data.length === 1;

  useEffect(() => {
    if (!isAutoPlaying || isSingleTestimonial) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, data.length, isSingleTestimonial]);

  const next = () => {
    if (isSingleTestimonial) return;
    setCurrent((prev) => (prev + 1) % data.length);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    if (isSingleTestimonial) return;
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = data[current];
  const journeySteps = currentTestimonial.journey ? currentTestimonial.journey.split('→') : [];
  const impactStats = currentTestimonial.stats ? (typeof currentTestimonial.stats === 'string' ? JSON.parse(currentTestimonial.stats) : currentTestimonial.stats) : {};

  return (
    <section className="relative py-32 md:py-40 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
      
      {/* Museum Gallery Lighting Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-b from-slate-100/40 to-transparent blur-3xl" />

      <div className="container-editorial relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-2xl mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-slate-200/60 mb-6">
            <Quote className="w-3 h-3 text-[var(--primary)]" />
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
              Voices from the Network
            </span>
          </div>
          
          <h2 className="font-display font-black text-5xl md:text-7xl text-primary mb-6 tracking-tight leading-[1.05]">
            Real journeys.
            <span className="block bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mt-2">
              Real transformation.
            </span>
          </h2>
        </div>

        {/* Main Quote - Museum Exhibition Style */}
        <div className="max-w-5xl mx-auto mb-20">
          
          {/* Large Quote Display */}
          <div className="relative mb-16">
            <div className="absolute -top-12 -left-4 md:-left-12 opacity-10 pointer-events-none">
              <Quote className="w-32 h-32 text-[var(--primary)] fill-current" />
            </div>
            
            <blockquote 
              key={current}
              className="relative font-display text-4xl md:text-5xl lg:text-6xl font-medium text-primary leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              "{currentTestimonial.quote}"
            </blockquote>
          </div>

          {/* Attribution - Gallery Label Style */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left: Author Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                {currentTestimonial.imageUrl ? (
                  <img 
                    src={currentTestimonial.imageUrl} 
                    alt={currentTestimonial.authorName} 
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                    {currentTestimonial.authorName.charAt(0)}
                  </div>
                )}
                
                <div className="flex-1 pt-1">
                  <div className="font-display text-3xl font-bold text-primary mb-2">
                    {currentTestimonial.authorName}
                  </div>
                  
                  {currentTestimonial.authorRole && (
                    <div className="text-lg text-primary mb-1">
                      {currentTestimonial.authorRole}
                    </div>
                  )}
                  
                  {(currentTestimonial.institution || currentTestimonial.location) && (
                    <div className="text-sm text-slate-500">
                      {[currentTestimonial.institution, currentTestimonial.location].filter(Boolean).join(' • ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Journey Timeline */}
              {journeySteps.length > 0 && (
                <div className="pl-6 border-l-2 border-slate-200 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">
                    Journey
                  </div>
                  {journeySteps.map((step: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-2 flex-shrink-0" />
                      <span className="text-slate-700 leading-relaxed">{step.trim()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Impact Stats */}
            <div className="p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-brand">
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-8">
                Impact Snapshot
              </div>
              
              {Object.keys(impactStats).length > 0 ? (
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(impactStats).map(([key, value]) => (
                    <div key={key}>
                      <div className="font-display text-4xl font-black text-[var(--primary)] mb-2 tracking-tight">
                        {String(value)}
                      </div>
                      <div className="text-xs text-primary font-semibold uppercase tracking-wide">
                        {key.replaceAll('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-primary/90 text-sm py-8 italic">
                  Impact data being verified
                </div>
              )}

              {currentTestimonial.cohortYear && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-primary">
                      Active since <span className="font-bold text-primary">{currentTestimonial.cohortYear}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation - Museum Style */}
        {!isSingleTestimonial && (
          <div className="flex items-center justify-center gap-12 pt-16 border-t border-slate-200/60">
            
            {/* Progress Indicators */}
            <div className="flex items-center gap-3">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`transition-all duration-300 ${
                    index === current 
                      ? 'w-16 h-1.5 rounded-full bg-[var(--primary)]' 
                      : 'w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                  aria-current={index === current ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={prev} 
                className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next} 
                className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
