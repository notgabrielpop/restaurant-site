"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  depth?: number;
} & HTMLAttributes<HTMLDivElement>;

// Tilt disabled globally; acts as a simple wrapper to preserve structure/layout.
export function TiltCard({ children, className, ...props }: Props) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

