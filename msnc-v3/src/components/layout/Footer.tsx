import Link from "next/link"
import { GraduationCap, Mail, MapPin } from "lucide-react" 
import { Button } from "@/components/ui/Button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 overflow-hidden relative">
      {/* Background Brand Decoration */}
      <div className="absolute -bottom-10 -right-10 text-[20vw] font-black text-white/5 select-none pointer-events-none leading-none">
        MSNC
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
<div className="flex items-center gap-3">
              <img 
                src="/media/logo.png"
                alt="MSNC Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="text-lg leading-relaxed text-slate-400 font-medium">
              Empowering the Mulenge diaspora through strategic education, mentorship, and leadership excellence.
            </p>
            
            {/* SOCIAL SVGS */}
            <div className="flex gap-4">
              {/* X (Formerly Twitter) SVG */}
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-slate-700 bg-transparent text-slate-400 hover:text-white hover:border-white transition-all p-2.5"
                asChild
              >
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </Button>

              {/* LinkedIn SVG */}
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-slate-700 bg-transparent text-slate-400 hover:text-white hover:border-white transition-all p-2.5"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>

          {/* ... Rest of the Footer (Quick Links, Contact, Newsletter) remains the same */}
          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">The Network</h4>
            <nav className="flex flex-col gap-4">
              {['About Us', 'Scholars Wall', 'Programs', 'Impact Report', 'Contact'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-lg font-medium hover:text-secondary transition-colors">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Direct Access</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</div>
                  <a href="mailto:info@msnc.ca" className="text-lg font-medium text-white hover:text-secondary transition-colors">info@msnc.ca</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Office</div>
                  <span className="text-lg font-medium text-white">Nairobi, Kenya • Winnipeg, MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Join the briefing</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stay updated with the latest breakthroughs and narratives.
            </p>
            <div className="flex flex-col gap-3">
               <input 
                type="email" 
                placeholder="Enter your email" 
                className="h-12 bg-slate-800 border-none rounded-xl px-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-secondary transition-all outline-none"
               />
               <Button variant="accent" className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            © {currentYear} Mulenge Scholars' Network Canada.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}