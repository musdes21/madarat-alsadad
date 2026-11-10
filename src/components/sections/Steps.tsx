import { whatsappLink, site } from "@/config/site";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { CtaLink } from "../ui/CtaLink";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionMarker } from "../ui/SectionMarker";

export function Steps() {
  return (
    <section id="steps" aria-labelledby="steps-title" className="grain relative isolate overflow-hidden bg-deep px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(46rem_30rem_at_50%_-5%,rgb(10_107_119/0.45),transparent_70%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="-mt-24 mb-10 sm:-mt-32 sm:mb-14">
          <SectionMarker icon="steps" tone="light" />
        </div>
        <SectionHeading
          id="steps-title"
          tone="light"
          align="center"
          eyebrow="خطوات التواصل"
          title="أربع خطوات… من أول رسالة إلى صورة واضحة"
          lead="رحلة إرشادية مقترحة لتنظيم التواصل، تساعدك على معرفة ما يمكن توقعه في كل مرحلة."
        />

        <div className="relative mt-16 sm:mt-20">
          {/* خط المسار — يُرسم مع التمرير على الشاشات الكبيرة */}
          <svg aria-hidden="true" viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute inset-x-[12.5%] top-[26px] hidden h-20 w-[75%] lg:block">
            <path d="M1000 28C860 -8 780 70 666 40S460 -6 333 40 120 72 0 28" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="3 7" />
            <path className="steps-line" pathLength={1} d="M1000 28C860 -8 780 70 666 40S460 -6 333 40 120 72 0 28" fill="none" stroke="#dcc7a0" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <ol className="relative grid gap-5 lg:grid-cols-4 lg:gap-6">
            {site.steps.map((step, i) => (
              <li key={step.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                {/* خط عمودي للجوال */}
                {i < site.steps.length - 1 ? (
                  <span aria-hidden="true" className="absolute top-16 bottom-[-1.25rem] start-[27px] w-px bg-gradient-to-b from-brass-300/60 to-white/5 lg:hidden" />
                ) : null}
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-brass-300/40 bg-ink font-display text-lg font-bold text-brass-300 shadow-[0_0_0_8px_rgb(3_52_59)]">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <div className="flex-1 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 lg:mt-6 lg:w-full">
                  <h3 className="font-display text-[1.1rem] font-bold">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-7 text-white/65">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <CtaLink href={whatsappLink()} size="lg" track="steps-whatsapp" arrow icon={<WhatsAppIcon className="size-5" />}>
            ابدأ الخطوة الأولى الآن
          </CtaLink>
          <p className="max-w-md text-sm leading-7 text-white/60">
            هذه خطوات إرشادية لتنظيم التواصل، وليست وعدًا بنتيجة معينة؛ فالنتيجة تعتمد على تفاصيل كل حالة.
          </p>
        </div>
      </div>
    </section>
  );
}
