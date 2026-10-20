import { isPlaceholder, telHref } from "@/config";
import { T } from "./ui";

export function Contactish({ value, kind }: { value: string; kind: "tel" | "mail" }) {
  if (isPlaceholder(value)) return <T>{value}</T>;
  return <a className="font-semibold text-gold-deep underline" href={kind === "tel" ? telHref(value) : `mailto:${value}`}>{value}</a>;
}
