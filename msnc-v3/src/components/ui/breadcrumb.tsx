"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const breadcrumbVariants = cva(
  "inline-flex items-center text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
  {
    variants: {
      variant: {
        default: "text-slate-400 font-medium",
        editorial: "text-primary/50 font-black hover:text-primary", 
        admin: "text-slate-500 font-black",
      },
    },
    defaultVariants: {
      variant: "editorial",
    },
  }
);

interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode;
  auto?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, variant, separator = <ChevronRight className="w-3.5 h-3.5" />, auto = false, children, ...props }, ref) => {
    const pathname = usePathname();

    // HCI Principle #4: Error Prevention - Don't render on Home
    if (auto && (pathname === "/" || !pathname)) return null;

    const formatSegment = (segment: string) => {
      return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(
          breadcrumbVariants({ variant }), 
          auto && "max-w-7xl mx-auto px-6 md:px-12", 
          className
        )}
        {...props}
      >
        {auto ? (
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathname
              .split("/")
              .filter(Boolean)
              .map((segment, index, array) => {
                const href = "/" + array.slice(0, index + 1).join("/");
                const isLast = index === array.length - 1;

                return (
                  <React.Fragment key={href}>
                    <BreadcrumbSeparator className="opacity-30">{separator}</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      {isLast ? (
                        <span className="text-primary font-black" aria-current="page">
                          {formatSegment(segment)}
                        </span>
                      ) : (
                        <BreadcrumbLink href={href}>
                          {formatSegment(segment)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
          </BreadcrumbList>
        ) : (
          children
        )}
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

// --- Semantic List Components with Strict Typing ---

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("flex flex-wrap items-center gap-1.5 break-words sm:gap-2", className)}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = (asChild ? Slot : Link) as any;
    return (
      <Comp
        ref={ref}
        className={cn("transition-colors hover:text-secondary focus-visible:outline-none", className)}
        {...props}
      />
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...props }, ref) => (
    <li
      role="presentation"
      aria-hidden="true"
      ref={ref}
      className={cn("[&>svg]:size-3.5 mx-1 flex-shrink-0", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator };