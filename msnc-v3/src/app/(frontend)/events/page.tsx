import { fallbackEvents } from '@/lib/fallbacks';
import { Calendar, ArrowRight, Globe, Sparkles, Camera } from "lucide-react";
import { Button } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCachedPayload } from '@/lib/payload';

// 1. Define the Interface to fix 'unknown' type errors
interface MSNCEvent {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  category: string;
  description: string;
  mainImage?: {
    url: string;
  };
  location?: string;
}

export const metadata = {
  title: 'Events & Community Impact | MSNC',
  description: 'Join MSNC workshops, summits, and mentorship sessions across Canada and globally.',
};

export const dynamic = 'force-dynamic';

async function getEventsData(): Promise<MSNCEvent[]> {
  try {
    const payload = await getCachedPayload();
    const { docs } = await payload.find({
      collection: 'events',
      sort: '-eventDate',
    });
    // Cast the Payload docs to our interface
    return docs.length > 0 ? (docs as unknown as MSNCEvent[]) : (fallbackEvents as MSNCEvent[]);
  } catch (error) {
    if ((error as Error)?.message !== 'PAYLOAD_BUILD_SKIP') {
      console.error("Payload Fetch Error [getEventsData]:", error);
    }
    return fallbackEvents as MSNCEvent[];
  }
}

export default async function EventsPage() {
  const allEvents = await getEventsData();
  const now = new Date();

  // 2. Fix the sorting type warnings
  const upcoming = allEvents
    .filter((e) => new Date(e.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    
  const past = allEvents
    .filter((e) => new Date(e.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  return (
    <main className="min-h-screen bg-white selection:bg-secondary/20">
      
      {/* Editorial Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 transform origin-top pointer-events-none" />
        
        <div 
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002147' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} 
        />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black uppercase tracking-[0.2em]">
                <Globe className="w-3.5 h-3.5" />
                Global Engagement 2026
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tighter font-display">
                Events & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Impact.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-xl text-slate-500 leading-relaxed font-medium border-l-4 border-accent pl-6 italic">
                Connecting Mulenge youth across borders to the mentorship and knowledge required to rise.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-24 space-y-40">
        <section id="upcoming" className="relative scroll-mt-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary/40">01. Upcoming Initiatives</h2>
            <div className="h-px flex-grow bg-slate-100" />
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
          </div>

          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 gap-24">
              {upcoming.map((event, idx) => (
                <FeaturedEventCard key={event.id} event={event} index={idx} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="Planning in Progress" 
              message="Our 2026 leadership retreats and summits are being finalized. Check back shortly for registration details." 
            />
          )}
        </section>

        <section id="gallery" className="relative scroll-mt-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary/40">02. Historical Impact</h2>
            <div className="h-px flex-grow bg-slate-100" />
            <Camera className="w-5 h-5 text-slate-300" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {past.slice(0, 6).map((event) => (
              <GalleryCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button variant="outline" className="rounded-full px-12 h-14 font-black uppercase tracking-widest border-2 hover:bg-slate-50 transition-all">
              View Full Archive
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}

// 3. Components updated with MSNCEvent type
function FeaturedEventCard({ event, index }: { event: MSNCEvent; index: number }) {
  const isEven = index % 2 === 0;
  const dateObj = new Date(event.eventDate);

  return (
    <div className={cn(
      "group relative grid lg:grid-cols-12 gap-8 lg:gap-20 items-center",
      !isEven && "lg:flex-row-reverse"
    )}>
      <div className={cn(
        "lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-slate-100 border-8 border-white shadow-brand transition-all duration-700 group-hover:shadow-2xl",
        !isEven && "lg:order-2"
      )}>
        {event.mainImage?.url ? (
          <img 
            src={event.mainImage.url} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-200 font-black text-9xl font-display">MSNC</div>
        )}
      </div>

      <div className={cn("lg:col-span-5 space-y-6", !isEven && "lg:order-1 text-right")}>
        <div className={cn("flex items-center gap-3 text-secondary font-black uppercase tracking-[0.2em] text-[10px]", !isEven && "justify-end")}>
          <Calendar className="w-4 h-4" />
          {dateObj.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        
        <h3 className="text-4xl md:text-5xl font-black text-primary leading-tight font-display group-hover:text-secondary transition-colors">
          {event.title}
        </h3>
        
        <p className="text-slate-500 text-lg leading-relaxed font-medium line-clamp-3">
          {event.description}
        </p>
        
        <Link 
          href={`/events/${event.slug}`}
          className={cn("inline-flex items-center gap-4 group/link pt-4", !isEven && "flex-row-reverse")}
        >
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center group-hover/link:bg-secondary transition-all duration-300 shadow-lg active:scale-95">
            <ArrowRight className={cn("w-6 h-6 transition-transform", isEven ? "group-hover/link:translate-x-1" : "group-hover/link:-translate-x-1 rotate-180")} />
          </div>
          <span className="text-primary font-black uppercase tracking-widest text-[10px]">Join Initiative</span>
        </Link>
      </div>
    </div>
  );
}

function GalleryCard({ event }: { event: MSNCEvent }) {
  return (
    <Link 
      href={`/events/${event.slug}`} 
      className="group block relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {event.mainImage?.url && (
        <img 
          src={event.mainImage.url} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" 
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-2">Past Chapter</p>
        <h3 className="text-xl font-bold text-white leading-snug font-display">{event.title}</h3>
        <div className="mt-4 h-1 w-0 bg-secondary group-hover:w-12 transition-all duration-500" />
      </div>
    </Link>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="py-32 text-center rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200">
      <h3 className="text-3xl font-black text-primary font-display mb-4">{title}</h3>
      <p className="text-slate-400 max-w-sm mx-auto text-sm font-medium leading-relaxed px-6">{message}</p>
      <Button asChild variant="outline" className="mt-8 rounded-full border-2">
        <Link href="/contact">Notify Me of Updates</Link>
      </Button>
    </div>
  );
}
