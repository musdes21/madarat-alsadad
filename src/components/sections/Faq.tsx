import { Plus } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { CtaLink } from "../ui/CtaLink";
import { SectionHeading } from "../ui/SectionHeading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="faq-title" eyebrow="الأسئلة الشائعة" title="إجابات واضحة قبل أن تتواصل" />
            <div data-reveal style={{ "--i": 2 } as React.CSSProperties} className="mt-8 rounded-[24px] bg-mist p-6">
              <p className="font-display font-semibold text-ink">لم تجد إجابة سؤالك؟</p>
              <p className="mt-1.5 text-[0.95rem] leading-7 text-ink/65">اكتب سؤالك مباشرة عبر واتساب.</p>
              <CtaLink href={whatsappLink()} track="faq-whatsapp" className="mt-5" icon={<WhatsAppIcon className="size-[18px]" />}>
                اسألنا عبر واتساب
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-teal/10 overflow-hidden rounded-[28px] border border-teal/10 bg-white">
            {site.faqs.map((faq, i) => (
              <details key={faq.question} className="faq group" name="faq" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-6 px-6 py-6 transition-colors duration-300 hover:bg-paper sm:px-8">
                  <h3 className="font-display text-[1.02rem] leading-8 font-semibold text-ink sm:text-[1.1rem]">{faq.question}</h3>
                  <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-teal/15 text-teal group-open:border-teal group-open:bg-teal group-open:text-white">
                    <Plus className="size-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="px-6 pb-7 text-[0.98rem] leading-8 text-ink/70 sm:px-8 sm:pe-20">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
