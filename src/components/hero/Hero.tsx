"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function Hero(): JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Set final state without animations
      return;
    }

    const ctx = gsap.context(() => {
      // Background animation
      const bg = heroRef.current?.querySelector(".hero-bg");
      if (bg) {
        gsap.fromTo(
          bg,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          }
        );
      }

      // WELCOME TO line
      const welcomeLine = heroRef.current?.querySelector(".hero-welcome");
      if (welcomeLine) {
        gsap.fromTo(
          welcomeLine,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      // Zaitoone title - stagger letters
      const titleChars = titleRef.current?.querySelectorAll(".hero-title-char");
      if (titleChars && titleChars.length > 0) {
        gsap.fromTo(
          titleChars,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.04,
            delay: 0.3,
          }
        );
      }

      // Button animation
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.6,
          }
        );
      }

      // Floating cards - independent infinite animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const distance = 12 + index * 2; // Vary distance: 12, 14, 16, 18
        const duration = 4 + index * 0.5; // Vary duration: 4, 4.5, 5, 5.5
        
        gsap.to(card, {
          y: -distance,
          duration: duration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3,
        });
      });

      // Bottom left and right text animations
      const bottomLeft = heroRef.current?.querySelector(".hero-bottom-left");
      const bottomRight = heroRef.current?.querySelector(".hero-bottom-right");
      
      if (bottomLeft) {
        gsap.fromTo(
          bottomLeft,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.8,
          }
        );
      }

      if (bottomRight) {
        gsap.fromTo(
          bottomRight,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.9,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const cardImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop",
  ];

  // More random positions scattered across the screen, avoiding bottom corners where text/badges are
  const cardPositions = [
    "top-[15%] left-[8%] sm:top-[18%] sm:left-[10%] md:top-[20%] md:left-[12%]",
    "top-[12%] right-[10%] sm:top-[15%] sm:right-[12%] md:top-[18%] md:right-[15%]",
    "top-[45%] left-[20%] sm:top-[48%] sm:left-[22%] md:top-[50%] md:left-[25%]",
    "top-[60%] right-[25%] sm:top-[62%] sm:right-[28%] md:top-[65%] md:right-[30%]",
    "top-[35%] left-[50%] sm:top-[38%] sm:left-[52%] md:top-[40%] md:left-[55%]",
  ];

  const cardSizes = [
    "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40",
    "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44",
    "w-26 h-26 sm:w-34 sm:h-34 md:w-42 md:h-42",
    "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40",
    "w-30 h-30 sm:w-38 sm:h-38 md:w-46 md:h-46",
  ];

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-visible flex items-center justify-center -mt-24"
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
    >
      {/* Background Video - Full viewport width and height */}
      <div 
        className="fixed inset-0 hero-bg -z-10"
        style={{ 
          width: '100vw', 
          height: '100vh',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            width: '100vw', 
            height: '100vh', 
            objectFit: 'cover',
            minWidth: '100vw',
            minHeight: '100vh'
          }}
        >
          <source src="/assets/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-[520px] px-6 text-center">
        {/* WELCOME TO */}
        <p className="hero-welcome text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90 mb-2">
          WELCOME TO
        </p>

        {/* Zaitoone Title */}
        <h1
          ref={titleRef}
          className="font-forum text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight"
        >
          {Array.from("Zaitoone").map((char, idx) => (
            <span
              key={`${char}-${idx}`}
              className={cn(
                "hero-title-char inline-block",
                char === " " ? "w-2" : ""
              )}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Book a Table Button */}
        <div className="relative inline-block">
          {/* Very subtle moving glow effect - two colors */}
          <div 
            className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-white/60 via-accent-gold/45 to-white/60 blur-lg pointer-events-none"
            style={{
              animation: "glow 4s ease-in-out infinite",
            }}
          />
          <Link
            ref={buttonRef}
            href="/reservations"
            data-cursor="link"
            className="relative z-10 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm sm:text-base font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.05)] hover:bg-black/90 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group"
            style={{
              animation: "innerGlow 4s ease-in-out infinite",
            }}
          >
            <span className="relative z-10">
              Book a Table
            </span>
          </Link>
        </div>
      </div>

      {/* Floating Food Cards */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {cardImages.map((image, index) => {
          return (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={cn(
                "absolute hero-card rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
                cardPositions[index],
                cardSizes[index],
                "group cursor-pointer pointer-events-auto transition-transform duration-300"
              )}
              style={{
                transformStyle: "preserve-3d",
              }}
              onMouseMove={(e) => {
                if (typeof window === "undefined") return;
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`Dish ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Right - Horeca Awards + Badge */}
      <div className="hero-bottom-right absolute bottom-8 right-6 sm:bottom-12 sm:right-10 md:bottom-16 md:right-12 z-10 text-white/90 text-right">
        <div className="flex items-center justify-end gap-2 mb-2">
          <span className="text-xs sm:text-sm">Horeca Awards</span>
          <span className="text-accent-gold">★</span>
        </div>
        <div className="flex justify-end">
          <div 
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
            style={{
              animation: "spin 20s linear infinite",
            }}
          >
            {/* Scalloped shape background - flower/cogwheel shape */}
            <div className="absolute inset-0" style={{
              clipPath: "polygon(50% 0%, 60% 10%, 75% 5%, 85% 20%, 100% 25%, 95% 40%, 100% 50%, 95% 60%, 100% 75%, 85% 80%, 75% 95%, 60% 90%, 50% 100%, 40% 90%, 25% 95%, 15% 80%, 0% 75%, 5% 60%, 0% 50%, 5% 40%, 0% 25%, 15% 20%, 25% 5%, 40% 10%)",
              background: "rgba(0, 0, 0, 0.6)",
            }} />
            {/* Inner contour */}
            <div className="absolute inset-0.5" style={{
              clipPath: "polygon(50% 0%, 60% 10%, 75% 5%, 85% 20%, 100% 25%, 95% 40%, 100% 50%, 95% 60%, 100% 75%, 85% 80%, 75% 95%, 60% 90%, 50% 100%, 40% 90%, 25% 95%, 15% 80%, 0% 75%, 5% 60%, 0% 50%, 5% 40%, 0% 25%, 15% 20%, 25% 5%, 40% 10%)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
            }} />
            {/* Text with slight misalignment - counter-rotates to stay readable */}
            <p className="text-[9px] sm:text-[10px] font-display text-accent-gold/90 text-center leading-tight relative" style={{
              animation: "spin 20s linear infinite reverse",
            }}>
              <span className="block">SINCE</span>
              <span className="block ml-1">2014</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Left - Find Us */}
      <div className="hero-bottom-left absolute bottom-8 left-6 sm:bottom-12 sm:left-10 md:bottom-16 md:left-12 z-10 text-white/90">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-1 opacity-80">
          / FIND US
        </p>
        <p className="text-xs sm:text-sm">
          Str. Nicolae G. Caramfil, Nr.2, București
        </p>
      </div>
    </section>
  );
}
