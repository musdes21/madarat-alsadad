import { Lock, MessagesSquare, ScanSearch } from "lucide-react";

const items = [
  { icon: MessagesSquare, title: "قناة تواصل مباشرة", body: "واتساب أو اتصال هاتفي، بلا نماذج أو خطوات معقدة." },
  { icon: ScanSearch, title: "فهم الحالة أولًا", body: "نستمع لتفاصيل التزاماتك قبل الحديث عن أي خيار." },
  { icon: Lock, title: "بياناتك الحساسة لك", body: "لا نطلب كلمات مرور أو رموز تحقق أو بيانات دخول." },
];

export function TrustStrip() {
  return (
    <section aria-label="مبادئ التواصل" className="relative z-10 -mt-6 px-4 sm:-mt-12 sm:px-6 lg:px-8">
      <ul className="mx-auto grid max-w-6xl divide-y divide-teal/10 overflow-hidden rounded-[28px] border border-teal/10 bg-white shadow-[0_30px_80px_-40px_rgb(2_52_59/0.45)] md:grid-cols-3 md:divide-x md:divide-y-0 md:divide-x-reverse">
        {items.map(({ icon: Icon, title, body }, i) => (
          <li key={title} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex items-start gap-4 p-6 sm:p-7">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-teal">
              <Icon className="size-[22px]" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-[1.02rem] font-semibold text-ink">{title}</p>
              <p className="mt-1.5 text-[0.93rem] leading-7 text-ink/65">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
