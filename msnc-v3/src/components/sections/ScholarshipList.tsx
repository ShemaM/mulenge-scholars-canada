import { GraduationCap, Calendar, School, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface ScholarshipListProps {
  scholars: {
    id: string | number;
    recipientName: string;
    university: string;
    year: string;
    amount: string | number; // Flexible type for defensive handling
  }[];
}

export default function ScholarshipList({ scholars = [] }: ScholarshipListProps) {
  
  if (!scholars || scholars.length === 0) return null;

  // 1. FORMATTER UTILITY (Heuristic #4: Consistency)
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  // 2. DEFENSIVE DATA SCRUBBER (Heuristic #5: Error Prevention)
  // This removes "$", ",", and spaces so JavaScript can do math safely.
  const cleanAmount = (val: string | number) => {
    if (typeof val === 'number') return val;
    return parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
  };

  // 3. DYNAMIC CALCULATION (Shneiderman #7: Internal Locus of Control)
  const totalAwarded = scholars.reduce((acc, scholar) => {
    return acc + cleanAmount(scholar.amount);
  }, 0);

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-slate-50/50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-100/40 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 mb-6">
              <GraduationCap className="w-3 h-3 text-secondary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
                Wall of Excellence
              </span>
            </div>
            
            <h2 className="font-display font-black text-5xl md:text-7xl text-primary mb-6 tracking-tight leading-[1.05]">
              Celebrating Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mt-2">
                Scholars
              </span>
            </h2>
          </div>

          <Button 
            asChild 
            variant="outline" 
            className="border-2 border-slate-200 hover:border-secondary rounded-xl font-semibold group self-start lg:self-end"
          >
            <Link href="/programs/scholarships">
              View All Awards
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Scholarship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {scholars.map((award) => (
            <div key={award.id} className="group">
              <div className="h-full p-10 rounded-3xl bg-white border-2 border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
                
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-secondary/10 border border-secondary/20 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="w-7 h-7 text-secondary" />
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {award.year}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3 tracking-tight leading-tight group-hover:text-secondary transition-colors">
                      {award.recipientName}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-slate-600">
                      <School className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">{award.university}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
                      Award Value
                    </div>
                    <div className="font-display text-3xl font-black text-primary">
                      {/* Formatted Card Amount */}
                      {currencyFormatter.format(cleanAmount(award.amount))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- DYNAMIC TOTAL IMPACT STATEMENT (Nielsen #1) --- */}
        <div className="mt-20 pt-12 border-t border-slate-200/60 text-center">
          <p className="text-lg text-slate-500 leading-relaxed italic">
            Totaling over{' '}
            <span className="font-display text-3xl md:text-5xl font-black text-primary not-italic mx-2">
              {currencyFormatter.format(totalAwarded)}
            </span>
            {' '}in educational support across the network
          </p>
        </div>
      </div>
    </section>
  );
}
