import Image from "next/image";
import { site, telLink } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-paper px-4 pt-16 pb-28 sm:px-6 md:pb-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-teal/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3" aria-label={`${site.name} — العودة للأعلى`}>
              <Image src="/brand/mark.webp" alt="" width={56} height={46} className="h-11 w-auto" />
              <span className="leading-tight">
                <span className="block font-display text-xl font-bold text-teal">{site.name}</span>
                <span className="block text-sm text-ink/65">{site.tagline}</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-7 text-ink/60">
              نستقبل استفساراتك حول القروض البنكية والتعثرات والبطاقات الائتمانية والمخالفات والتمويل، ونوضّح لك الخيارات المتاحة لحالتك.
            </p>
          </div>

          <nav aria-label="روابط الصفحة" className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold text-ink">الأقسام</h2>
            <ul className="mt-4 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.95rem] text-ink/65 transition-colors hover:text-teal">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold text-ink">أرقام التواصل</h2>
            <ul className="mt-4 space-y-3">
              {site.phones.map((p) => (
                <li key={p.display}>
                  <a href={telLink(p)} className="num font-display text-lg font-semibold text-teal transition-colors hover:text-teal-600">
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-sm text-ink/65 md:flex-row md:items-center md:justify-between">
          <p>
            © <span className="num">{year}</span> جميع الحقوق محفوظة لدى {site.copyrightHolder}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>لا تطلب هذه الصفحة أي بيانات بنكية سرية.</p>
            {site.privacyPolicyUrl ? (
              <a href={site.privacyPolicyUrl} className="underline underline-offset-4 hover:text-teal">
                سياسة الخصوصية
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
