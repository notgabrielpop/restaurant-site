"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { location } from "@/lib/sample-data";
import { useLanguage } from "@/lib/language-context";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactForm = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-sm border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 " +
  "focus:border-accent-gold/50 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent-gold/20 " +
  "font-forum transition-all duration-300";

export default function ContactPage() {
  const { language } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const content = {
    ro: {
      eyebrow: "Contact",
      title: "Contactați-ne",
      subtitle: "Pentru întrebări despre evenimente, meniuri personalizate sau colaborări.",
      accessTitle: "Acces și parcare",
      accessDesc: "Parcare disponibilă în proximitate, acces ușor din zona Aviației.",
      name: "Nume",
      email: "Email",
      message: "Mesaj",
      sending: "Se trimite...",
      send: "Trimite mesajul",
      success: "Mesaj trimis. Vă vom răspunde în curând.",
      error: "Nu s-a putut trimite. Încercați din nou.",
      phone: "Telefon",
      address: "Adresă",
      hours: "Program",
      hoursValue: "Luni - Duminică: 12:00 - 23:00",
    },
    en: {
      eyebrow: "Contact",
      title: "Get in Touch",
      subtitle: "For inquiries about events, custom menus, or collaborations.",
      accessTitle: "Access and Parking",
      accessDesc: "Parking available nearby, easy access from the Aviației area.",
      name: "Name",
      email: "Email",
      message: "Message",
      sending: "Sending...",
      send: "Send Message",
      success: "Message sent. We will respond soon.",
      error: "Could not send. Please try again.",
      phone: "Phone",
      address: "Address",
      hours: "Hours",
      hoursValue: "Monday - Sunday: 12:00 - 23:00",
    },
  };

  const t = content[language];

  const onSubmit = async (data: ContactForm) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-wide px-6 pb-20 lg:px-10 bg-[#111111]">
      {/* Hero Section */}
      <section className="relative mt-8 mb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-accent-gold/5 blur-[120px] pointer-events-none" />
        
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

      {/* Main Content Grid */}
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* Left Side - Contact Info */}
        <div className="space-y-8">
          {/* Feature Image */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-accent-gold/30 pointer-events-none z-10" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-accent-gold/30 pointer-events-none z-10" />
            
            <div className="relative h-[280px] overflow-hidden elegant-image-frame group">
              <Image
                src="/assets/Meals/meals-name/Cotlet Miel.png"
                alt="Zaitoone Restaurant"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
          
          {/* Contact Info Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Address */}
            <div className="luxury-card rounded-sm p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center
                              group-hover:bg-accent-gold/20 transition-colors duration-500">
                  <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs font-forum uppercase tracking-[0.2em] text-accent-gold">{t.address}</span>
              </div>
              <p className="text-sm text-white/60 font-forum leading-relaxed">
                {location.address}
              </p>
            </div>
            
            {/* Phone */}
            <div className="luxury-card rounded-sm p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center
                              group-hover:bg-accent-gold/20 transition-colors duration-500">
                  <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs font-forum uppercase tracking-[0.2em] text-accent-gold">{t.phone}</span>
              </div>
              <p className="text-sm text-white/60 font-forum">
                {location.phone}
              </p>
            </div>
            
            {/* Email */}
            <div className="luxury-card rounded-sm p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center
                              group-hover:bg-accent-gold/20 transition-colors duration-500">
                  <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-forum uppercase tracking-[0.2em] text-accent-gold">{t.email}</span>
              </div>
              <p className="text-sm text-white/60 font-forum">
                {location.email}
              </p>
            </div>
            
            {/* Hours */}
            <div className="luxury-card rounded-sm p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center
                              group-hover:bg-accent-gold/20 transition-colors duration-500">
                  <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-forum uppercase tracking-[0.2em] text-accent-gold">{t.hours}</span>
              </div>
              <p className="text-sm text-white/60 font-forum">
                {t.hoursValue}
              </p>
            </div>
          </div>
          
          {/* Access Info */}
          <div className="p-6 rounded-sm bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-forum uppercase tracking-[0.2em] text-accent-gold">{t.accessTitle}</span>
            </div>
            <p className="text-sm text-white/50 font-forum leading-relaxed">
              {t.accessDesc}
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="relative">
          {/* Corner accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-accent-gold/20 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-accent-gold/20 pointer-events-none" />
          
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="luxury-card rounded-sm p-8 space-y-6"
          >
            <div className="mb-6">
              <h3 className="font-forum text-2xl text-white mb-2">
                {language === "ro" ? "Trimite un mesaj" : "Send a Message"}
              </h3>
              <div className="w-12 h-px bg-accent-gold/40" />
            </div>
            
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-white/80 font-forum group">
                <span className="font-forum uppercase tracking-[0.15em] text-xs text-white/50 
                               group-focus-within:text-accent-gold/80 transition-colors duration-300">
                  {t.name}
                </span>
                <input {...register("name")} className={inputClass} />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </label>
              
              <label className="flex flex-col gap-2 text-sm text-white/80 font-forum group">
                <span className="font-forum uppercase tracking-[0.15em] text-xs text-white/50 
                               group-focus-within:text-accent-gold/80 transition-colors duration-300">
                  {t.email}
                </span>
                <input
                  type="email"
                  {...register("email")}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </label>
            </div>
            
            <label className="flex flex-col gap-2 text-sm text-white/80 font-forum group">
              <span className="font-forum uppercase tracking-[0.15em] text-xs text-white/50 
                             group-focus-within:text-accent-gold/80 transition-colors duration-300">
                {t.message}
              </span>
              <textarea
                rows={5}
                {...register("message")}
                className={inputClass}
              />
              {errors.message && (
                <p className="text-xs text-red-400">{errors.message.message}</p>
              )}
            </label>
            
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
