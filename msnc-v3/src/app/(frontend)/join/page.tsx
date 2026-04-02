"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import Container from '@/components/ui/Container';
import { Sparkles, Heart, GraduationCap, ArrowRight, Link } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: 'volunteer', // 'volunteer' or 'scholar'
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-white selection:bg-secondary/20">
      
      <section className="relative pt-40 pb-16 md:pt-48 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 transform origin-top pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-widest text-sm mb-6">
              <span className="w-8 h-0.5 bg-accent" />
              Take Your Place
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tight font-display mb-8">
              Join the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Network.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium max-w-2xl border-l-4 border-secondary pl-6">
              Whether you are here to share your expertise or to find your academic path, you are part of a global movement for Mulenge youth.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
              
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-primary font-display leading-tight">
                  Choose Your <br />
                  <span className="text-secondary">Impact Pathway</span>
                </h2>
                
                <button 
                  onClick={() => setFormData({...formData, interest: 'volunteer'})}
                  className={cn(
                    "w-full text-left p-8 rounded-[2.5rem] border-2 transition-all duration-500 group",
                    formData.interest === 'volunteer' 
                      ? "bg-secondary/5 border-secondary shadow-xl shadow-secondary/10" 
                      : "bg-white border-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                      formData.interest === 'volunteer' ? "bg-secondary text-white" : "bg-slate-100 text-primary/90 group-hover:bg-slate-200"
                    )}>
                      <Heart className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-primary mb-1">Volunteer as Mentor</h3>
                      <p className="text-sm font-medium text-foreground/60">Share skills and guide the next generation.</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setFormData({...formData, interest: 'scholar'})}
                  className={cn(
                    "w-full text-left p-8 rounded-[2.5rem] border-2 transition-all duration-500 group",
                    formData.interest === 'scholar' 
                      ? "bg-accent/5 border-accent shadow-xl shadow-accent/10" 
                      : "bg-white border-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                      formData.interest === 'scholar' ? "bg-accent text-white" : "bg-slate-100 text-primary/90 group-hover:bg-slate-200"
                    )}>
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-primary mb-1">Apply as a Scholar</h3>
                      <p className="text-sm font-medium text-foreground/60">Access academic support and mentorship.</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3 text-primary font-bold mb-4">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  What happens next?
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                  After submission, our leadership committee reviews your profile. Expect a personalized response within 2-3 business days to discuss the next steps in your journey.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-14 rounded-[3rem] border border-slate-100 shadow-brand relative">
                
                <div className="mb-12">
                  <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-4">02. Digital Dispatch</h2>
                  <h3 className="text-4xl font-black text-primary font-display leading-tight">
                    Start the <span className="text-accent italic font-normal">Conversation.</span>
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-primary/90">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        placeholder="Jean"
                        className="h-14 rounded-2xl border-slate-100 focus:ring-secondary"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-primary/90">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        placeholder="Claude"
                        className="h-14 rounded-2xl border-slate-100 focus:ring-secondary"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-primary/90">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jean@example.com"
                        className="h-14 rounded-2xl border-slate-100 focus:ring-secondary"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-primary/90">Phone (Optional)</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        className="h-14 rounded-2xl border-slate-100 focus:ring-secondary"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-primary/90">
                      {formData.interest === 'volunteer' ? 'Skills & Availability' : 'Academic Goals & Challenges'}
                    </Label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={6}
                      className="rounded-[2rem] border-slate-100 focus:ring-secondary p-6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={formData.interest === 'volunteer' 
                        ? "Tell us about your professional background and how you'd like to help..." 
                        : "Tell us about your educational background and where you need support..."
                      }
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className={cn(
                      "w-full h-16 rounded-2xl text-lg font-black transition-all duration-500 shadow-xl",
                      formData.interest === 'volunteer' 
                        ? "bg-primary hover:bg-secondary text-white shadow-secondary/20" 
                        : "bg-accent hover:bg-red-700 text-white shadow-accent/20"
                    )}
                  >
                    Submit Application
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </Container>
      </section>

      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Are you an organization looking to partner?</h2>
            <p className="text-foreground/60 mb-8 font-medium">For corporate, academic, or NGO collaborations, please use our institutional channel.</p>
            <Link 
              href="/contact" 
              className="text-sm font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors"
            >
              Contact Partnerships Team →
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

