"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function HeroNavStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const CARDS = [
    {
      key: "menu",
      title: t("strip.menu"),
      href: "/menu",
      image: "/assets/Meals/meals-name/Cotlet Miel.png",
    },
    {
      key: "reservation",
      title: t("strip.reservation"),
      href: "/reservations",
      image: "/assets/Meals/meals-name/Mix de fructe de mare la gratar cu salata ruccola.png",
    },
    {
      key: "restaurant",
      title: t("strip.restaurant"),
      href: "/about#our-restaurant",
      image: "/assets/Meals/meals-name/Fatteh Humus cu Carne si Muguri de Pin.png",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Ensure cards are visible even without animation
      const cards = sectionRef.current?.querySelectorAll(".hero-nav-card");
      cards?.forEach((card) => {
        (card as HTMLElement).style.opacity = "1";
        (card as HTMLElement).style.transform = "translateY(0)";
      });
      return;
    }

    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll(".hero-nav-card");
        if (cards && cards.length > 0) {
          // Reset to initial state first
          gsap.set(cards, { y: 40, opacity: 0 });
          
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white relative z-10 overflow-visible"
    >
      <div className="w-full px-1 py-1 sm:py-1.5 lg:py-2">
        <div className="grid gap-1 md:grid-cols-3">
          {CARDS.map((card) => {
            const { key, ...cardProps } = card;
            return <NavCard key={key} {...cardProps} discover={t("strip.discover")} />;
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
  discover: string;
};

function NavCard({ title, href, image, discover }: NavCardProps) {
  return (
    <Link
      href={href}
      data-cursor="link"
      className={cn(
        "hero-nav-card group relative flex min-h-[200px] md:min-h-[180px] lg:min-h-[220px] overflow-hidden rounded-sm",
        "bg-[#050505]",
        "transition-all duration-300 hover:z-10 hover:brightness-110",
        "will-change-transform"
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="relative mt-auto flex w-full justify-end px-6 pb-5 pt-24">
        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="text-[0.55rem] font-forum uppercase tracking-[0.28em] text-white/70">
              {discover}
            </p>
            <p className="mt-0.5 text-xs font-forum tracking-[0.24em] text-white sm:text-sm">
              {title}
            </p>
          </div>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/80 bg-black/40 text-xs text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black"
            data-cursor="link"
          >
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
