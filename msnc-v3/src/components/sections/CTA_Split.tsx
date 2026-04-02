import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { GraduationCap, HeartHandshake, ArrowRight } from 'lucide-react';

/**
 * CTA_Split Component
 * -------------------
 * A high-conversion dual-pathway section.
 * Separates the "Service Receivers" from the "Service Givers" 
 * to ensure clear user journeys.
 */
export default function CTASplit() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2">
        
        {/* Path A: For Scholars (The "Blue" Path) */}
        <div className="relative group bg-blue-600 py-24 md:py-32 px-8 md:px-16 overflow-hidden">
          {/* Animated Background Element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-700" />
          
          <div className="relative z-10 max-w-xl ml-auto space-y-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
              <GraduationCap className="w-8 h-8" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Are you a <span className="italic">Scholar</span> seeking a roadmap?
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Join a community that understands your journey. Get access to verified 
                mentors, scholarship alerts, and a network of peers who have walked the path before you.
              </p>
            </div>

            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-2xl px-10 h-16 text-lg font-bold shadow-xl">
              <Link href="/join?role=STUDENT">
                Apply as a Scholar <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Path B: For Mentors/Partners (The "Slate" Path) */}
        <div className="relative group bg-slate-900 py-24 md:py-32 px-8 md:px-16 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
          {/* Animated Background Element */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700" />
          
          <div className="relative z-10 max-w-xl space-y-8">
            <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-blue-400">
              <HeartHandshake className="w-8 h-8" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Ready to <span className="italic text-blue-400">Empower</span> the next generation?
              </h2>
              <p className="text-primary/90 text-lg leading-relaxed">
                Your expertise is the bridge someone else needs to cross. Whether as a 
                mentor, institutional partner, or donor, your involvement changes lives.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-2xl px-10 h-16 text-lg font-bold shadow-xl shadow-blue-600/20">
                <Link href="/join?role=MENTOR">
                  Become a Mentor
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 rounded-2xl px-10 h-16 text-lg font-bold">
                <Link href="/contact">
                  Partner With Us
                </Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
