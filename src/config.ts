// All editable site settings live here.
export const DONATIONS_ENABLED = false;
export const ENROLLMENT_OPEN = false;
/** Floating site assistant. Replies are generated on the server. */
export const CHAT_ENABLED = true;
export const DONATION_URL = "";
export const LOGO_SRC = "/bgwyp-logo.jpg";
export const CONTACT_EMAIL = "info@bgwyp.org";
export const CONTACT_PHONE = "(443) 592-0494";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61596519171305";

/** TODO(BGWYP): number — survey responses collected. Leave unset until counted. */
export const SURVEY_RESPONSES_COLLECTED: number | null = null;
/** TODO(BGWYP): number — partners signed on. Leave unset until counted. */
export const PARTNERS_SIGNED_ON: number | null = null;
export const FIRST_COHORT_SEATS = 60;

export function launchProgressItems() {
  return (
    [
      ["Survey responses collected", SURVEY_RESPONSES_COLLECTED],
      ["Partners signed on", PARTNERS_SIGNED_ON],
      ["Seats in our first cohort", FIRST_COHORT_SEATS],
    ] as const
  ).filter((item): item is readonly [string, number] => typeof item[1] === "number" && item[1] > 0);
}

/** Header and hero notify button. Giving is not open, so this opens the email list. */
export const SUPPORT_HREF = DONATIONS_ENABLED ? "/donate" : "/donate#notify";

export function telHref(p: string) {
  const digits = p.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return digits ? `tel:+${digits}` : "tel:";
}
export const isPlaceholder = (v: string) => v.startsWith("[") && v.endsWith("]");
