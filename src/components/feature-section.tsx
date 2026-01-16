"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useFeatureSectionGsap } from "@/hooks/use-feature-section-gsap";

export type FeatureSectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  reverse?: boolean;
  images: { src: string; alt: string }[];
  className?: string;
  dark?: boolean;
};

export function FeatureSection({
  eyebrow,
  title,
  body,
  ctaHref,
  ctaLabel = "Discover",
  reverse = false,
  images,
  className,
  dark = true,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  useFeatureSectionGsap(sectionRef, { reverse });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative mx-auto max-w-wide px-4 py-20 sm:px-6 md:py-32 lg:px-10 overflow-hidden",
        className
      )}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={cn(
            "absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]",
            reverse 
              ? "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-accent-gold" 
              : "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-accent-gold"
          )}
        />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="floating-orb absolute w-2 h-2 rounded-full bg-accent-gold/20 blur-sm"
          style={{ top: '20%', left: reverse ? '80%' : '10%', animationDelay: '0s' }}
        />
        <div 
          className="floating-orb absolute w-3 h-3 rounded-full bg-accent-gold/15 blur-sm"
          style={{ top: '60%', left: reverse ? '70%' : '25%', animationDelay: '2s' }}
        />
        <div 
          className="floating-orb absolute w-2 h-2 rounded-full bg-accent-gold/25 blur-sm"
          style={{ top: '80%', left: reverse ? '85%' : '5%', animationDelay: '4s' }}
        />
      </div>

      {/* Subtle top border with gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        className={cn(
          "relative grid gap-12 md:gap-16 lg:gap-20 items-center md:grid-cols-2",
          reverse && "md:grid-flow-col-dense"
        )}
      >
        {/* Text column */}
        <div className={cn("feature-text space-y-6", reverse && "md:order-2")}>
          {/* Eyebrow with decorative line */}
          {eyebrow && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-accent-gold/80 to-accent-gold/20" />
              <p className="text-xs font-forum uppercase tracking-[0.35em] text-accent-gold">
                {eyebrow}
              </p>
            </div>
          )}
          
          {/* Title with elegant styling */}
          <h2 className="font-forum text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] text-shadow-elegant">
            {title}
          </h2>
          
          {/* Body with better spacing */}
          <p className="max-w-xl text-base md:text-lg font-forum leading-relaxed text-white/60">
            {body}
          </p>

          {/* Elegant CTA button */}
          {ctaHref && (
            <div className="pt-4">
              <Link
                href={ctaHref}
                data-cursor="link"
                className="group inline-flex items-center gap-3 px-6 py-3 border border-accent-gold/30 rounded-sm 
                         text-sm font-forum uppercase tracking-[0.25em] text-accent-gold
                         transition-all duration-500 hover:bg-accent-gold/10 hover:border-accent-gold/60
                         hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
              >
                {ctaLabel}
                <span 
                  aria-hidden="true" 
                  className="text-lg transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Image collage with elegant framing */}
        <div
          className={cn(
            "feature-images relative flex h-full flex-col gap-5 md:gap-6",
            reverse && "md:order-1"
          )}
        >
          {/* Corner decorative accents */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-accent-gold/20 rounded-tl-sm pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b border-r border-accent-gold/20 rounded-br-sm pointer-events-none" />
          
          {images.slice(0, 3).map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className={cn(
                "elegant-image-frame relative overflow-hidden bg-black/40",
                "shadow-[0_20px_60px_rgba(0,0,0,0.6)]",
                "transition-all duration-700 ease-out",
                index === 0 ? "h-64 md:h-80" : "h-48 md:h-56",
                index === 1 && "md:ml-12 md:-mt-8",
                index === 2 && "md:mr-12 md:-mt-8",
                "group hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-1000 ease-out will-change-transform 
                         group-hover:scale-[1.08]"
              />
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[6]" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-700 z-[7]" />
              
              {/* Elegant corner accent on hover */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/0 
                            group-hover:border-white/30 transition-all duration-500 z-10" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/0 
                            group-hover:border-white/30 transition-all duration-500 z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
