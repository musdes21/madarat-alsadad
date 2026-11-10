import type { ReactNode } from "react";

type Variant = "wa" | "solid-light" | "solid-dark" | "outline-light" | "outline-dark" | "quiet-dark";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  wa: "bg-wa text-wa-ink shadow-[0_10px_30px_-10px_rgb(37_211_102/0.7)] hover:bg-[#2ee072] hover:shadow-[0_14px_36px_-10px_rgb(37_211_102/0.85)]",
  "solid-light": "bg-white text-teal hover:bg-mist",
  "solid-dark": "bg-teal text-white hover:bg-teal-600 shadow-[0_10px_30px_-12px_rgb(2_86_97/0.7)]",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.06]",
  "outline-dark": "border border-teal/20 text-teal hover:border-teal/50 hover:bg-teal/[0.04]",
  "quiet-dark": "text-teal hover:bg-teal/[0.06]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem] gap-2",
  lg: "h-14 px-7 text-base sm:text-[1.05rem] gap-2.5",
};

export interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  /** اسم يُستخدم لاحقًا لتتبع التحويلات (data-cta) */
  track?: string;
  ariaLabel?: string;
}

export function CtaLink({ href, children, variant = "wa", size = "md", icon, className = "", track, ariaLabel }: CtaLinkProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-cta={track}
      aria-label={ariaLabel}
      className={`btn-shine group inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold whitespace-nowrap transition-[background-color,box-shadow,border-color,transform] duration-300 ease-out-expo active:scale-[0.98] ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon ? <span className="grid size-5 place-items-center transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span> : null}
      <span>{children}</span>
    </a>
  );
}
