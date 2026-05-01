"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border-2 border-border bg-transparent text-primary hover:border-primary/30 hover:bg-paper-50 shadow-sm",
        secondary: "bg-secondary text-white shadow-sm hover:bg-secondary/90 hover:-translate-y-0.5",
        ghost: "text-primary hover:bg-paper-50",
        link: "text-primary underline-offset-8 hover:underline decoration-2 decoration-secondary/30 hover:decoration-secondary",
        accent: "bg-accent text-white shadow-sm hover:bg-primary hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 rounded-xl px-8",
        sm: "h-10 rounded-lg px-4 text-2xs",
        lg: "h-14 rounded-2xl px-10 text-xs",
        xl: "h-16 rounded-[1.5rem] px-12 text-sm",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), isLoading && "cursor-wait")}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="opacity-70">
               {typeof children === 'string' ? 'Processing...' : children}
            </span>
          </div>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }