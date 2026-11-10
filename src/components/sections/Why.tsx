import { Compass, Ear, Info, MessagesSquare, ShieldCheck } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { CtaLink } from "../ui/CtaLink";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionMarker } from "../ui/SectionMarker";

const principles = [
  { icon: Ear, title: "نسمعك أولًا", body: "نبدأ بفهم حالتك والتزاماتك كما هي، دون أحكام مسبقة أو استعجال." },
  { icon: Compass, title: "وضوح في الخيارات", body: "نشرح لك ما هو متاح لحالتك وما ليس متاحًا، بلغة مباشرة ومفهومة." },
  { icon: MessagesSquare, title: "تواصل بلا تعقيد", body: "رسالة واتساب أو مكالمة واحدة تكفي للبدء، دون نماذج طويلة." },
  { icon: ShieldCheck, title: "حماية بياناتك", body: "لا نطلب كلمات مرور أو رموز تحقق أو بيانات دخول لحساباتك البنكية." },
];

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden bg-white px-4 pt-0 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="relative mb-12 sm:mb-16">
        <SectionMarker icon="why" />
      </div>
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-y-0 left-0 w-1/2 [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="why-title"
              eyebrow="لماذا مدارات السداد؟"
              title="لأن وضوح الصورة هو أول خطوة لترتيب أي التزام"
              lead="نستقبل استفسارك عن التزاماتك المالية، ونستمع لتفاصيل حالتك، ثم نوضّح لك الخيارات المتاحة والخطوات المناسبة. لا نبيع وعودًا؛ نقدّم لك صورة واضحة تساعدك على اتخاذ قرارك بثقة."
            />
            <div data-reveal style={{ "--i": 3 } as React.CSSProperties} className="mt-9">
              <CtaLink href={whatsappLink()} size="lg" track="why-whatsapp" arrow icon={<WhatsAppIcon className="size-5" />}>
                اشرح حالتك عبر واتساب
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {principles.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className={`group relative rounded-[28px] border border-teal/10 bg-paper p-7 transition-colors duration-500 hover:border-teal/25 hover:bg-white sm:p-8 ${
                  i % 2 === 1 ? "sm:translate-y-10" : ""
                }`}
              >
                <span className="grid size-12 place-items-center rounded-full border border-teal/15 bg-white text-teal transition-colors duration-500 group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                  <Icon className="size-[22px]" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[0.96rem] leading-8 text-ink/65">{body}</p>
              </li>
            ))}
          </ul>

          <aside
            data-reveal
            aria-label="تنبيه أمني"
            className="mt-6 flex items-start gap-4 rounded-[24px] border border-brass/30 bg-[#fbf7ef] p-6 sm:mt-16"
          >
            <Info className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden="true" />
            <p className="text-[0.95rem] leading-7 text-ink/75">
              <strong className="font-display font-semibold text-ink">للحفاظ على أمانك:</strong> لا تشارك رموز التحقق (OTP) أو كلمات المرور مع أي
              جهة، وتواصل معنا فقط عبر الأرقام الموضّحة في هذه الصفحة.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
