'use client';

import { upsertEvent } from '@/app/actions/admin'; // Reuse for now, adapt later
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { useState } from 'react';
import { Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProgramForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);

  return (
    <form 
      action={async (formData) => {
        setLoading(true);
        await upsertEvent(formData, initialData?.id);
      }} 
      className="space-y-8 max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Pillar #</Label>
          <Input name="pillar" defaultValue={initialData?.pillar} placeholder="01" required className="h-14 rounded-2xl font-mono tracking-widest text-xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Title</Label>
          <Input name="title" defaultValue={initialData?.title} placeholder="Academic Support" required className="h-14 rounded-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Slug</Label>
          <Input name="slug" defaultValue={initialData?.slug} placeholder="academic-support" required className="h-14 rounded-2xl font-mono" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Phase</Label>
          <select name="phase" defaultValue={initialData?.phase} className="h-14 rounded-2xl px-4 text-lg bg-slate-50 border-slate-200 focus:ring-primary font-medium" required>
            <option value="">Select Phase</option>
            <option value="foundation">Foundation</option>
            <option value="growth">Growth</option>
            <option value="impact">Impact</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-1">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Status</Label>
          <select name="status" defaultValue={initialData?.status} className="h-14 rounded-2xl px-4 text-lg bg-slate-50 border-slate-200 focus:ring-primary font-medium">
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-1">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Featured Image</Label>
          <Input name="featuredImage" defaultValue={initialData?.featuredImage} placeholder="Image URL" className="h-14 rounded-2xl" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Description</Label>
        <Textarea name="description" defaultValue={initialData?.description} rows={8} className="rounded-3xl p-6 font-medium text-lg leading-relaxed" />
      </div>

      <div className="flex gap-4">
        <Link href="/admin/programs" className="flex-1">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-bold">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Cancel & Return
          </Button>
        </Link>
        <Button disabled={loading} className="flex-2 bg-gradient-to-r from-blue-600 to-primary h-14 rounded-2xl font-bold text-lg shadow-xl">
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            initialData ? "Update Program" : "Create & Publish"
          )}
        </Button>
      </div>
    </form>
  );
}

