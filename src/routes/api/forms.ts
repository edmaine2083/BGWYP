import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { allowSubmission, clientIp } from "@/lib/form-guard";
import { parsePublicForm, type FormTable } from "@/lib/public-form";

export const Route = createFileRoute("/api/forms")({
  server: {
    handlers: {
      POST: ({ request }) => submitPublicForm(request),
    },
  },
});

function emailFields(row: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(row)) {
    if (Array.isArray(value)) out[key] = value.join(", ");
    else if (typeof value === "boolean") out[key] = value ? "Yes" : "No";
    else if (value != null && value !== "") out[key] = String(value);
  }
  return out;
}

async function captchaOk(token: unknown) {
  // TODO(BGWYP): hCaptcha secret — set HCAPTCHA_SECRET and VITE_HCAPTCHA_SITE_KEY
  const secret = process.env.HCAPTCHA_SECRET?.trim();
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://hcaptcha.com/siteverify", { method: "POST", body });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function submitPublicForm(request: Request) {
  if (!allowSubmission(clientIp(request))) {
    return Response.json(
      { error: "Too many submissions. Please wait and try again." },
      { status: 429 },
    );
  }

  let payload: {
    table?: unknown;
    title?: unknown;
    row?: unknown;
    honeypot?: unknown;
    captchaToken?: unknown;
  };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return Response.json({ error: "Check the form and try again." }, { status: 400 });
  }

  if (typeof payload.honeypot === "string" && payload.honeypot.trim()) {
    return Response.json({ ok: true });
  }
  if (!(await captchaOk(payload.captchaToken))) {
    return Response.json({ error: "Please complete the captcha and try again." }, { status: 400 });
  }

  const parsed = parsePublicForm(String(payload.table ?? ""), payload.row);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set");
    return Response.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 },
    );
  }

  const safety = parsed.table === "safety_reports";
  const label =
    typeof payload.title === "string" && payload.title.trim()
      ? payload.title.trim()
      : parsed.table.replaceAll("_", " ");
  const fields = emailFields(parsed.row);
  const fromName =
    fields.full_name ||
    fields.guardian_name ||
    fields.contact_name ||
    fields.name ||
    "BGWYP website";
  // TODO(BGWYP): safeguarding lead email — set SAFEGUARDING_EMAIL
  const safeguarding = process.env.SAFEGUARDING_EMAIL?.trim() ?? "";
  const mail: Record<string, string> = {
    access_key: accessKey,
    subject: safety
      ? `[SAFETY – PRIORITY] New BGWYP Form Submission! (${label})`
      : `New BGWYP Form Submission! (${label})`,
    from_name: fromName,
    botcheck: "",
    form: label,
    ...fields,
  };
  if (safety && safeguarding) mail.ccemail = safeguarding;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(mail),
    });
    const data = (await res.json()) as { success?: boolean };
    if (!res.ok || !data.success) {
      return Response.json(
        { error: "Something went wrong. Please try again in a moment." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 502 },
    );
  }

  const stored = await storeRow(parsed.table, parsed.row);
  return Response.json({ ok: true, stored });
}

async function storeRow(table: FormTable, row: Record<string, unknown>) {
  try {
    const { error } = await supabase.from(table).insert(row as never);
    if (error) {
      console.error(error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
