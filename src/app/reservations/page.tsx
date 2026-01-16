"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

// Declare the global ialoc widget type
declare global {
  interface Window {
    ialocEmbedWidget?: {
      show: (options: { venueId: number; locale: string }) => void;
    };
  }
}

export default function ReservationsPage() {
  const { language } = useLanguage();

  const content = {
    ro: {
      eyebrow: "Rezervare",
      title: "Rezervă o masă",
      subtitle: "Cine romantice, întâlniri de afaceri sau evenimente private. Confirmare rapidă, 100% HALAL.",
      info1: "Preferință loc: interior, terasă sau fără preferință.",
      info2: "Ocazie: afaceri, aniversare, logodnă, eveniment privat.",
      info3: "Confirmăm telefonic sau pe email în maximum o oră.",
      bookNow: "Rezervă Acum",
      bookDesc: "Apasă butonul pentru a deschide sistemul de rezervări",
    },
    en: {
      eyebrow: "Reservation",
      title: "Book a Table",
      subtitle: "Romantic dinners, business meetings or private events. Fast confirmation, 100% HALAL.",
      info1: "Seating preference: indoor, terrace, or no preference.",
      info2: "Occasion: business, anniversary, engagement, private event.",
      info3: "We confirm by phone or email within one hour.",
      bookNow: "Book Now",
      bookDesc: "Click the button to open the reservation system",
    },
  };

  const t = content[language];

  // Auto-open widget if URL has bookNow parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("bookNow") === "true") {
      openReservationWidget();
    }
  }, [language]);

  const openReservationWidget = () => {
    if (window.ialocEmbedWidget) {
      window.ialocEmbedWidget.show({
        venueId: 4437,
        locale: language,
      });
    } else {
      // Fallback: redirect to ialoc
      window.location.href = `/?venueId=4437&bookNow=true&locale=${language}`;
    }
  };

  return (
    <div className="mx-auto max-w-wide px-6 pb-20 lg:px-10 bg-[#111111]">
      {/* Hero Section */}
      <section className="relative mt-8 mb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-gold/5 blur-[120px] pointer-events-none" />
        
        <div className="relative text-center py-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-gold/60" />
            <span className="text-xs font-forum uppercase tracking-[0.35em] text-accent-gold">
              {t.eyebrow}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-gold/60" />
          </div>
          
          <h1 className="font-forum text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-shadow-elegant">
            {t.title}
          </h1>
          
          <p className="text-lg font-forum text-white/50 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative grid gap-12 lg:grid-cols-2 items-center max-w-5xl mx-auto">
        {/* Left Side - Image */}
        <div className="relative">
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-accent-gold/30 pointer-events-none z-10" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-accent-gold/30 pointer-events-none z-10" />
          
          <div className="relative h-[400px] overflow-hidden elegant-image-frame group">
            <Image
              src="/assets/Meals/meals-name/Mix de fructe de mare la gratar cu salata ruccola.png"
              alt="Zaitoone Dining"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Right Side - Booking CTA */}
        <div className="space-y-8">
          {/* Info Cards */}
          <div className="space-y-4">
            {[t.info1, t.info2, t.info3].map((info, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-sm bg-white/[0.02] border border-white/5 
                         hover:border-accent-gold/20 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center
                              group-hover:bg-accent-gold/20 transition-colors duration-500">
                  <span className="text-accent-gold text-sm">{idx + 1}</span>
                </div>
                <p className="text-sm text-white/60 font-forum leading-relaxed pt-1">
                  {info}
                </p>
              </div>
            ))}
          </div>

          {/* Book Now Button */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-accent-gold/20 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-accent-gold/20 pointer-events-none" />
            
            <div className="luxury-card rounded-sm p-8 text-center">
              <p className="text-white/50 font-forum mb-6">
                {t.bookDesc}
              </p>
              
              <button
                onClick={openReservationWidget}
                className="relative inline-flex items-center justify-center px-12 py-4 
                         bg-accent-gold/10 border border-accent-gold/40 text-accent-gold
                         hover:bg-accent-gold/20 hover:border-accent-gold/60 
                         transition-all duration-500 group overflow-hidden
                         font-forum uppercase tracking-[0.25em] text-base"
              >
                {/* Glow effect */}
                <span className="absolute inset-0 bg-accent-gold/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {t.bookNow}
                </span>
              </button>
              
              {/* Decorative ornament */}
              <div className="flex items-center gap-4 mt-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/20" />
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent-gold/30" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
