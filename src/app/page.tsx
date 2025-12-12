"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FeatureCard, MenuCard } from "@/components/cards";
import { FeatureSection } from "@/components/feature-section";
import { galleryImages, menuCategories, menuItems } from "@/lib/sample-data";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { TiltCard } from "@/components/tilt-card";
import { ScrollSection3D } from "@/components/scroll-section-3d";
import { useGsapHome } from "@/hooks/use-gsap-home";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/hero/Hero";
import { HeroNavStrip } from "@/components/sections/HeroNavStrip";

const signatureDishes = menuItems
  .filter((item) => item.isSignature || item.isPopular)
  .slice(0, 6);

const timelineStory = [
  {
    year: "Rădăcini libaneze",
    copy: "Rețete de familie, mezze și grătar pe jar, ospitalitate autentică.",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    year: "Zaitoone în București",
    copy: "Din 2014 pe B-dul Nicolae Caramfil, aproape de lacul Floreasca.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
  },
  {
    year: "Astăzi",
    copy: "Meniuri moderne, 100% HALAL, experiențe private și corporate.",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
  },
];

const dishImages: Record<string, string> = {
  humus:
    "https://images.unsplash.com/photo-1604908177520-4726f8141040?auto=format&fit=crop&w=1200&q=80",
  falafel:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  tabbouleh:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
  "ras-asfour":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
  "mix-grill":
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
  kunefe:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
};

const featureSections = [
  {
    eyebrow: "Culinary Journey Through Lebanon",
    title: "O călătorie culinară",
    body:
      "Preparatele noastre poartă aromele condimentelor orientale și prospețimea ingredientelor locale. Fiecare farfurie e gândită pentru a fi împărțită – în spiritul convivial libanez.",
    ctaHref: "/menu",
    ctaLabel: "Descoperă",
    reverse: false,
    images: [
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
        alt: "Plating Zaitoone",
      },
      {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        alt: "Mezze",
      },
      {
        src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
        alt: "Terasa verde",
      },
    ],
  },
  {
    eyebrow: "Signature Experiences",
    title: "Experiențe pentru orice moment",
    body:
      "Cine romantice, seri cu prietenii sau întâlniri executive – pregătim atmosfera potrivită.",
    ctaHref: "/reservations",
    ctaLabel: "Rezervă",
    reverse: true,
    images: [
      {
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
        alt: "Cină romantică",
      },
      {
        src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
        alt: "Bar",
      },
      {
        src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
        alt: "Locație verde",
      },
    ],
  },
  {
    eyebrow: "Romantic Dinners & Private Events",
    title: "Momente care rămân",
    body:
      "Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete.",
    ctaHref: "/reservations",
    ctaLabel: "Rezervă",
    reverse: false,
    images: [
      {
        src: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=1400&q=80",
        alt: "Business lunch",
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
        alt: "Meniu degustare",
      },
      {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        alt: "Preparat signature",
      },
    ],
  },
  {
    eyebrow: "Nature Frames Every Moment",
    title: "Locație cu terasă și aer verde",
    body:
      "B-dul Nicolae Caramfil 2, aproape de lacul Floreasca. Interior cald, terasă verde și parcare în proximitate.",
    ctaHref: "/contact",
    ctaLabel: "Planifică vizita",
    reverse: true,
    images: [
      {
        src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
        alt: "Terasa verde",
      },
      {
        src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
        alt: "Interior cald",
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
        alt: "Salon privat",
      },
    ],
  },
];

export default function Home() {
  useGsapHome();

  const categories = useMemo(
    () => [...menuCategories].sort((a, b) => a.order - b.order),
    []
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.slug);
  const filteredFavorites = useMemo(() => {
    const pool =
      menuItems.filter((i) => i.categorySlug === selectedCategory) ||
      menuItems.slice(0, 8);
    return pool.slice(0, 6);
  }, [selectedCategory]);

  const [dishIndex, setDishIndex] = useState(0);
  const currentDish = filteredFavorites[dishIndex % filteredFavorites.length];
  const nextDish = filteredFavorites[(dishIndex + 1) % filteredFavorites.length];

  return (
    <div className="pb-20">
      <Hero />
      <HeroNavStrip />

      {/* Badrutt-inspired split showcase */}
      <section className="gsap-card-section bg-[#f7f1e8] text-primary-dark overflow-hidden rounded-2xl shadow-2xl mx-4 sm:mx-6 lg:mx-auto my-8 sm:my-12">
        <div className="gsap-card-content mx-auto flex w-full max-w-wide flex-col items-center gap-2 px-4 py-5 text-center sm:px-6 lg:px-10">
          <ScrollSection3D>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70">
              ELEGANȚĂ ȘI AROMĂ
            </p>
          </ScrollSection3D>
          <ScrollSection3D delay={0.04}>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Timeless, legendary, incomparable —{" "}
              <span className="font-script text-5xl text-accent-gold sm:text-6xl">
                Zaitoone
              </span>{" "}
              în București
            </h2>
          </ScrollSection3D>
          <ScrollSection3D delay={0.08}>
            <Link
              href="/about"
              data-cursor="link"
              className="text-sm uppercase tracking-[0.18em] text-primary underline decoration-primary/50 underline-offset-4 hover:text-accent-gold"
            >
              Despre noi
            </Link>
          </ScrollSection3D>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-0 px-0">
          {[
            {
              title: "Restaurant",
              subtitle: "Salon elegant & terasă verde",
              href: "/menu",
              image:
                "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80",
            },
            {
              title: "Lounge & Bar",
              subtitle: "Cocktailuri orientale & narghilea",
              href: "/about",
              image:
                "https://images.unsplash.com/photo-1514361892635-6e122620e4d1?auto=format&fit=crop&w=1600&q=80",
            },
          ].map((tile, idx) => (
            <ScrollSection3D key={tile.title} delay={0.03 * idx}>
              <Link
                href={tile.href}
                data-cursor="link"
                className="group relative block h-full min-h-[360px] overflow-hidden"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="gsap-pan-image object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                  <div className="flex justify-end text-[11px] uppercase tracking-[0.18em] text-white/80">
                    Descoperă
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-4xl text-white drop-shadow-sm sm:text-5xl" style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: "italic", fontWeight: 100 }}>
                      {tile.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </ScrollSection3D>
          ))}
        </div>
        <div className="mt-0 grid w-full grid-cols-1 gap-0 px-0">
          <ScrollSection3D delay={0.06}>
            <Link
              href="/contact"
              data-cursor="link"
              className="group relative block h-full min-h-[420px] overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80"
                alt="Wellness & Terasă"
                fill
                className="gsap-pan-image object-cover transition duration-700 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                <div className="flex justify-end text-[11px] uppercase tracking-[0.18em] text-white/80">
                  Descoperă
                </div>
                <div className="space-y-1">
                  <h3 className="text-4xl text-white drop-shadow-sm sm:text-5xl" style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: "italic", fontWeight: 100 }}>
                    Wellness & Terasă
                  </h3>
                </div>
              </div>
            </Link>
          </ScrollSection3D>
        </div>

        <div className="mt-0 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-0 px-0">
          {[
            {
              title: "Private Dining",
              subtitle: "Chef's table & pairing de vinuri",
              href: "/events",
              image:
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
            },
            {
              title: "Patiserie & Desert Bar",
              subtitle: "Künefe cu fistic, baklava, cafea libaneză",
              href: "/menu#desert",
              image:
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
            },
          ].map((tile, idx) => (
            <ScrollSection3D key={tile.title} delay={0.08 + 0.03 * idx}>
              <Link
                href={tile.href}
                data-cursor="link"
                className="group relative block h-full min-h-[340px] overflow-hidden"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="gsap-pan-image object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                  <div className="flex justify-end text-[11px] uppercase tracking-[0.18em] text-white/80">
                    Descoperă
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-4xl text-white drop-shadow-sm sm:text-5xl" style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: "italic", fontWeight: 100 }}>
                      {tile.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </ScrollSection3D>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-wide space-y-8 px-6 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Our Menu Favourites"
            title="Favoritele Zaitoone"
            subtitle="Selecție de preparate semnătură. Alege categoria și descoperă ce iubesc oaspeții noștri."
            align="center"
          />
        </ScrollSection3D>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setDishIndex(0);
                setSelectedCategory(cat.slug);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === cat.slug
                  ? "border-accent-gold bg-accent-gold/10 text-primary"
                  : "border-primary/15 bg-white text-primary hover:border-accent-gold"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {filteredFavorites.length > 0 && (
          <ScrollSection3D>
            <div className="relative overflow-hidden rounded-3xl bg-primary-dark/95 text-text-onDark shadow-card">
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-80 md:h-[420px]" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDish.id}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={
                          dishImages[currentDish.id] ??
                          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={currentDish.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                        {currentDish.isSignature ? "Signature" : currentDish.isPopular ? "Popular" : "Favorit"}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative space-y-4 p-6 md:p-8" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentDish.id}-text`}
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="h-full"
                    >
                      <p className="text-sm uppercase tracking-[0.2em] text-accent-gold mb-3">
                        Our Menu Favourites
                      </p>
                      <h3 className="font-display text-3xl mb-4 leading-tight">{currentDish.name}</h3>
                      <p className="text-sm text-white/75 leading-relaxed mb-6">{currentDish.description}</p>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-accent-gold">
                          {currentDish.price} lei
                        </span>
                        {currentDish.isSignature && (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">
                            Signature
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mb-6">
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
                        <Button href="/menu" variant="secondary" size="md" className="border-white/30">
                          Vezi meniul
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <button
                          onClick={() =>
                            setDishIndex((prev) =>
                              prev === 0 ? filteredFavorites.length - 1 : prev - 1
                            )
                          }
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setDishIndex((prev) => (prev + 1) % filteredFavorites.length)}
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          →
                        </button>
                        <span className="ml-2">
                          {dishIndex + 1}/{filteredFavorites.length}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollSection3D>
        )}
      </section>

      <FeatureSection
        eyebrow="Mezze, Grătar & Deserturi"
        title="O călătorie culinară prin Liban"
        body="Preparatele noastre poartă aromele condimentelor orientale și prospețimea ingredientelor locale. Fiecare farfurie e gândită pentru a fi împărțită – în spiritul convivial libanez. Rețete moștenite, reinterpretate elegant pentru București."
        ctaLabel="Descoperă meniul"
        ctaHref="/menu"
        images={[
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Plating Zaitoone",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
            alt: "Mezze",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="section-curved bg-background-alt py-16">
        <div className="relative mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Signature dishes"
              title="A Symphony of Flavors"
              subtitle="Selecție de preparate iconice: mezze cremoase, grătar pe jar și deserturi cu fistic."
            />
          </ScrollSection3D>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 md:auto-rows-fr">
            {signatureDishes.map((item, idx) => (
              <ScrollSection3D key={item.id} delay={0.04 * (idx % 3)}>
                <TiltCard depth={18} className="h-full">
                  <MenuCard
                    item={item}
                    image={
                      galleryImages[idx % galleryImages.length]?.src ??
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                    }
                  />
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {menuCategories.slice(0, 5).map((cat, idx) => (
              <ScrollSection3D key={cat.slug} delay={0.05 * idx}>
                <span className="rounded-full border border-primary-light/30 bg-white px-4 py-2 text-sm text-primary">
                  {cat.name}
                </span>
              </ScrollSection3D>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection
        eyebrow="Cine romantice & Evenimente"
        title="Experiențe pentru orice moment"
        body="Cine romantice, seri cu prietenii sau întâlniri executive – pregătim atmosfera potrivită. Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete."
        ctaLabel="Rezervă o seară"
        ctaHref="/reservations"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Cină romantică",
          },
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Eveniment privat",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80",
            alt: "Seri cu prietenii",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Private Dining & Events"
        title="Momente care rămân"
        body="Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete. Chef's table, pairing de vinuri și set-up personalizat pentru evenimente corporate sau aniversări."
        ctaLabel="Planifică un eveniment"
        ctaHref="/events"
        images={[
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Private Dining",
          },
          {
            src: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=1400&q=80",
            alt: "Business lunch",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
            alt: "Evenimente private",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Povestea Zaitoone"
        title="Rădăcini libaneze, eleganță contemporană"
        body="Din 2014 pe B-dul Nicolae Caramfil, aproape de lacul Floreasca. Rețete de familie, mezze și grătar pe jar, ospitalitate autentică. Astăzi: meniuri moderne, 100% HALAL, experiențe private și corporate."
        ctaLabel="Află mai multe"
        ctaHref="/about"
        reverse
        images={timelineStory.map((step) => ({
          src: step.image,
          alt: step.year,
        }))}
      />

      <section className="bg-primary-dark py-16 text-text-onDark">
        <div className="mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Gallery"
              title="Nature Frames Every Moment"
              subtitle="Colaj cinematic cu preparate și atmosfera Zaitoone."
              tone="light"
            />
          </ScrollSection3D>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.slice(0, 8).map((img, idx) => (
              <ScrollSection3D key={img.id} delay={0.04 * idx}>
                <TiltCard depth={16}>
                  <div
                    className={`relative h-48 overflow-hidden rounded-2xl shadow-soft ${
                      idx % 3 === 0 ? "md:row-span-2 md:h-64" : ""
                    } ${idx % 2 === 0 ? "-rotate-1 md:-rotate-2" : "rotate-1 md:rotate-2"}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/menu"
              className="text-sm uppercase tracking-[0.18em] text-accent-gold underline decoration-accent-gold/60 underline-offset-4"
            >
              Vezi galeria & meniul
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wide px-6 py-12 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Testimonials"
            title="Voices of Delight"
            subtitle="Experiențe povestite de oaspeții noștri – cine aniversare, întâlniri de business și seri cu prietenii."
            align="center"
          />
        </ScrollSection3D>
        <div className="mt-6">
          <ScrollSection3D delay={0.05}>
            <TestimonialsCarousel />
          </ScrollSection3D>
        </div>
      </section>

      <FeatureSection
        eyebrow="Location & Hours"
        title="În inima Bucureștiului"
        body="B-dul Nicolae Caramfil 2, aproape de zona de business și de promenadele verzi. Luni - Joi: 12:00 - 23:00, Vineri - Sâmbătă: 12:00 - 00:00, Duminică: 12:00 - 22:00. Telefon: +40 731 000 000, Email: rezervari@zaitoone.ro"
        ctaLabel="Contactează-ne"
        ctaHref="/contact"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
            alt: "Terasa verde",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Atmosferă caldă",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="bg-primary-dark py-12 text-text-onDark">
        <div className="mx-auto flex max-w-wide flex-col items-center gap-4 px-6 text-center lg:px-10">
          <h3 className="font-script text-4xl">Ready to experience Zaitoone?</h3>
          <p className="text-sm text-white/70">
            Rezervă o masă sau planifică un eveniment privat cu echipa noastră.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/reservations" variant="primary" size="lg">
              Book a Table
            </Button>
            <Button href="/events" variant="secondary" size="lg" className="border-white/40">
              Planifică un eveniment
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wide space-y-8 px-6 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Our Menu Favourites"
            title="Favoritele Zaitoone"
            subtitle="Selecție de preparate semnătură. Alege categoria și descoperă ce iubesc oaspeții noștri."
            align="center"
          />
        </ScrollSection3D>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setDishIndex(0);
                setSelectedCategory(cat.slug);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === cat.slug
                  ? "border-accent-gold bg-accent-gold/10 text-primary"
                  : "border-primary/15 bg-white text-primary hover:border-accent-gold"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {filteredFavorites.length > 0 && (
          <ScrollSection3D>
            <div className="relative overflow-hidden rounded-3xl bg-primary-dark/95 text-text-onDark shadow-card">
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-80 md:h-[420px]" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDish.id}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={
                          dishImages[currentDish.id] ??
                          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={currentDish.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                        {currentDish.isSignature ? "Signature" : currentDish.isPopular ? "Popular" : "Favorit"}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative space-y-4 p-6 md:p-8" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentDish.id}-text`}
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="h-full"
                    >
                      <p className="text-sm uppercase tracking-[0.2em] text-accent-gold mb-3">
                        Our Menu Favourites
                      </p>
                      <h3 className="font-display text-3xl mb-4 leading-tight">{currentDish.name}</h3>
                      <p className="text-sm text-white/75 leading-relaxed mb-6">{currentDish.description}</p>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-accent-gold">
                          {currentDish.price} lei
                        </span>
                        {currentDish.isSignature && (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">
                            Signature
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mb-6">
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
                        <Button href="/menu" variant="secondary" size="md" className="border-white/30">
                          Vezi meniul
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <button
                          onClick={() =>
                            setDishIndex((prev) =>
                              prev === 0 ? filteredFavorites.length - 1 : prev - 1
                            )
                          }
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setDishIndex((prev) => (prev + 1) % filteredFavorites.length)}
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          →
                        </button>
                        <span className="ml-2">
                          {dishIndex + 1}/{filteredFavorites.length}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollSection3D>
        )}
      </section>

      <FeatureSection
        eyebrow="Mezze, Grătar & Deserturi"
        title="O călătorie culinară prin Liban"
        body="Preparatele noastre poartă aromele condimentelor orientale și prospețimea ingredientelor locale. Fiecare farfurie e gândită pentru a fi împărțită – în spiritul convivial libanez. Rețete moștenite, reinterpretate elegant pentru București."
        ctaLabel="Descoperă meniul"
        ctaHref="/menu"
        images={[
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Plating Zaitoone",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
            alt: "Mezze",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="section-curved bg-background-alt py-16">
        <div className="relative mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Signature dishes"
              title="A Symphony of Flavors"
              subtitle="Selecție de preparate iconice: mezze cremoase, grătar pe jar și deserturi cu fistic."
            />
          </ScrollSection3D>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 md:auto-rows-fr">
            {signatureDishes.map((item, idx) => (
              <ScrollSection3D key={item.id} delay={0.04 * (idx % 3)}>
                <TiltCard depth={18} className="h-full">
                  <MenuCard
                    item={item}
                    image={
                      galleryImages[idx % galleryImages.length]?.src ??
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                    }
                  />
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {menuCategories.slice(0, 5).map((cat, idx) => (
              <ScrollSection3D key={cat.slug} delay={0.05 * idx}>
                <span className="rounded-full border border-primary-light/30 bg-white px-4 py-2 text-sm text-primary">
                  {cat.name}
                </span>
              </ScrollSection3D>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection
        eyebrow="Cine romantice & Evenimente"
        title="Experiențe pentru orice moment"
        body="Cine romantice, seri cu prietenii sau întâlniri executive – pregătim atmosfera potrivită. Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete."
        ctaLabel="Rezervă o seară"
        ctaHref="/reservations"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Cină romantică",
          },
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Eveniment privat",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80",
            alt: "Seri cu prietenii",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Private Dining & Events"
        title="Momente care rămân"
        body="Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete. Chef's table, pairing de vinuri și set-up personalizat pentru evenimente corporate sau aniversări."
        ctaLabel="Planifică un eveniment"
        ctaHref="/events"
        images={[
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Private Dining",
          },
          {
            src: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=1400&q=80",
            alt: "Business lunch",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
            alt: "Evenimente private",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Povestea Zaitoone"
        title="Rădăcini libaneze, eleganță contemporană"
        body="Din 2014 pe B-dul Nicolae Caramfil, aproape de lacul Floreasca. Rețete de familie, mezze și grătar pe jar, ospitalitate autentică. Astăzi: meniuri moderne, 100% HALAL, experiențe private și corporate."
        ctaLabel="Află mai multe"
        ctaHref="/about"
        reverse
        images={timelineStory.map((step) => ({
          src: step.image,
          alt: step.year,
        }))}
      />

      <section className="bg-primary-dark py-16 text-text-onDark">
        <div className="mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Gallery"
              title="Nature Frames Every Moment"
              subtitle="Colaj cinematic cu preparate și atmosfera Zaitoone."
              tone="light"
            />
          </ScrollSection3D>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.slice(0, 8).map((img, idx) => (
              <ScrollSection3D key={img.id} delay={0.04 * idx}>
                <TiltCard depth={16}>
                  <div
                    className={`relative h-48 overflow-hidden rounded-2xl shadow-soft ${
                      idx % 3 === 0 ? "md:row-span-2 md:h-64" : ""
                    } ${idx % 2 === 0 ? "-rotate-1 md:-rotate-2" : "rotate-1 md:rotate-2"}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/menu"
              className="text-sm uppercase tracking-[0.18em] text-accent-gold underline decoration-accent-gold/60 underline-offset-4"
            >
              Vezi galeria & meniul
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wide px-6 py-12 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Testimonials"
            title="Voices of Delight"
            subtitle="Experiențe povestite de oaspeții noștri – cine aniversare, întâlniri de business și seri cu prietenii."
            align="center"
          />
        </ScrollSection3D>
        <div className="mt-6">
          <ScrollSection3D delay={0.05}>
            <TestimonialsCarousel />
          </ScrollSection3D>
        </div>
      </section>

      <FeatureSection
        eyebrow="Location & Hours"
        title="În inima Bucureștiului"
        body="B-dul Nicolae Caramfil 2, aproape de zona de business și de promenadele verzi. Luni - Joi: 12:00 - 23:00, Vineri - Sâmbătă: 12:00 - 00:00, Duminică: 12:00 - 22:00. Telefon: +40 731 000 000, Email: rezervari@zaitoone.ro"
        ctaLabel="Contactează-ne"
        ctaHref="/contact"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
            alt: "Terasa verde",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Atmosferă caldă",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="bg-primary-dark py-12 text-text-onDark">
        <div className="mx-auto flex max-w-wide flex-col items-center gap-4 px-6 text-center lg:px-10">
          <h3 className="font-script text-4xl">Ready to experience Zaitoone?</h3>
          <p className="text-sm text-white/70">
            Rezervă o masă sau planifică un eveniment privat cu echipa noastră.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/reservations" variant="primary" size="lg">
              Book a Table
            </Button>
            <Button href="/events" variant="secondary" size="lg" className="border-white/40">
              Planifică un eveniment
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wide space-y-8 px-6 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Our Menu Favourites"
            title="Favoritele Zaitoone"
            subtitle="Selecție de preparate semnătură. Alege categoria și descoperă ce iubesc oaspeții noștri."
            align="center"
          />
        </ScrollSection3D>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setDishIndex(0);
                setSelectedCategory(cat.slug);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === cat.slug
                  ? "border-accent-gold bg-accent-gold/10 text-primary"
                  : "border-primary/15 bg-white text-primary hover:border-accent-gold"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {filteredFavorites.length > 0 && (
          <ScrollSection3D>
            <div className="relative overflow-hidden rounded-3xl bg-primary-dark/95 text-text-onDark shadow-card">
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-80 md:h-[420px]" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDish.id}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={
                          dishImages[currentDish.id] ??
                          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={currentDish.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                        {currentDish.isSignature ? "Signature" : currentDish.isPopular ? "Popular" : "Favorit"}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative space-y-4 p-6 md:p-8" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentDish.id}-text`}
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="h-full"
                    >
                      <p className="text-sm uppercase tracking-[0.2em] text-accent-gold mb-3">
                        Our Menu Favourites
                      </p>
                      <h3 className="font-display text-3xl mb-4 leading-tight">{currentDish.name}</h3>
                      <p className="text-sm text-white/75 leading-relaxed mb-6">{currentDish.description}</p>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-accent-gold">
                          {currentDish.price} lei
                        </span>
                        {currentDish.isSignature && (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">
                            Signature
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mb-6">
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
                        <Button href="/menu" variant="secondary" size="md" className="border-white/30">
                          Vezi meniul
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <button
                          onClick={() =>
                            setDishIndex((prev) =>
                              prev === 0 ? filteredFavorites.length - 1 : prev - 1
                            )
                          }
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setDishIndex((prev) => (prev + 1) % filteredFavorites.length)}
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          →
                        </button>
                        <span className="ml-2">
                          {dishIndex + 1}/{filteredFavorites.length}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollSection3D>
        )}
      </section>

      <FeatureSection
        eyebrow="Mezze, Grătar & Deserturi"
        title="O călătorie culinară prin Liban"
        body="Preparatele noastre poartă aromele condimentelor orientale și prospețimea ingredientelor locale. Fiecare farfurie e gândită pentru a fi împărțită – în spiritul convivial libanez. Rețete moștenite, reinterpretate elegant pentru București."
        ctaLabel="Descoperă meniul"
        ctaHref="/menu"
        images={[
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Plating Zaitoone",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
            alt: "Mezze",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="section-curved bg-background-alt py-16">
        <div className="relative mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Signature dishes"
              title="A Symphony of Flavors"
              subtitle="Selecție de preparate iconice: mezze cremoase, grătar pe jar și deserturi cu fistic."
            />
          </ScrollSection3D>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 md:auto-rows-fr">
            {signatureDishes.map((item, idx) => (
              <ScrollSection3D key={item.id} delay={0.04 * (idx % 3)}>
                <TiltCard depth={18} className="h-full">
                  <MenuCard
                    item={item}
                    image={
                      galleryImages[idx % galleryImages.length]?.src ??
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                    }
                  />
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {menuCategories.slice(0, 5).map((cat, idx) => (
              <ScrollSection3D key={cat.slug} delay={0.05 * idx}>
                <span className="rounded-full border border-primary-light/30 bg-white px-4 py-2 text-sm text-primary">
                  {cat.name}
                </span>
              </ScrollSection3D>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection
        eyebrow="Cine romantice & Evenimente"
        title="Experiențe pentru orice moment"
        body="Cine romantice, seri cu prietenii sau întâlniri executive – pregătim atmosfera potrivită. Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete."
        ctaLabel="Rezervă o seară"
        ctaHref="/reservations"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Cină romantică",
          },
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Eveniment privat",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80",
            alt: "Seri cu prietenii",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Private Dining & Events"
        title="Momente care rămân"
        body="Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete. Chef's table, pairing de vinuri și set-up personalizat pentru evenimente corporate sau aniversări."
        ctaLabel="Planifică un eveniment"
        ctaHref="/events"
        images={[
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Private Dining",
          },
          {
            src: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=1400&q=80",
            alt: "Business lunch",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
            alt: "Evenimente private",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Povestea Zaitoone"
        title="Rădăcini libaneze, eleganță contemporană"
        body="Din 2014 pe B-dul Nicolae Caramfil, aproape de lacul Floreasca. Rețete de familie, mezze și grătar pe jar, ospitalitate autentică. Astăzi: meniuri moderne, 100% HALAL, experiențe private și corporate."
        ctaLabel="Află mai multe"
        ctaHref="/about"
        reverse
        images={timelineStory.map((step) => ({
          src: step.image,
          alt: step.year,
        }))}
      />

      <section className="bg-primary-dark py-16 text-text-onDark">
        <div className="mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Gallery"
              title="Nature Frames Every Moment"
              subtitle="Colaj cinematic cu preparate și atmosfera Zaitoone."
              tone="light"
            />
          </ScrollSection3D>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.slice(0, 8).map((img, idx) => (
              <ScrollSection3D key={img.id} delay={0.04 * idx}>
                <TiltCard depth={16}>
                  <div
                    className={`relative h-48 overflow-hidden rounded-2xl shadow-soft ${
                      idx % 3 === 0 ? "md:row-span-2 md:h-64" : ""
                    } ${idx % 2 === 0 ? "-rotate-1 md:-rotate-2" : "rotate-1 md:rotate-2"}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/menu"
              className="text-sm uppercase tracking-[0.18em] text-accent-gold underline decoration-accent-gold/60 underline-offset-4"
            >
              Vezi galeria & meniul
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wide px-6 py-12 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Testimonials"
            title="Voices of Delight"
            subtitle="Experiențe povestite de oaspeții noștri – cine aniversare, întâlniri de business și seri cu prietenii."
            align="center"
          />
        </ScrollSection3D>
        <div className="mt-6">
          <ScrollSection3D delay={0.05}>
            <TestimonialsCarousel />
          </ScrollSection3D>
        </div>
      </section>

      <FeatureSection
        eyebrow="Location & Hours"
        title="În inima Bucureștiului"
        body="B-dul Nicolae Caramfil 2, aproape de zona de business și de promenadele verzi. Luni - Joi: 12:00 - 23:00, Vineri - Sâmbătă: 12:00 - 00:00, Duminică: 12:00 - 22:00. Telefon: +40 731 000 000, Email: rezervari@zaitoone.ro"
        ctaLabel="Contactează-ne"
        ctaHref="/contact"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
            alt: "Terasa verde",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Atmosferă caldă",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="bg-primary-dark py-12 text-text-onDark">
        <div className="mx-auto flex max-w-wide flex-col items-center gap-4 px-6 text-center lg:px-10">
          <h3 className="font-script text-4xl">Ready to experience Zaitoone?</h3>
          <p className="text-sm text-white/70">
            Rezervă o masă sau planifică un eveniment privat cu echipa noastră.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/reservations" variant="primary" size="lg">
              Book a Table
            </Button>
            <Button href="/events" variant="secondary" size="lg" className="border-white/40">
              Planifică un eveniment
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wide space-y-8 px-6 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Our Menu Favourites"
            title="Favoritele Zaitoone"
            subtitle="Selecție de preparate semnătură. Alege categoria și descoperă ce iubesc oaspeții noștri."
            align="center"
          />
        </ScrollSection3D>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setDishIndex(0);
                setSelectedCategory(cat.slug);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === cat.slug
                  ? "border-accent-gold bg-accent-gold/10 text-primary"
                  : "border-primary/15 bg-white text-primary hover:border-accent-gold"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {filteredFavorites.length > 0 && (
          <ScrollSection3D>
            <div className="relative overflow-hidden rounded-3xl bg-primary-dark/95 text-text-onDark shadow-card">
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-80 md:h-[420px]" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDish.id}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={
                          dishImages[currentDish.id] ??
                          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={currentDish.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                        {currentDish.isSignature ? "Signature" : currentDish.isPopular ? "Popular" : "Favorit"}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative space-y-4 p-6 md:p-8" style={{ perspective: "1000px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentDish.id}-text`}
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="h-full"
                    >
                      <p className="text-sm uppercase tracking-[0.2em] text-accent-gold mb-3">
                        Our Menu Favourites
                      </p>
                      <h3 className="font-display text-3xl mb-4 leading-tight">{currentDish.name}</h3>
                      <p className="text-sm text-white/75 leading-relaxed mb-6">{currentDish.description}</p>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-accent-gold">
                          {currentDish.price} lei
                        </span>
                        {currentDish.isSignature && (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">
                            Signature
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mb-6">
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
                        <Button href="/menu" variant="secondary" size="md" className="border-white/30">
                          Vezi meniul
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <button
                          onClick={() =>
                            setDishIndex((prev) =>
                              prev === 0 ? filteredFavorites.length - 1 : prev - 1
                            )
                          }
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setDishIndex((prev) => (prev + 1) % filteredFavorites.length)}
                          className="rounded-full border border-white/20 px-3 py-1 hover:border-accent-gold"
                        >
                          →
                        </button>
                        <span className="ml-2">
                          {dishIndex + 1}/{filteredFavorites.length}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollSection3D>
        )}
      </section>

      <FeatureSection
        eyebrow="Mezze, Grătar & Deserturi"
        title="O călătorie culinară prin Liban"
        body="Preparatele noastre poartă aromele condimentelor orientale și prospețimea ingredientelor locale. Fiecare farfurie e gândită pentru a fi împărțită – în spiritul convivial libanez. Rețete moștenite, reinterpretate elegant pentru București."
        ctaLabel="Descoperă meniul"
        ctaHref="/menu"
        images={[
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Plating Zaitoone",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
            alt: "Mezze",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="section-curved bg-background-alt py-16">
        <div className="relative mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Signature dishes"
              title="A Symphony of Flavors"
              subtitle="Selecție de preparate iconice: mezze cremoase, grătar pe jar și deserturi cu fistic."
            />
          </ScrollSection3D>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 md:auto-rows-fr">
            {signatureDishes.map((item, idx) => (
              <ScrollSection3D key={item.id} delay={0.04 * (idx % 3)}>
                <TiltCard depth={18} className="h-full">
                  <MenuCard
                    item={item}
                    image={
                      galleryImages[idx % galleryImages.length]?.src ??
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                    }
                  />
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {menuCategories.slice(0, 5).map((cat, idx) => (
              <ScrollSection3D key={cat.slug} delay={0.05 * idx}>
                <span className="rounded-full border border-primary-light/30 bg-white px-4 py-2 text-sm text-primary">
                  {cat.name}
                </span>
              </ScrollSection3D>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection
        eyebrow="Cine romantice & Evenimente"
        title="Experiențe pentru orice moment"
        body="Cine romantice, seri cu prietenii sau întâlniri executive – pregătim atmosfera potrivită. Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete."
        ctaLabel="Rezervă o seară"
        ctaHref="/reservations"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Cină romantică",
          },
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Eveniment privat",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80",
            alt: "Seri cu prietenii",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Private Dining & Events"
        title="Momente care rămân"
        body="Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete. Chef's table, pairing de vinuri și set-up personalizat pentru evenimente corporate sau aniversări."
        ctaLabel="Planifică un eveniment"
        ctaHref="/events"
        images={[
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            alt: "Private Dining",
          },
          {
            src: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=1400&q=80",
            alt: "Business lunch",
          },
          {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
            alt: "Evenimente private",
          },
        ]}
      />

      <FeatureSection
        eyebrow="Povestea Zaitoone"
        title="Rădăcini libaneze, eleganță contemporană"
        body="Din 2014 pe B-dul Nicolae Caramfil, aproape de lacul Floreasca. Rețete de familie, mezze și grătar pe jar, ospitalitate autentică. Astăzi: meniuri moderne, 100% HALAL, experiențe private și corporate."
        ctaLabel="Află mai multe"
        ctaHref="/about"
        reverse
        images={timelineStory.map((step) => ({
          src: step.image,
          alt: step.year,
        }))}
      />

      <section className="bg-primary-dark py-16 text-text-onDark">
        <div className="mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D>
            <SectionHeading
              eyebrow="Gallery"
              title="Nature Frames Every Moment"
              subtitle="Colaj cinematic cu preparate și atmosfera Zaitoone."
              tone="light"
            />
          </ScrollSection3D>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.slice(0, 8).map((img, idx) => (
              <ScrollSection3D key={img.id} delay={0.04 * idx}>
                <TiltCard depth={16}>
                  <div
                    className={`relative h-48 overflow-hidden rounded-2xl shadow-soft ${
                      idx % 3 === 0 ? "md:row-span-2 md:h-64" : ""
                    } ${idx % 2 === 0 ? "-rotate-1 md:-rotate-2" : "rotate-1 md:rotate-2"}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </TiltCard>
              </ScrollSection3D>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/menu"
              className="text-sm uppercase tracking-[0.18em] text-accent-gold underline decoration-accent-gold/60 underline-offset-4"
            >
              Vezi galeria & meniul
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wide px-6 py-12 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Testimonials"
            title="Voices of Delight"
            subtitle="Experiențe povestite de oaspeții noștri – cine aniversare, întâlniri de business și seri cu prietenii."
            align="center"
          />
        </ScrollSection3D>
        <div className="mt-6">
          <ScrollSection3D delay={0.05}>
            <TestimonialsCarousel />
          </ScrollSection3D>
        </div>
      </section>

      <FeatureSection
        eyebrow="Location & Hours"
        title="În inima Bucureștiului"
        body="B-dul Nicolae Caramfil 2, aproape de zona de business și de promenadele verzi. Luni - Joi: 12:00 - 23:00, Vineri - Sâmbătă: 12:00 - 00:00, Duminică: 12:00 - 22:00. Telefon: +40 731 000 000, Email: rezervari@zaitoone.ro"
        ctaLabel="Contactează-ne"
        ctaHref="/contact"
        reverse
        images={[
          {
            src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
            alt: "Terasa verde",
          },
          {
            src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
            alt: "Atmosferă caldă",
          },
          {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Masă pregătită",
          },
        ]}
      />

      <section className="mx-auto max-w-wide px-6 py-12 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow="Testimonials"
            title="Voices of Delight"
            subtitle="Experiențe povestite de oaspeții noștri – cine aniversare, întâlniri de business și seri cu prietenii."
            align="center"
          />
        </ScrollSection3D>
        <div className="mt-6">
          <ScrollSection3D delay={0.05}>
            <TestimonialsCarousel />
          </ScrollSection3D>
        </div>
      </section>

      <section className="bg-primary-dark py-12 text-text-onDark">
        <div className="mx-auto flex max-w-wide flex-col items-center gap-4 px-6 text-center lg:px-10">
          <h3 className="font-script text-4xl">Ready to experience Zaitoone?</h3>
          <p className="text-sm text-white/70">
            Rezervă o masă sau planifică un eveniment privat cu echipa noastră.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/reservations" variant="primary" size="lg">
              Book a Table
            </Button>
            <Button href="/events" variant="secondary" size="lg" className="border-white/40">
              Planifică un eveniment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

type FloatingCardProps = {
  title: string;
  subtitle: string;
  image: string;
};

function FloatingCard({ title, subtitle, image }: FloatingCardProps) {
  return (
    <TiltCard depth={18} className="will-change-transform">
      <motion.div
        className="relative flex items-center gap-3 rounded-2xl border border-white/20 bg-surface-card/90 p-3 shadow-card backdrop-blur gsap-floating-card"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-14 w-14 overflow-hidden rounded-xl">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-text-onDark">{title}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-accent-gold">{subtitle}</p>
        </div>
      </motion.div>
    </TiltCard>
  );
}
