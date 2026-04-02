"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 text-base font-medium text-primary shadow-sm transition-all duration-300",
          "placeholder:text-slate-300 placeholder:font-normal",
          "file:border-0 file:bg-transparent file:text-sm file:font-black file:text-primary",
          "focus-visible:outline-none focus-visible:border-secondary focus-visible:ring-4 focus-visible:ring-secondary/5",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
          "md:text-sm lg:text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
