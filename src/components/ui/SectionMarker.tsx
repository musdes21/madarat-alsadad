import type { NavIconName } from "@/config/site";
import { site } from "@/config/site";
import { NavIcon } from "../icons/NavIcon";

/**
 * محطة ربط بين الأقسام: خط ينزل من القسم السابق، عقدة بأيقونة القسم داخل مدار،
 * ورقم القسم — تعطي إحساس الرحلة المتصلة أثناء التمرير.
 */
export function SectionMarker({ icon, tone = "dark" }: { icon: NavIconName; tone?: "dark" | "light" }) {
  const index = site.nav.findIndex((n) => n.icon === icon);
  const total = site.nav.length;
  const dark = tone === "dark"; // dark = نص داكن على خلفية فاتحة
  return (
    <div aria-hidden="true" className="flex flex-col items-center">
      <span
        className={`marker-line block h-12 w-px origin-top sm:h-16 ${
          dark ? "bg-gradient-to-b from-transparent via-teal/30 to-teal/60" : "bg-gradient-to-b from-transparent via-brass-300/40 to-brass-300/80"
        }`}
      />
      <span className="relative grid size-16 place-items-center">
        <svg viewBox="0 0 64 64" className="animate-orbit-slow absolute inset-0 size-full">
          <ellipse cx="32" cy="32" rx="30" ry="12" fill="none" stroke="currentColor" strokeOpacity="0.35" transform="rotate(-20 32 32)" className={dark ? "text-teal" : "text-brass-300"} />
          <circle cx="60" cy="24" r="2.2" className={dark ? "fill-brass" : "fill-brass-300"} />
        </svg>
        <span
          className={`marker-node relative grid size-11 place-items-center rounded-full border ${
            dark ? "border-teal/20 bg-white text-teal shadow-[0_10px_24px_-12px_rgb(2_86_97/0.6)]" : "border-white/15 bg-ink text-brass-300 shadow-[0_10px_24px_-12px_rgb(0_0_0/0.6)]"
          }`}
        >
          <NavIcon name={icon} className="size-5" />
        </span>
      </span>
      <span className={`num mt-2 font-display text-[0.7rem] font-semibold tracking-[0.2em] ${dark ? "text-teal" : "text-white/75"}`}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
