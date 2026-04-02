import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * If true, removes the max-width constraint for full-bleed editorial sections
   */
  fullBleed?: boolean;
}

export default function Container({ 
  children, 
  className, 
  fullBleed = false 
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-12 lg:px-20", // Generous editorial padding
        !fullBleed && "max-w-[1440px]", // Wide-format for high-end feel
        className
      )}
    >
      {children}
    </div>
  );
}