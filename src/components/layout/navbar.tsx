"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/menu", label: "Meniu" },
  { href: "/about", label: "Despre" },
  { href: "/events", label: "Evenimente" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition",
        scrolled ? "bg-primary/85 backdrop-blur-xl shadow-soft" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-wide items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-lg font-display text-text-onDark">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-gold to-accent-goldSoft shadow-card" />
          <div className="leading-tight">
            <span className="block text-sm uppercase tracking-[0.24em] text-accent-gold">
              Zaitoone
            </span>
            <span className="block font-script text-2xl text-text-onDark">
              Lebanese Dining
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-text-onDark/80 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition hover:text-accent-gold",
                pathname === link.href && "text-accent-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Button href="/reservations" variant="primary" size="lg">
            Rezervă o masă
          </Button>
        </div>
        <div className="md:hidden">
          <Button href="/reservations" variant="primary" size="md">
            Rezervă
          </Button>
        </div>
      </div>
    </header>
  );
}

