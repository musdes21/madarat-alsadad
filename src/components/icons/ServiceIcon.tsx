import { CarFront, ClipboardCheck, CreditCard, HandCoins, Landmark, type LucideProps } from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/config/site";

const map = {
  loans: Landmark,
  "credit-record": ClipboardCheck,
  traffic: CarFront,
  cards: CreditCard,
  financing: HandCoins,
} satisfies Record<ServiceIconName, React.ComponentType<LucideProps>>;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" strokeWidth={1.6} {...props} />;
}
