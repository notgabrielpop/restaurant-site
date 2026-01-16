"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFeatureSectionGsap(
  sectionRef: React.RefObject<HTMLElement | null>,
  opts?: { reverse?: boolean }
) {
  const pathname = usePathname();
  
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    // Reset section visibility for re-animation
    gsap.set(section, { opacity: 1, y: 0 });
    
    // Refresh ScrollTrigger for this section
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const text = section.querySelector(".feature-text");
      const images = section.querySelectorAll<HTMLElement>(".feature-images img");

      // Entrance animation for the whole section
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Stagger text elements
      if (text) {
        const children = text.querySelectorAll<HTMLElement>("*");
        gsap.fromTo(
          children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // Image parallax + slight 3D feel
      if (images.length) {
        images.forEach((img, index) => {
          const offset = index % 2 === 0 ? 20 : -20;
          const directionMultiplier = opts?.reverse ? -1 : 1;

          gsap.fromTo(
            img,
            { y: offset * directionMultiplier, rotateX: 2, rotateY: 0 },
            {
              y: -offset * directionMultiplier,
              rotateX: 0,
              rotateY: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, [sectionRef, opts?.reverse, pathname]);
}

