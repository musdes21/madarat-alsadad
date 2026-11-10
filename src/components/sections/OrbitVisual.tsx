import { site } from "@/config/site";
import { ServiceIcon } from "../icons/ServiceIcon";

/** مواقع الخدمات حول المدار (نسب مئوية من الحاوية) */
const chipPositions = [
  { top: "7%", insetInlineEnd: "8%", delay: "0s" },
  { top: "29%", insetInlineStart: "-2%", delay: "-1.2s" },
  { top: "50%", insetInlineEnd: "-3%", delay: "-2.4s" },
  { bottom: "18%", insetInlineStart: "4%", delay: "-3.6s" },
  { bottom: "3%", insetInlineEnd: "22%", delay: "-4.8s" },
] as const;

export function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[560px]">
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full overflow-visible" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="core-fill" cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#0d7a87" />
            <stop offset="55%" stopColor="#03434b" />
            <stop offset="100%" stopColor="#022a30" />
          </radialGradient>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3f939c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3f939c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b6c1c4" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#b6c1c4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#dcc7a0" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="ring-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
          <path id="orbit-a" d="M25 300a275 96 0 1 0 550 0a275 96 0 1 0-550 0" />
          <path id="orbit-b" d="M85 300a215 150 0 1 0 430 0a215 150 0 1 0-430 0" />
          <path id="orbit-c" d="M140 300a160 160 0 1 0 320 0a160 160 0 1 0-320 0" />
        </defs>

        <circle cx="300" cy="300" r="300" fill="url(#halo)" />
        <circle cx="300" cy="300" r="292" fill="none" stroke="#fff" strokeOpacity="0.07" strokeDasharray="2 9" />

        <g className="animate-orbit-slow" style={{ transformOrigin: "300px 300px", transformBox: "view-box" }}>
          <use href="#orbit-c" fill="none" stroke="#fff" strokeOpacity="0.08" />
          <circle cx="460" cy="300" r="3" fill="#dcc7a0" />
          <circle cx="140" cy="300" r="2" fill="#b6c1c4" fillOpacity="0.6" />
        </g>

        <g transform="rotate(28 300 300)">
          <use href="#orbit-b" fill="none" stroke="url(#ring-b)" strokeWidth="1.2" />
          <g className="travelers">
            <circle r="4.5" fill="#b6c1c4">
              <animateMotion dur="22s" repeatCount="indefinite" rotate="auto">
                <mpath href="#orbit-b" />
              </animateMotion>
            </circle>
          </g>
        </g>

        <g transform="rotate(-16 300 300)">
          <use href="#orbit-a" fill="none" stroke="url(#ring-a)" strokeWidth="1.6" />
          <g className="travelers">
            <circle r="6" fill="#dcc7a0">
              <animateMotion dur="16s" repeatCount="indefinite">
                <mpath href="#orbit-a" />
              </animateMotion>
            </circle>
            <circle r="3.5" fill="#ffffff" fillOpacity="0.8">
              <animateMotion dur="16s" begin="-8s" repeatCount="indefinite">
                <mpath href="#orbit-a" />
              </animateMotion>
            </circle>
          </g>
        </g>

        {/* النواة: الشعار الأصلي داخل قرص زجاجي */}
        <circle cx="300" cy="300" r="122" fill="url(#core-fill)" />
        <circle cx="300" cy="300" r="122" fill="none" stroke="#fff" strokeOpacity="0.14" />
        <circle cx="300" cy="300" r="104" fill="none" stroke="#fff" strokeOpacity="0.06" />
        <path d="M206 252a110 110 0 0 1 150-46" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
        <image href="/brand/mark-light-sm.png" x="212" y="228" width="176" height="144" preserveAspectRatio="xMidYMid meet" />
      </svg>

      <ul aria-label="خدماتنا" className="absolute inset-0">
        {site.services.map((service, i) => {
          const { delay, ...pos } = chipPositions[i];
          return (
            <li key={service.id} className="absolute" style={pos}>
              <a
                href={`#${service.id}`}
                className="float group flex items-center gap-2 rounded-full border border-white/15 bg-[#0a3b42]/80 p-1.5 text-white transition-colors duration-300 hover:border-brass-300/60 hover:bg-white/[0.12] sm:pe-4"
                style={{ "--delay": delay } as React.CSSProperties}
              >
                <span className="grid size-9 place-items-center rounded-full bg-sage text-teal transition-colors duration-300 group-hover:bg-brass-300 sm:size-8">
                  <ServiceIcon name={service.icon} className="size-[18px]" />
                </span>
                <span className="sr-only text-[0.82rem] font-medium whitespace-nowrap sm:not-sr-only">{service.shortTitle}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
