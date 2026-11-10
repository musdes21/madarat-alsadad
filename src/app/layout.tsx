import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

// خط متغير واحد يغطي كل الأوزان (ملف واحد لكل مجموعة حروف)
const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-readex",
  display: "swap",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const title = `${site.legalName} | سداد القروض والتعثرات والبطاقات الائتمانية`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "مدارات السداد",
    "تخليص الديون",
    "تسديد القروض البنكية",
    "سداد المتعثرات",
    "سداد تعثرات سمة",
    "سداد إيقاف الخدمات",
    "سداد المخالفات المرورية",
    "سداد البطاقات الائتمانية",
    "تمويل المتعثرين",
    "السعودية",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#03343b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": `${site.url}/#business`,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/icon.png`,
      image: `${site.url}/og.jpg`,
      description: site.description,
      telephone: site.phones.map((p) => `+${p.international}`),
      areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
      contactPoint: site.phones.map((p) => ({
        "@type": "ContactPoint",
        telephone: `+${p.international}`,
        contactType: "customer service",
        areaServed: site.country,
        availableLanguage: ["ar"],
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "خدمات مدارات السداد",
        itemListElement: site.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: site.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${readex.variable} ${plex.variable}`} suppressHydrationWarning>
      <head>
        {/* تفعيل حركات الظهور فقط عند توفر JavaScript؛ بدونها يظهر المحتوى كاملًا */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
