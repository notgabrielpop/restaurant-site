"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

// Game-like 3D page transition with depth and cinematic effects
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.94,
    filter: "blur(12px) brightness(0.7)",
    y: 32,
    rotateX: 8,
    z: -120,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px) brightness(1)",
    y: 0,
    rotateX: 0,
    z: 0,
  },
  exit: {
    opacity: 0,
    scale: 1.06,
    filter: "blur(12px) brightness(0.7)",
    y: -32,
    rotateX: -8,
    z: -120,
  },
};

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion ? reducedMotionVariants : pageVariants;

  return (
    <div style={{ perspective: reduceMotion ? "none" : "1200px", transformStyle: "preserve-3d" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{
            duration: reduceMotion ? 0.2 : 0.65,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="w-full will-change-transform"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
