"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { primaryPhone, site, telLink, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { CtaLink } from "./ui/CtaLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  /** إغلاق القائمة أولًا ثم الانتقال، حتى لا يمنع قفل التمرير الوصول للقسم */
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      document.body.style.overflow = "";
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-out-expo ${
        solid ? "border-b border-teal/10 bg-paper/85 shadow-[0_8px_30px_-18px_rgb(2_31_36/0.35)] backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <a href="#top" className="flex min-h-11 items-center gap-3" aria-label={`${site.name} — العودة للأعلى`}>
          <span className="relative block h-9 w-11 sm:h-10 sm:w-12">
            <Image
              src="/brand/mark-light.webp"
              alt=""
              fill
              sizes="48px"
              priority
              className={`object-contain transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/brand/mark.webp"
              alt=""
              fill
              sizes="48px"
              priority
              className={`object-contain transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          <span className="leading-tight">
            <span className={`block font-display text-[1.05rem] font-bold transition-colors duration-500 sm:text-lg ${solid ? "text-teal" : "text-white"}`}>
              {site.name}
            </span>
            <span className={`block text-[0.72rem] font-medium transition-colors duration-500 ${solid ? "text-ink/65" : "text-white/70"}`}>
              {site.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300 ${
                    solid ? "text-ink/75 hover:bg-teal/[0.06] hover:text-teal" : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink()}
            data-cta="header-call"
            className={`hidden h-11 items-center gap-2 rounded-full px-4 font-display text-[0.95rem] font-semibold transition-colors duration-300 sm:inline-flex ${
              solid ? "text-teal hover:bg-teal/[0.06]" : "text-white hover:bg-white/[0.07]"
            }`}
          >
            <Phone className="size-[18px]" aria-hidden="true" />
            <span className="num">{primaryPhone.display}</span>
          </a>
          <CtaLink href={whatsappLink()} track="header-whatsapp" icon={<WhatsAppIcon className="size-[18px]" />} className="hidden sm:inline-flex">
            واتساب
          </CtaLink>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className={`grid size-11 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
              solid ? "text-teal hover:bg-teal/[0.06]" : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-teal/10 bg-paper px-4 pt-4 pb-10 sm:h-[calc(100dvh-4.5rem)] lg:hidden"
      >
        <nav aria-label="قائمة الجوال">
          <ul className="divide-y divide-teal/10">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  className="flex items-center justify-between py-4 font-display text-lg font-semibold text-ink"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-brass">←</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <CtaLink href={whatsappLink()} track="menu-whatsapp" size="lg" icon={<WhatsAppIcon className="size-5" />}>
            تواصل عبر واتساب
          </CtaLink>
          {site.phones.map((p) => (
            <CtaLink key={p.display} href={telLink(p)} track="menu-call" size="lg" variant="outline-dark" icon={<Phone className="size-5" aria-hidden="true" />}>
              اتصال <span className="num">{p.display}</span>
            </CtaLink>
          ))}
        </div>
      </div>
    </header>
  );
}
