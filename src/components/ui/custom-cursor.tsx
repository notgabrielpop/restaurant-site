"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const arrow = arrowRef.current;
    if (!cursor || !arrow) return;

    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // disable on touch / small screens or reduced motion
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || window.innerWidth < 768);

    if (isTouch || prefersReduce) {
      cursor.style.display = "none";
      return;
    }

    const move = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const interactiveSelector =
      'a, button, [role="button"], [data-cursor="link"]';

    const enter = () => {
      gsap.to(cursor, {
        width: 44,
        height: 44,
        borderWidth: 0,
        backgroundColor: "rgba(212,175,55,0.95)",
        duration: 0.2,
        ease: "power3.out",
      });
      gsap.to(arrow, { autoAlpha: 1, scale: 1, duration: 0.2 });
    };

    const leave = () => {
      gsap.to(cursor, {
        width: 24,
        height: 24,
        borderWidth: 1,
        backgroundColor: "rgba(255,255,255,0.04)",
        duration: 0.2,
        ease: "power3.out",
      });
      gsap.to(arrow, { autoAlpha: 0, scale: 0.5, duration: 0.2 });
    };

    // Use event delegation for dynamic elements (mouseover/mouseout bubble)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        enter();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (
        target.closest(interactiveSelector) &&
        !relatedTarget?.closest(interactiveSelector)
      ) {
        leave();
      }
    };

    // Also attach to existing elements for immediate feedback
    const interactiveEls = Array.from(
      document.querySelectorAll<HTMLElement>(interactiveSelector)
    );

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    // Event delegation on document for dynamic elements
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", move);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = previousCursor;
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/5 mix-blend-difference"
      style={{ zIndex: 9999999 }}
    >
      <div
        ref={arrowRef}
        className="text-[10px] opacity-0"
        style={{ transform: "scale(0.5)" }}
      >
        ➜
      </div>
    </div>
  );
}

