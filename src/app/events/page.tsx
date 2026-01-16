"use client";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { eventPackages } from "@/lib/sample-data";
import { useLanguage } from "@/lib/language-context";

export default function EventsPage() {
  const { language } = useLanguage();

  const content = {
    ro: {
      eyebrow: "Evenimente private",
      title: "Evenimente care inspiră",
      subtitle: "Cine de afaceri, dining privat, aniversări și seri tematice. Meniuri degustare, selecție de vinuri și amenajare personalizată.",
      corporateEyebrow: "Corporativ",
      corporateTitle: "Salon privat și masa bucătarului",
      corporateDesc: "Pentru întâlniri de afaceri și lansări, oferim meniuri degustare de 5 sau 7 feluri, bar de cocktailuri cu infuzii orientale și echipament audio discret. Capacitate până la 40 de persoane.",
      celebrationsEyebrow: "Sărbători",
      celebrationsDesc: "Aniversări, logodne sau reuniuni de familie. Decor floral, muzică live la cerere, tort personalizat și fotografie. Echipa noastră se ocupă de tot, dumneavoastră doar sărbătoriți.",
      contactBtn: "Contactați-ne pentru detalii",
    },
    en: {
      eyebrow: "Private Events",
      title: "Events That Inspire",
      subtitle: "Corporate dinners, private dining, anniversaries and themed evenings. Tasting menus, wine pairing and personalized setup.",
      corporateEyebrow: "Corporate",
      corporateTitle: "Private Salon & Chef's Table",
      corporateDesc: "For executive meetings and launches, we offer 5 or 7 course tasting menus, a cocktail bar with oriental infusions, and discreet audio equipment. Capacity up to 40 people.",
      celebrationsEyebrow: "Celebrations",
      celebrationsDesc: "Anniversaries, engagements or family reunions. Floral decor, live music upon request, custom cake and photography. Our team handles everything, you just celebrate.",
      contactBtn: "Contact us for details",
    },
  };

  const t = content[language];

  return (
    <div className="mx-auto max-w-wide space-y-10 px-6 pb-16 lg:px-10 bg-[#111111]">
      <section className="mt-6 rounded-sm bg-[#0a0a0a] px-6 py-10 text-white shadow-card border border-white/10">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          tone="light"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {eventPackages.map((pack) => (
            <div
              key={pack.title}
              className="rounded-sm border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm font-forum uppercase tracking-[0.18em] text-accent-gold">
                {pack.title}
              </p>
              <p className="mt-2 text-sm text-white/70 font-forum">
                {pack.description}
              </p>
              <Button
                href="/reservations"
                variant="secondary"
                className="mt-4 border-white/30"
              >
                {pack.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-sm bg-[#1a1a1a] px-6 py-10 shadow-soft md:grid-cols-2 border border-white/10">
        <div className="space-y-3">
          <p className="text-sm font-forum uppercase tracking-[0.18em] text-accent-gold">
            {t.corporateEyebrow}
          </p>
          <h3 className="font-script text-4xl text-white">
            {t.corporateTitle}
          </h3>
          <p className="text-sm text-white/70 font-forum">
            {t.corporateDesc}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-forum uppercase tracking-[0.18em] text-accent-gold">
            {t.celebrationsEyebrow}
          </p>
          <p className="text-base text-white/70 font-forum">
            {t.celebrationsDesc}
          </p>
          <Button href="/contact" variant="ghost">
            {t.contactBtn}
          </Button>
        </div>
      </section>
    </div>
  );
}
