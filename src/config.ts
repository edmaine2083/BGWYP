// All editable site settings live here.
export const DONATIONS_ENABLED = false;
export const ENROLLMENT_OPEN = false;
export const DONATION_URL = "";
export const LOGO_SRC = "/bgwyp-logo.jpg";
export const CONTACT_EMAIL = "info@bgwyp.org";
export const CONTACT_PHONE = "(443) 592-0494";

/** Where "Support the first cohort" buttons point, following the donate flag. */
export const SUPPORT_HREF = DONATIONS_ENABLED ? "/donate" : "/get-involved";

export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;
export const isPlaceholder = (v: string) => v.startsWith("[") && v.endsWith("]");
