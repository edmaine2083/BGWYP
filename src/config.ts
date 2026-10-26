// All editable site settings live here.
export const DONATIONS_ENABLED = false;
export const ENROLLMENT_OPEN = false;
/** Floating site assistant. Replies are generated on the server. */
export const CHAT_ENABLED = true;
export const DONATION_URL = "";
export const LOGO_SRC = "/bgwyp-logo.jpg";
export const CONTACT_EMAIL = "info@bgwyp.org";
/** Public Web3Forms access key. Submissions are emailed to the inbox tied to this key. */
export const WEB3FORMS_ACCESS_KEY = "91eb5252-5ae9-41eb-98c3-d87d642c86c9";
export const CONTACT_PHONE = "(443) 592-0494";

/** Header and hero notify button. Giving is not open, so this opens the email list. */
export const SUPPORT_HREF = DONATIONS_ENABLED ? "/donate" : "/donate#notify";

export function telHref(p: string) {
  const digits = p.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return digits ? `tel:+${digits}` : "tel:";
}
export const isPlaceholder = (v: string) => v.startsWith("[") && v.endsWith("]");
