'use client';

import { Edit3, Trash2, ChevronRight } from "lucide-react";
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { deleteEvent } from '@/app/actions/admin'; // Reuse
import { useState } from 'react';

export function ProgramCard({ program }: { program: any }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Delete this program pillar? Cannot be undone.")) {
      setIsDeleting(true);
      await deleteEvent(program.id); // Reuse, adapt ID
      setIsDeleting(false);
    }
  };

  return (
    <div className={`group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl ${isDeleting ? 'opacity-50 grayscale' : ''}`}>
      <div className="p-8">
        {/* Pillar Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
          <span className="text-2xl font-black text-primary font-display tracking-tight">{program.pillar}</span>
          <span className="text-xs font-bold uppercase text-primary/80 tracking-[0.2em]">Phase: {program.phase}</span>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">{program.title}</h3>

        {/* Status */}
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${
          program.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
          program.status === 'on-hold' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
          'bg-slate-100 text-slate-800 border-slate-200'
        } border`}>
          {program.status}
        </span>

        {/* Description Preview */}
        <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3 font-medium">
          {program.description}
        </p>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
          <div className="flex gap-3">
            <Link href={`/admin/programs/edit/${program.id}`} className="p-3 hover:bg-primary/5 rounded-xl border border-slate-200 transition-all text-primary font-bold hover:text-primary hover:shadow-md">
              <Edit3 className="w-5 h-5" />
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-3 hover:bg-red-50 hover:text-red-600 border border-slate-200 text-slate-400 hover:border-red-200 transition-all h-12 w-12 rounded-xl"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
          <Link href={`/programs/${program.slug}`} target="_blank" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/90 transition-colors">
            Live Page 
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

