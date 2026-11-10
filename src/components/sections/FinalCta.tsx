import { Phone } from "lucide-react";
import { site, telLink, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { CtaLink } from "../ui/CtaLink";

const ordinals = ["الرقم الأول", "الرقم الثاني", "الرقم الثالث"];

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="grain relative isolate mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-ink px-5 py-16 text-white sm:px-12 sm:py-24">
        <svg aria-hidden="true" viewBox="0 0 800 800" className="animate-orbit-rev pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 -translate-y-1/2 opacity-60">
          <ellipse cx="400" cy="400" rx="390" ry="140" fill="none" stroke="#fff" strokeOpacity="0.06" transform="rotate(-16 400 400)" />
          <ellipse cx="400" cy="400" rx="300" ry="300" fill="none" stroke="#fff" strokeOpacity="0.05" strokeDasharray="2 10" />
          <ellipse cx="400" cy="400" rx="220" ry="90" fill="none" stroke="#dcc7a0" strokeOpacity="0.18" transform="rotate(20 400 400)" />
          <circle cx="620" cy="364" r="5" fill="#dcc7a0" fillOpacity="0.7" />
        </svg>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_26rem_at_50%_110%,rgb(10_107_119/0.55),transparent_70%)]" />

        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="font-display text-sm font-semibold text-brass-300">تواصل معنا</p>
          <h2 id="contact-title" data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-4 font-display text-[2.1rem] leading-[1.3] font-bold text-balance sm:text-[3.2rem] sm:leading-[1.2]">
            خطوتك الأولى… رسالة واحدة
          </h2>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-8 text-white/70 sm:text-lg">
            اكتب لنا نوع الالتزام الذي تريد الاستفسار عنه، ونوضّح لك الخيارات المتاحة والخطوات المناسبة لحالتك.
          </p>
          <div data-reveal style={{ "--i": 3 } as React.CSSProperties} className="mt-9 flex justify-center">
            <CtaLink href={whatsappLink()} size="lg" track="contact-whatsapp" icon={<WhatsAppIcon className="size-5" />} className="w-full sm:w-auto">
              ابدأ المحادثة عبر واتساب
            </CtaLink>
          </div>
        </div>

        <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {site.phones.map((phone, i) => (
            <li
              key={phone.display}
              data-reveal
              style={{ "--i": i + 3 } as React.CSSProperties}
              className="rounded-[26px] border border-white/10 bg-white/[0.05] p-6 sm:p-7"
            >
              <p className="text-sm text-white/65">{ordinals[i] ?? "رقم التواصل"}</p>
              <a href={telLink(phone)} data-cta={`contact-call-${i + 1}`} className="num mt-2 block text-right font-display text-[1.9rem] font-bold tracking-wider text-white transition-colors hover:text-brass-300 sm:text-[2.1rem]">
                {phone.display}
              </a>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {phone.whatsapp ? (
                  <a
                    href={whatsappLink(undefined, phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`contact-whatsapp-${i + 1}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-wa font-display text-[0.95rem] font-semibold text-wa-ink transition-colors hover:bg-[#2ee072]"
                  >
                    <WhatsAppIcon className="size-[18px]" />
                    واتساب
                  </a>
                ) : null}
                <a
                  href={telLink(phone)}
                  data-cta={`contact-call-btn-${i + 1}`}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 font-display text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10 ${phone.whatsapp ? "" : "col-span-2"}`}
                >
                  <Phone className="size-[18px]" aria-hidden="true" />
                  اتصال
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
