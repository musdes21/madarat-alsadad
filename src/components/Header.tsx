"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { primaryPhone, site, telLink, whatsappLink } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NavIcon } from "./icons/NavIcon";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const sectionIds = site.nav.map((n) => n.href.slice(1));

/** الشعار الأصلي (الرمز + النص) بنسختين فاتحة وداكنة تتبدلان حسب الخلفية */
function BrandLogo({ solid }: { solid: boolean }) {
  return (
    <span className="relative flex items-center gap-2.5">
      <span className="relative block h-9 w-11 sm:h-10 sm:w-12">
        <Image src="/brand/mark-light.webp" alt="" fill sizes="48px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`} />
        <Image src="/brand/mark.webp" alt="" fill sizes="48px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
      </span>
      <span className="relative block h-[30px] w-[102px] sm:h-[34px] sm:w-[116px]">
        <Image src="/brand/wordmark-light.webp" alt="" fill sizes="120px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`} />
        <Image src="/brand/wordmark.webp" alt="" fill sizes="120px" priority className={`object-contain transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
      </span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const active = useActiveSection(sectionIds);

  /* مؤشر منزلق خلف الرابط النشط (سطح المكتب) */
  const navRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  /* شريط الأقسام في الجوال: إبقاء الرابط النشط ظاهرًا */
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // حد الواجهة يُحسب مرة واحدة، والتمرير يُعالج مرة لكل إطار فقط
    const hero = document.getElementById("hero-ctas");
    let heroEnd = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 600;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setPastHero(y > heroEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      heroEnd = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 600;
      onScroll();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const ul = navRef.current;
      const link = active ? ul?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
      if (!ul || !link) return setIndicator(null);
      const u = ul.getBoundingClientRect();
      const l = link.getBoundingClientRect();
      setIndicator({ left: l.left - u.left, width: l.width });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  useEffect(() => {
    const box = chipsRef.current;
    const chip = active ? box?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!box || !chip) return;
    const target = chip.offsetLeft - (box.clientWidth - chip.offsetWidth) / 2;
    box.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

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
        solid ? "border-b border-teal/10 bg-paper/85 shadow-[0_10px_30px_-20px_rgb(2_31_36/0.4)] backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <a href="#top" className="flex min-h-11 items-center" aria-label={`${site.legalName} — العودة للأعلى`}>
          <BrandLogo solid={solid} />
        </a>

        {/* تنقل سطح المكتب: أيقونات + مؤشر منزلق */}
        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul
            ref={navRef}
            className={`relative flex items-center gap-0.5 rounded-full border p-1 transition-colors duration-500 ${
              solid ? "border-teal/10 bg-white/70" : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-1 bottom-1 rounded-full transition-[left,width,opacity,background-color] duration-500 ease-out-expo ${
                solid ? "bg-teal shadow-[0_6px_16px_-8px_rgb(2_86_97/0.9)]" : "bg-white/12"
              } ${indicator ? "opacity-100" : "opacity-0"}`}
              style={indicator ? { left: indicator.left, width: indicator.width } : undefined}
            />
            {site.nav.slice(0, 4).map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`group flex h-10 items-center gap-2 rounded-full px-4 text-[0.92rem] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : solid
                          ? "text-ink/70 hover:text-teal"
                          : "text-white/70 hover:text-white"
                    }`}
                  >
                    <NavIcon
                      name={item.icon}
                      className={`size-[17px] transition-transform duration-300 group-hover:-translate-y-0.5 ${isActive ? "text-brass-300" : ""}`}
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* زر الاتصال */}
          <a
            href={telLink()}
            data-cta="header-call"
            className={`group hidden h-12 items-center gap-2.5 rounded-full border ps-1.5 pe-4 transition-colors duration-300 sm:inline-flex ${
              solid ? "border-teal/15 bg-white text-teal hover:border-teal/35" : "border-white/15 bg-white/[0.05] text-white hover:bg-white/10"
            }`}
          >
            <span
              className={`grid size-9 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-12 ${
                solid ? "bg-teal text-white" : "bg-white/12 text-brass-300"
              }`}
            >
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className={`block text-[0.7rem] ${solid ? "text-ink/60" : "text-white/60"}`}>اتصل بنا</span>
              <span className="num block font-display text-[0.95rem] font-semibold">{primaryPhone.display}</span>
            </span>
          </a>

          {/* زر واتساب */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="header-whatsapp"
            aria-label="تواصل عبر واتساب"
            className="btn-shine group relative inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#3ee67f_0%,#25d366_45%,#1db955_100%)] ps-1.5 pe-1.5 font-display text-[0.95rem] font-semibold text-wa-ink shadow-[0_12px_28px_-12px_rgb(37_211_102/0.9),inset_0_1px_0_rgb(255_255_255/0.45)] transition-transform duration-300 hover:-translate-y-0.5 sm:pe-5"
          >
            <span className="relative grid size-9 place-items-center rounded-full bg-white/35 transition-transform duration-500 group-hover:scale-110">
              <WhatsAppIcon className="size-[18px]" />
              <span className="pulse-dot absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#25d366] bg-white text-white" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline">واتساب</span>
          </a>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className={`grid size-12 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
              solid ? "border-teal/15 bg-white text-teal" : "border-white/15 bg-white/[0.05] text-white"
            }`}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* شريط الأقسام للجوال والتابلت — يظهر بعد تجاوز الواجهة ويتتبع موقعك */}
      <nav
        aria-label="أقسام الصفحة"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo lg:hidden ${
          pastHero && !open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        inert={!pastHero || open}
      >
        <div className="overflow-hidden">
          <div ref={chipsRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-1 pb-2.5 sm:px-6">
            {site.nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[0.85rem] font-medium transition-all duration-300 ${
                    isActive
                      ? "border-teal bg-teal text-white shadow-[0_6px_16px_-8px_rgb(2_86_97/0.9)]"
                      : "border-teal/12 bg-white text-ink/70"
                  }`}
                >
                  <NavIcon name={item.icon} className={`size-4 ${isActive ? "text-brass-300" : "text-teal"}`} />
                  {item.short}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* خط تقدّم القراءة */}
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] origin-right bg-[linear-gradient(to_left,#dcc7a0,#25d366)]" />

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-teal/10 bg-paper px-4 pt-4 pb-10 sm:h-[calc(100dvh-4.5rem)] lg:hidden"
      >
        <nav aria-label="قائمة الجوال">
          <ul className="grid gap-2">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  className="flex items-center gap-4 rounded-2xl border border-teal/10 bg-white p-3 font-display text-[1.05rem] font-semibold text-ink active:scale-[0.99]"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-mist text-teal">
                    <NavIcon name={item.icon} className="size-5" />
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <span className="num text-xs text-brass">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 grid gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="menu-whatsapp"
            className="flex h-14 items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#3ee67f,#25d366_45%,#1db955)] font-display font-semibold text-wa-ink shadow-[0_12px_28px_-12px_rgb(37_211_102/0.9)]"
          >
            <WhatsAppIcon className="size-5" />
            تواصل عبر واتساب
          </a>
          <div className="grid grid-cols-2 gap-3">
            {site.phones.map((p) => (
              <a
                key={p.display}
                href={telLink(p)}
                data-cta="menu-call"
                className="flex h-14 items-center justify-center gap-2 rounded-full border border-teal/20 bg-white font-display font-semibold text-teal"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span className="num">{p.display}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
