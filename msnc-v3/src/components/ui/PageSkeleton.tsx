import { cn } from '@/lib/utils'

export function HomeSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Strategy Section */}
      <div className="p-8 rounded-2xl bg-slate-50">
        <div className="h-8 w-64 bg-slate-200 rounded-xl mb-6" />
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-slate-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="p-8 rounded-2xl bg-slate-50 border-t border-slate-200">
        <div className="h-8 w-80 bg-slate-200 rounded-xl mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="py-24">
        <div className="h-10 w-96 bg-slate-200 rounded-xl mx-auto mb-12" />
        <div className="flex flex-wrap justify-center gap-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-12 w-32 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function EventsSkeleton() {
  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8 hidden lg:block">
          <div className="h-16 w-16 bg-slate-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-10 w-48 bg-slate-200 rounded-lg" />
            <div className="h-24 w-full bg-slate-200 rounded-lg" />
          </div>
        </div>
        <div className="lg:col-span-8 grid gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid sm:grid-cols-12 h-80 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
