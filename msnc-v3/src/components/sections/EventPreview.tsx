import React from 'react';
import { Calendar, MapPin, ArrowRight, Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// 1. Updated Interface to match Payload's output
interface EventPreviewProps {
  events?: any[]; 
}

export default function EventPreview({ events = [] }: EventPreviewProps) {
  // If no events are passed, we return the "Stay Tuned" placeholder
  if (!events || events.length === 0) {
    return (
      <section className="py-24 text-center bg-slate-50 rounded-[4rem]">
        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-display font-bold text-primary">No Upcoming Events</h3>
        <p className="text-slate-500">Check back soon for our next gathering.</p>
      </section>
    );
  }

  const featuredEvent = events[0];
  const secondaryEvents = events.slice(1);

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-50/60 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 mb-6">
              <Calendar className="w-3 h-3 text-sky-600" />
              <span className="text-xs font-semibold text-slate-900 uppercase tracking-[0.15em]">
                Upcoming Chapters
              </span>
            </div>
            
            <h2 className="font-display font-black text-5xl md:text-7xl text-slate-900 mb-6 tracking-tight leading-[1.05]">
              Join Our Next
              <span className="block text-sky-600 italic mt-2">Gathering</span>
            </h2>
          </div>

          <Button 
            asChild 
            variant="outline" 
            className="border-2 border-slate-200 hover:border-sky-600 hover:bg-slate-50 rounded-xl font-semibold group self-start lg:self-end"
          >
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Featured Event */}
          {featuredEvent && (
            <div className="lg:row-span-2">
              <Link 
                href={`/events/${featuredEvent.slug}`}
                className="group block h-full"
              >
                <div className="relative h-full min-h-[600px] rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
                  
                  {/* Image/Background logic updated for Payload Media */}
                  {featuredEvent.image?.url ? (
                    <img 
                      src={featuredEvent.image.url} 
                      alt={featuredEvent.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                  <div className="relative h-full flex flex-col justify-end p-10 md:p-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Featured Event
                    </div>

                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredEvent.date).toLocaleDateString('en-US', { 
                        month: 'long', day: 'numeric', year: 'numeric' 
                      })}
                    </div>
                    
                    <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                      {featuredEvent.title}
                    </h3>
                    
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 line-clamp-2">
                      {featuredEvent.description}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">
                      View Details <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary Events */}
          <div className="space-y-6">
            {secondaryEvents.map((event: any, index: number) => (
              <Link 
                key={event.id}
                href={`/events/${event.slug}`}
                className="group block"
              >
                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border-2 border-slate-100 hover:border-sky-500/20 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-sm text-slate-900 font-bold mt-0.5">
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    {event.location?.toLowerCase().includes('virtual') ? (
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Video className="w-5 h-5 text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <h4 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-sky-600 transition-colors">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {/* Placeholder if few events */}
            {events.length < 3 && (
              <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">More Coming Soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}