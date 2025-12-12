"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    key: "menu",
    title: "MENU",
    href: "/menu",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop&q=85",
  },
  {
    key: "reservation",
    title: "RESERVATION",
    href: "/reservations",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&q=85",
  },
  {
    key: "restaurant",
    title: "OUR RESTAURANT",
    href: "/about#our-restaurant",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop&q=85",
  },
];

export function HeroNavStrip(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".hero-nav-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="text-white relative z-0 overflow-visible" style={{ marginTop: '-120px', paddingTop: '120px', background: 'transparent' }}>
      {/* full-width container; no max-w so it spans the screen - only cards area has black bg */}
      <div className="w-full px-1 pb-10 pt-0 sm:px-2 lg:px-3">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 bg-black/0">
          {CARDS.map((card) => {
            const { key, ...cardProps } = card;
            return <NavCard key={key} {...cardProps} />;
          })}
        </div>
      </div>
    </section>
  );
}

type NavCardProps = {
  title: string;
  href: string;
  image: string;
};

function NavCard({ title, href, image }: NavCardProps) {
  return (
    <Link
      href={href}
      data-cursor="link"
      className={cn(
        "hero-nav-card group relative flex min-h-[230px] overflow-hidden rounded-lg",
        "bg-[#050505] shadow-[0_30px_70px_rgba(0,0,0,0.75)]",
        "transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_40px_90px_rgba(0,0,0,0.8)]",
        "will-change-transform"
      )}
      onMouseMove={(e) => {
        if (typeof window === "undefined") return;
        const cardEl = e.currentTarget;
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-6px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)";
      }}
    >
      {/* background media (image or later video) */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* dark gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* bottom-right content cluster: DISCOVER + TITLE + arrow */}
      <div className="relative mt-auto flex w-full justify-end px-6 pb-5 pt-24">
        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="text-[0.55rem] uppercase tracking-[0.28em] text-white/70">
              DISCOVER
            </p>
            <p className="mt-0.5 text-xs font-display tracking-[0.24em] text-white sm:text-sm">
              {title}
            </p>
          </div>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-black/40 text-xs text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black"
            data-cursor="link"
          >
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
