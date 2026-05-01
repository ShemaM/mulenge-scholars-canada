"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@/navigation"; 
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const breadcrumbVariants = cva(
  "inline-flex items-center text-2xs uppercase tracking-widest transition-all duration-300",
  {
    variants: {
      variant: {
        default: "text-muted-foreground/60 font-medium",
        editorial: "text-primary/40 font-bold hover:text-secondary",
        admin: "text-muted-foreground font-bold",
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
    const t = useTranslations("Breadcrumbs");

    // 1. Logic: Identify path segments and filter out locale indicators (en/fr)
    const pathSegments = pathname.split("/").filter(Boolean);
    const filteredSegments = pathSegments.filter(s => s !== 'en' && s !== 'fr');
    
    // HCI Principle: If we are on the Home landing page, don't show breadcrumbs (reduces noise)
    if (auto && filteredSegments.length === 0) return null;

    const formatSegment = (segment: string) => {
      // Use dictionary translation if it exists, otherwise fallback to title-case split
      if (t.has(segment as any)) {
        return t(segment as any);
      }
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
          auto && "container-editorial py-6 w-full", 
          className
        )}
        {...props}
      >
        {auto ? (
          <BreadcrumbList>
            {/* Start with Home anchor */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
            </BreadcrumbItem>

            {filteredSegments.map((segment, index) => {
              const label = formatSegment(segment);
              // Build clean href: e.g. /about or /about/history
              const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === filteredSegments.length - 1;

              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <span className="text-primary font-bold" aria-current="page">
                        {label}
                      </span>
                    ) : (
                      <BreadcrumbLink href={href}>
                        {label}
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

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("flex flex-wrap items-center gap-1.5 break-words", className)}
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

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean; href: string }>(
  ({ className, asChild, href, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;
    return (
      <Comp
        ref={ref as any}
        href={href}
        className={cn("transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm", className)}
        {...props}
      />
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * CRITICAL FIX: The separator is a SPAN, not an LI.
 * This prevents the hydration error [<li> cannot be a descendant of <li>]
 */
const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span
      role="presentation"
      aria-hidden="true"
      ref={ref}
      className={cn("[&>svg]:size-3.5 mx-1 flex-shrink-0 text-muted-foreground/30", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </span>
  )
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator };