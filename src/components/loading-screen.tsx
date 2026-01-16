"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function LoadingScreen() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Only show loading if pathname actually changed
    if (pathname !== prevPathnameRef.current) {
      setIsLoading(true);
      prevPathnameRef.current = pathname;

      // Minimum loading time for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Expanding circle from center */}
          <motion.div
            initial={{ 
              scale: 0, 
              borderRadius: "50%",
              width: "100px",
              height: "100px",
            }}
            animate={{ 
              scale: 20,
              borderRadius: "0%",
              width: "100vw",
              height: "100vh",
            }}
            exit={{ 
              scale: 0,
              borderRadius: "50%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute bg-black origin-center"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          
          {/* Text in the center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
            }}
            className="relative z-10 text-center px-4"
          >
            <p className="text-white/90 text-sm sm:text-base font-forum tracking-[0.15em] uppercase">
              Zaitoone
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
