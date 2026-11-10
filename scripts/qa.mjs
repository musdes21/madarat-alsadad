/**
 * فحص جودة آلي لصفحة مدارات السداد.
 * التشغيل: npm run build && npm start  ثم في نافذة أخرى: npm run qa
 * يتطلب Playwright مثبتًا (npx playwright install chromium) أو متصفحًا متاحًا.
 */
import { chromium, devices } from "playwright";

const BASE = process.env.QA_URL ?? "http://localhost:3000";
const OFFICIAL = ["966562054342", "966503705362"];
const SERVICES = [
  "تسديد القروض البنكية",
  "سداد المتعثرات لدى سما",
  "سداد إيقاف الخدمات والمخالفات المرورية",
  "سداد البطاقات الائتمانية",
  "التمويل لمن تعيقهم ظروف التمويل",
];
const results = [];
const ok = (name, cond, info = "") => results.push({ pass: !!cond, line: `${cond ? "PASS" : "FAIL"}  ${name}${info ? `  — ${info}` : ""}` });

const b = await chromium.launch();

/* ---------------- Desktop ---------------- */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(BASE, { waitUntil: "networkidle" });

  const links = await p.$$eval("a", (as) => as.map((a) => ({ href: a.getAttribute("href"), target: a.target, rel: a.rel })));
  ok("No empty or '#' links", links.every((l) => l.href && l.href !== "#"), `${links.length} links`);

  const anchorIds = [...new Set(links.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1)))];
  const missing = await p.evaluate((ids) => ids.filter((id) => !document.getElementById(id)), anchorIds);
  ok("All in-page anchors resolve to a section", missing.length === 0, missing.join(","));

  const wa = links.filter((l) => l.href.startsWith("https://wa.me/"));
  const waPhones = [...new Set(wa.map((l) => new URL(l.href).pathname.slice(1)))];
  ok("WhatsApp links use only the two official numbers (966…)", waPhones.every((n) => OFFICIAL.includes(n)), waPhones.join(", "));
  ok("WhatsApp links open in new tab with noopener", wa.every((l) => l.target === "_blank" && l.rel.includes("noopener")), `${wa.length} links`);
  ok("Arabic text in WhatsApp URLs is percent-encoded", wa.every((l) => /^[\x21-\x7e]+$/.test(l.href)));

  const msgs = wa.map((l) => new URL(l.href).searchParams.get("text"));
  ok("General WhatsApp message decodes correctly", msgs.includes("السلام عليكم، أرغب بالاستفسار عن خدمات مدارات السداد."));
  for (const s of SERVICES) ok(`Service message includes name: ${s}`, msgs.includes(`السلام عليكم، أرغب بالاستفسار عن خدمة ${s} لدى مدارات السداد.`));

  const tels = [...new Set(links.filter((l) => l.href.startsWith("tel:")).map((l) => l.href))];
  ok("tel: links are +966 official numbers only", tels.every((t) => OFFICIAL.map((n) => `tel:+${n}`).includes(t)), tels.join(", "));
  const other = links.filter((l) => !/^(#|tel:|https:\/\/wa\.me\/)/.test(l.href)).map((l) => l.href);
  ok("No other (placeholder/fake) links", other.length === 0, other.join(","));

  const text = await p.evaluate(() => document.body.innerText);
  const brandCount = (text.match(/مدارات السداد/g) || []).length;
  ok("Brand name «مدارات السداد» used", brandCount > 5, `${brandCount}×`);
  ok("No wrong names «مدار السداد» / «مدار سما»", !/(^|[^؀-ۿ])مدار (السداد|سما)/.test(text));
  ok("Both numbers visible on page", text.includes("0562054342") && text.includes("0503705362"));

  const numDirs = await p.$$eval(".num", (els) => els.filter((e) => /05\d{8}/.test(e.textContent)).map((e) => getComputedStyle(e).direction));
  ok("Phone numbers render LTR (no RTL reversal)", numDirs.length > 0 && numDirs.every((d) => d === "ltr"), `${numDirs.length} instances`);

  const meta = await p.evaluate(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    h1: document.querySelectorAll("h1").length,
    title: document.title,
    desc: document.querySelector("meta[name=description]")?.content,
    og: document.querySelector('meta[property="og:image"]')?.content,
    ogLocale: document.querySelector('meta[property="og:locale"]')?.content,
    canonical: document.querySelector("link[rel=canonical]")?.href,
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => JSON.parse(s.textContent)["@graph"].map((g) => g["@type"])),
  }));
  ok("<html lang=ar dir=rtl>", meta.lang === "ar" && meta.dir === "rtl");
  ok("Exactly one <h1>", meta.h1 === 1);
  ok("Title, description, canonical, OG (ar_SA) present", !!(meta.title && meta.desc && meta.og && meta.canonical && meta.ogLocale === "ar_SA"));
  ok("JSON-LD FinancialService + FAQPage", meta.ld.includes("FinancialService") && meta.ld.includes("FAQPage"));
  const ogRes = await p.request.get(new URL(new URL(meta.og).pathname, BASE).href);
  ok("OG image served", ogRes.status() === 200);
  for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest", "/icon.png", "/apple-icon.png", "/favicon.ico"]) {
    ok(`${path} served`, (await p.request.get(BASE + path)).status() === 200);
  }

  await p.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await p.waitForTimeout(800);
  const imgs = await p.$$eval("img", (is) => is.map((i) => i.complete && i.naturalWidth > 0));
  ok("All images load", imgs.every(Boolean), `${imgs.length} images`);

  const sums = await p.$$("details.faq summary");
  await sums[1].scrollIntoViewIfNeeded();
  await sums[1].click();
  await p.waitForTimeout(300);
  const open = await p.$$eval("details.faq", (ds) => ds.map((d, i) => (d.open ? i : -1)).filter((i) => i >= 0));
  ok("FAQ accordion: one item open at a time", JSON.stringify(open) === "[1]", JSON.stringify(open));

  ok("No console / page errors (desktop)", errs.length === 0, errs.join(" | "));
  await ctx.close();
}

/* ---------------- Mobile ---------------- */
{
  const ctx = await b.newContext({ ...devices["iPhone 13"] });
  const m = await ctx.newPage();
  const errs = [];
  m.on("pageerror", (e) => errs.push(e.message));
  await m.goto(BASE, { waitUntil: "networkidle" });
  await m.waitForTimeout(900);

  const ctaAboveFold = await m.$eval('[data-cta="hero-whatsapp"]', (e) => e.getBoundingClientRect().bottom <= innerHeight);
  ok("Mobile: WhatsApp CTA visible without scrolling", ctaAboveFold);

  const barShown = () => m.$eval('[data-cta="sticky-whatsapp"]', (e) => e.getBoundingClientRect().top < innerHeight - 4);
  ok("Mobile sticky bar hidden at top", !(await barShown()));
  await m.evaluate(() => document.getElementById("services").scrollIntoView({ behavior: "instant" }));
  await m.waitForTimeout(900);
  ok("Mobile sticky bar visible mid-page", await barShown());
  await m.evaluate(() => document.getElementById("contact").scrollIntoView({ behavior: "instant" }));
  await m.waitForTimeout(900);
  ok("Mobile sticky bar hides at final contact section", !(await barShown()));

  await m.evaluate(() => scrollTo(0, 0));
  await m.waitForTimeout(300);
  const menuBtn = 'button[aria-controls="mobile-menu"]';
  await m.click(menuBtn);
  ok("Mobile menu opens (aria-expanded)", (await m.getAttribute(menuBtn, "aria-expanded")) === "true" && (await m.isVisible("#mobile-menu")));
  await m.keyboard.press("Escape");
  await m.waitForTimeout(100);
  ok("Mobile menu closes with Escape", !(await m.isVisible("#mobile-menu")));
  await m.click(menuBtn);
  await m.click('#mobile-menu a[href="#faq"]');
  await m.waitForTimeout(2500);
  const atFaq = await m.evaluate(() => Math.abs(document.getElementById("faq").getBoundingClientRect().top) < 140);
  ok("Mobile menu link navigates and closes menu", !(await m.isVisible("#mobile-menu")) && atFaq);

  const small = await m.$$eval("a, button", (els) =>
    els
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 1 && r.height > 1 && r.height < 40 && !e.closest("footer") && !e.closest("p");
      })
      .map((e) => `${e.textContent.trim().slice(0, 20)}:${Math.round(e.getBoundingClientRect().height)}`),
  );
  ok("Mobile tap targets ≥ 40px (excluding inline text links)", small.length === 0, small.join(", "));
  ok("Mobile: no horizontal overflow", await m.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  ok("No page errors (mobile)", errs.length === 0, errs.join(" | "));
  await ctx.close();
}

/* ---------------- Reduced motion ---------------- */
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const r = await ctx.newPage();
  await r.goto(BASE, { waitUntil: "networkidle" });
  await r.waitForTimeout(300);
  ok("Reduced motion: below-fold content visible without animation", (await r.$eval("#bank-loans", (e) => getComputedStyle(e).opacity)) === "1");
  ok("Reduced motion: orbit travelers hidden", (await r.$eval(".travelers", (e) => getComputedStyle(e).display)) === "none");
  await ctx.close();
}

/* ---------------- No JavaScript ---------------- */
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
  const n = await ctx.newPage();
  await n.goto(BASE);
  ok("No-JS: all content visible", (await n.$eval("#bank-loans", (e) => getComputedStyle(e).opacity)) === "1");
  const ctaHref = await n.$eval('[data-cta="hero-whatsapp"]', (e) => e.href);
  ok("No-JS: CTAs still work (plain links)", ctaHref.startsWith("https://wa.me/"));
  await ctx.close();
}

await b.close();
for (const r of results) console.log(r.line);
const passed = results.filter((r) => r.pass).length;
console.log(`\n${passed}/${results.length} checks passed`);
process.exit(passed === results.length ? 0 : 1);
