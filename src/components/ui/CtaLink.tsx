import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type Variant = "wa" | "solid-light" | "solid-dark" | "outline-light" | "outline-dark" | "quiet-dark";
type Size = "md" | "lg";

const variants: Record<Variant, { base: string; chip: string }> = {
  wa: {
    base: "bg-[linear-gradient(135deg,#3ee67f_0%,#25d366_45%,#1db955_100%)] text-wa-ink shadow-[0_12px_32px_-12px_rgb(37_211_102/0.8),inset_0_1px_0_rgb(255_255_255/0.45)] hover:shadow-[0_18px_40px_-12px_rgb(37_211_102/0.95),inset_0_1px_0_rgb(255_255_255/0.5)]",
    chip: "bg-white/35 text-wa-ink",
  },
  "solid-light": { base: "bg-white text-teal shadow-sm hover:bg-mist", chip: "bg-teal/10 text-teal" },
  "solid-dark": {
    base: "bg-[linear-gradient(135deg,#0a6b77,#025661)] text-white shadow-[0_12px_30px_-12px_rgb(2_86_97/0.8),inset_0_1px_0_rgb(255_255_255/0.15)]",
    chip: "bg-white/15 text-white",
  },
  "outline-light": {
    base: "border border-white/25 bg-white/[0.04] text-white hover:border-white/50 hover:bg-white/[0.09]",
    chip: "bg-white/10 text-brass-300",
  },
  "outline-dark": { base: "border border-teal/20 bg-white text-teal hover:border-teal/45 hover:bg-mist/60", chip: "bg-teal/10 text-teal" },
  "quiet-dark": { base: "text-teal hover:bg-teal/[0.06]", chip: "bg-teal/10 text-teal" },
};

const sizes: Record<Size, { base: string; chip: string; withIcon: string }> = {
  md: { base: "h-11 pe-5 ps-5 text-[0.95rem] gap-2", withIcon: "ps-1.5", chip: "size-8" },
  lg: { base: "h-14 pe-6 ps-6 text-base sm:text-[1.05rem] gap-3", withIcon: "ps-2", chip: "size-10" },
};

export interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  /** سهم متحرك في نهاية الزر */
  arrow?: boolean;
  className?: string;
  /** اسم يُستخدم لاحقًا لتتبع التحويلات (data-cta) */
  track?: string;
  ariaLabel?: string;
}

export function CtaLink({ href, children, variant = "wa", size = "md", icon, arrow, className = "", track, ariaLabel }: CtaLinkProps) {
  const external = href.startsWith("http");
  const v = variants[variant];
  const s = sizes[size];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-cta={track}
      aria-label={ariaLabel}
      className={`btn-shine group inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold whitespace-nowrap transition-[background-color,box-shadow,border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${s.base} ${icon ? s.withIcon : ""} ${v.base} ${className}`}
    >
      {icon ? (
        <span className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6 ${s.chip} ${v.chip}`}>
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {arrow ? (
        <ArrowLeft className="size-[18px] opacity-70 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
      ) : null}
    </a>
  );
}
