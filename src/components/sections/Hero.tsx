import { Check, Phone } from "lucide-react";
import { site, telLink, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { CtaLink } from "../ui/CtaLink";
import { OrbitVisual } from "./OrbitVisual";

const assurances = ["تواصل مباشر دون نماذج طويلة", "لا نطلب كلمات مرور أو رموز تحقق", "شرح واضح للخيارات قبل أي خطوة"];

export function Hero() {
  const [, secondPhone] = site.phones;
  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative isolate overflow-hidden bg-ink text-white">
      {/* خلفية: توهجات ومدارات واسعة */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_12%_-10%,rgb(10_107_119/0.55),transparent_70%),radial-gradient(50rem_36rem_at_100%_115%,rgb(2_86_97/0.6),transparent_70%)]" />
        <svg className="absolute inset-0 size-full opacity-[0.5]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
          <ellipse cx="380" cy="420" rx="980" ry="330" fill="none" stroke="#fff" strokeOpacity="0.05" transform="rotate(-12 380 420)" />
          <ellipse cx="380" cy="420" rx="760" ry="250" fill="none" stroke="#fff" strokeOpacity="0.045" transform="rotate(-12 380 420)" />
        </svg>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 pb-28 sm:px-6 sm:pt-36 sm:pb-40 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-40 lg:pb-44">
        <div className="lg:col-span-7">
          <p
            className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] py-1.5 ps-2.5 pe-4 text-[0.82rem] font-medium text-white/80 sm:text-sm"
          >
            <span className="pulse-dot relative size-2 rounded-full bg-wa text-wa" aria-hidden="true" />
            {site.legalName}
          </p>

          <h1
            id="hero-title"
            style={{ "--i": 1 } as React.CSSProperties}
            className="hero-in-soft mt-6 font-display text-[2.45rem] leading-[1.22] font-bold text-balance sm:text-[3.6rem] sm:leading-[1.15] lg:text-[4.1rem]"
          >
            التزاماتك المالية
            <span className="block bg-gradient-to-l from-sage via-white to-brass-300 bg-clip-text pt-1 pb-[0.28em] -mb-[0.2em] leading-[1.3] text-transparent">في مدارها الصحيح</span>
          </h1>

          <p
            style={{ "--i": 2 } as React.CSSProperties}
            className="hero-in-soft mt-5 max-w-xl text-[1.05rem] leading-8 text-white/72 sm:text-lg sm:leading-9"
          >
            استفسر عن تسديد القروض البنكية، والمتعثرات لدى سما، وإيقاف الخدمات والمخالفات المرورية، والبطاقات الائتمانية،
            والتمويل — ونوضّح لك الخيارات المتاحة لحالتك بلغة واضحة ومباشرة.
          </p>

          <div
            id="hero-ctas"
            style={{ "--i": 3 } as React.CSSProperties}
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CtaLink href={whatsappLink()} size="lg" track="hero-whatsapp" arrow icon={<WhatsAppIcon className="size-5" />}>
              ابدأ المحادثة عبر واتساب
            </CtaLink>
            <CtaLink href={telLink()} size="lg" variant="outline-light" track="hero-call" icon={<Phone className="size-5" aria-hidden="true" />}>
              اتصل الآن
            </CtaLink>
          </div>

          {secondPhone ? (
            <p style={{ "--i": 4 } as React.CSSProperties}
            className="hero-in mt-4 text-sm text-white/65">
              أو اتصل على الرقم الثاني{" "}
              <a href={telLink(secondPhone)} data-cta="hero-call-2" className="num font-display font-semibold text-white/85 underline decoration-brass/60 underline-offset-4 hover:text-white">
                {secondPhone.display}
              </a>
            </p>
          ) : null}

          <ul style={{ "--i": 5 } as React.CSSProperties}
            className="hero-in mt-9 grid gap-3 text-sm text-white/70 sm:flex sm:flex-wrap sm:gap-x-6">
            {assurances.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-white/10 text-brass-300">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ "--i": 2 } as React.CSSProperties}
            className="hero-in lg:col-span-5">
          <OrbitVisual />
        </div>
      </div>

      {/* شرائط منحنية مستوحاة من هوية المطبوعة الأصلية */}
      <svg aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-[64px] w-full sm:h-[110px]" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 120V58C300 128 640 0 1000 46c190 24 330 6 440-22v96z" fill="#3f939c" fillOpacity="0.35" />
        <path d="M0 120V80c320 60 660-40 1010 6 180 24 320 10 430-12v46z" fill="#b6c1c4" fillOpacity="0.55" />
        <path d="M0 120V98c340 44 680-26 1030 4 170 15 310 8 410-6v24z" fill="#f6f7f4" />
      </svg>
    </section>
  );
}
