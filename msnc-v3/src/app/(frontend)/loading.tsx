'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Editorial Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-900/10 border-t-slate-900" />
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-sky-400/10 border-b-sky-400 [animation-duration:3s]" />
        <div className="absolute font-display font-black text-slate-900 text-xl">M</div>
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">
          Mulenge Scholars
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse" />
          <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse delay-75" />
          <span className="h-1 w-1 rounded-full bg-sky-400 animate-pulse delay-150" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden bg-slate-50">
        <div className="h-full w-full bg-gradient-to-r from-slate-900 via-sky-400 to-slate-900 origin-left animate-pulse" />
      </div>
    </div>
  );
}