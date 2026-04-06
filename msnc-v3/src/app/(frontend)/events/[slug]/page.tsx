import { getCachedPayload } from '@/lib/payload';
import Container from '@/components/ui/Container';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getCachedPayload();

  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 2,
  });

  const event = docs[0];
  if (!event) return notFound();

  const imageUrl = typeof event.mainImage === 'object' ? event.mainImage?.url : null;

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <Container>
        <Link href="/events" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Chronicles
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content side */}
          <div className="space-y-8">
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-secondary font-black text-xs uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('en-CA', { dateStyle: 'full' })}
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-primary font-display leading-tight">
                  {event.title}
               </h1>
            </div>

            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="font-bold text-primary">{event.location}</span>
               </div>
            </div>

            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
               {event.description}
            </div>
          </div>

          {/* Image side */}
          <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-brand border-8 border-white sticky top-32">
            <Image 
              src={imageUrl || "https://onwq4czaexzxtq41.public.blob.vercel-storage.com/ILO%20LOGO.png"} 
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </main>
  );
}