import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/providers"; 
import "./globals.css";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <section className="antialiased font-sans">
          <Providers>
            <Navbar />
            <main className="min-h-screen pt-20 relative">
              {children}
            </main>
            <Footer />
          </Providers>
          
          {/* Brand Watermark */}
          <div className="fixed inset-0 -z-50 pointer-events-none opacity-[0.03] bg-[radial-gradient(#002147_1px,transparent_1px)] [background-size:40px_40px]" />
        </section>
      </body>
    </html>
  );
}
