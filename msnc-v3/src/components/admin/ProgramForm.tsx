'use client';

import { upsertProgram } from '@/app/actions/admin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { useState } from 'react';
import { Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ProgramForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);

  const pillarOptions = [
    { value: 'workshops', label: 'Workshops & Community Engagement' },
    { value: 'high-school', label: 'High School Support Program' },
    { value: 'adult-learning', label: 'Adult Learning & Career Pathways' },
    { value: 'rebuilding-futures', label: 'Rebuilding Futures Initiative' }
  ];

  const colorOptions = [
    { value: 'sky', label: 'Sky (Blue)' },
    { value: 'navy', label: 'Navy (Indigo)' },
    { value: 'slate', label: 'Slate' },
    { value: 'red', label: 'Red' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'alt', label: 'Alt' }
  ];

  const phaseOptions = [
    { value: 'foundation', label: 'Foundation' },
    { value: 'growth', label: 'Growth' },
    { value: 'impact', label: 'Impact' }
  ];

  return (
    <form 
      action={async (formData) => {
        setLoading(true);
        try {
          await upsertProgram(formData, initialData?.id);
          toast.success(initialData ? "Program updated successfully." : "Program published successfully.");
        } catch (error) {
          console.error(error);
          toast.error("We could not save the program. Please try again.");
        } finally {
          setLoading(false);
        }
      }} 
      className="space-y-8 max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Index</Label>
          <Input name="index" defaultValue={initialData?.index} placeholder="01" required className="h-14 rounded-2xl font-mono tracking-widest text-xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Pillar</Label>
          <select name="pillar" defaultValue={initialData?.pillar} className="h-14 rounded-2xl px-4 text-lg bg-slate-50 border-slate-200 focus:ring-primary font-medium" required>
            <option value="">Select Pillar</option>
            {pillarOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Title</Label>
          <Input name="title" defaultValue={initialData?.title} placeholder="Academic Support" required className="h-14 rounded-2xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Slug</Label>
          <Input name="slug" defaultValue={initialData?.slug} placeholder="academic-support" required className="h-14 rounded-2xl font-mono" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Order</Label>
          <Input name="order" type="number" defaultValue={initialData?.order} placeholder="1" required className="h-14 rounded-2xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Color</Label>
          <select name="color" defaultValue={initialData?.color} className="h-14 rounded-2xl px-4 text-lg bg-slate-50 border-slate-200 focus:ring-primary font-medium">
            <option value="">Select Color</option>
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Phase</Label>
          <select name="phase" defaultValue={initialData?.phase} className="h-14 rounded-2xl px-4 text-lg bg-slate-50 border-slate-200 focus:ring-primary font-medium" required>
            <option value="">Select Phase</option>
            {phaseOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Theme</Label>
          <select name="theme" defaultValue={initialData?.theme} className="h-14 rounded-2xl px-4 text-lg bg-slate-50 border-slate-200 focus:ring-primary font-medium">
            <option value="">Select Theme</option>
            {themeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Description</Label>
        <Textarea name="description" defaultValue={initialData?.description} rows={8} className="rounded-3xl p-6 font-medium text-lg leading-relaxed" />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Tagline</Label>
        <Input name="tagline" defaultValue={initialData?.tagline} placeholder="Community & Growth" className="h-12 rounded-2xl" />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Stat Value</Label>
        <Input name="statValue" defaultValue={initialData?.statValue} placeholder="300+" className="h-12 rounded-2xl font-mono" />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Stat Label</Label>
        <Input name="statLabel" defaultValue={initialData?.statLabel} placeholder="Youth Reached" className="h-12 rounded-2xl" />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Featured Image URL</Label>
        <Input name="featuredImage" defaultValue={initialData?.featuredImage} placeholder="Media ID or URL" className="h-14 rounded-2xl" />
      </div>

      {/* Features Array - Simplified for now */}
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-primary/90">Features (JSON)</Label>
        <Textarea name="features" defaultValue={JSON.stringify(initialData?.features || [], null, 2)} rows={6} className="rounded-3xl p-6 font-mono text-sm" placeholder='[{"label": "Feature 1", "desc": "Description", "icon": "Users"}]'/>
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
            initialData ? "Update Pillar" : "Create Pillar"
          )}
        </Button>
      </div>
    </form>
  );
}
