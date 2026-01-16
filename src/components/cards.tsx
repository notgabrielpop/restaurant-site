"use client";

import { ReactNode } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { MenuItem } from "@/lib/sample-data";
import Image from "next/image";
import { TiltCard } from "./tilt-card";
import { useLanguage } from "@/lib/language-context";

type CardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

export function FeatureCard({
  title,
  description,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "luxury-card rounded-sm p-8 h-full flex flex-col group",
        className
      )}
    >
      {/* Decorative top line */}
      <div className="w-8 h-px bg-accent-gold/40 mb-6 group-hover:w-16 transition-all duration-500" />
      
      <h3 className="font-forum text-xl text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">{title}</h3>
      {description && (
        <p className="text-sm font-forum text-white/60 flex-1 leading-relaxed">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
      
      {/* Decorative bottom line */}
      <div className="w-6 h-px bg-accent-gold/20 mt-6 group-hover:w-10 transition-all duration-500" />
    </div>
  );
}

type MenuCardProps = {
  item: MenuItem;
  image?: string;
};

export function MenuCard({ item, image }: MenuCardProps) {
  const { language } = useLanguage();
  const itemName = typeof item.name === 'object' ? item.name[language] : item.name;
  const itemDescription = typeof item.description === 'object' ? item.description[language] : item.description;
  const signatureLabel = language === 'ro' ? 'Semnătură' : 'Signature';
  
  return (
    <TiltCard depth={14} className="group h-full">
      <div className="luxury-card rounded-sm p-0 overflow-hidden h-full flex flex-col">
        {image && (
          <div className="relative h-48 overflow-hidden elegant-image-frame">
            <Image
              src={image}
              alt={itemName}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
            {/* Elegant overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/0 to-accent-gold/10 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Corner accents on hover */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/0 
                          group-hover:border-white/40 transition-all duration-500 z-10" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/0 
                          group-hover:border-white/40 transition-all duration-500 z-10" />
            
            {/* Badge */}
            {(item.isSignature || item.isPopular) && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 text-xs font-forum uppercase tracking-[0.15em] 
                               bg-black/60 backdrop-blur-sm border border-accent-gold/30 text-accent-gold">
                  {item.isSignature ? signatureLabel : "Popular"}
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 flex-1">
            <div className="space-y-2 flex-1">
              <h4 className="font-forum text-lg text-white group-hover:text-accent-gold/90 transition-colors duration-300">
                {itemName}
              </h4>
              <p className="text-sm font-forum text-white/50 leading-relaxed line-clamp-2">{itemDescription}</p>
            </div>
          </div>
          
          {/* Price with elegant styling */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="w-6 h-px bg-accent-gold/30" />
            <span className="px-4 py-1.5 text-sm font-forum text-accent-gold bg-accent-gold/5 
                           border border-accent-gold/20 rounded-sm">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
