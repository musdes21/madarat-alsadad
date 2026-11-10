import { LayoutGrid, MessageCircleQuestion, PhoneCall, Route, Sparkles, type LucideProps } from "lucide-react";
import type { NavIconName } from "@/config/site";

const map = {
  services: LayoutGrid,
  why: Sparkles,
  steps: Route,
  faq: MessageCircleQuestion,
  contact: PhoneCall,
} satisfies Record<NavIconName, React.ComponentType<LucideProps>>;

export function NavIcon({ name, ...props }: { name: NavIconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" strokeWidth={1.8} {...props} />;
}
