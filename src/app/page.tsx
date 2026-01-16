"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuCard } from "@/components/cards";
import { FeatureSection } from "@/components/feature-section";
import { menuCategories, menuItems } from "@/lib/sample-data";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { TiltCard } from "@/components/tilt-card";
import { ScrollSection3D } from "@/components/scroll-section-3d";
import { useGsapHome } from "@/hooks/use-gsap-home";
import { Hero } from "@/components/hero/Hero";
import { HeroNavStrip } from "@/components/sections/HeroNavStrip";
import { useLanguage } from "@/lib/language-context";

// Get signature dishes with their correct images from menu
const signatureDishes = menuItems
  .filter((item) => item.isSignature || item.isPopular)
  .slice(0, 6);

// Complete dish images mapping (same as menu page for consistency)
const menuItemImages: Record<string, string> = {
  // Salads
  "green-salad": "https://framerusercontent.com/images/JkOECGWfiVc4WcAsro3LvKpTaU.png",
  // Mezze
  "humus": "https://framerusercontent.com/images/k1PhSfxjj0LNZOAJyRr7QxPhtQM.png",
  "hummus-with-shawarma": "https://framerusercontent.com/images/7XrlZ5sKMf0PaJla12PaIhyVI.png",
  "hummus-with-truffles": "https://framerusercontent.com/images/4QDJNTsHu6J18fmmrcY9XJLEmk.png",
  "falafel": "https://framerusercontent.com/images/um8WPEW3IJgQ6weNmAI8LkTJTTU.png",
  "moutabal": "https://framerusercontent.com/images/Kper7WuTS0yahKhtTekJJLIujo.png",
  "baba-ganoush": "https://framerusercontent.com/images/tvGaal8qmReWLV8sr7X7RbGP9G0.png",
  "labneh": "https://framerusercontent.com/images/qwYbp7MXbf2h4pXHoQuyCvte66U.png",
  "labneh-zaitoone": "https://framerusercontent.com/images/VY4W3PR0o78GTQk6YMeuJwRtl1Y.png",
  "halloumi-cheese": "https://framerusercontent.com/images/wnTCmN3I9RFWh7KoQicsXWKuw.png",
  // Hot Appetizers
  "fried-kebbe-(5-pcs)": "https://framerusercontent.com/images/PLNr9NstCeFPq4zPMCfeYnu4Q.png",
  "sujuk": "https://framerusercontent.com/images/9wKp5jilWNnU7VuPAnfhYXzS5B4.png",
  "makanek": "https://framerusercontent.com/images/bUGAal1BFiMQLQT8IwMWdwM0.png",
  // Shawarma & Sharhat
  "beef-shawarma": "https://framerusercontent.com/images/9wHbKYDkXhVshqL638OVzkGL5i4.png",
  "chicken-shawarma": "https://framerusercontent.com/images/6yEF8AgARNK3TNiow6nXFTpzO5c.png",
  "beef-sharhat-by-zaitoone": "https://framerusercontent.com/images/DhPQk80W2jgFA8xlFRmy3lsRco.png",
  "zaitoone-chicken-sharhat": "https://framerusercontent.com/images/hNisHnENiry8TGkcMO2x4FEA3vw.png",
  // Ras Asfour
  "ras-asfour-vita-zaitoone": "https://framerusercontent.com/images/eLiFZLp0RLhDh3NiqBbcxPZi0U4.png",
  "beef-ras-asfour": "https://framerusercontent.com/images/lwIyPOD04tAZcVEqbqSC8v9EyRU.png",
  "chicken-ras-asfour": "https://framerusercontent.com/images/2snvTdlSfsIkSmJZdTzxWehGGQ.png",
  // Fatteh
  "fatteh-humous-with-meat-and-pine-buds": "https://framerusercontent.com/images/UjSgEJKQRKFye8Ne5Vba4JJ4Eg.png",
  "shrimp-fatteh": "https://framerusercontent.com/images/s96oANTllBrItDW3Eh5tvJQTTw.png",
  "simple-fatteh": "https://framerusercontent.com/images/jPIP3N7bFNurTszgKhExArSp89Y.png",
  // Grill
  "mixed-grill": "https://framerusercontent.com/images/upkDONhpHXbWaIu7d75TDsqWXE.png",
  "lamb-chop": "https://framerusercontent.com/images/ZdYTc75hF6hvN3RNih2V6FRXpSk.png",
  "adana-kebab": "https://framerusercontent.com/images/QvomUuXnc85lVwjkHPvYSmwn0.png",
  "kebab": "https://framerusercontent.com/images/wQ1G4Jusk1bVIbR3LfZA9W7O2E.png",
  "kebab-orfali": "https://framerusercontent.com/images/cp1QwgSRIqirXQhOlDDenJoF44.png",
  "chicken-skewers": "https://framerusercontent.com/images/tXkZb8FG9ARzmxsXWPebANX641s.png",
  "beef-skewers": "https://framerusercontent.com/images/0j35xVxAB9QAJnFHG5ZG6ZPAaUY.png",
  "ram-skewers": "https://framerusercontent.com/images/dsAbwdz4G8mUZsg8u1HyDmsx2M.png",
  "chicken-wings": "https://framerusercontent.com/images/3u2oyqgmW7S2nQ3dGsTHbuDrgbc.png",
  "wagyu-beef-entrecote": "https://framerusercontent.com/images/1pRUsbEFBydUZrCmQk1tJUGgBw.png",
  // Seafood
  "grilled-seafood-mix-with-roca-salad": "https://framerusercontent.com/images/vxgB7cavTeZis49hU9Ji4SgWw.png",
  "zaitoone-shrimp-with-pomegranate-sauce": "https://framerusercontent.com/images/Bd1gJ5mfPkI8xvGcg87VfxbL0M.png",
  "sea-wolf": "https://framerusercontent.com/images/bj2LxPPIWifMkV60n7yS4GICbY.png",
  "octopus-skewers": "https://framerusercontent.com/images/QoblSxxb6PXNS6vYIBbCrCCM.png",
  // Desserts
  "kunefe": "https://framerusercontent.com/images/v4076ctNFNDfDFhCugSCiVopVng.png",
  "baklava-with-ice-cream": "https://framerusercontent.com/images/o4E3exu1tDK3IzcTqZ8dvdXBhb4.png",
  "osmalie": "https://framerusercontent.com/images/gxFKASu6mJXvSNBVBXjFm3tP18.png",
  "katayef-with-nuts": "https://framerusercontent.com/images/APkKL6itkCxpAcp9pOFYTiRSAcs.png",
  "ashta": "https://framerusercontent.com/images/eelvySqrnoaY9g5sEJjmOKyNYI.png",
  // Arayes
  "arayes-kafta": "https://framerusercontent.com/images/dGF3cGMC5MJAxFn2ML9AAAznlb0.png",
  "arayes-cheese": "https://framerusercontent.com/images/YPZwJOHGSsTAXGKxmgoYaGeuvc.png",
  "arayes-halloumi": "https://framerusercontent.com/images/DTkgSlG4gMJgN7TgPq3iMpyYDI.png",
  // Bread
  "lipie-zaitoone": "https://framerusercontent.com/images/HozzGgsqQ0fzsWDV3cvwibReAmI.png",
};

// Restaurant ambiance images - using Framer CDN dish images for reliable loading
// For custom restaurant photos, save to /public/assets/restaurant/ and update paths
const ambianceImages = {
  // Restaurant interior - using a warm dish photo
  restaurant: "https://framerusercontent.com/images/upkDONhpHXbWaIu7d75TDsqWXE.png", // Mixed grill
  // Lounge - using an elegant dish
  lounge: "https://framerusercontent.com/images/o4E3exu1tDK3IzcTqZ8dvdXBhb4.png", // Baklava
  // Terrace - using fresh salad
  terrace: "https://framerusercontent.com/images/vxgB7cavTeZis49hU9Ji4SgWw.png", // Seafood
  // Dining Privat - using fatteh
  diningPrivat: "https://framerusercontent.com/images/UjSgEJKQRKFye8Ne5Vba4JJ4Eg.png", // Fatteh
};

// Fallback to Framer images for sections (using actual dish photos)
const sectionImages = {
  culinary: [
    "https://framerusercontent.com/images/ZdYTc75hF6hvN3RNih2V6FRXpSk.png", // Lamb chop
    "https://framerusercontent.com/images/vxgB7cavTeZis49hU9Ji4SgWw.png", // Seafood mix
    "https://framerusercontent.com/images/k1PhSfxjj0LNZOAJyRr7QxPhtQM.png", // Humus
  ],
  experiences: [
    "https://framerusercontent.com/images/UjSgEJKQRKFye8Ne5Vba4JJ4Eg.png", // Fatteh
    "https://framerusercontent.com/images/o4E3exu1tDK3IzcTqZ8dvdXBhb4.png", // Baklava
    "https://framerusercontent.com/images/upkDONhpHXbWaIu7d75TDsqWXE.png", // Mixed grill
  ],
  moments: [
    "https://framerusercontent.com/images/1pRUsbEFBydUZrCmQk1tJUGgBw.png", // Wagyu
    "https://framerusercontent.com/images/Bd1gJ5mfPkI8xvGcg87VfxbL0M.png", // Shrimp
    "https://framerusercontent.com/images/v4076ctNFNDfDFhCugSCiVopVng.png", // Kunefe
  ],
  story: [
    "https://framerusercontent.com/images/QvomUuXnc85lVwjkHPvYSmwn0.png", // Adana kebab
    "https://framerusercontent.com/images/wQ1G4Jusk1bVIbR3LfZA9W7O2E.png", // Kebab
    "https://framerusercontent.com/images/Kper7WuTS0yahKhtTekJJLIujo.png", // Moutabal
  ],
  location: [
    "https://framerusercontent.com/images/tvGaal8qmReWLV8sr7X7RbGP9G0.png", // Baba ganoush
    "https://framerusercontent.com/images/wnTCmN3I9RFWh7KoQicsXWKuw.png", // Halloumi
    "https://framerusercontent.com/images/um8WPEW3IJgQ6weNmAI8LkTJTTU.png", // Falafel
  ],
  gallery: [
    "https://framerusercontent.com/images/tXkZb8FG9ARzmxsXWPebANX641s.png", // Chicken skewers
    "https://framerusercontent.com/images/0j35xVxAB9QAJnFHG5ZG6ZPAaUY.png", // Beef skewers
    "https://framerusercontent.com/images/s96oANTllBrItDW3Eh5tvJQTTw.png", // Shrimp fatteh
    "https://framerusercontent.com/images/6yEF8AgARNK3TNiow6nXFTpzO5c.png", // Chicken shawarma
    "https://framerusercontent.com/images/9wHbKYDkXhVshqL638OVzkGL5i4.png", // Beef shawarma
    "https://framerusercontent.com/images/lwIyPOD04tAZcVEqbqSC8v9EyRU.png", // Beef ras asfour
  ],
};

// Helper to get dish image
function getDishImage(itemId: string): string {
  return menuItemImages[itemId] || "https://framerusercontent.com/images/k1PhSfxjj0LNZOAJyRr7QxPhtQM.png";
}

// Hook to detect slow connection or reduced motion preference
function useReducedAnimations() {
  const [shouldReduce, setShouldReduce] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for slow connection
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    const isSlowConnection = connection?.effectiveType === '2g' || 
                            connection?.effectiveType === 'slow-2g' ||
                            connection?.saveData === true;
    
    setShouldReduce(prefersReducedMotion || isSlowConnection);
    
    // Listen for changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setShouldReduce(e.matches || isSlowConnection);
    motionQuery.addEventListener('change', handleMotionChange);
    
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);
  
  return shouldReduce;
}

export default function Home() {
  const reduceAnimations = useReducedAnimations();
  useGsapHome();
  const { language } = useLanguage();

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
  
  // Simplified animation variants for performance
  const simpleVariants = reduceAnimations ? {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const content = {
    ro: {
      elegance: "ELEGANȚĂ ȘI AROMĂ",
      timeless: "Atemporal, legendar, incomparabil —",
      inBucharest: "în București",
      aboutUs: "Despre noi",
      discover: "Descoperă",
      restaurant: "Restaurant",
      restaurantSub: "Salon elegant și terasă verde",
      lounge: "Lounge și Bar",
      loungeSub: "Cocktailuri orientale și narghilea",
      wellness: "Wellness și Terasă",
      privateDining: "Dining Privat",
      privateDiningSub: "Masa bucătarului și selecție de vinuri",
      patisserie: "Patiserie și Deserturi",
      patisserieSub: "Künefe cu fistic, baklava, cafea libaneză",
      favorites: "Preparatele noastre preferate",
      favoritesDesc: "Selecție de preparate semnătură. Alegeți categoria și descoperiți ce preferă oaspeții noștri.",
      signature: "Preparate semnătură",
      symphony: "O simfonie de arome",
      symphonyDesc: "Selecție de preparate emblematice: mezze cremoase, grătar pe jar și deserturi cu fistic.",
      bookTable: "Rezervă o masă",
      viewMenu: "Vezi meniul",
      culinaryEyebrow: "Mezze, Grătar și Deserturi",
      culinaryTitle: "O călătorie culinară prin Liban",
      culinaryBody: "Preparatele noastre îmbină aromele condimentelor orientale cu prospețimea ingredientelor locale. Fiecare farfurie este gândită pentru a fi împărțită, în spiritul ospitalității libaneze. Rețete moștenite, reinterpretate elegant pentru București.",
      discoverMenu: "Descoperă meniul",
      experiencesEyebrow: "Cine romantice și Evenimente",
      experiencesTitle: "Experiențe pentru orice moment",
      experiencesBody: "Cine romantice, seri cu prietenii sau întâlniri de afaceri. Pregătim atmosfera potrivită. Salon intim, lumini calde și meniuri degustare personalizate.",
      bookEvening: "Rezervă o seară",
      momentsEyebrow: "Dining Privat și Evenimente",
      momentsTitle: "Momente care rămân",
      momentsBody: "Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete. Masa bucătarului, selecție de vinuri și amenajare personalizată pentru evenimente de afaceri sau aniversări.",
      planEvent: "Planifică un eveniment",
      storyEyebrow: "Povestea Zaitoone",
      storyTitle: "Rădăcini libaneze, eleganță contemporană",
      storyBody: "Din 2014 pe Bulevardul Nicolae Caramfil, aproape de lacul Floreasca. Rețete de familie, mezze și grătar pe jar, ospitalitate autentică. Astăzi: meniuri moderne, 100% HALAL, experiențe private și de afaceri.",
      learnMore: "Află mai multe",
      galleryEyebrow: "Galerie",
      galleryTitle: "Natura încadrează fiecare moment",
      galleryDesc: "Colaj vizual cu preparate și atmosfera Zaitoone.",
      viewGallery: "Vezi galeria și meniul",
      testimonialsEyebrow: "Mărturii",
      testimonialsTitle: "Voci încântate",
      testimonialsDesc: "Experiențe povestite de oaspeții noștri: cine aniversare, întâlniri de afaceri și seri cu prietenii.",
      locationEyebrow: "Locație și Program",
      locationTitle: "În inima Bucureștiului",
      locationBody: "Bulevardul Nicolae Caramfil 2, aproape de zona de business. Luni - Joi: 12:00 - 23:00, Vineri - Sâmbătă: 12:00 - 00:00, Duminică: 12:00 - 22:00. Telefon: +40 731 000 000, Email: rezervari@zaitoone.ro",
      contactUs: "Contactează-ne",
      readyTitle: "Pregătiți pentru experiența Zaitoone?",
      readyDesc: "Rezervați o masă sau planificați un eveniment privat cu echipa noastră.",
    },
    en: {
      elegance: "ELEGANCE AND AROMA",
      timeless: "Timeless, legendary, incomparable —",
      inBucharest: "in Bucharest",
      aboutUs: "About us",
      discover: "Discover",
      restaurant: "Restaurant",
      restaurantSub: "Elegant salon and green terrace",
      lounge: "Lounge and Bar",
      loungeSub: "Oriental cocktails and hookah",
      wellness: "Wellness and Terrace",
      privateDining: "Private Dining",
      privateDiningSub: "Chef's table and wine pairing",
      patisserie: "Patisserie and Dessert Bar",
      patisserieSub: "Künefe with pistachio, baklava, Lebanese coffee",
      favorites: "Our Menu Favourites",
      favoritesDesc: "A selection of signature dishes. Choose a category and discover what our guests love.",
      signature: "Signature Dishes",
      symphony: "A Symphony of Flavors",
      symphonyDesc: "A selection of iconic dishes: creamy mezze, charcoal grill and pistachio desserts.",
      bookTable: "Book a Table",
      viewMenu: "View Menu",
      culinaryEyebrow: "Mezze, Grill & Desserts",
      culinaryTitle: "A Culinary Journey Through Lebanon",
      culinaryBody: "Our dishes combine the aromas of oriental spices with the freshness of local ingredients. Each plate is designed to be shared, in the spirit of Lebanese hospitality. Inherited recipes, elegantly reinterpreted for Bucharest.",
      discoverMenu: "Discover the menu",
      experiencesEyebrow: "Romantic Dinners & Events",
      experiencesTitle: "Experiences for Every Moment",
      experiencesBody: "Romantic dinners, evenings with friends or business meetings. We prepare the perfect atmosphere. Intimate setting, warm lighting and personalized tasting menus.",
      bookEvening: "Book an evening",
      momentsEyebrow: "Private Dining & Events",
      momentsTitle: "Moments That Last",
      momentsBody: "Intimate setting, warm lighting and personalized tasting menus for romantic evenings or private gatherings. Chef's table, wine pairing and personalized setup for corporate events or anniversaries.",
      planEvent: "Plan an event",
      storyEyebrow: "The Zaitoone Story",
      storyTitle: "Lebanese Roots, Contemporary Elegance",
      storyBody: "Since 2014 on Nicolae Caramfil Boulevard, near Floreasca Lake. Family recipes, mezze and charcoal grill, authentic hospitality. Today: modern menus, 100% HALAL, private and corporate experiences.",
      learnMore: "Learn more",
      galleryEyebrow: "Gallery",
      galleryTitle: "Nature Frames Every Moment",
      galleryDesc: "A visual collage of dishes and the Zaitoone atmosphere.",
      viewGallery: "View gallery and menu",
      testimonialsEyebrow: "Testimonials",
      testimonialsTitle: "Voices of Delight",
      testimonialsDesc: "Experiences shared by our guests: anniversary dinners, business meetings and evenings with friends.",
      locationEyebrow: "Location & Hours",
      locationTitle: "In the Heart of Bucharest",
      locationBody: "Nicolae Caramfil Boulevard 2, near the business district. Mon - Thu: 12:00 - 23:00, Fri - Sat: 12:00 - 00:00, Sun: 12:00 - 22:00. Phone: +40 731 000 000, Email: rezervari@zaitoone.ro",
      contactUs: "Contact us",
      readyTitle: "Ready to Experience Zaitoone?",
      readyDesc: "Book a table or plan a private event with our team.",
    },
  };

  const c = content[language];

  // Use different images for timeline to avoid repetition
  const timelineStory = sectionImages.story;

  return (
    <div className="min-h-screen pb-12 bg-[#111111]">
      <Hero />
      <HeroNavStrip />

      {/* Split Showcase Section */}
      <section className="bg-[#1a1a1a] text-white overflow-hidden rounded-sm shadow-2xl mx-4 sm:mx-6 lg:mx-auto my-4 sm:my-6 border border-white/10">
        <div className="mx-auto flex w-full max-w-wide flex-col items-center gap-2 px-4 py-5 text-center sm:px-6 lg:px-10">
          <ScrollSection3D>
            <p className="text-xs font-forum uppercase tracking-[0.28em] text-accent-gold">
              {c.elegance}
            </p>
          </ScrollSection3D>
          <ScrollSection3D delay={0.04}>
            <h2 className="font-forum text-3xl leading-tight sm:text-4xl text-white">
              {c.timeless}{" "}
              <span className="font-script text-5xl text-accent-gold sm:text-6xl">
                Zaitoone
              </span>{" "}
              {c.inBucharest}
            </h2>
          </ScrollSection3D>
          <ScrollSection3D delay={0.08}>
            <Link
              href="/about"
              data-cursor="link"
              className="text-sm font-forum uppercase tracking-[0.18em] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-accent-gold"
            >
              {c.aboutUs}
            </Link>
          </ScrollSection3D>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-0 px-0">
          {[
            {
              title: c.restaurant,
              subtitle: c.restaurantSub,
              href: "/menu",
              image: ambianceImages.restaurant,
            },
            {
              title: c.lounge,
              subtitle: c.loungeSub,
              href: "/about",
              image: ambianceImages.lounge,
            },
          ].map((tile, idx) => (
            <ScrollSection3D key={tile.title} delay={reduceAnimations ? 0 : 0.03 * idx}>
              <Link
                href={tile.href}
                data-cursor="link"
                className="group relative block h-full min-h-[360px] overflow-hidden"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/0 group-hover:border-accent-gold/50 transition-all duration-500" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/0 group-hover:border-accent-gold/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                  <div className="flex justify-end text-[11px] font-forum uppercase tracking-[0.2em] text-accent-gold/80">
                    {c.discover}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-script text-4xl text-white drop-shadow-lg sm:text-5xl">
                      {tile.title}
                    </h3>
                    <p className="text-sm font-forum text-white/70">{tile.subtitle}</p>
                  </div>
                </div>
              </Link>
            </ScrollSection3D>
          ))}
        </div>
        <div className="mt-0 grid w-full grid-cols-1 gap-0 px-0">
          <ScrollSection3D delay={reduceAnimations ? 0 : 0.06}>
            <Link
              href="/contact"
              data-cursor="link"
              className="group relative block h-full min-h-[420px] overflow-hidden"
            >
              <Image
                src={ambianceImages.terrace}
                alt={c.wellness}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="100vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-white/0 group-hover:border-accent-gold/50 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-white/0 group-hover:border-accent-gold/50 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                <div className="flex justify-end text-[11px] font-forum uppercase tracking-[0.2em] text-accent-gold/80">
                  {c.discover}
                </div>
                <div className="space-y-2">
                  <h3 className="font-script text-4xl text-white drop-shadow-lg sm:text-5xl">
                    {c.wellness}
                  </h3>
                </div>
              </div>
            </Link>
          </ScrollSection3D>
        </div>

        <div className="mt-0 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-0 px-0">
          {[
            {
              title: c.privateDining,
              subtitle: c.privateDiningSub,
              href: "/events",
              image: ambianceImages.diningPrivat,
            },
            {
              title: c.patisserie,
              subtitle: c.patisserieSub,
              href: "/menu#desert",
              image: "https://framerusercontent.com/images/o4E3exu1tDK3IzcTqZ8dvdXBhb4.png", // Baklava
            },
          ].map((tile, idx) => (
            <ScrollSection3D key={tile.title} delay={reduceAnimations ? 0 : 0.08 + 0.03 * idx}>
              <Link
                href={tile.href}
                data-cursor="link"
                className="group relative block h-full min-h-[340px] overflow-hidden"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/0 group-hover:border-accent-gold/50 transition-all duration-500" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/0 group-hover:border-accent-gold/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                  <div className="flex justify-end text-[11px] font-forum uppercase tracking-[0.2em] text-accent-gold/80">
                    {c.discover}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-script text-4xl text-white drop-shadow-lg sm:text-5xl">
                      {tile.title}
                    </h3>
                    <p className="text-sm font-forum text-white/70">{tile.subtitle}</p>
                  </div>
                </div>
              </Link>
            </ScrollSection3D>
          ))}
        </div>
      </section>

      {/* Favorites Section */}
      <section className="mx-auto max-w-wide space-y-6 px-6 py-10 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow={c.favorites}
            title={c.favorites}
            subtitle={c.favoritesDesc}
            align="center"
            tone="light"
          />
        </ScrollSection3D>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const catName = typeof cat.name === 'object' ? cat.name[language] : cat.name;
            return (
              <button
                key={cat.slug}
                onClick={() => {
                  setDishIndex(0);
                  setSelectedCategory(cat.slug);
                }}
                className={`rounded-sm border px-4 py-2 text-sm font-forum transition ${
                  selectedCategory === cat.slug
                    ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                    : "border-white/20 bg-white/5 text-white/80 hover:border-accent-gold hover:text-accent-gold"
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>
        {filteredFavorites.length > 0 && currentDish && (
          <ScrollSection3D delay={reduceAnimations ? 0 : 0.05}>
            <div className="relative overflow-hidden rounded-sm bg-[#0a0a0a] text-white shadow-card border border-white/10">
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-accent-gold/20 pointer-events-none z-10" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-accent-gold/20 pointer-events-none z-10" />
              
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-80 md:h-[420px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDish.id}
                      initial={reduceAnimations ? { opacity: 1 } : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceAnimations ? { opacity: 1 } : { opacity: 0, x: 20 }}
                      transition={{ duration: reduceAnimations ? 0 : 0.4, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={getDishImage(currentDish.id)}
                        alt={typeof currentDish.name === 'object' ? currentDish.name[language] : currentDish.name}
                        fill
                        className="object-cover"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/50 md:block hidden" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 text-[10px] font-forum uppercase tracking-[0.2em] 
                                       bg-black/60 backdrop-blur-sm border border-accent-gold/40 text-accent-gold rounded-sm">
                          {currentDish.isSignature ? (language === "ro" ? "Semnătură" : "Signature") : 
                           currentDish.isPopular ? "Popular" : "Favorit"}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentDish.id}-text`}
                      initial={reduceAnimations ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceAnimations ? { opacity: 1 } : { opacity: 0, y: -10 }}
                      transition={{ duration: reduceAnimations ? 0 : 0.3, ease: "easeOut" }}
                      className="h-full flex flex-col"
                    >
                      {/* Decorative line */}
                      <div className="w-10 h-px bg-accent-gold/50 mb-4" />
                      
                      <p className="text-xs font-forum uppercase tracking-[0.25em] text-accent-gold mb-3">
                        {c.signature}
                      </p>
                      <h3 className="font-forum text-2xl md:text-3xl mb-4 leading-tight text-white">
                        {typeof currentDish.name === 'object' ? currentDish.name[language] : currentDish.name}
                      </h3>
                      <p className="text-sm font-forum text-white/60 leading-relaxed mb-6 flex-1">
                        {typeof currentDish.description === 'object' ? currentDish.description[language] : currentDish.description}
                      </p>
                      
                      {/* Price with elegant styling */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 text-base font-forum text-accent-gold bg-accent-gold/5 
                                       border border-accent-gold/30 rounded-sm">
                          {currentDish.price} lei
                        </span>
                        {currentDish.isSignature && (
                          <span className="px-3 py-1.5 text-[10px] font-forum uppercase tracking-[0.15em] 
                                         bg-white/5 border border-white/10 text-white/70 rounded-sm">
                            Signature
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-3 mb-6">
                        <Button href="/reservations" variant="primary" size="md">
                          {c.bookTable}
                        </Button>
                        <Button href="/menu" variant="secondary" size="md" className="border-white/30">
                          {c.viewMenu}
                        </Button>
                      </div>
                      
                      {/* Navigation with elegant styling */}
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                        <button
                          onClick={() =>
                            setDishIndex((prev) =>
                              prev === 0 ? filteredFavorites.length - 1 : prev - 1
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center rounded-sm border border-white/10 
                                   hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all duration-300"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setDishIndex((prev) => (prev + 1) % filteredFavorites.length)}
                          className="w-10 h-10 flex items-center justify-center rounded-sm border border-white/10 
                                   hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all duration-300"
                        >
                          →
                        </button>
                        <span className="ml-3 text-sm font-forum text-white/40">
                          {dishIndex + 1} / {filteredFavorites.length}
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

      {/* Culinary Journey */}
      <FeatureSection
        eyebrow={c.culinaryEyebrow}
        title={c.culinaryTitle}
        body={c.culinaryBody}
        ctaLabel={c.discoverMenu}
        ctaHref="/menu"
        dark
        images={sectionImages.culinary.map((src, idx) => ({
          src,
          alt: `Culinary ${idx + 1}`,
        }))}
      />

      {/* Signature Dishes - Using actual menu items with their correct images */}
      <section className="section-curved bg-[#1a1a1a] py-10">
        <div className="relative mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D delay={reduceAnimations ? 0 : 0.02}>
            <SectionHeading
              eyebrow={c.signature}
              title={c.symphony}
              subtitle={c.symphonyDesc}
              tone="light"
            />
          </ScrollSection3D>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 md:auto-rows-fr">
            {signatureDishes.map((item) => (
              <div key={item.id} className="h-full">
                <MenuCard
                  item={item}
                  image={getDishImage(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {menuCategories.slice(0, 5).map((cat) => {
              const catName = typeof cat.name === 'object' ? cat.name[language] : cat.name;
              return (
                <Link 
                  key={cat.slug}
                  href={`/menu#${cat.slug}`}
                  className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm font-forum text-white/70
                           hover:border-accent-gold/30 hover:text-accent-gold transition-all duration-300"
                >
                  {catName}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <FeatureSection
        eyebrow={c.experiencesEyebrow}
        title={c.experiencesTitle}
        body={c.experiencesBody}
        ctaLabel={c.bookEvening}
        ctaHref="/reservations"
        reverse
        dark
        images={sectionImages.experiences.map((src, idx) => ({
          src,
          alt: `Experience ${idx + 1}`,
        }))}
      />

      {/* Moments */}
      <FeatureSection
        eyebrow={c.momentsEyebrow}
        title={c.momentsTitle}
        body={c.momentsBody}
        ctaLabel={c.planEvent}
        ctaHref="/events"
        dark
        images={sectionImages.moments.map((src, idx) => ({
          src,
          alt: `Moment ${idx + 1}`,
        }))}
      />

      {/* Story */}
      <FeatureSection
        eyebrow={c.storyEyebrow}
        title={c.storyTitle}
        body={c.storyBody}
        ctaLabel={c.learnMore}
        ctaHref="/about"
        reverse
        dark
        images={timelineStory.map((src, idx) => ({
          src,
          alt: `Story ${idx + 1}`,
        }))}
      />

      {/* Gallery */}
      <section className="bg-[#0a0a0a] py-10 text-white">
        <div className="mx-auto max-w-wide px-6 lg:px-10">
          <ScrollSection3D delay={reduceAnimations ? 0 : 0.02}>
            <SectionHeading
              eyebrow={c.galleryEyebrow}
              title={c.galleryTitle}
              subtitle={c.galleryDesc}
              tone="light"
            />
          </ScrollSection3D>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {sectionImages.gallery.map((src, idx) => (
              <div 
                key={idx}
                className={`relative overflow-hidden rounded-sm shadow-soft group elegant-image-frame ${
                  idx === 0 ? "md:col-span-2 md:row-span-2 h-64 md:h-80" : "h-48"
                }`}
              >
                <Image
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-sm font-forum uppercase tracking-[0.18em] text-accent-gold 
                       hover:text-white transition-colors duration-300"
            >
              {c.viewGallery}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-wide px-6 py-8 lg:px-10">
        <ScrollSection3D>
          <SectionHeading
            eyebrow={c.testimonialsEyebrow}
            title={c.testimonialsTitle}
            subtitle={c.testimonialsDesc}
            align="center"
            tone="light"
          />
        </ScrollSection3D>
        <div className="mt-6">
          <ScrollSection3D delay={0.05}>
            <TestimonialsCarousel />
          </ScrollSection3D>
        </div>
      </section>

      {/* Location */}
      <FeatureSection
        eyebrow={c.locationEyebrow}
        title={c.locationTitle}
        body={c.locationBody}
        ctaLabel={c.contactUs}
        ctaHref="/contact"
        reverse
        dark
        images={sectionImages.location.map((src, idx) => ({
          src,
          alt: `Location ${idx + 1}`,
        }))}
      />

      {/* CTA Section */}
      <section className="bg-[#0a0a0a] py-8 text-white border-t border-white/10">
        <div className="mx-auto flex max-w-wide flex-col items-center gap-4 px-6 text-center lg:px-10">
          <h3 className="font-script text-4xl text-accent-gold">{c.readyTitle}</h3>
          <p className="text-sm font-forum text-white/70">
            {c.readyDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/reservations" variant="primary" size="lg">
              {c.bookTable}
            </Button>
            <Button href="/events" variant="secondary" size="lg" className="border-white/40">
              {c.planEvent}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
