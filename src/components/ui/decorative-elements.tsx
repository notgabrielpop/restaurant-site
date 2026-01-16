"use client";

import { cn } from "@/lib/utils";

// Elegant corner accents for framing content
export function CornerAccent({ 
  position = "top-left",
  size = "md",
  className 
}: { 
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const positionClasses = {
    "top-left": "top-0 left-0 border-t border-l",
    "top-right": "top-0 right-0 border-t border-r",
    "bottom-left": "bottom-0 left-0 border-b border-l",
    "bottom-right": "bottom-0 right-0 border-b border-r"
  };

  return (
    <div 
      className={cn(
        "absolute pointer-events-none border-accent-gold/40",
        sizeClasses[size],
        positionClasses[position],
        className
      )}
    />
  );
}

// All four corners together
export function CornerFrame({ 
  size = "md",
  className,
  inset = 4
}: { 
  size?: "sm" | "md" | "lg";
  className?: string;
  inset?: number;
}) {
  const insetClass = `inset-${inset}`;
  
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)} style={{ margin: `${inset * 4}px` }}>
      <CornerAccent position="top-left" size={size} />
      <CornerAccent position="top-right" size={size} />
      <CornerAccent position="bottom-left" size={size} />
      <CornerAccent position="bottom-right" size={size} />
    </div>
  );
}

// Elegant horizontal divider with ornament
export function OrnamentDivider({ 
  className,
  variant = "gold"
}: { 
  className?: string;
  variant?: "gold" | "white" | "subtle";
}) {
  const colorClasses = {
    gold: "text-accent-gold",
    white: "text-white/60",
    subtle: "text-white/20"
  };

  return (
    <div className={cn("flex items-center justify-center gap-4 my-8", className)}>
      <div className={cn("h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-current", colorClasses[variant])} />
      <svg 
        viewBox="0 0 24 24" 
        className={cn("w-6 h-6 opacity-60", colorClasses[variant])}
        fill="currentColor"
      >
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
      <div className={cn("h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-current", colorClasses[variant])} />
    </div>
  );
}

// Elegant section title with decorative elements
export function ElegantTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right"
  };

  return (
    <div className={cn("max-w-2xl space-y-4", alignClasses[align], className)}>
      {eyebrow && (
        <div className="flex items-center gap-3">
          {align === "center" && <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />}
          {align === "left" && <div className="w-8 h-px bg-accent-gold/60" />}
          <span className="text-xs font-forum uppercase tracking-[0.3em] text-accent-gold">
            {eyebrow}
          </span>
          {align === "center" && <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />}
          {align === "right" && <div className="w-8 h-px bg-accent-gold/60" />}
        </div>
      )}
      <h2 className="font-forum text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg font-forum leading-relaxed text-white/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Floating decorative dots/orbs
export function FloatingOrb({
  size = "md",
  position,
  delay = 0,
  className
}: {
  size?: "sm" | "md" | "lg";
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay?: number;
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  return (
    <div 
      className={cn(
        "absolute rounded-full bg-accent-gold/30 blur-sm floating-orb pointer-events-none",
        sizeClasses[size],
        className
      )}
      style={{ 
        ...position,
        animationDelay: `${delay}s`
      }}
    />
  );
}

// Geometric pattern background
export function GeometricPattern({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]", className)}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arabesque" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path 
              d="M30 0 L60 30 L30 60 L0 30 Z M30 15 L45 30 L30 45 L15 30 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
            />
            <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabesque)" className="text-accent-gold" />
      </svg>
    </div>
  );
}

// Elegant gradient overlay
export function GradientOverlay({ 
  variant = "radial",
  className 
}: { 
  variant?: "radial" | "linear" | "corner";
  className?: string;
}) {
  const gradients = {
    radial: "bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]",
    linear: "bg-gradient-to-b from-accent-gold/5 via-transparent to-accent-gold/5",
    corner: "bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.1)_0%,transparent_50%)]"
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none", gradients[variant], className)} />
  );
}

// Animated line accent
export function AnimatedLine({ 
  orientation = "horizontal",
  className 
}: { 
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div 
      className={cn(
        "bg-gradient-to-r from-transparent via-accent-gold/60 to-transparent animate-shimmer-line",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    />
  );
}

// Section wrapper with elegant styling
export function ElegantSection({
  children,
  className,
  withPattern = false,
  withGradient = true,
  withCorners = false
}: {
  children: React.ReactNode;
  className?: string;
  withPattern?: boolean;
  withGradient?: boolean;
  withCorners?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {withPattern && <GeometricPattern />}
      {withGradient && <GradientOverlay variant="radial" />}
      {withCorners && <CornerFrame size="lg" inset={6} />}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
