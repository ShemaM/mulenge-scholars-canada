import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogs } from '@/lib/payload';
import Container from '@/components/ui/Container';
import { ArrowRight, BookOpen, Sparkles, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import type { Blog } from '@/types/payload-types';

type BlogPost = Blog & {
  featuredImage?: {
    url?: string;
  };
};

export const metadata: Metadata = {
  title: 'Impact Journal | Mulenge Scholars Network Canada',
  description: 'Deep-dive narratives on the academic and community leadership of the Mulenge diaspora.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  // 1. Fetch real data from Payload
  const allPosts = (await getBlogs()) as BlogPost[];

  // 2. Logic for Featured vs Regular posts
  const featuredPost = allPosts[0];
  const regularPosts = allPosts.slice(1);

  if (!featuredPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-400 font-display text-2xl italic">The journal is being drafted. Check back soon.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white selection:bg-secondary selection:text-primary">
      
      {/* Editorial Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 text-[28vw] font-black text-slate-50 leading-none select-none pointer-events-none -translate-y-16 translate-x-20 tracking-tighter">
          MSNC
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-16 bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                Volume 01 // {new Date().getFullYear()}
              </span>
            </div>
            
            <h1 className="font-display text-8xl md:text-[11rem] font-black text-primary leading-[0.8] tracking-tighter mb-12">
              Impact <br />
              <span className="italic text-secondary">Journal.</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-2xl text-slate-500 font-medium leading-tight max-w-md italic border-l-4 border-secondary pl-8">
                The definitive record of excellence, resilience, and scholarly advancement.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured "Cover Story" Section */}
      <section className="pb-32 bg-white">
        <Container>
          <Link 
            href={`/blog/${featuredPost.slug}`}
            className="group relative block rounded-[4rem] overflow-hidden bg-primary shadow-3xl transition-all duration-700"
          >
            <div className="grid lg:grid-cols-2 min-h-[650px]">
              <div className="relative bg-slate-900 overflow-hidden">
                {featuredPost.featuredImage?.url ? (
                   <img 
                    src={featuredPost.featuredImage.url} 
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                   />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <BookOpen className="w-40 h-40 text-white/5 group-hover:scale-125 transition-transform duration-1000" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/40 to-transparent z-10" />
              </div>

              <div className="p-12 md:p-24 flex flex-col justify-center relative z-20">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary rounded-full w-fit mb-10">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Cover Story</span>
                </div>

                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.95] group-hover:text-secondary transition-colors duration-500">
                  {featuredPost.title}
                </h2>

                <p className="text-xl text-white/70 mb-12 font-medium leading-relaxed max-w-xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-10 border-t border-white/10 mt-auto">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Contributor</span>
                    <span className="text-white font-bold text-lg">MSNC Team</span>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white text-primary flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl">
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* Regular Feed Section */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="flex items-center justify-between mb-24 border-b border-slate-200 pb-12">
            <h3 className="font-display text-5xl font-black text-primary tracking-tighter">Recent Briefings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
            {regularPosts.map((post: BlogPost, idx: number) => (
              <article 
                key={post.id} 
                className={cn(
                  "group flex flex-col",
                  idx % 2 === 0 ? "" : "md:pt-32" 
                )}
              >
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="relative block aspect-[4/5] rounded-[3rem] overflow-hidden bg-white mb-10 border border-slate-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-4"
                >
                   {post.featuredImage?.url ? (
                     <img src={post.featuredImage.url} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                   ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <BookOpen className="w-24 h-24 text-slate-400 group-hover:scale-110 transition-all" />
                    </div>
                   )}
                   <div className="absolute bottom-8 left-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-white px-6 py-3 rounded-full shadow-lg">
                        Insight
                      </span>
                   </div>
                </Link>

                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min read</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{format(new Date(post.updatedAt || post.createdAt), 'MMM dd, yyyy')}</span>
                </div>

                <h4 className="text-3xl md:text-5xl font-black text-primary mb-6 leading-none tracking-tighter group-hover:text-secondary transition-all duration-300">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>

                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`} 
                  className="group/btn inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-primary"
                >
                  View Narrative
                  <div className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center transition-all group-hover/btn:bg-primary group-hover/btn:text-white group-hover/btn:border-primary group-hover/btn:translate-x-3">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Footer Section */}
      <section className="py-48 bg-white overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-950" />
        <Container className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-6xl md:text-9xl font-black text-white mb-12 tracking-tighter leading-none">
              Have a Story <br />
              <span className="italic text-secondary">To Tell?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact" 
                className="px-10 py-5 bg-secondary text-primary font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all shadow-2xl"
              >
                Submit a Pitch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
