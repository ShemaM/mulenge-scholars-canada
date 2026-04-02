"use client";

import { useActionState, useEffect } from "react";
import { submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  // 1. Hook into the Server Action
  // [state] holds the return value from your action (success, message, errors)
  // [formAction] is what we pass to the <form action={...}>
  // [isPending] is true while the server is processing
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const router = useRouter();

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
      router.push('/success/contact');
      return;
    }
    toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-8">
      {/* Success / Error Messages */}
      {state?.message && (
        <div className={cn(
          "p-4 rounded-2xl text-sm font-bold border animate-in fade-in slide-in-from-top-2",
          state.success 
            ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
            : "bg-red-50 border-red-100 text-red-700"
        )}>
          {state.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
          <Input 
            name="name" 
            placeholder="e.g. Manassé N." 
            required 
            className="rounded-2xl border-slate-200 focus:border-secondary h-14"
          />
          {state?.errors?.name && <p className="text-xs text-red-500 ml-4">{state.errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
          <Input 
            name="email" 
            type="email" 
            placeholder="your@email.com" 
            required 
            className="rounded-2xl border-slate-200 focus:border-secondary h-14"
          />
          {state?.errors?.email && <p className="text-xs text-red-500 ml-4">{state.errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Subject</label>
        <Input 
          name="subject" 
          placeholder="How can we collaborate?" 
          required 
          className="rounded-2xl border-slate-200 focus:border-secondary h-14"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Narrative</label>
        <Textarea 
          name="message" 
          placeholder="Tell us about your journey or inquiry..." 
          required 
          className="min-h-[160px] rounded-[2rem] border-slate-200 focus:border-secondary p-6"
        />
        {state?.errors?.message && <p className="text-xs text-red-500 ml-4">{state.errors.message}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={isPending}
        className="w-full h-16 rounded-2xl bg-primary hover:bg-secondary text-white font-black uppercase tracking-widest transition-all shadow-brand active:scale-[0.98]"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Dispatching...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </span>
        )}
      </Button>
    </form>
  );
}
