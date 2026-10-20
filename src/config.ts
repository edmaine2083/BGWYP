// All editable site settings live here.
export const DONATIONS_ENABLED = false;
export const ENROLLMENT_OPEN = false;
export const DONATION_URL = "[BUTTON TO PAYMENT LINK OR FISCAL SPONSOR PAGE]";
export const CONTACT_EMAIL = "bgwypinfo@gmail.com";
export const CONTACT_PHONE = "(443) 592-0494";
export const SAFEGUARDING_PHONE = "[PHONE]";
export const SAFEGUARDING_EMAIL = "[EMAIL]";

/** Where "Support the first cohort" buttons point, following the donate flag. */
export const SUPPORT_HREF = DONATIONS_ENABLED ? "/donate" : "/get-involved";

export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;
export const isPlaceholder = (v: string) => v.startsWith("[") && v.endsWith("]");
