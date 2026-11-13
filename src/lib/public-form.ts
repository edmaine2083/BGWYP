import { z } from "zod";
import { cleanValue } from "@/lib/form-guard";

export const FORM_TABLES = [
  "volunteer_applications",
  "interest_list",
  "partner_inquiries",
  "contact_messages",
  "donation_notify_list",
  "safety_reports",
] as const;

export type FormTable = (typeof FORM_TABLES)[number];

const req = (label: string) => z.string().trim().min(1, `${label} is required.`).max(1000);
const email = z.string().trim().email("Enter a valid email address.").max(255);
const optional = z.string().trim().max(1000).optional().or(z.literal(""));
const zip = z
  .string()
  .trim()
  .regex(/^\d{5}(-\d{4})?$/, "Enter a 5-digit ZIP code.");
const phoneReq = z
  .string()
  .trim()
  .regex(/^[\d\s()+.-]{7,20}$/, "Enter a valid phone number.");
const phoneOpt = z
  .string()
  .trim()
  .regex(/^$|^[\d\s()+.-]{7,20}$/, "Enter a valid phone number.");

const schemas: Record<FormTable, z.ZodTypeAny> = {
  volunteer_applications: z.object({
    full_name: req("Full name"),
    email,
    phone: phoneReq,
    zip,
    help_type: req("How you'd like to help"),
    availability: req("Availability"),
    motivation: req("Why you want to volunteer"),
    acknowledged: z.literal(true, { errorMap: () => ({ message: "Please confirm to continue." }) }),
  }),
  interest_list: z.object({
    guardian_name: req("Name"),
    email,
    phone: phoneOpt.optional().or(z.literal("")),
    zip,
    age_range: z.enum(["11–13", "14–15", "16–17", "18–24"]),
    self_signup: z.boolean(),
    heard_from: optional,
  }),
  partner_inquiries: z.object({
    organization: req("Organization"),
    contact_name: req("Contact name"),
    title: optional,
    email,
    phone: phoneOpt.optional().or(z.literal("")),
    partner_type: req("Partner type"),
    offers: z.array(z.string().trim().max(200)).max(20),
    message: optional,
    wants_template: z.boolean(),
  }),
  contact_messages: z.object({
    name: req("Name"),
    email,
    phone: phoneOpt.optional().or(z.literal("")),
    topic: req("Topic"),
    message: req("Message"),
  }),
  donation_notify_list: z.object({ email }),
  safety_reports: z.object({
    name: req("Name"),
    email,
    phone: phoneOpt.optional().or(z.literal("")),
    message: req("Message"),
  }),
};

export function parsePublicForm(table: string, row: unknown) {
  if (!FORM_TABLES.includes(table as FormTable))
    return { ok: false as const, error: "Unknown form." };
  if (!row || typeof row !== "object" || Array.isArray(row))
    return { ok: false as const, error: "Missing form fields." };
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row as Record<string, unknown>)) {
    cleaned[key] = cleanValue(value);
  }
  const parsed = schemas[table as FormTable].safeParse(cleaned);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Check the form and try again.";
    return { ok: false as const, error: message };
  }
  return {
    ok: true as const,
    table: table as FormTable,
    row: parsed.data as Record<string, unknown>,
  };
}
