"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const reservationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1).max(14),
  occasion: z.string().optional(),
  areaPreference: z.string().optional(),
  message: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

const inputClass =
  "w-full rounded-sm border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 " +
  "focus:border-accent-gold/50 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent-gold/20 " +
  "font-forum transition-all duration-300";

export default function ReservationsPage() {
  const { language } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
    },
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const content = {
    ro: {
      eyebrow: "Rezervare",
      title: "Rezervă o masă",
      subtitle: "Cine romantice, întâlniri de afaceri sau evenimente private. Confirmare rapidă, 100% HALAL.",
      info1: "Preferință loc: interior, terasă sau fără preferință.",
      info2: "Ocazie: afaceri, aniversare, logodnă, eveniment privat.",
      info3: "Confirmăm telefonic sau pe email în maximum o oră.",
      name: "Nume",
      email: "Email",
      phone: "Telefon",
      date: "Data",
      time: "Ora",
      guests: "Număr de persoane",
      occasion: "Ocazie",
      occasionSelect: "Selectați",
      occasionBusiness: "Afaceri",
      occasionRomantic: "Cină romantică",
      occasionAnniversary: "Aniversare",
      occasionEvent: "Eveniment privat",
      area: "Zonă preferată",
      areaNo: "Fără preferință",
      areaInside: "Interior",
      areaTerrace: "Terasă",
      message: "Mesaj",
      sending: "Se trimite...",
      send: "Trimite rezervarea",
      success: "Rezervare trimisă. Vă vom contacta în curând.",
      error: "A apărut o eroare. Încercați din nou.",
    },
    en: {
      eyebrow: "Reservation",
      title: "Book a Table",
      subtitle: "Romantic dinners, business meetings or private events. Fast confirmation, 100% HALAL.",
      info1: "Seating preference: indoor, terrace, or no preference.",
      info2: "Occasion: business, anniversary, engagement, private event.",
      info3: "We confirm by phone or email within one hour.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      date: "Date",
      time: "Time",
      guests: "Number of guests",
      occasion: "Occasion",
      occasionSelect: "Select",
      occasionBusiness: "Business",
      occasionRomantic: "Romantic dinner",
      occasionAnniversary: "Anniversary",
      occasionEvent: "Private event",
      area: "Preferred area",
      areaNo: "No preference",
      areaInside: "Indoor",
      areaTerrace: "Terrace",
      message: "Message",
      sending: "Sending...",
      send: "Send Reservation",
      success: "Reservation sent. We will contact you soon.",
      error: "An error occurred. Please try again.",
    },
  };

  const t = content[language];

  const onSubmit = async (data: ReservationForm) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ guests: 2 });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-wide px-6 pb-20 lg:px-10 bg-[#111111]">
      {/* Hero Section with Image */}
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
      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
        {/* Left Side - Image and Info */}
        <div className="space-y-8">
          {/* Feature Image */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-accent-gold/30 pointer-events-none z-10" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-accent-gold/30 pointer-events-none z-10" />
            
            <div className="relative h-[300px] overflow-hidden elegant-image-frame group">
              <Image
                src="/assets/Meals/meals-name/Mix de fructe de mare la gratar cu salata ruccola.png"
                alt="Zaitoone Dining"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
          
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
        </div>

        {/* Right Side - Form */}
        <div className="relative">
          {/* Corner accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-accent-gold/20 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-accent-gold/20 pointer-events-none" />
          
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="luxury-card rounded-sm p-8 space-y-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label={t.name} error={errors.name?.message}>
                <input {...register("name")} className={inputClass} />
              </Field>
              <Field label={t.email} error={errors.email?.message}>
                <input type="email" {...register("email")} className={inputClass} />
              </Field>
              <Field label={t.phone} error={errors.phone?.message}>
                <input type="tel" {...register("phone")} className={inputClass} />
              </Field>
              <Field label={t.date} error={errors.date?.message}>
                <input type="date" {...register("date")} className={inputClass} />
              </Field>
              <Field label={t.time} error={errors.time?.message}>
                <input type="time" {...register("time")} className={inputClass} />
              </Field>
              <Field label={t.guests} error={errors.guests?.message}>
                <input
                  type="number"
                  min={1}
                  max={14}
                  {...register("guests", { valueAsNumber: true })}
                  className={inputClass}
                />
              </Field>
              <Field label={t.occasion}>
                <select {...register("occasion")} className={inputClass}>
                  <option value="">{t.occasionSelect}</option>
                  <option value="business">{t.occasionBusiness}</option>
                  <option value="romantic">{t.occasionRomantic}</option>
                  <option value="anniversary">{t.occasionAnniversary}</option>
                  <option value="event">{t.occasionEvent}</option>
                </select>
              </Field>
              <Field label={t.area}>
                <select {...register("areaPreference")} className={inputClass}>
                  <option value="">{t.areaNo}</option>
                  <option value="inside">{t.areaInside}</option>
                  <option value="terrace">{t.areaTerrace}</option>
                </select>
              </Field>
            </div>
            
            <Field label={t.message}>
              <textarea rows={4} {...register("message")} className={inputClass} />
            </Field>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="px-8 py-3 bg-accent-gold/10 border border-accent-gold/40 text-accent-gold
                         hover:bg-accent-gold/20 hover:border-accent-gold/60 transition-all duration-500
                         font-forum uppercase tracking-[0.2em] text-sm"
              >
                {isSubmitting ? t.sending : t.send}
              </Button>
              
              {status === "success" && (
                <span className="text-sm text-green-400 font-forum flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.success}
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-red-400 font-forum">
                  {t.error}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-white/80 font-forum group">
      <span className="font-forum uppercase tracking-[0.15em] text-xs text-white/50 
                     group-focus-within:text-accent-gold/80 transition-colors duration-300">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
