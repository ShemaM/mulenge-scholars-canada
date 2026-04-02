import { Mail, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getCachedPayload } from "@/lib/payload";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { LinkedInIcon, XIcon } from "@/components/ui/SocialIcons";

// --- 1. SEARCH ENGINE OPTIMIZATION ---
export const metadata: Metadata = {
  title: "Leadership & Executive Board | MSNC",
  description: "Meet the architects of resilience. Our multidisciplinary leadership team bridges the gap between Mulenge potential and global opportunity.",
  openGraph: {
    title: "MSNC Leadership: Architects of Resilience",
    description: "The executive board leading diaspora excellence and academic transformation.",
    images: [{ url: "/images/og-leadership.jpg", width: 1200, height: 630 }],
  },
};

export const dynamic = 'force-dynamic';

interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  pillar: string;
  bio: string;
  email?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  image?: { url: string };
  slug?: string;
}

// --- 2. DATA ORCHESTRATION ---
async function getTeamData(): Promise<LeadershipMember[]> {
  try {
    const payload = await getCachedPayload();
    const { docs } = await payload.find({
      collection: 'leadership',
      sort: 'order', // Ensure 'order' field exists in your Payload collection
    });
    return docs as unknown as LeadershipMember[];
  } catch (error) {
    if ((error as Error)?.message !== 'PAYLOAD_BUILD_SKIP') {
      console.error("Payload Fetch Error [getTeamData]:", error);
    }
    return []; 
  }
}

export default async function LeadershipPage() {
  const team = await getTeamData();

  // Structured Data for Google (Schema.org)
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
        "worksFor": { "@type": "Organization", "name": "Mulenge Scholars' Network Canada" }
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
      
      {/* 1. HERO SECTION: Editorial Narrative */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Globe className="w-3.5 h-3.5" />
                The Executive Board
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-primary leading-[1.05] tracking-tighter font-display">
                Architects of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Resilience.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-xl text-slate-700 leading-relaxed font-semibold border-l-4 border-accent pl-6 italic">
                Strategic leadership driving the intellectual capital of the Mulenge diaspora.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE GALLERY: Asymmetrical Layout */}
      <section className="py-32">
        <Container>
          {team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
              {team.map((member, idx) => (
                <TeamMemberCard key={member.id} member={member} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center rounded-[4rem] bg-slate-50 border-2 border-dashed border-slate-200">
              <h3 className="text-3xl font-black text-primary font-display">Directory Updating</h3>
              <p className="text-slate-600 mt-4 font-medium">Our executive profiles are currently being finalized.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

// --- 3. SUB-COMPONENTS: Narrative Cards ---

function TeamMemberCard({ member, index }: { member: LeadershipMember; index: number }) {
  const isStaggered = index % 2 !== 0;

  return (
    <article className={cn(
      "group relative space-y-10 transition-all duration-1000",
      isStaggered && "md:mt-48"
    )}>
      {/* Portrait with Dynamic Staggering */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-slate-100 shadow-editorial group-hover:shadow-brand transition-all duration-700">
        {member.image?.url ? (
          <Image 
            src={member.image.url} 
            alt={`Executive portrait of ${member.name}`} 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-200 font-black text-9xl font-display uppercase opacity-20">
            {member.name.charAt(0)}
          </div>
        )}
        
        {/* Pillar Tag - Program Affiliation */}
        <div className="absolute top-8 left-8">
          <div className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg text-primary border border-white/20">
            Pillar: {member.pillar}
          </div>
        </div>
      </div>

      {/* Narrative Metadata & Socials */}
      <div className="space-y-6 px-2">
        <header className="flex items-start justify-between border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-primary font-display tracking-tight group-hover:text-secondary transition-colors">
              {member.name}
            </h2>
            <p className="text-accent font-black uppercase tracking-[0.2em] text-[10px]">
              {member.role}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {member.linkedinUrl && (
              <a 
                href={member.linkedinUrl} 
                aria-label={`${member.name} LinkedIn`}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-500"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            )}
            {member.twitterUrl && (
              <a 
                href={member.twitterUrl} 
                aria-label={`${member.name} X Profile`}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-black hover:border-black transition-all duration-500"
              >
                <XIcon className="w-4 h-4" />
              </a>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`} 
                aria-label={`Contact ${member.name}`}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary hover:border-primary transition-all duration-500"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* Bio Narrative */}
        <p className="text-slate-800 text-lg leading-relaxed font-medium line-clamp-4">
          {member.bio}
        </p>
        
        {/* Editorial Link */}
        <Link 
          href={`/leadership/${member.slug || member.id}`}
          className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-primary group/link"
        >
          Explore Journey
          <div className="w-8 h-px bg-primary group-hover/link:w-12 transition-all duration-500" />
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
        </Link>
      </div>
    </article>
  );
}
