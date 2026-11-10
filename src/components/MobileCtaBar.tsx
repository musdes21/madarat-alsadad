"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { telLink, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

/**
 * شريط تواصل ثابت على الجوال: يظهر بعد تجاوز أزرار الواجهة،
 * ويختفي عند الوصول إلى قسم التواصل النهائي حتى لا يتكرر.
 */
export function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-ctas");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const contactIo = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { rootMargin: "0px 0px -30% 0px" });
    heroIo.observe(hero);
    contactIo.observe(contact);
    return () => {
      heroIo.disconnect();
      contactIo.disconnect();
    };
  }, []);

  const visible = pastHero && !atContact;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-teal/10 bg-paper/90 px-4 pt-3 backdrop-blur-xl transition-transform duration-500 ease-out-expo md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="sticky-whatsapp"
          className="flex h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-full bg-wa font-display text-base font-semibold text-wa-ink shadow-[0_10px_30px_-12px_rgb(37_211_102/0.8)] active:scale-[0.98]"
        >
          <WhatsAppIcon className="size-5" />
          استفسر عبر واتساب
        </a>
        <a
          href={telLink()}
          data-cta="sticky-call"
          aria-label="اتصال مباشر"
          className="grid size-[3.25rem] place-items-center rounded-full bg-teal text-white active:scale-[0.98]"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
