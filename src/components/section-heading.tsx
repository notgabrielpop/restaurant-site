import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "text-center items-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-forum uppercase tracking-[0.2em] text-accent-gold">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-forum text-4xl sm:text-5xl leading-tight",
          tone === "dark" ? "text-[#111111]" : "text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base font-forum",
            tone === "dark" ? "text-[#666666]" : "text-white/80"
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
