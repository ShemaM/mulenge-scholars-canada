'use client'

import Link from 'next/link'
import { RefreshCcw, Home } from 'lucide-react'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center relative">
      {/* Structural Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-7xl md:text-9xl font-black text-[#002147] tracking-tighter mb-4">
          Error.
        </h1>
        <p className="text-xl text-slate-500 font-medium mb-12">
          The requested page encountered an unexpected issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="h-14 px-8 bg-[#002147] text-white rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-blue-700 transition-all active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="h-14 px-8 border-2 border-slate-200 text-[#002147] rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-slate-50 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
