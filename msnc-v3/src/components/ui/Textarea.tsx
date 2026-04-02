"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[160px] w-full rounded-[2rem] border-2 border-slate-200 bg-white px-6 py-5 text-base font-medium text-primary shadow-sm transition-all duration-300",
        "placeholder:text-slate-300 placeholder:font-normal",
        "focus-visible:outline-none focus-visible:border-secondary focus-visible:ring-4 focus-visible:ring-secondary/5",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
        "resize-none md:text-sm lg:text-base",
        /* Custom scrollbar matching globals.css */
        "scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
