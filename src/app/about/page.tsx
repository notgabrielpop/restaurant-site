"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { timeline, highlightCards } from "@/lib/sample-data";
import { FeatureCard } from "@/components/cards";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
  const { language } = useLanguage();

  const content = {
    ro: {
      eyebrow: "Gustul Libanului – Din 2014",
      title: "Povestea Zaitoone",
      subtitle: "Rădăcini libaneze, eleganță contemporană. Fondat în 2014 la București, cu promisiunea gusturilor autentice și a ospitalității calde.",
      description: "Din pasiune pentru mezze și grătarul pe jar, am creat un spațiu unde ingredientele premium întâlnesc tehnici clasice. Meniul este curajos, dar onest, cu accent pe prospețime și prezentare modernă.",
      visionEyebrow: "Viziunea noastră culinară",
      visionTitle: "Eleganță în dining",
      visionSubtitle: "Bucătarul nostru reinterpretează rețete libaneze cu produse locale, ulei de măsline din Valea Bekaa și condimente prăjite în casă.",
      timelineEyebrow: "Cronologie",
      timelineTitle: "Momente importante",
      timelineSubtitle: "O poveste construită cu o echipă dedicată și oaspeți fideli.",
      teamEyebrow: "Echipa",
      teamTitle: "Ospitalitate libaneză, atenție la detalii",
      teamDesc: "Echipa noastră îmbină expertiza bucătarilor libanezi cu energia tinerilor somelieri și mixologi. Ne străduim să surprindem prin servicii discrete și recomandări personalizate.",
      experience: "Experiență internațională",
    },
    en: {
      eyebrow: "The Taste of Lebanon – Since 2014",
      title: "The Zaitoone Story",
      subtitle: "Lebanese roots, contemporary elegance. Founded in 2014 in Bucharest, with the promise of authentic flavors and warm hospitality.",
      description: "From a passion for mezze and charcoal grill, we created a space where premium ingredients meet classic techniques. The menu is bold yet honest, with an emphasis on freshness and modern presentation.",
      visionEyebrow: "Our Culinary Vision",
      visionTitle: "Elegance in Dining",
      visionSubtitle: "Our chef reinterprets Lebanese recipes with local produce, olive oil from the Bekaa Valley, and spices roasted in-house.",
      timelineEyebrow: "Timeline",
      timelineTitle: "Key Moments",
      timelineSubtitle: "A story built with a dedicated team and loyal guests.",
      teamEyebrow: "The Team",
      teamTitle: "Lebanese Hospitality, Attention to Detail",
      teamDesc: "Our team combines the expertise of Lebanese chefs with the energy of young sommeliers and mixologists. We strive to impress through discreet service and personalized recommendations.",
      experience: "International experience",
    },
  };

  const t = content[language];

  return (
    <div className="mx-auto max-w-wide px-6 pb-20 lg:px-10 bg-[#111111]">
      {/* Hero Story Section */}
      <section className="relative mt-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-[100px] pointer-events-none" />
        
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center py-12">
          <div className="space-y-6">
            {/* Eyebrow with decorative line */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-accent-gold to-accent-gold/20" />
              <p className="text-xs font-forum uppercase tracking-[0.35em] text-accent-gold">
                {t.eyebrow}
              </p>
            </div>
            
            <h1 className="font-forum text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] text-shadow-elegant">
              {t.title}
            </h1>
            
            <p className="text-lg md:text-xl font-forum leading-relaxed text-white/60 max-w-xl">
              {t.subtitle}
            </p>
            
            <div className="h-px w-24 bg-gradient-to-r from-accent-gold/40 to-transparent" />
            
            <p className="text-base text-white/50 font-forum leading-relaxed max-w-lg">
              {t.description}
            </p>
          </div>
          
          {/* Hero Image with elegant framing */}
          <div className="relative">
            {/* Corner accents */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-accent-gold/30 pointer-events-none z-10" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-accent-gold/30 pointer-events-none z-10" />
            
            <div className="relative h-[400px] md:h-[500px] overflow-hidden elegant-image-frame group">
              <Image
                src="/assets/Meals/meals-name/Salata Zaitoone.png"
                alt="Zaitoone Restaurant"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent-gold/5 blur-[120px] pointer-events-none" />
        
        <div className="relative text-center space-y-8 mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-gold/60" />
            <span className="text-xs font-forum uppercase tracking-[0.35em] text-accent-gold">
              {t.visionEyebrow}
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-gold/60" />
          </div>
          
          <h2 className="font-forum text-3xl md:text-4xl lg:text-5xl text-white text-shadow-elegant">
            {t.visionTitle}
          </h2>
          
          <p className="text-lg font-forum text-white/50 max-w-2xl mx-auto">
            {t.visionSubtitle}
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 relative">
          {highlightCards.map((card, idx) => (
            <div
              key={card.title}
              className="luxury-card rounded-sm p-8 text-center group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Decorative top line */}
              <div className="w-8 h-px bg-accent-gold/40 mx-auto mb-6 group-hover:w-16 transition-all duration-500" />
              
              <h3 className="font-forum text-xl text-white mb-4">{card.title}</h3>
              <p className="text-sm text-white/60 font-forum leading-relaxed">
                {card.description}
              </p>
              
              {/* Decorative bottom line */}
              <div className="w-8 h-px bg-accent-gold/20 mx-auto mt-6 group-hover:w-12 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] rounded-sm" />
        <div className="absolute inset-0 border border-white/5 rounded-sm" />
        
        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-accent-gold/20" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-accent-gold/20" />
        
        <div className="relative px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-px bg-accent-gold/60" />
            <span className="text-xs font-forum uppercase tracking-[0.35em] text-accent-gold">
              {t.timelineEyebrow}
            </span>
          </div>
          
          <h2 className="font-forum text-3xl md:text-4xl text-white mb-3 text-shadow-elegant">
            {t.timelineTitle}
          </h2>
          
          <p className="text-base font-forum text-white/50 mb-10 max-w-xl">
            {t.timelineSubtitle}
          </p>
          
          <div className="grid gap-6 md:grid-cols-4">
            {timeline.map((item, idx) => (
              <div
                key={item.year}
                className="group relative p-6 rounded-sm bg-white/[0.02] border border-white/5 
                         hover:border-accent-gold/20 hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* Year with glow effect */}
                <div className="relative inline-block mb-4">
                  <p className="text-2xl font-forum text-accent-gold group-hover:text-shadow-elegant transition-all">
                    {item.year}
                  </p>
                  <div className="absolute inset-0 bg-accent-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="font-forum text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 font-forum leading-relaxed">
                  {item.description}
                </p>
                
                {/* Connection line (except last) */}
                {idx < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-accent-gold/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-accent-gold/60" />
              <span className="text-xs font-forum uppercase tracking-[0.35em] text-accent-gold">
                {t.teamEyebrow}
              </span>
            </div>
            
            <h2 className="font-forum text-3xl md:text-4xl text-white text-shadow-elegant">
              {t.teamTitle}
            </h2>
            
            <p className="text-base text-white/50 font-forum leading-relaxed max-w-lg">
              {t.teamDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {["Chef Karim", "Sous Chef Ana", "Somelier Vlad", "Host Maria"].map(
              (name, idx) => (
                <div
                  key={name}
                  className="luxury-card rounded-sm p-6 group"
                >
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 
                                flex items-center justify-center mb-4 group-hover:from-accent-gold/30 transition-all duration-500">
                    <span className="text-accent-gold font-forum text-lg">{name.charAt(0)}</span>
                  </div>
                  
                  <p className="font-forum text-lg text-white mb-1">{name}</p>
                  <p className="text-sm text-white/40 font-forum">{t.experience}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
