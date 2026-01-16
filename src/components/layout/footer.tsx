"use client";

import Link from "next/link";
import { location } from "@/lib/sample-data";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { language } = useLanguage();

  const content = {
    ro: {
      tagline: "Experiențe libaneze",
      description: "Gusturi libaneze atemporale în inima Bucureștiului. 100% HALAL, bucătărie creată pentru momente speciale și evenimente discrete.",
      navigation: "Navigație",
      menu: "Meniu",
      about: "Despre noi",
      events: "Evenimente",
      reservations: "Rezervări",
      contact: "Contact",
      schedule: "Program",
      rights: "Toate drepturile rezervate",
    },
    en: {
      tagline: "Lebanese Experiences",
      description: "Timeless Lebanese flavors in the heart of Bucharest. 100% HALAL, cuisine crafted for special moments and private events.",
      navigation: "Navigation",
      menu: "Menu",
      about: "About",
      events: "Events",
      reservations: "Reservations",
      contact: "Contact",
      schedule: "Hours",
      rights: "All rights reserved",
    },
  };

  const t = content[language];

  const footerLinks = [
    { href: "/menu", label: t.menu },
    { href: "/about", label: t.about },
    { href: "/events", label: t.events },
    { href: "/reservations", label: t.reservations },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="mx-auto flex max-w-wide flex-col gap-10 px-6 py-12 md:flex-row md:justify-between lg:px-10">
        <div className="space-y-4">
          <p className="text-sm font-forum uppercase tracking-[0.24em] text-accent-gold">
            Zaitoone
          </p>
          <h3 className="font-script text-4xl text-white">{t.tagline}</h3>
          <p className="max-w-sm text-sm font-forum text-white/70">
            {t.description}
          </p>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-forum font-semibold text-accent-gold">{t.navigation}</h4>
            <ul className="mt-3 space-y-2 text-sm font-forum text-white/80">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-forum font-semibold text-accent-gold">{t.contact}</h4>
            <div className="mt-3 space-y-2 text-sm font-forum text-white/80">
              <p>{location.address}</p>
              <p>{location.phone}</p>
              <p>{location.email}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-forum font-semibold text-accent-gold">{t.schedule}</h4>
            <ul className="mt-3 space-y-1 text-sm font-forum text-white/80">
              {location.hours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3 text-sm font-forum text-white/70">
              <Link href="https://www.instagram.com" className="hover:text-accent-gold">
                Instagram
              </Link>
              <Link href="https://www.facebook.com" className="hover:text-accent-gold">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs font-forum text-white/60">
        © {new Date().getFullYear()} Zaitoone Restaurant. {t.rights}.
      </div>
    </footer>
  );
}
