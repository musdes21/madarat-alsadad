import { ArrowUpLeft, Phone } from "lucide-react";
import { serviceWhatsappLink, site, telLink, type Service } from "@/config/site";
import { ServiceIcon } from "../icons/ServiceIcon";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { SectionHeading } from "../ui/SectionHeading";

/** توزيع الشبكة: بطاقتان عريضتان ثم ثلاث */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

function ServiceCard({ service, index, featured }: { service: Service; index: number; featured: boolean }) {
  const dark = featured;
  return (
    <article
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      data-reveal
      style={{ "--i": index % 3 } as React.CSSProperties}
      className={`group relative isolate flex scroll-mt-28 flex-col overflow-hidden rounded-[28px] border p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 sm:p-8 ${spans[index]} ${
        dark
          ? "border-white/5 bg-deep text-white shadow-[0_30px_70px_-35px_rgb(2_31_36/0.9)]"
          : "border-teal/10 bg-white text-ink hover:border-teal/25 hover:shadow-[0_30px_70px_-40px_rgb(2_52_59/0.5)]"
      }`}
    >
      {/* زخرفة: مدار في الزاوية يتحرك عند المرور */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className={`pointer-events-none absolute -top-16 -left-16 -z-10 size-56 transition-transform duration-[1.2s] ease-out-expo group-hover:rotate-[24deg] ${
          dark ? "text-white/10" : "text-teal/10"
        }`}
      >
        <ellipse cx="100" cy="100" rx="92" ry="34" fill="none" stroke="currentColor" transform="rotate(-20 100 100)" />
        <ellipse cx="100" cy="100" rx="70" ry="70" fill="none" stroke="currentColor" strokeDasharray="2 6" />
        <circle cx="186" cy="74" r="4" className={dark ? "fill-brass-300" : "fill-brass"} />
      </svg>

      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-14 place-items-center rounded-2xl transition-colors duration-500 ${
            dark ? "bg-white/10 text-brass-300" : "bg-mist text-teal group-hover:bg-teal group-hover:text-white"
          }`}
        >
          <ServiceIcon name={service.icon} className="size-7" />
        </span>
        <span className={`num font-display text-sm font-semibold ${dark ? "text-brass-300" : "text-brass"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        id={`${service.id}-title`}
        className={`mt-7 font-display text-[1.32rem] leading-snug font-bold text-balance sm:text-[1.45rem] ${dark ? "text-white" : "text-ink"}`}
      >
        {service.title}
      </h3>
      <p className={`mt-3 text-[0.98rem] leading-8 ${dark ? "text-white/70" : "text-ink/65"}`}>{service.description}</p>

      <div className={`mt-auto flex items-center justify-between gap-3 border-t border-dashed pt-5 ${dark ? "border-white/15" : "border-teal/15"} mt-8`}>
        <a
          href={serviceWhatsappLink(service)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={`service-whatsapp-${service.id}`}
          aria-label={`استفسر عبر واتساب عن ${service.title}`}
          className={`inline-flex h-11 items-center gap-2 rounded-full ps-1.5 pe-4 font-display text-[0.95rem] font-semibold transition-colors duration-300 ${
            dark ? "bg-wa text-wa-ink hover:bg-[#2ee072]" : "bg-teal/[0.06] text-teal hover:bg-wa hover:text-wa-ink"
          }`}
        >
          <span className={`grid size-8 place-items-center rounded-full ${dark ? "bg-wa-ink/10" : "bg-white"}`}>
            <WhatsAppIcon className="size-4" />
          </span>
          استفسر عبر واتساب
          <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
        <a
          href={telLink()}
          data-cta={`service-call-${service.id}`}
          aria-label={`اتصل للاستفسار عن ${service.title}`}
          className={`grid size-11 place-items-center rounded-full border transition-colors duration-300 ${
            dark ? "border-white/20 text-white hover:bg-white/10" : "border-teal/15 text-teal hover:border-teal/40 hover:bg-teal/[0.04]"
          }`}
        >
          <Phone className="size-[18px]" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
            id="services-title"
            eyebrow="خدماتنا"
            title="خمس خدمات، ومسار واضح لكل التزام"
          lead="اختر الخدمة الأقرب لحالتك وتواصل معنا مباشرة؛ تصلنا رسالتك متضمنة اسم الخدمة لنبدأ من حيث تحتاج."
        />

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
          {site.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} featured={i === 0} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink/65" data-reveal>
          تختلف الخيارات المتاحة من حالة إلى أخرى، ولا نقدّم وعودًا مسبقة بنتيجة معينة.
        </p>
      </div>
    </section>
  );
}
