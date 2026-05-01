import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="font-display text-3xl text-primary tracking-tighter">
          MSNC<span className="text-secondary">.</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-2xs font-black uppercase tracking-widest text-slate-500">
          <Link href="/about" className="hover:text-primary transition-colors">Our Story</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Journal</Link>
          <Link href="/join" className="px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary hover:text-primary transition-all">
            Join Network
          </Link>
        </nav>

      </div>
    </header>
  );
}