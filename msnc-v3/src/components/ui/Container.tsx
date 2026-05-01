import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * If true, removes the max-width constraint for full-bleed editorial sections
   */
  fullBleed?: boolean;
}

/**
 * MSNC Global Container
 * Ensures strict horizontal alignment across all homepage sections.
 * Matches the .container-editorial specification.
 */
export default function Container({ 
  children, 
  className, 
  fullBleed = false 
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16", // Editorial gutters
        !fullBleed && "max-w-[1400px]",          // Standardized max-width
        className
      )}
    >
      {children}
    </div>
  );
}