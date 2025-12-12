"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          "bg-black/40 backdrop-blur-xl border-b border-white/10"
        )}
      >
        <div className="mx-auto flex max-w-wide items-center justify-between px-4 py-3 md:px-6 lg:px-10">
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-[2px] w-7 rounded-full bg-white transition-transform duration-300",
                  open && "translate-y-[5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-7 rounded-full bg-white transition-transform duration-300",
                  open && "-translate-y-[5px] -rotate-45"
                )}
              />
            </div>
          </button>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center md:justify-start">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-auto md:h-12">
                <Image
                  src="/logo_zaitoone_white-3.png"
                  alt="Zaitoone"
                  width={120}
                  height={48}
                  className="object-contain opacity-90 group-hover:opacity-100 transition h-full w-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-6 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                  <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
            </div>
            <div className="relative inline-block">
              {/* Very subtle moving glow effect - two colors */}
              <div 
                className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-white/60 via-accent-gold/45 to-white/60 blur-lg pointer-events-none"
                style={{
                  animation: "glow 4s ease-in-out infinite",
                }}
              />
              <Link
                href="/reservations"
                data-cursor="link"
                className="relative z-10 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.05)] hover:bg-black/90 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group"
                style={{
                  animation: "innerGlow 4s ease-in-out infinite",
                }}
              >
                <span className="relative z-10">
                  Book a Table
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-full flex-col items-center justify-between pb-10 pt-20 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-12 w-auto">
                  <Image 
                    src="/logo_zaitoone_white-3.png" 
                    alt="Zaitoone" 
                    width={120}
                    height={48}
                    className="object-contain h-full w-auto"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-8">
                <button className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                  English
                  <span className="text-[0.7rem]">▾</span>
                </button>

                <ul className="flex flex-col items-center gap-4 text-base">
                  {navLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="text-lg text-white/85 transition-colors duration-200 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative inline-block">
                  {/* Very subtle moving glow effect - two colors */}
                  <div 
                    className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-white/60 via-accent-gold/45 to-white/60 blur-lg pointer-events-none"
                    style={{
                      animation: "glow 4s ease-in-out infinite",
                    }}
                  />
                  <Link
                    href="/reservations"
                    onClick={() => setOpen(false)}
                    data-cursor="link"
                    className="relative z-10 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.05)] hover:bg-black/90 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group"
                    style={{
                      animation: "innerGlow 4s ease-in-out infinite",
                    }}
                  >
                    <span className="relative z-10">
                      Book a Table
                    </span>
                  </Link>
                </div>
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  Since 2014 • Bucharest
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

