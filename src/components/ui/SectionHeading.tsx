import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`inline-flex items-center gap-3 font-display text-sm font-semibold tracking-wide ${
        tone === "dark" ? "text-teal-600" : "text-brass-300"
      }`}
    >
      <span aria-hidden="true" className={`h-px w-8 ${tone === "dark" ? "bg-brass" : "bg-brass-300/70"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "start",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "center";
  id?: string;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      <div data-reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <h2
        id={id}
        data-reveal
        style={{ "--i": 1 } as React.CSSProperties}
        className={`mt-4 font-display text-[1.95rem] leading-[1.3] font-bold text-balance sm:text-[2.6rem] sm:leading-[1.25] ${
          tone === "dark" ? "text-ink" : "text-white"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-reveal
          style={{ "--i": 2 } as React.CSSProperties}
          className={`mt-5 text-[1.05rem] leading-8 text-pretty ${tone === "dark" ? "text-ink/70" : "text-white/70"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
