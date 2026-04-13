"use client";

import { useActionState, useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import Container from '@/components/ui/Container';
import { GraduationCap, Heart, Building2, ArrowRight, Loader2, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
// FIX: Ensure this matches your new unified action
import { submitUnifiedInquiry } from '@/actions/inquiries'; 
import { toast } from 'sonner';

type InterestType = 'scholar' | 'volunteer' | 'partner' | 'support' | 'general';

function JoinForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get('role');

  const getInitialInterest = (): InterestType => {
    if (roleParam === 'highschool' || roleParam === 'support') return 'support';
    if (roleParam === 'student' || roleParam === 'scholar') return 'scholar';
    if (roleParam === 'partner') return 'partner';
    if (roleParam === 'mentor' || roleParam === 'volunteer') return 'volunteer';
    return 'general';
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: getInitialInterest(),
    message: '',
  });

  // FIX: Updated to use the correct action variable
  const [state, formAction, isPending] = useActionState(submitUnifiedInquiry, null);

  useEffect(() => {
    setFormData(prev => ({ ...prev, interest: getInitialInterest() }));
  }, [roleParam]);

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
      router.push('/success/join');
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contentMap = {
    support: {
      badge: "High School Support",
      title: "The Path to Post-Secondary.",
      desc: "For Grade 11-12 students seeking localized tutoring and university application guidance.",
      label: "Current School & Academic Needs",
      placeholder: "Which high school do you attend? What subjects do you need help with?...",
      button: "Apply for Academic Support",
      accent: "#4A90D9",
      bg: "bg-[#4A90D9]"
    },
    scholar: {
      badge: "University Scholars",
      title: "Elevate Your Career.",
      desc: "Connect with mentors in your field of study and join a network of excellence across Canada.",
      label: "Program of Study & Goals",
      placeholder: "What are you studying? What career paths are you exploring?...",
      button: "Apply as a Scholar",
      accent: "#002147",
      bg: "bg-[#002147]"
    },
    volunteer: {
      badge: "Mentorship Network",
      title: "Steward the Future.",
      desc: "Share your professional journey to help bridge the gap for the next generation of Mulenge leaders.",
      label: "Professional Background",
      placeholder: "Tell us about your career and how you'd like to support our youth...",
      button: "Join as a Mentor",
      accent: "#D97706",
      bg: "bg-[#D97706]"
    },
    partner: {
      badge: "Institutional Alliance",
      title: "Building Global Impact.",
      desc: "Collaborate with MSNC to provide resources, funding, or organizational support to refugee youth.",
      label: "Organization Details",
      placeholder: "Tell us about your organization and your vision for partnership...",
      button: "Inquire about Partnership",
      accent: "#6F4763",
      bg: "bg-[#6F4763]"
    },
    general: {
      badge: "Network Inquiry",
      title: "Join the Dialogue.",
      desc: "Interested in MSNC but not sure where you fit? Send us a message and we'll connect you.",
      label: "Your Inquiry",
      placeholder: "How can we help you today?...",
      button: "Send Message",
      accent: "#1E293B",
      bg: "bg-[#1E293B]"
    }
  };

  const current = contentMap[formData.interest];

  return (
    <main className="min-h-screen bg-white">
      <section className="relative pt-32 pb-16 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white -skew-x-12 translate-x-32 pointer-events-none border-l border-slate-100" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[12vw] font-black text-primary/5 font-display select-none pointer-events-none leading-none uppercase">
          {formData.interest}
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <Sparkles className="w-4 h-4" style={{ color: current.accent }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                {current.badge}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-primary font-display leading-[0.85] tracking-tighter">
              {current.title}
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed border-l-4 pl-8 italic" style={{ borderColor: current.accent }}>
              {current.desc}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            {/* Pathway Selector */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-32">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Step 01 — Select Your Pathway</h2>
              
              {(Object.keys(contentMap) as Array<InterestType>).map((key) => {
                const item = contentMap[key];
                const isActive = formData.interest === key;
                return (
                  <button 
                    key={key}
                    onClick={() => setFormData({ ...formData, interest: key })}
                    className={cn(
                      "w-full text-left p-6 rounded-[2.5rem] border-2 transition-all duration-500 group flex items-center gap-6",
                      isActive ? "bg-white shadow-brand border-transparent scale-[1.02]" : "bg-slate-50 border-slate-50 hover:bg-white hover:border-slate-200"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm",
                      isActive ? "text-white" : "bg-white text-slate-300"
                    )} style={isActive ? { backgroundColor: item.accent } : {}}>
                        {key === 'scholar' && <GraduationCap className="w-5 h-5" />}
                        {key === 'support' && <UserPlus className="w-5 h-5" />}
                        {key === 'volunteer' && <Heart className="w-5 h-5" />}
                        {key === 'partner' && <Building2 className="w-5 h-5" />}
                        {key === 'general' && <ArrowRight className="w-5 h-5" />}
                    </div>
                    <span className={cn("text-sm font-bold tracking-tight transition-colors", isActive ? "text-primary" : "text-slate-400")}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}

              <div className="mt-8 p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-secondary shrink-0" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
                  All submissions are encrypted and reviewed strictly by the MSNC Executive Board.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 md:p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/40">
                <header className="mb-12">
                  <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Step 02 — Digital Intake</h2>
                  <h3 className="text-4xl font-black text-primary font-display tracking-tight">
                    Submit your <span className="italic" style={{ color: current.accent }}>Application.</span>
                  </h3>
                </header>

                <form action={formAction} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">First Name</Label>
                      <Input name="firstName" required value={formData.firstName} onChange={handleChange} className="h-16 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-secondary transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Last Name</Label>
                      <Input name="lastName" required value={formData.lastName} onChange={handleChange} className="h-16 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-secondary transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email Address</Label>
                      <Input type="email" name="email" required value={formData.email} onChange={handleChange} className="h-16 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-secondary transition-all" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Phone Number</Label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1..." className="h-16 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-secondary transition-all" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">{current.label}</Label>
                    <Textarea 
                      name="message" 
                      required 
                      rows={6} 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder={current.placeholder} 
                      className="rounded-[2.5rem] border-slate-100 bg-slate-50 focus:bg-white focus:ring-secondary p-8 leading-relaxed transition-all" 
                    />
                  </div>

                  <input type="hidden" name="interest" value={formData.interest} />

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className={cn(
                      "w-full h-20 rounded-full text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-500 shadow-2xl text-white",
                      current.bg
                    )}
                  >
                    {isPending ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-3">
                        {current.button} <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default function JoinClient() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <JoinForm />
    </Suspense>
  );
}