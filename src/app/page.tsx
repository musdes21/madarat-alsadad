import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { RevealObserver } from "@/components/RevealObserver";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Steps } from "@/components/sections/Steps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Why } from "@/components/sections/Why";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[60] focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <Why />
        <Steps />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
      <RevealObserver />
    </>
  );
}
