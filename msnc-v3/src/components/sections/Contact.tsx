"use client";

import { useActionState, useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send, Share2, Users, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { submitContactForm } from "@/actions/contact";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      router.push('/success/contact');
      return;
    }
    toast.error(state.message);
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background Pattern - Low opacity to ensure text pop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0,33,71,0.03)_1px,transparent_0)] [background-size:40px_40px]" />

      <div className="container-editorial relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-slate-200 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">
              Get In Touch
            </span>
          </div>
          
          <h2 className="font-display font-black text-5xl md:text-7xl text-primary mb-8 tracking-tight">
            We'd Love to <br />
            <span className="text-secondary italic font-normal">Hear From You</span>
          </h2>
          
          <p className="text-xl text-primary/80 font-medium leading-relaxed max-w-2xl mx-auto">
            Have questions about our programs or want to get involved? Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            {contactInfo.map((info) => (
              <div key={info.title} className="group p-6 rounded-[2rem] bg-white border border-slate-200 hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-brand">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <info.icon className="w-5 h-5 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{info.title}</h3>
                    {info.href !== "#" ? (
                      <a href={info.href} className="text-lg font-bold text-primary hover:text-secondary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold text-primary">{info.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Block */}
            <div className="p-10 rounded-[2.5rem] bg-primary text-white shadow-brand">
              <h3 className="font-display text-2xl font-bold mb-2 text-white">Follow Us</h3>
              <p className="text-white/70 mb-8 text-sm font-medium">Stay connected with our community through our global channels.</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all duration-500"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <div className="p-10 md:p-14 rounded-[3rem] bg-white border border-slate-100 shadow-brand">
              <h3 className="font-display text-3xl font-black text-primary mb-10">Send Us a Message</h3>
              
              <form action={formAction} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-primary/60">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Jean"
                      className="h-14 rounded-2xl border-slate-200 focus:border-secondary focus:ring-secondary transition-all px-6 font-medium text-primary placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-primary/60">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Claude"
                      className="h-14 rounded-2xl border-slate-200 focus:border-secondary focus:ring-secondary transition-all px-6 font-medium text-primary placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-primary/60">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jean.claude@example.com"
                    className="h-14 rounded-2xl border-slate-200 focus:border-secondary focus:ring-secondary transition-all px-6 font-medium text-primary placeholder:text-slate-300"
                  />
                </div>

                <div className="space-y-3">
                  <input type="hidden" name="subject" value="General Inquiry" />
                  <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-primary/60">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we support your journey today?"
                    className="rounded-[2rem] border-slate-200 focus:border-secondary focus:ring-secondary transition-all p-6 font-medium text-primary resize-none placeholder:text-slate-300"
                  />
                </div>

                {state?.message && (
                  <div className={cn(
                    "p-5 rounded-2xl border font-bold flex items-center gap-3",
                    state.success
                      ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                      : "bg-accent/10 border-accent/20 text-accent"
                  )}>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      state.success ? "bg-emerald-500 animate-pulse" : "bg-accent"
                    )} />
                    {state.message}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full h-16 rounded-2xl bg-primary hover:bg-secondary text-white font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-secondary/20 transition-all duration-500"
                >
                  {isPending ? "Dispatching..." : "Dispatch Message"}
                  <Send className="ml-3 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
