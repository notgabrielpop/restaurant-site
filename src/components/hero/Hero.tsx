"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [mainVideoLoaded, setMainVideoLoaded] = useState(false);
  const [cardVideosLoaded, setCardVideosLoaded] = useState<boolean[]>([false, false, false, false]);

  // Ensure main video loads and plays properly - HIGH PRIORITY
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setMainVideoLoaded(true);
      video.play().catch(() => {});
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    // Start loading immediately
    video.load();
    
    // Try to play as soon as possible
    const playAttempt = video.play();
    if (playAttempt !== undefined) {
      playAttempt
        .then(() => setMainVideoLoaded(true))
        .catch(() => {
          // Autoplay was prevented, wait for user interaction or canplaythrough
        });
    }

    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("ended", handleEnded);
    
    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Load card videos after main video or with a slight delay
  useEffect(() => {
    const loadCardVideos = () => {
      cardVideoRefs.current.forEach((video, index) => {
        if (video) {
          video.load();
          video.play().catch(() => {});
          
          const handleLoaded = () => {
            setCardVideosLoaded(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          };
          
          video.addEventListener("canplay", handleLoaded, { once: true });
        }
      });
    };

    // Load card videos after main video loads or after 1 second, whichever comes first
    if (mainVideoLoaded) {
      loadCardVideos();
    } else {
      const timeout = setTimeout(loadCardVideos, 1000);
      return () => clearTimeout(timeout);
    }
  }, [mainVideoLoaded]);

  // Force animation key update when pathname changes to trigger re-animation
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [pathname]);

  useLayoutEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Set visible state without animations
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.hero-welcome, .hero-title-char, .hero-bottom-left, .hero-bottom-right');
        elements.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
        if (buttonRef.current) {
          buttonRef.current.style.opacity = '1';
          buttonRef.current.style.transform = 'none';
        }
      }
      return;
    }

    // Clean up previous context
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    // Kill any existing tweens on these elements
    gsap.killTweensOf(".hero-welcome");
    gsap.killTweensOf(".hero-title-char");
    gsap.killTweensOf(".hero-bottom-left");
    gsap.killTweensOf(".hero-bottom-right");
    if (buttonRef.current) gsap.killTweensOf(buttonRef.current);
    cardsRef.current.forEach(card => {
      if (card) gsap.killTweensOf(card);
    });

    // Small delay to ensure DOM is ready after navigation
    const initTimeout = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        // WELCOME TO line
        const welcomeLine = heroRef.current?.querySelector(".hero-welcome");
        if (welcomeLine) {
          gsap.fromTo(
            welcomeLine,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: 0,
            }
          );
        }

        // Zaitoone title - stagger letters
        const titleChars = titleRef.current?.querySelectorAll(".hero-title-char");
        if (titleChars && titleChars.length > 0) {
          gsap.fromTo(
            titleChars,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
              stagger: 0.03,
              delay: 0.1,
            }
          );
        }

        // Button animation
        if (buttonRef.current) {
          gsap.fromTo(
            buttonRef.current,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: 0.3,
            }
          );
        }

        // Floating cards - subtle, elegant floating animation
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          const distance = 6 + (index % 2) * 2;
          const duration = 5 + index * 0.8;
          
          gsap.to(card, {
            y: -distance,
            duration: duration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5,
          });
        });

        // Bottom left and right text animations
        const bottomLeft = heroRef.current?.querySelector(".hero-bottom-left");
        const bottomRight = heroRef.current?.querySelector(".hero-bottom-right");
        
        if (bottomLeft) {
          gsap.fromTo(
            bottomLeft,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: 0.4,
            }
          );
        }

        if (bottomRight) {
          gsap.fromTo(
            bottomRight,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: 0.5,
            }
          );
        }
      }, heroRef);
    }, 50);

    return () => {
      clearTimeout(initTimeout);
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      cardsRef.current.forEach(card => {
        if (card) gsap.killTweensOf(card);
      });
    };
  }, [animationKey]); // Re-run when animationKey changes

  const cardVideos = [
    "/assets/videos/ZAITOONE STORY 1.mp4",
    "/assets/videos/ZAITOONE STORY 3.mp4",
    "/assets/videos/Story 4 Zaitoone.mp4",
    "/assets/videos/Story 5 Zaitoone.mp4",
  ];

  const cardPositions = [
    "top-[22%] left-[3%] sm:left-[4%] md:left-[6%] lg:left-[8%]",
    "top-[52%] left-[4%] sm:left-[5%] md:left-[7%] lg:left-[9%]",
    "top-[22%] right-[3%] sm:right-[4%] md:right-[6%] lg:right-[8%]",
    "top-[52%] right-[4%] sm:right-[5%] md:right-[7%] lg:right-[9%]",
  ];

  const cardSizes = [
    "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40",
    "w-18 h-18 sm:w-22 sm:h-22 md:w-28 md:h-28 lg:w-36 lg:h-36",
    "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40",
    "w-18 h-18 sm:w-22 sm:h-22 md:w-28 md:h-28 lg:w-36 lg:h-36",
  ];

  return (
    <section
      ref={heroRef}
      key={animationKey}
      className="relative overflow-hidden flex items-center justify-center bg-black"
      style={{ 
        width: '100vw', 
        height: '100vh',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        marginTop: '-96px',
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* Loading placeholder - shows while video loads */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-black transition-opacity duration-700",
            mainVideoLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={cn(
            "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500",
            mainVideoLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <source src="/assets/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 z-[1]" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-[520px] px-6 text-center mt-12 sm:mt-16 md:mt-20">
        <p className="hero-welcome text-xs sm:text-sm font-forum uppercase tracking-[0.3em] text-white/90 mb-2 opacity-0">
          {t("hero.welcome")}
        </p>

        <h1
          ref={titleRef}
          className="font-forum text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight"
        >
          {Array.from("Zaitoone").map((char, idx) => (
            <span
              key={`${char}-${idx}`}
              className={cn(
                "hero-title-char inline-block opacity-0",
                char === " " ? "w-2" : ""
              )}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="relative inline-block">
          <div 
            className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-white/60 via-accent-gold/45 to-white/60 blur-lg pointer-events-none"
            style={{ animation: "glow 4s ease-in-out infinite" }}
          />
          <Link
            ref={buttonRef}
            href="/reservations"
            data-cursor="link"
            className="relative z-10 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm sm:text-base font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.05)] hover:bg-black/90 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group opacity-0"
            style={{ animation: "innerGlow 4s ease-in-out infinite" }}
          >
            <span className="relative z-10 font-forum">
              {t("hero.book")}
            </span>
          </Link>
        </div>
      </div>

      {/* Floating Video Cards */}
      <div className="absolute inset-0 pointer-events-none z-[5] hidden sm:block">
        {cardVideos.map((videoSrc, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={cn(
              "absolute rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-white/10",
              cardPositions[index],
              cardSizes[index],
              "transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            )}
          >
            <div className="relative w-full h-full bg-[#1a1a1a]">
              {/* Loading shimmer */}
              <div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-500",
                  cardVideosLoaded[index] ? "opacity-0" : "opacity-100 animate-pulse"
                )}
              />
              <video
                ref={(el) => {
                  cardVideoRefs.current[index] = el;
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className={cn(
                  "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500",
                  cardVideosLoaded[index] ? "opacity-100" : "opacity-0"
                )}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Right */}
      <div className="hero-bottom-right absolute bottom-8 right-4 sm:bottom-10 sm:right-6 md:bottom-12 md:right-8 lg:bottom-16 lg:right-10 z-10 text-white/90 text-right opacity-0">
        <div className="flex items-center justify-end gap-2 mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs md:text-sm font-forum">{t("hero.awards")}</span>
          <span className="text-accent-gold text-xs sm:text-sm">★</span>
        </div>
        <div className="flex justify-end">
          <div 
            className="relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center"
            style={{ animation: "spin 20s linear infinite" }}
          >
            <div className="absolute inset-0" style={{
              clipPath: "polygon(50% 0%, 60% 10%, 75% 5%, 85% 20%, 100% 25%, 95% 40%, 100% 50%, 95% 60%, 100% 75%, 85% 80%, 75% 95%, 60% 90%, 50% 100%, 40% 90%, 25% 95%, 15% 80%, 0% 75%, 5% 60%, 0% 50%, 5% 40%, 0% 25%, 15% 20%, 25% 5%, 40% 10%)",
              background: "rgba(0, 0, 0, 0.6)",
            }} />
            <div className="absolute inset-0.5" style={{
              clipPath: "polygon(50% 0%, 60% 10%, 75% 5%, 85% 20%, 100% 25%, 95% 40%, 100% 50%, 95% 60%, 100% 75%, 85% 80%, 75% 95%, 60% 90%, 50% 100%, 40% 90%, 25% 95%, 15% 80%, 0% 75%, 5% 60%, 0% 50%, 5% 40%, 0% 25%, 15% 20%, 25% 5%, 40% 10%)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
            }} />
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-forum text-accent-gold/90 text-center leading-tight relative" style={{
              animation: "spin 20s linear infinite reverse",
            }}>
              <span className="block">{t("hero.since")}</span>
              <span className="block ml-1">2014</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Left */}
      <div className="hero-bottom-left absolute bottom-8 left-4 sm:bottom-10 sm:left-6 md:bottom-12 md:left-8 lg:bottom-16 lg:left-10 z-10 text-white/90 opacity-0">
        <p className="text-[9px] sm:text-[10px] md:text-xs font-forum uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-0.5 sm:mb-1 opacity-80">
          {t("hero.findUs")}
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm font-forum max-w-[180px] sm:max-w-none">
          {t("hero.address")}
        </p>
      </div>
    </section>
  );
}
