/**
 * MSNC Leadership Gallery (Production-Ready + SEO Optimized)
 * ─────────────────────────────────────────────────────────────────────────
 * FEATURES:
 * • JSON-LD Structured Data: Helps Google recognize the Executive Board.
 * • Dynamic Metadata: Standardized for social sharing and search ranking.
 * • Editorial Storytelling: High-end typography and asymmetric layouts.
 * • Lexical Extraction: Safely renders RichText previews.
 */

import { Mail, Globe, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getCachedPayload } from "@/lib/payload";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { LinkedInIcon } from "@/components/ui/SocialIcons";

// --- 1. SEARCH ENGINE OPTIMIZATION (Static) ---
export const metadata: Metadata = {
  title: "Leadership & Executive Board | MSNC",
  description: "Meet the architects of resilience. Our multidisciplinary leadership team bridges the gap between Mulenge potential and global opportunity through strategic stewardship.",
  openGraph: {
    title: "MSNC Leadership: Architects of Resilience",
    description: "The executive board leading diaspora excellence and academic transformation.",
    images: [{ url: "/images/og-leadership.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSNC Leadership",
    description: "Guiding the next generation of Mulenge scholars.",
  }
};

export const dynamic = 'force-dynamic';

interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  pillar: string;
  bio: any; 
  email?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  image?: { url: string };
  slug?: string;
}

// --- 2. DATA ORCHESTRATION ---
function getBioPreview(bio: any): string {
  if (typeof bio === 'string') return bio;
  if (!bio || !bio.root) return "The story of impact is being written...";
  try {
    const firstParagraph = bio.root.children.find((child: any) => child.type === 'paragraph');
    if (!firstParagraph || !firstParagraph.children) return "Explore the journey to learn more.";
    return firstParagraph.children.map((node: any) => node.text || "").join("") || "Explore the journey.";
  } catch (e) {
    return "Explore the journey to learn more.";
  }
}

async function getTeamData(): Promise<LeadershipMember[]> {
  try {
    const payload = await getCachedPayload();
    const { docs } = await payload.find({
      collection: 'leadership',
      sort: 'order',
    });
    return docs as unknown as LeadershipMember[];
  } catch (error) {
    return []; 
  }
}

export default async function LeadershipPage() {
  const team = await getTeamData();

  // --- 3. STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": team.map((member, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "url": `https://msnc.ca/leadership/${member.slug}`,
        "worksFor": {
          "@type": "Organization",
          "name": "Mulenge Scholars' Network Canada"
        }
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white selection:bg-secondary/20">
      {/* SEO Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. NARRATIVE HERO SECTION */}
      <section className="relative pt-48 pb-24 md:pt-64 md:pb-40 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32 pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Intellectual Stewardship
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <h1 className="text-7xl md:text-9xl font-black text-primary leading-[0.8] tracking-tighter font-display mb-8">
                  Guiding <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent italic">
                    Generations.
                  </span>
                </h1>
              </div>
              <div className="lg:col-span-4">
                <div className="space-y-6 border-l-4 border-secondary pl-8 mt-4">
                  <p className="text-xl text-slate-700 leading-relaxed font-semibold">
                    MSNC is anchored by a multidisciplinary board of scholars and advocates bridging the gap between <span className="text-secondary italic">potential</span> and <span className="text-secondary italic">opportunity.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE GALLERY SECTION */}
      <section className="py-24">
        <Container>
          {team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
              {team.map((member, idx) => (
                <TeamMemberCard key={member.id} member={member} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200">
              <h3 className="text-primary font-display uppercase tracking-widest opacity-30">Directory Updating</h3>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

function TeamMemberCard({ member, index }: { member: LeadershipMember; index: number }) {
  const isStaggered = index % 2 !== 0;

  return (
    <article className={cn(
      "group relative flex flex-col transition-all duration-1000",
      isStaggered && "md:mt-56"
    )}>
      {/* 1. Portrait */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] bg-slate-100 shadow-brand transition-all duration-700 border-8 border-white">
        {member.image?.url ? (
          <Image 
            src={member.image.url} 
            alt={`Executive Portrait of ${member.name}`} 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-200 font-black text-9xl font-display uppercase opacity-20">
            {member.name.charAt(0)}
          </div>
        )}
        
        {/* Pillar Badge */}
        <div className="absolute bottom-8 left-8">
          <div className="bg-white/95 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl text-primary border border-slate-100">
            Pillar: {member.pillar || "Leadership"}
          </div>
        </div>
      </div>

      {/* 2. Metadata */}
      <div className="mt-12 space-y-6 px-4">
        <header className="flex items-start justify-between border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-primary font-display tracking-tighter group-hover:text-secondary transition-colors duration-500">
              {member.name}
            </h2>
            <p className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mt-3">
              {member.role}
            </p>
          </div>
          
          {member.linkedinUrl && (
            <a 
              href={member.linkedinUrl} 
              target="_blank" 
              className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077b5] transition-all duration-500"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </header>

        <p className="text-slate-600 text-lg leading-relaxed font-medium line-clamp-3 italic">
          "{getBioPreview(member.bio)}"
        </p>
        
        <Link 
          href={`/leadership/${member.slug}`}
          className="inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-primary group/link hover:text-secondary transition-colors"
        >
          Explore Journey
          <div className="relative flex items-center">
            <div className="w-12 h-[2px] bg-slate-200 group-hover/link:bg-secondary group-hover/link:w-24 transition-all duration-700" />
            <ArrowRight className="absolute -right-4 w-4 h-4 text-secondary opacity-0 group-hover/link:opacity-100 transition-all duration-700" />
          </div>
        </Link>
      </div>
    </article>
  );
}