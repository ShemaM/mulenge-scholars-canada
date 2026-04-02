"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const breadcrumbVariants = cva(
  "inline-flex items-center space-x-2 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        admin: "text-slate-500 uppercase tracking-[0.1em] font-black",
      },
    },
    defaultVariants: {
      variant: "default",
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
  (
    {
      className,
      variant,
      separator = <ChevronRight className="w-4 h-4" />,
      auto = false,
      children,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();

    // Helper to format URL segments (e.g., "our-story" -> "Our Story")
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
        className={cn(breadcrumbVariants({ variant }), className)}
        {...props}
      >
        {auto && pathname ? (
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
                    <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      {isLast ? (
                        <span 
                          className="text-foreground" 
                          aria-current="page"
                        >
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

// --- Semantic List Components ---

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words sm:gap-2",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }
>(({ className, href = "/", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : Link;
  return (
    <Comp
      ref={ref}
      href={href}
      className={cn(
        "transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => (
  <li
    role="presentation"
    aria-hidden="true"
    ref={ref}
    className={cn("[&>svg]:size-3.5 mx-1 opacity-50 flex-shrink-0", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    role="presentation"
    aria-hidden="true"
    ref={ref}
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
};