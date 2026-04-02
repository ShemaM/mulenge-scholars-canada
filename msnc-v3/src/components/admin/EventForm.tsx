'use client';

import { upsertEvent } from '@/app/actions/admin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function EventForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);

  return (
    <form 
      action={async (formData) => {
        setLoading(true);
        try {
          await upsertEvent(formData, initialData?.id);
          toast.success(initialData ? "Event updated successfully." : "Event published successfully.");
        } catch (error) {
          console.error(error);
          toast.error("We could not save the event. Please try again.");
        } finally {
          setLoading(false);
        }
      }} 
      className="space-y-8 max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-primary/90 ml-2">Event Title</label>
          <Input name="title" defaultValue={initialData?.title} placeholder="Global Leadership Summit" required className="h-14 rounded-2xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-primary/90 ml-2">Slug</label>
          <Input name="slug" defaultValue={initialData?.slug} placeholder="leadership-summit-2026" required className="h-14 rounded-2xl font-mono" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-primary/90 ml-2">Date</label>
          <Input name="eventDate" type="datetime-local" defaultValue={initialData?.eventDate?.toISOString().slice(0, 16)} required className="h-14 rounded-2xl" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-primary/90 ml-2">Location</label>
          <Input name="location" defaultValue={initialData?.location} placeholder="Toronto, ON / Virtual" required className="h-14 rounded-2xl" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-primary/90 ml-2">Description</label>
<Textarea name="description" defaultValue={initialData?.description} rows={6} className="rounded-3xl p-6" />
      </div>

      <Button disabled={loading} className="w-full bg-blue-600 h-16 rounded-2xl font-bold text-lg">
        {loading ? <Loader2 className="animate-spin" /> : initialData ? "Update Live Event" : "Publish to MSNC Network"}
      </Button>
    </form>
  );
}
