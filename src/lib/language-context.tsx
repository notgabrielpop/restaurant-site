"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ro" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  ro: {
    // Header
    "nav.home": "ACASĂ",
    "nav.menu": "MENIU",
    "nav.about": "DESPRE NOI",
    "nav.reservations": "REZERVĂRI",
    "nav.contact": "CONTACT",
    "nav.book": "Rezervă o masă",
    
    // Hero
    "hero.welcome": "BINE AȚI VENIT LA",
    "hero.book": "Rezervă o masă",
    "hero.findUs": "/ UNDE NE GĂSIȚI",
    "hero.address": "Str. Nicolae G. Caramfil, Nr.2, București",
    "hero.awards": "Premii Horeca",
    "hero.since": "DIN",
    
    // Navigation Strip
    "strip.menu": "MENIU",
    "strip.reservation": "REZERVARE",
    "strip.restaurant": "RESTAURANTUL NOSTRU",
    "strip.discover": "DESCOPERĂ",
    
    // Sections
    "section.elegance": "ELEGANȚĂ ȘI AROMĂ",
    "section.timeless": "Atemporal, legendar, incomparabil —",
    "section.inBucharest": "în București",
    "section.aboutUs": "Despre noi",
    "section.favorites": "Preparatele noastre preferate",
    "section.favoritesDesc": "Selecție de preparate semnătură. Alegeți categoria și descoperiți ce preferă oaspeții noștri.",
    "section.signature": "Preparate semnătură",
    "section.symphony": "O simfonie de arome",
    "section.symphonyDesc": "Selecție de preparate emblematice: mezze cremoase, grătar pe jar și deserturi cu fistic.",
    "section.culinary": "O călătorie culinară prin Liban",
    "section.culinaryDesc": "Preparatele noastre îmbină aromele condimentelor orientale cu prospețimea ingredientelor locale. Fiecare farfurie este gândită pentru a fi împărțită, în spiritul ospitalității libaneze.",
    "section.discover": "Descoperă meniul",
    "section.experiences": "Experiențe pentru orice moment",
    "section.experiencesDesc": "Cine romantice, seri cu prietenii sau întâlniri de afaceri. Pregătim atmosfera potrivită.",
    "section.bookEvening": "Rezervă o seară",
    "section.moments": "Momente care rămân",
    "section.momentsDesc": "Salon intim, lumini calde și meniuri degustare personalizate pentru seri romantice sau întâlniri discrete.",
    "section.planEvent": "Planifică un eveniment",
    "section.story": "Rădăcini libaneze, eleganță contemporană",
    "section.storyDesc": "Din 2014 pe Bulevardul Nicolae Caramfil, aproape de lacul Floreasca. Rețete de familie, mezze și grătar pe jar, ospitalitate autentică.",
    "section.learnMore": "Află mai multe",
    "section.gallery": "Galerie",
    "section.galleryTitle": "Natura încadrează fiecare moment",
    "section.galleryDesc": "Colaj vizual cu preparate și atmosfera Zaitoone.",
    "section.viewGallery": "Vezi galeria și meniul",
    "section.testimonials": "Mărturii",
    "section.testimonialsTitle": "Voci încântate",
    "section.testimonialsDesc": "Experiențe povestite de oaspeții noștri: cine aniversare, întâlniri de afaceri și seri cu prietenii.",
    "section.location": "Locație și program",
    "section.locationTitle": "În inima Bucureștiului",
    "section.locationDesc": "Bulevardul Nicolae Caramfil 2, aproape de zona de business. Program: Luni-Joi 12:00-23:00, Vineri-Sâmbătă 12:00-00:00, Duminică 12:00-22:00.",
    "section.contactUs": "Contactează-ne",
    "section.ready": "Pregătiți pentru experiența Zaitoone?",
    "section.readyDesc": "Rezervați o masă sau planificați un eveniment privat cu echipa noastră.",
    
    // Menu Page
    "menu.title": "Meniul nostru",
    "menu.subtitle": "Descoperă aromele autentice ale bucătăriei libaneze",
    
    // About Page
    "about.title": "Despre Zaitoone",
    "about.subtitle": "Povestea noastră",
    
    // Reservations Page
    "reservations.title": "Rezervări",
    "reservations.subtitle": "Rezervă o masă la Zaitoone",
    
    // Contact Page
    "contact.title": "Contact",
    "contact.subtitle": "Suntem aici pentru dumneavoastră",
    
    // Footer
    "footer.rights": "Toate drepturile rezervate",
    "footer.followUs": "Urmăriți-ne",
    
    // Common
    "common.viewMenu": "Vezi meniul",
    "common.bookTable": "Rezervă o masă",
    "common.lei": "lei",
  },
  en: {
    // Header
    "nav.home": "HOME",
    "nav.menu": "MENU",
    "nav.about": "ABOUT",
    "nav.reservations": "RESERVATIONS",
    "nav.contact": "CONTACT",
    "nav.book": "Book a Table",
    
    // Hero
    "hero.welcome": "WELCOME TO",
    "hero.book": "Book a Table",
    "hero.findUs": "/ FIND US",
    "hero.address": "Nicolae G. Caramfil St., No.2, Bucharest",
    "hero.awards": "Horeca Awards",
    "hero.since": "SINCE",
    
    // Navigation Strip
    "strip.menu": "MENU",
    "strip.reservation": "RESERVATION",
    "strip.restaurant": "OUR RESTAURANT",
    "strip.discover": "DISCOVER",
    
    // Sections
    "section.elegance": "ELEGANCE AND AROMA",
    "section.timeless": "Timeless, legendary, incomparable —",
    "section.inBucharest": "in Bucharest",
    "section.aboutUs": "About us",
    "section.favorites": "Our Menu Favourites",
    "section.favoritesDesc": "A selection of signature dishes. Choose a category and discover what our guests love.",
    "section.signature": "Signature Dishes",
    "section.symphony": "A Symphony of Flavors",
    "section.symphonyDesc": "A selection of iconic dishes: creamy mezze, charcoal grill and pistachio desserts.",
    "section.culinary": "A Culinary Journey Through Lebanon",
    "section.culinaryDesc": "Our dishes combine the aromas of oriental spices with the freshness of local ingredients. Each plate is designed to be shared, in the spirit of Lebanese hospitality.",
    "section.discover": "Discover the menu",
    "section.experiences": "Experiences for Every Moment",
    "section.experiencesDesc": "Romantic dinners, evenings with friends or business meetings. We prepare the perfect atmosphere.",
    "section.bookEvening": "Book an evening",
    "section.moments": "Moments That Last",
    "section.momentsDesc": "Intimate setting, warm lighting and personalized tasting menus for romantic evenings or private gatherings.",
    "section.planEvent": "Plan an event",
    "section.story": "Lebanese Roots, Contemporary Elegance",
    "section.storyDesc": "Since 2014 on Nicolae Caramfil Boulevard, near Floreasca Lake. Family recipes, mezze and charcoal grill, authentic hospitality.",
    "section.learnMore": "Learn more",
    "section.gallery": "Gallery",
    "section.galleryTitle": "Nature Frames Every Moment",
    "section.galleryDesc": "A visual collage of dishes and the Zaitoone atmosphere.",
    "section.viewGallery": "View gallery and menu",
    "section.testimonials": "Testimonials",
    "section.testimonialsTitle": "Voices of Delight",
    "section.testimonialsDesc": "Experiences shared by our guests: anniversary dinners, business meetings and evenings with friends.",
    "section.location": "Location and Hours",
    "section.locationTitle": "In the Heart of Bucharest",
    "section.locationDesc": "Nicolae Caramfil Boulevard 2, near the business district. Hours: Mon-Thu 12:00-23:00, Fri-Sat 12:00-00:00, Sun 12:00-22:00.",
    "section.contactUs": "Contact us",
    "section.ready": "Ready to Experience Zaitoone?",
    "section.readyDesc": "Book a table or plan a private event with our team.",
    
    // Menu Page
    "menu.title": "Our Menu",
    "menu.subtitle": "Discover the authentic flavors of Lebanese cuisine",
    
    // About Page
    "about.title": "About Zaitoone",
    "about.subtitle": "Our Story",
    
    // Reservations Page
    "reservations.title": "Reservations",
    "reservations.subtitle": "Book a table at Zaitoone",
    
    // Contact Page
    "contact.title": "Contact",
    "contact.subtitle": "We are here for you",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.followUs": "Follow us",
    
    // Common
    "common.viewMenu": "View menu",
    "common.bookTable": "Book a Table",
    "common.lei": "lei",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ro");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
