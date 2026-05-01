"use client";

import { useActionState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
      router.push("/success/contact");
      return;
    }
    toast.error(state.message);
  }, [router, state]);

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="locale" value={locale} />
      <div className="hidden" aria-hidden="true">
        <input name="_honeypot" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state?.message && (
        <div
          className={cn(
            "animate-in slide-in-from-top-2 rounded-2xl border p-4 text-sm font-bold fade-in",
            state.success
              ? "border-emerald-100 bg-emerald-50 text-emerald-700"
              : "border-red-100 bg-red-50 text-red-700",
          )}
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-4 text-2xs font-black uppercase tracking-widest text-slate-400">
            Full Name
          </label>
          <Input
            name="fullName"
            placeholder="e.g. Manasse N."
            required
            className="h-14 rounded-2xl border-slate-200 focus:border-secondary"
          />
          {state?.errors?.fullName && (
            <p className="ml-4 text-xs text-red-500">{state.errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="ml-4 text-2xs font-black uppercase tracking-widest text-slate-400">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            className="h-14 rounded-2xl border-slate-200 focus:border-secondary"
          />
          {state?.errors?.email && <p className="ml-4 text-xs text-red-500">{state.errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="ml-4 text-2xs font-black uppercase tracking-widest text-slate-400">
          Subject
        </label>
        <Input
          name="subject"
          placeholder="How can we collaborate?"
          required
          className="h-14 rounded-2xl border-slate-200 focus:border-secondary"
        />
      </div>

      <div className="space-y-2">
        <label className="ml-4 text-2xs font-black uppercase tracking-widest text-slate-400">
          Your Narrative
        </label>
        <Textarea
          name="message"
          placeholder="Tell us about your journey or inquiry..."
          required
          className="min-h-[160px] rounded-[2rem] border-slate-200 p-6 focus:border-secondary"
        />
        {state?.errors?.message && <p className="ml-4 text-xs text-red-500">{state.errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-16 w-full rounded-2xl bg-primary font-black uppercase tracking-widest text-white shadow-brand transition-all hover:bg-secondary active:scale-[0.98]"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Dispatching...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Message
          </span>
        )}
      </Button>
    </form>
  );
}
