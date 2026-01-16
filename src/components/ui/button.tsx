import Link from "next/link";
import { ComponentProps, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-forum uppercase tracking-[0.08em] transition-transform duration-200",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-tr from-accent-gold to-accent-goldSoft text-black shadow-card hover:scale-[1.02]",
        secondary:
          "border border-white/30 bg-transparent text-white hover:bg-white/10",
        ghost:
          "border border-white/30 text-white hover:-translate-y-[1px] hover:border-accent-gold hover:text-accent-gold",
      },
      size: {
        md: "px-6 py-3 text-sm",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = {
  href?: string;
  children: ReactNode;
} & VariantProps<typeof buttonStyles> &
  ComponentProps<"button">;

export function Button({
  href,
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
