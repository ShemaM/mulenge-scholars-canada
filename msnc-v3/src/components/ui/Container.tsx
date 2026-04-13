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
        "mx-auto w-full px-4 md:px-8 lg:px-12 xl:px-16", // Tightened editorial padding
        !fullBleed && "max-w-7xl", // Consistent max-w-7xl from globals .container-editorial
        className
      )}
    >
      {children}
    </div>
  );
}