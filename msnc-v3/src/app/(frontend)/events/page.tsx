import { Metadata } from 'next';
import { Calendar, ArrowRight, Sparkles, MapPin, Clock, ChevronRight } from "lucide-react";
import Container from '@/components/ui/Container';
import Link from "next/link";
import Image from "next/image";
import { getCachedPayload } from '@/lib/payload';
import { fallbackEvents } from '@/lib/fallbacks';

// ─── Route Segment Config ─────────────────────────────────────────────────
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Impact Chronicles & Events | MSNC',
  description: 'Documenting the global movement and strategic initiatives of the Mulenge Scholars Network Canada.',
};

// ─── Types & Constants ────────────────────────────────────────────────────
interface MSNCEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  mainImage?: { url: string } | any;
  location?: string;
}

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ─── Data Fetching ────────────────────────────────────────────────────────
async function getEventsData(): Promise<MSNCEvent[]> {
  try {
    const payload = await getCachedPayload();
    if (!payload) return fallbackEvents as MSNCEvent[];

    const { docs } = await payload.find({
      collection: 'events',
      depth: 2,
      overrideAccess: true,
      sort: '-date',
    });

    return docs as unknown as MSNCEvent[];
  } catch (error) {
    console.error("❌ FETCH ERROR:", error);
    return fallbackEvents as MSNCEvent[];
  }
}

// ─── Helper Functions ─────────────────────────────────────────────────────
function formatEventDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString('en-CA', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Date unavailable';
  }
}

function getSafeImageUrl(imageObj: any): string {
  const rawUrl = typeof imageObj === 'object' ? imageObj?.url : null;
  return rawUrl
    ? encodeURI(rawUrl)
    : "https://onwq4czaexzxtq41.public.blob.vercel-storage.com/ILO%20LOGO.png";
}

// ─── Main Page Component ──────────────────────────────────────────────────
export default async function EventsPage() {
  const allEvents = await getEventsData();
  const now = new Date();

  const upcoming = allEvents
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = allEvents
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative flex flex-col min-h-screen bg-white selection:bg-[#4A90D9]/20">

      {/* Skip to Content */}
      <a
        href="#events-content"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#002147] focus:text-white focus:text-sm focus:font-bold ${FOCUS_BASE} focus-visible:ring-[#4A90D9]`}
      >
        Skip to events
      </a>

      <main id="events-content" className="flex-grow overflow-x-hidden">

        {/* ════════════════════════════════════════════════════════════
            LIGHT HERO SECTION
        ════════════════════════════════════════════════════════════ */}
        <section
          className="relative pt-12 md:pt-16 pb-12 md:pb-16 overflow-hidden bg-[#F8FAFC] flex flex-col items-center justify-center text-center"
          aria-label="Events overview"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-60"
            aria-hidden
          />
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[30vw] font-black text-slate-900/[0.02] leading-none select-none pointer-events-none font-display tracking-tighter"
            aria-hidden
          >
            EVENTS
          </div>

          <Container className="relative z-10 space-y-10 mt-32">
            <div className="flex items-center gap-3" role="presentation">
              <span className="block w-8 h-px bg-[#4A90D9]" aria-hidden />
              <span className="text-[#4A90D9] font-bold text-[10px] uppercase tracking-[0.35em]">
                Strategic Initiatives
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,8vw,8.5rem)] font-black text-[#002147] leading-[0.9] tracking-tighter font-display max-w-5xl">
              Impact <br />
              <em className="not-italic text-[#4A90D9]">Chronicles.</em>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl font-medium leading-relaxed border-l-4 border-[#4A90D9]/30 pl-6">
              Documenting the global movement of Mulenge scholars across borders,
              disciplines, and leadership summits.
            </p>

            <nav aria-label="Jump to section" className="pt-4">
              <ul className="flex flex-wrap gap-3" role="list">
                <li>
                  <a
                    href="#upcoming"
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#4A90D9]/50 hover:bg-[#EEF5FD] text-slate-600 hover:text-[#002147] shadow-sm transition-all duration-200 ${FOCUS_BASE} focus-visible:ring-[#4A90D9]`}
                  >
                    <span className="font-bold text-[10px] text-[#4A90D9] tracking-widest">01</span>
                    <span className="text-xs font-bold">Active Missions</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#4A90D9] transition-colors" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href="#archive"
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#4A90D9]/50 hover:bg-[#EEF5FD] text-slate-600 hover:text-[#002147] shadow-sm transition-all duration-200 ${FOCUS_BASE} focus-visible:ring-[#4A90D9]`}
                  >
                    <span className="font-bold text-[10px] text-[#4A90D9] tracking-widest">02</span>
                    <span className="text-xs font-bold">Historical Legacy</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#4A90D9] transition-colors" aria-hidden />
                  </a>
                </li>
              </ul>
            </nav>
          </Container>
        </section>

        {/* ════════════════════════════════════════════════════════════
            ACTIVE MISSIONS (UPCOMING)
        ════════════════════════════════════════════════════════════ */}
        <section id="upcoming" className="relative py-32 bg-white">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

              <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                <div
                  className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center border bg-[#EEF5FD] border-[#4A90D9]/20 shadow-sm"
                  aria-hidden
                >
                  <Sparkles className="w-8 h-8 text-[#4A90D9]" strokeWidth={1.5} aria-hidden />
                </div>
                <div>
                  <h2 className="text-4xl lg:text-5xl font-black font-display text-[#002147] leading-tight mb-4">
                    Active <br /> Missions.
                  </h2>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    The summits, dialogues, and workshops currently being planned
                    and executed by the Executive Board.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8">
                {upcoming.length > 0 ? (
                  <div className="grid gap-8">
                    {upcoming.map((event, idx) => (
                      <FeaturedEventCard key={event.id} event={event} index={idx} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center rounded-[2.5rem] bg-[#F8FAFC] border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-5 h-5 text-slate-400" aria-hidden />
                    </div>
                    <h3 className="text-xl font-black text-[#002147] mb-2 font-display">
                      Summit Pending
                    </h3>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">
                      The next major initiative is currently being finalized. Check back soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* ════════════════════════════════════════════════════════════
            HISTORICAL LEGACY (ARCHIVE)
        ════════════════════════════════════════════════════════════ */}
        <section id="archive" className="relative py-32 bg-[#F8FAFC] border-t border-slate-200">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3" role="presentation">
                  <span className="block w-6 h-px bg-slate-400" aria-hidden />
                  <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.35em]">
                    The Archive
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black font-display text-[#002147] leading-tight">
                  Historical Legacy.
                </h2>
              </div>
              <p className="text-slate-500 font-medium max-w-md">
                A repository of past summits, community engagements, and global
                dialogues that have shaped our foundation.
              </p>
            </div>

            {past.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {past.map((event) => (
                  <PastEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-slate-400 font-medium italic">
                No historical events found in the database.
              </p>
            )}
          </Container>
        </section>

      </main>
    </div>
  );
}

// ─── Sub-Components ───────────────────────────────────────────────────────

function FeaturedEventCard({ event, index }: { event: MSNCEvent; index: number }) {
  const safeUrl = getSafeImageUrl(event.mainImage);

  return (
    <div className="group relative bg-white rounded-[2.5rem] border border-slate-200 hover:border-[#4A90D9]/40 overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,33,71,0.06)] transition-all duration-300">
      <div className="grid sm:grid-cols-12 items-stretch">

        <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-100">
          <Image
            src={safeUrl}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
          {event.location && (
            <div className="absolute bottom-4 left-4 right-4 lg:right-auto">
              <div className="px-4 py-2 bg-white/95 backdrop-blur shadow-sm rounded-xl text-[10px] font-bold text-[#002147] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#4A90D9]" aria-hidden />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          )}
        </div>

        <div className="sm:col-span-7 p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[#4A90D9] font-bold text-[10px] uppercase tracking-widest mb-4">
            <Clock className="w-3 h-3" aria-hidden />
            {formatEventDate(event.date)}
          </div>

          <h3 className="text-3xl lg:text-4xl font-black text-[#002147] font-display leading-[1.1] mb-4">
            {event.title}
          </h3>

          <p className="text-slate-600 font-medium leading-relaxed line-clamp-3 mb-8">
            {event.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Initiative 0{index + 1}
            </span>
            <Link
              href={`/events/${event.slug}`}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EEF5FD] text-[#002147] text-xs font-bold hover:bg-[#002147] hover:text-white transition-all duration-300 ${FOCUS_BASE} focus-visible:ring-[#4A90D9]`}
              aria-label={`View full details for ${event.title}`}
            >
              Full Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function PastEventCard({ event }: { event: MSNCEvent }) {
  const safeUrl = getSafeImageUrl(event.mainImage);

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group flex flex-col bg-white rounded-[2rem] border border-slate-200 hover:border-[#4A90D9]/30 overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,33,71,0.06)] transition-all duration-300 ${FOCUS_BASE} focus-visible:ring-[#4A90D9]`}
      aria-label={`View historical event: ${event.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
        <Image
          src={safeUrl}
          alt={event.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          unoptimized
        />
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 bg-white/95 backdrop-blur rounded-lg shadow-sm text-[10px] font-bold text-[#002147] uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-slate-400" aria-hidden />
            {new Date(event.date).getFullYear()}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h4 className="text-xl font-black text-[#002147] font-display leading-tight mb-2 group-hover:text-[#4A90D9] transition-colors">
          {event.title}
        </h4>
        <p className="text-sm text-slate-500 font-medium line-clamp-2 mt-auto pt-4">
          {event.location || "Global Archive"}
        </p>
      </div>
    </Link>
  );
}