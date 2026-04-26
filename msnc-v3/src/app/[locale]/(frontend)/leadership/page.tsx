/**
 * MSNC Leadership Gallery - Narrative Editorial Version
 * Features: Scroll-linked animations, Chapter-based storytelling, Production Hardened
 */

import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { Metadata } from 'next';
// FIX: Changed User to Users
import { ArrowRight, ShieldCheck, Globe, Scale, Users } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import { getCachedPayload } from '@/lib/payload';
import { cn } from '@/lib/utils';
import { SITE_URL } from '@/lib/site';
import { normalizeSiteLocale } from '@/lib/site-copy';

// --- 1. CONFIG & SEO ---
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  title: "Leadership & Executive Board | MSNC",
  description: "Meet the architects of resilience. Our multidisciplinary leadership team bridges the gap between Mulenge potential and global opportunity.",
  alternates: { canonical: `${BASE_URL}/leadership` },
};

export const revalidate = 3600; // ISR: 1 Hour

interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  pillar: string;
  bio: {
    root: {
      children: Array<{
        type: string;
        children?: Array<{ text?: string }>;
      }>;
    };
  };
  linkedinUrl?: string;
  image?: { url: string };
  slug: string;
}

// --- 2. DATA HELPERS ---
function getBioPreview(bio: LeadershipMember['bio']): string {
  if (!bio?.root?.children) return "The story of impact is being written...";
  try {
    const firstParagraph = bio.root.children.find(child => child.type === "paragraph");
    const text = firstParagraph?.children?.map(node => node.text || "").join("") || "";
    return text.length > 140 ? `${text.substring(0, 140)}...` : text;
  } catch (e) { return "Exploring the journey of leadership."; }
}

async function getTeamData(locale: string): Promise<LeadershipMember[]> {
  try {
    const payload = await getCachedPayload();
    const { docs } = await payload.find({
      collection: "leadership",
      sort: "order",
      locale,
      fallbackLocale: 'en',
    });
    return docs as unknown as LeadershipMember[];
  } catch (e) { return []; }
}

// --- 3. PAGE COMPONENT ---
export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const team = await getTeamData(normalizeSiteLocale(locale));

  return (
    <main className="min-h-screen bg-white text-[#002147] selection:bg-blue-100 pb-24 relative overflow-x-hidden">
      
      {/* Structural Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.5] pointer-events-none" />

      <div className="w-full px-4 md:px-8 lg:px-12 relative z-10 mx-auto max-w-375">
        
        {/* ─── CHAPTER 01: THE MANDATE (HERO) ─── */}
        <section className="pt-32 pb-16 md:pt-44 md:pb-24 border-b-2 border-slate-900">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Institutional Phase_01</span>
            <span className="h-px grow bg-slate-200" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">The Mandate</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-10">
                Stewardship <br />
                <span className="font-serif italic font-light text-slate-300">of Legacy.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-600 font-medium leading-tight max-w-4xl">
                The MSNC Executive Board is a multidisciplinary collective of scholars and advocates. We do not just lead an organization; we steward a generational promise of academic excellence and community resilience.
              </p>
            </div>
            <div className="lg:col-span-4 pb-4">
               <div className="p-8 border-2 border-slate-900 rounded-[2.5rem] bg-white shadow-xl shadow-blue-900/5">
                  <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-3">Intellectual Governance</h3>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed">
                    Our leadership provides the strategic oversight required to bridge the gap between refugee potential and global opportunity.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* ─── CHAPTER 02: THE COLLECTIVE COMPASS (INTERLUDE) ─── */}
        <section className="py-24 border-b border-slate-100">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Globe, t: "Global Vision", d: "Connecting the Mulenge diaspora with top-tier international academic institutions." },
              { icon: Scale, t: "Integrity", d: "Transparent stewardship of resources and trust across four strategic pillars." },
              { icon: Users, t: "Mentorship", d: "A board that is actively involved in guiding individual scholar trajectories." }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <item.icon className="w-6 h-6 text-blue-600" />
                <h4 className="text-xl font-black uppercase tracking-tighter">{item.t}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CHAPTER 03: THE LEADERSHIP LEDGER (GALLERY) ─── */}
        <section className="py-24">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">The Board.</h2>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ref_Directory_2024</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Active Executive Members</span>
            </div>
          </div>

          {team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-32">
              {team.map((member, idx) => (
                <TeamMemberCard key={member.id} member={member} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
              <p className="text-slate-300 font-black uppercase tracking-widest">Directory is being updated</p>
            </div>
          )}
        </section>

        {/* ─── CHAPTER 04: THE INVITATION (CTA) ─── */}
        <section className="py-24">
          <div className="bg-[#FAFAFA] border-2 border-slate-900 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden">
             <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
                Partner with <br/>
                <span className="font-serif italic font-light text-slate-400">Our Leadership.</span>
             </h2>
             <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-12">
               Are you an institution or academic leader looking to collaborate with our board? We are always open to strategic partnerships that expand our impact.
             </p>
             <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="h-14 px-10 bg-primary-500 text-white rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-blue-700 transition-all">
                  Inquire for Partnership <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="h-14 px-10 border-2 border-slate-900 text-[#002147] rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                  View Organization <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </div>
        </section>

        {/* ─── FOOTER LABELS ─── */}
        <footer className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 pt-10 gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">MSNC Official Repository_2024</span>
          </div>
          <div className="flex gap-8">
            {['Leadership', 'Governance', 'Stewardship'].map(v => (
              <span key={v} className="text-[10px] font-black uppercase tracking-widest text-slate-400">{v}</span>
            ))}
          </div>
        </footer>

      </div>
    </main>
  );
}

// --- 4. CARD COMPONENT ---
function TeamMemberCard({ member, index }: { member: LeadershipMember; index: number }) {
  const isStaggered = index % 2 !== 0;

  return (
    <article className={cn("group flex flex-col", isStaggered && "md:mt-40")}>
      <Link href={`/leadership/${member.slug}`} className="block relative aspect-4/5 overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-900/10 transition-all duration-500 border-4 border-white">
        {member.image?.url ? (
          <Image
            src={member.image.url}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-white font-black text-8xl uppercase">{member.name.charAt(0)}</div>
        )}
        <div className="absolute bottom-6 left-6">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg text-[#002147]">
            {member.pillar || "Board Member"}
          </div>
        </div>
      </Link>

      <div className="mt-10 space-y-4 px-2">
        <header className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#002147] tracking-tighter group-hover:text-blue-600 transition-colors">
              {member.name}
            </h2>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mt-2">{member.role}</p>
          </div>
          {member.linkedinUrl && (
            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077b5] transition-all">
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </header>
        <p className="text-slate-500 text-lg leading-relaxed font-medium italic font-serif line-clamp-3">
          &ldquo;{getBioPreview(member.bio)}&rdquo;
        </p>
        <Link href={`/leadership/${member.slug}`} className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#002147] group/link">
          <span>Explore Journey</span>
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform text-blue-600" />
        </Link>
      </div>
    </article>
  );
}
