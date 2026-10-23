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
export const CONTACT_PHONE = "443-592-0494";

/** Where "Support the first cohort" buttons point, following the donate flag. */
export const SUPPORT_HREF = DONATIONS_ENABLED ? "/donate" : "/get-involved";

export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;
export const isPlaceholder = (v: string) => v.startsWith("[") && v.endsWith("]");
