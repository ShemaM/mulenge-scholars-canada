'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCcw, Home, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('MSNC System Error:', error)
  }, [error])

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 transform origin-top pointer-events-none" />
      
      <Container className="relative z-10 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-accent/10 border-2 border-accent/20 mb-4 animate-pulse">
            <AlertCircle className="w-10 h-10 text-accent" />
          </div>

          <div className="space-y-6">
            <h1 className="font-display font-black text-5xl md:text-7xl text-primary tracking-tighter leading-none">
              System <br />
              <span className="text-accent italic font-normal">Interruption.</span>
            </h1>
            
            <p className="text-xl text-primary/70 font-medium leading-relaxed max-w-lg mx-auto">
              We encountered a connection issue while reaching our database. 
              The network remains active, but this specific page is temporarily unreachable.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="text-left max-w-xl mx-auto">
              <details className="group rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-black text-[10px] uppercase tracking-widest text-primary/60 hover:bg-slate-100 transition-colors">
                  Technical Diagnostics
                  <ChevronRight className="w-4 h-4 transition-transform rotate-90 group-open:rotate-90" />
                </summary>
                <div className="p-6 bg-slate-900 text-red-400 font-mono text-xs overflow-auto max-h-60 border-t border-white/5">
                  <p className="mb-2 font-bold text-white uppercase">[Error Message]</p>
                  {error.message}
                  <p className="mt-4 mb-2 font-bold text-white uppercase">[Stack Trace]</p>
                  {error.stack}
                </div>
              </details>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button
              onClick={() => reset()}
              size="lg"
              className="h-16 px-10 rounded-2xl bg-primary text-white shadow-xl hover:shadow-primary/20 transition-all font-black uppercase tracking-widest text-xs"
            >
              <RefreshCcw className="mr-3 w-5 h-5" />
              Attempt Reconnect
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 px-10 rounded-2xl border-2 border-slate-200 text-primary font-black uppercase tracking-widest text-xs"
            >
              <Link href="/">
                <Home className="mr-3 w-5 h-5" />
                Return to Core
              </Link>
            </Button>
          </div>

          <div className="pt-10 border-t border-slate-100 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-secondary" />
              <div className="w-6 h-6 rounded-full bg-primary" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              MSNC Infrastructure • Global Redundancy Enabled
            </p>
          </div>
        </div>
      </Container>
    </main>
  )
}
