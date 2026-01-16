"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapHome() {
  const ctxRef = useRef<gsap.Context | null>(null);
  const initRef = useRef(false);
  
  useEffect(() => {
    // Prevent double initialization in strict mode
    if (initRef.current) return;
    initRef.current = true;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    
    // Small delay to ensure DOM is ready after navigation
    const initTimeout = setTimeout(() => {
      // Kill previous context if exists
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
      
      ScrollTrigger.refresh();

      ctxRef.current = gsap.context(() => {
        // Hero title stagger
        const heroTitleSpans = gsap.utils.toArray<HTMLElement>(".gsap-hero-title span");
        if (heroTitleSpans.length) {
          gsap.fromTo(
            heroTitleSpans,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.05,
            }
          );
        }

        // Floating cards gentle oscillation
        const floatingCards = gsap.utils.toArray<HTMLElement>(".gsap-floating-card");
        if (floatingCards.length) {
          gsap.to(floatingCards, {
            y: 10,
            duration: 3.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
          });

          floatingCards.forEach((card) => {
            const hover = gsap.to(card, {
              scale: 1.03,
              duration: 0.3,
              ease: "power3.out",
              paused: true,
            });
            card.addEventListener("mouseenter", () => hover.play());
            card.addEventListener("mouseleave", () => hover.reverse());
          });
        }

        // Section reveals
        const sections = gsap.utils.toArray<HTMLElement>(".gsap-section");
        sections.forEach((section) => {
          const targets = section.querySelectorAll<HTMLElement>(
            ".gsap-section-text, .gsap-section-image"
          );
          if (!targets.length) return;

          gsap.fromTo(
            targets,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            }
          );
        });

        // Light parallax on collage images
        const parallaxImages = gsap.utils.toArray<HTMLElement>(".gsap-parallax");
        parallaxImages.forEach((img) => {
          gsap.fromTo(
            img,
            { y: 0 },
            {
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // Card-like entrance for "Timeless, legendary" section
        const cardSection = document.querySelector(".gsap-card-section");
        const cardContent = document.querySelector(".gsap-card-content");
        
        if (cardSection && cardContent) {
          // Set initial state
          gsap.set(cardSection, {
            opacity: 0,
            x: 100,
            scale: 0.9,
            rotationY: 15,
            transformPerspective: 1000,
          });

          // Animate the entire section like a card sliding in
          gsap.to(cardSection, {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardSection,
              start: "top 85%",
              once: true,
            },
          });

          // Animate the content inside with a slight delay for depth
          gsap.fromTo(
            cardContent,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: cardSection,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // Panning effect for images in the card section
        if (cardSection) {
          // Use a small delay to ensure Next.js Image components are rendered
          const initPanning = () => {
            const panImageWrappers = cardSection.querySelectorAll<HTMLElement>(".gsap-pan-image");
            
            panImageWrappers.forEach((imageWrapper, index) => {
              // Next.js Image renders as a span, find the actual img inside
              const imgElement = imageWrapper.querySelector("img");
              if (!imgElement) return;

              const cardContainer = imageWrapper.closest("a");
              if (!cardContainer) return;

              // Scale the image larger to allow panning (zoom in effect)
              gsap.set(imgElement, { 
                scale: 1.6,
                transformOrigin: "center center"
              });

              // Create smooth panning effect based on scroll position
              // Alternate direction for visual interest
              const panAmount = index % 2 === 0 ? -120 : 120;
              
              gsap.to(imgElement, {
                y: panAmount,
                ease: "none",
                scrollTrigger: {
                  trigger: cardContainer as HTMLElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.5,
                },
              });
            });
          };

          // Try immediately, then retry after a short delay for Next.js Image hydration
          initPanning();
          setTimeout(initPanning, 200);
        }
      });

    }, 150); // End of initTimeout

    return () => {
      clearTimeout(initTimeout);
      initRef.current = false;
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      // Only kill ScrollTriggers created in this context
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Only run on mount/unmount
}
