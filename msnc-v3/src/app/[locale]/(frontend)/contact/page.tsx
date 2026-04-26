"use client";

import { useActionState, useEffect, useId } from "react";
import {
  Globe,
  ArrowRight,
  Loader2,
  ShieldCheck,
  PenLine,
  BookOpen,
  Handshake,
  Users,
  Anchor
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Container from '@/components/ui/Container';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type InquiryState = {
  success: boolean;
  message: string;
} | null;

// ─── Constants (100% Sourced from MSNC PDF) ───────────────────────────────────

const INVOLVEMENT_TRACKS = [
  {
    icon: BookOpen,
    title: "Students",
    description:
      "Join our programs and access mentorship, academic support, and career guidance.",
  },
  {
    icon: Handshake,
    title: "Partners & Donors",
    description:
      "Support our mission and help us expand opportunities for underserved youth.",
  },
  {
    icon: Users,
    title: "Volunteers",
    description:
      "Become a mentor and make a meaningful impact in the lives of young people.",
  },
] as const;

const INQUIRY_OPTIONS = [
  { value: "student", label: "Student: Access Mentorship & Guidance" },
  { value: "partner", label: "Partner/Donor: Support Our Mission" },
  { value: "volunteer", label: "Volunteer: Become a Mentor" },
  { value: "rebuilding", label: "Rebuilding Futures Initiative (Global)" },
] as const;

const CORE_VALUES = [
  { title: "Empowerment", text: "We equip youth with the knowledge, skills, and confidence to achieve their full potential." },
  { title: "Community", text: "We foster a supportive and inclusive network where every individual feels valued and inspired." },
  { title: "Integrity", text: "We act with honesty, transparency, and accountability in all that we do." },
  { title: "Collaboration", text: "We believe in the power of partnerships and teamwork to create greater impact." },
  { title: "Excellence", text: "We strive for continuous growth and high standards in our programs and services." },
  { title: "Resilience", text: "We promote perseverance and strength in overcoming challenges and building a better future." }
] as const;

// ─── Server Action (Replace with real Payload CMS action) ─────────────────────

async function mockSubmitInquiry(
  _prevState: InquiryState,
  _formData: FormData
): Promise<InquiryState> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    success: true,
    message: "Your inquiry has been secured and dispatched to the MSNC team.",
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3"
    >
      {children}
    </label>
  );
}

function InvolvementTrack({
  icon: Icon,
  title,
  description,
}: (typeof INVOLVEMENT_TRACKS)[number]) {
  return (
    <div className="group border-t border-slate-200 pt-6 w-full">
      <div className="flex items-center gap-3 mb-3">
        <Icon
          className="w-5 h-5 text-primary transition-colors group-hover:text-secondary"
          aria-hidden="true"
        />
        <h4 className="text-xl font-black uppercase tracking-widest text-primary transition-colors group-hover:text-secondary">
          {title}
        </h4>
      </div>
      <p className="text-slate-500 font-serif text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StatusBanner({ state }: { state: NonNullable<InquiryState> }) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "p-6 rounded-2xl text-xs font-bold uppercase tracking-wider mb-10 border w-full",
        state.success
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-red-50 border-red-200 text-red-700"
      )}
    >
      {state.message}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState<InquiryState, FormData>(
    mockSubmitInquiry,
    null
  );

  // Field IDs — stable across renders, avoids hydration mismatch
  const fullNameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] selection:bg-secondary/20">

      {/* ── 1. Hero ── */}
      <section className="pt-32 pb-24 border-b-4 border-primary bg-white animate-in fade-in duration-700 w-full">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start w-full">

            {/* Left */}
            <div className="lg:col-span-8 w-full">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/10">
                  <Globe className="w-3 h-3 text-secondary" aria-hidden="true" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Mulenge Scholars' Network Canada
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.1] tracking-tight uppercase mb-8 w-full">
                Get <br />
                <span className="font-serif italic text-secondary lowercase tracking-normal">
                  Involved.
                </span>
              </h1>

              <p className="text-2xl md:text-3xl font-serif text-slate-700 leading-snug w-full">
                We are dedicated to empowering youth across Canada through mentorship, academic guidance, and leadership development, while fostering a strong sense of community and belonging.
              </p>
            </div>

            {/* Right */}
            <aside className="lg:col-span-4 lg:pt-12 w-full">
              <div className="border-l-2 border-slate-200 pl-6 w-full">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">
                  The Challenge
                </h2>
                <blockquote className="text-lg text-slate-500 font-medium leading-relaxed font-serif w-full">
                  &ldquo;Many Banyamulenge families arrived in Canada after experiencing displacement and living in multiple countries. Students often lack guidance on academic pathways and struggle to transition into post-secondary education.&rdquo;
                </blockquote>
              </div>
            </aside>

          </div>
        </Container>
      </section>

      {/* ── 2. Directory + Form ── */}
      <section className="py-24 bg-[#FAFAFA]" aria-label="Contact section">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start w-full">

            {/* Left column: involvement tracks */}
            <div className="lg:col-span-5 flex flex-col gap-16 w-full">
              <div className="w-full">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-8 flex items-center gap-2">
                  <Users className="w-4 h-4" aria-hidden="true" />
                  Ways to Connect
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight mb-8 w-full">
                  Network <br /> Pathways.
                </h2>

                <div className="flex flex-col gap-10 w-full">
                  {INVOLVEMENT_TRACKS.map((track) => (
                    <InvolvementTrack key={track.title} {...track} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: form */}
            <div className="lg:col-span-7 bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-xl w-full">

              <div className="flex items-center justify-between border-b border-slate-100 pb-8 mb-10 w-full">
                <div>
                  <h2 className="text-3xl font-black text-primary uppercase tracking-tight">
                    The Inquiry Desk
                  </h2>
                  <p className="text-slate-500 font-serif italic mt-2">
                    Secure digital terminal.
                  </p>
                </div>
                <PenLine className="w-10 h-10 text-slate-200" aria-hidden="true" />
              </div>

              {state && <StatusBanner state={state} />}

              <form action={formAction} noValidate className="space-y-8 w-full">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <div className="w-full">
                    <FieldLabel htmlFor={fullNameId}>Full Name</FieldLabel>
                    <Input
                      id={fullNameId}
                      name="fullName"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full h-16 rounded-xl bg-[#FAFAFA] border-slate-200 text-primary placeholder:text-slate-400 px-6 focus:border-secondary/50 shadow-sm text-lg transition-all"
                    />
                  </div>
                  <div className="w-full">
                    <FieldLabel htmlFor={emailId}>Email Address</FieldLabel>
                    <Input
                      id={emailId}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="your@email.com"
                      className="w-full h-16 rounded-xl bg-[#FAFAFA] border-slate-200 text-primary placeholder:text-slate-400 px-6 focus:border-secondary/50 shadow-sm text-lg transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="w-full">
                  <FieldLabel htmlFor={subjectId}>Nature of Inquiry</FieldLabel>
                  <div className="relative w-full">
                    <select
                      id={subjectId}
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full h-16 rounded-xl bg-[#FAFAFA] border border-slate-200 text-primary px-6 focus:outline-none focus:ring-2 focus:ring-secondary/50 shadow-sm text-lg appearance-none cursor-pointer transition-all"
                    >
                      <option value="" disabled>
                        Select how you want to get involved…
                      </option>
                      {INQUIRY_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <svg
                      className="pointer-events-none absolute inset-y-0 right-6 my-auto w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className="w-full">
                  <FieldLabel htmlFor={messageId}>Your Message</FieldLabel>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us how you would like to connect…"
                    className="w-full rounded-xl bg-[#FAFAFA] border border-slate-200 text-primary placeholder:text-slate-400 p-6 focus:outline-none focus:ring-2 focus:ring-secondary/50 shadow-sm text-lg resize-none transition-all"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isPending}
                  aria-disabled={isPending}
                  className="w-full h-20 mt-6 bg-primary hover:bg-secondary rounded-xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all shadow-lg flex items-center justify-between px-10 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <span className="w-full flex justify-center">
                      <Loader2 className="w-6 h-6 animate-spin" aria-label="Sending…" />
                    </span>
                  ) : (
                    <>
                      <span>Dispatch Message</span>
                      <ArrowRight
                        className="w-6 h-6 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Button>

                <p className="mt-6 flex items-center justify-center gap-2 text-center text-[9px] font-bold uppercase tracking-widest text-slate-400 w-full">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  Secure Submission
                </p>

              </form>
            </div>

          </div>
        </Container>
      </section>

      {/* ── 3. Core Values (Sourced from MSNC Document) ── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <Container>
          <div className="flex flex-col w-full mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-4 flex items-center gap-2">
              <Anchor className="w-4 h-4" /> Who We Are
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">
              Our Core Values.
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="p-8 rounded-[2rem] bg-[#FAFAFA] border border-slate-100 hover:border-slate-200 transition-colors w-full">
                <h4 className="text-xl font-black uppercase tracking-widest text-primary mb-3">
                  {value.title}
                </h4>
                <p className="text-slate-500 font-serif leading-relaxed text-lg">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </main>
  );
}