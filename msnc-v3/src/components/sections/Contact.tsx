/**
 * MSNC Contact — Clean Homepage CTA
 * Simple, no grids, no dark backgrounds.
 */

'use client'

import { ArrowRight, Mail, Instagram } from 'lucide-react'
import { Link } from '@/navigation'

export default function Contact() {
  return (
    <section className="section bg-white border-t border-border">
      <div className="container-editorial">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-secondary" aria-hidden="true" />
            <span className="section-label text-secondary">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary tracking-tight mb-8">
            Ready to connect?
          </h2>
          <p className="text-xl text-muted-foreground font-sans leading-relaxed mb-12">
            Whether you are a student seeking support, a mentor looking to give back, or a partner interested in collaboration, we would love to hear from you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn btn-primary group"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:info@mulengescholars.org"
              className="btn btn-outline"
            >
              <Mail className="h-4 w-4 mr-2" />
              info@mulengescholars.org
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex items-center gap-6">
            <a
              href="https://instagram.com/msnccanada"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="section-label">@msnccanada</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

