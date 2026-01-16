"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/sample-data";
import { useLanguage } from "@/lib/language-context";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % testimonials.length),
      4800
    );
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];
  const currentQuote = typeof current.quote === 'object' ? current.quote[language] : current.quote;
  const currentRole = typeof current.role === 'object' ? current.role[language] : current.role;
  const headerText = language === 'ro' ? 'Voci ale încântării' : 'Voices of Delight';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-card p-8 text-text-onDark shadow-card">
      <div className="mb-4 text-sm font-forum uppercase tracking-[0.2em] text-accent-gold">
        {headerText}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-lg font-forum leading-relaxed text-text-onDark/90">
            {currentQuote}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-forum font-semibold text-text-onDark">{current.name}</p>
              <p className="text-sm font-forum text-text-onDark/70">{currentRole}</p>
            </div>
            <div className="flex items-center gap-1 text-accent-gold">
              {"★".repeat(current.rating)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex gap-2">
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full transition ${
              i === index ? "bg-accent-gold" : "bg-white/20"
            }`}
            aria-label={`Select testimonial ${item.name}`}
          />
        ))}
      </div>
    </div>
  );
}

