'use client';

import { Calendar, MapPin, Globe, Edit3, Trash2 } from "lucide-react";
import { Button } from '@/components/ui/Button';
import { deleteEvent } from '@/app/actions/admin';
import Link from 'next/link';
import { useState } from 'react';

export function ProductionEventCard({ event }: { event: any }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Format the date for the UI
  const dateObj = new Date(event.eventDate);
  const formattedDate = dateObj.toLocaleDateString('en-CA', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      setIsDeleting(true);
      await deleteEvent(event.id);
      setIsDeleting(false);
    }
  };

  return (
    <div className={`group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl ${isDeleting ? 'opacity-50 grayscale' : ''}`}>
      
      {/* 1. Visual Header / Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {event.mainImage ? (
          <img 
            src={event.mainImage} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50">
            <Globe className="w-12 h-12 text-slate-200" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm">
            {event.category || "General"}
          </span>
        </div>

        {/* --- ADMIN QUICK ACTIONS --- */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Link 
            href={`/admin/events/edit/${event.id}`}
            className="p-3 bg-white hover:bg-blue-600 hover:text-white text-primary rounded-xl shadow-xl transition-all border border-slate-100"
            title="Edit Event"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-3 bg-white hover:bg-red-600 hover:text-white text-primary rounded-xl shadow-xl transition-all border border-slate-100"
            title="Delete Event"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-primary/90 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            {formattedDate}
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            {event.location}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight line-clamp-1">
          {event.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
          {event.description || "No description provided."}
        </p>

        <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${event.isPublished ? 'text-emerald-500' : 'text-amber-500'}`}>
            ● {event.isPublished ? 'Live on Site' : 'Draft'}
          </span>
          <Link 
            href={`/events/${event.slug}`} 
            target="_blank"
            className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest"
          >
            View Public Page
          </Link>
        </div>
      </div>
    </div>
  );
}
