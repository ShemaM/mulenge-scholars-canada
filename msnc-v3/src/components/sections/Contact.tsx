"use client";

import { useActionState, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Share2, Users, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { submitContactForm } from '@/actions/contact';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600';

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@msnc.ca",
    href: "mailto:info@msnc.ca",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (234) 567-890",
    href: "tel:+1234567890",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Canada",
    href: "#",
  },
];

const socialLinks = [
  { name: "Instagram", icon: Share2, href: "https://instagram.com/msnccanada" },
  { name: "LinkedIn", icon: Users, href: "https://linkedin.com/company/msnc" },
  { name: "Twitter", icon: X, href: "https://twitter.com/msnccanada" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      router.push('/success/contact');
      return;
    }
    toast.error(state.message);
  }, [state, router]);

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden border-t border-slate-200">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 mix-blend-multiply pointer-events-none" aria-hidden />

      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-0.5 bg-blue-600" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600">
              Get In Touch
            </span>
          </div>
          
          <h2 className="font-black text-5xl md:text-7xl text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            We'd Love to <br />
            <span className="text-slate-500 font-serif italic font-light">Hear From You.</span>
          </h2>
          
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
            Have questions about our programs or want to get involved? Reach out and our team will get back to you shortly.
          </p>
        </div>

        {/* Editorial Divider */}
        <div className="w-full mb-16">
          <div className="h-0.75 bg-slate-900 w-full" />
          <div className="h-px bg-slate-200 w-full mt-1" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Contact Info & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {contactInfo.map((info) => (
              <div 
                key={info.title} 
                className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-600 hover:bg-slate-50 hover:-translate-y-1 transition-all duration-500 ease-out"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors duration-500">
                    <info.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{info.title}</h3>
                    {info.href === "#" ? (
                      <p className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{info.value}</p>
                    ) : (
                      <a href={info.href} className={`text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors ${FOCUS_BASE}`}>
                        {info.value}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Block */}
            <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white mt-2 hover:-translate-y-1 transition-all duration-500">
              <h3 className="text-3xl font-black mb-3">Follow Us</h3>
              <p className="text-slate-400 mb-8 text-sm font-medium leading-relaxed">
                Stay connected with our community through our global channels.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all duration-500 ease-out group ${FOCUS_BASE}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <div className="p-8 md:p-14 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-500">
              <h3 className="text-3xl font-black text-slate-900 mb-10">Send Us a Message</h3>
              
              <form action={formAction} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Jean"
                      className={`h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-blue-600 transition-all duration-500 px-6 font-medium text-slate-900 placeholder:text-slate-400 ${FOCUS_BASE}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Claude"
                      className={`h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-blue-600 transition-all duration-500 px-6 font-medium text-slate-900 placeholder:text-slate-400 ${FOCUS_BASE}`}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <input type="hidden" name="subject" value="General Inquiry" />
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jean.claude@example.com"
                    className={`h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-blue-600 transition-all duration-500 px-6 font-medium text-slate-900 placeholder:text-slate-400 ${FOCUS_BASE}`}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we support your journey today?"
                    className={`rounded-3xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-blue-600 transition-all duration-500 p-6 font-medium text-slate-900 resize-none placeholder:text-slate-400 ${FOCUS_BASE}`}
                  />
                </div>

                {state?.message && (
                  <div className={cn(
                    "p-5 rounded-2xl border font-bold flex items-center gap-3",
                    state.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  )}>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      state.success ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                    )} />
                    {state.message}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className={`group w-full h-16 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/25 hover:scale-[1.02] ${FOCUS_BASE}`}
                >
                  {isPending ? "Dispatching..." : "Dispatch Message"}
                  <Send className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                </Button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

