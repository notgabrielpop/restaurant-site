"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Hook to detect slow connection
function useSlowConnection() {
  const [isSlow, setIsSlow] = useState(false);
  
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    const isSlowConnection = connection?.effectiveType === '2g' || 
                            connection?.effectiveType === 'slow-2g' ||
                            connection?.saveData === true;
    setIsSlow(isSlowConnection);
  }, []);
  
  return isSlow;
}

export function ScrollSection3D({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  const reduceMotion = useReducedMotion();
  const slowConnection = useSlowConnection();

  // Skip animations entirely for slow connections or reduced motion
  const skipAnimations = reduceMotion || slowConnection;

  // Track when element has been animated
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const shouldAnimate = inView || hasAnimated;

  // Simplified animations for better performance
  const variants = skipAnimations
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: { 
            duration: 0.5, 
            ease: "easeOut" as const,
            delay: Math.min(delay, 0.2), // Cap delay for faster perceived loading
          },
        },
      };

  // For skipped animations, render without motion wrapper for better performance
  if (skipAnimations) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-[opacity,transform]", className)}
      variants={variants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

