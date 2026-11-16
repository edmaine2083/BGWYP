import { CONTACT_EMAIL } from "@/config";
import { allowSubmission, clientIp } from "@/lib/form-guard";

export const CHAT_ERROR_REPLY = `Sorry, I am having trouble connecting right now. Please email ${CONTACT_EMAIL} for immediate assistance.`;
const CHAT_FALLBACK_REPLY = "I am here to help with BGWYP programs!";

const MODEL_NAME = "gemini-3.5-flash-lite";
const SYSTEM_CONTEXT =
  "You are the website assistant for Building Generational Wealth Youth Program (BGWYP). Answer only from published site content. Answer questions from youth ages 11-24, parents, and partners about programs, application guidelines, and community resources. Program timeline: BGWYP operates throughout the year. The Summer Accelerator is Phase 1, a 6-week launch. The School-Year Program is Phase 2 and continues through the school year. Do not describe BGWYP as a summer-only program. Dates and location are not set and have not been announced. Say that, and point families to the interest list on /programs. The program is free for families. The first cohort is capped at 60 participants. No participants have been served yet. Do not invent dates, partners, sponsors, results, or a different cohort size. Giving is not open. Sponsorships are not open until Maryland charitable registration is complete. Direct giving questions to /donate#notify and sponsorship questions to /partner#sponsorship or info@bgwyp.org. The Year 1 goal is $437,608: a $397,808 operating budget for 60 young people plus a $39,800 operating reserve. You may describe the partnership levels and benefits listed on /partner: Presenting Partner $25,000, Impact Partner $15,000, Mentoring and Education Partner $10,000, Networking and Community Partner $7,500, Supporter Partner $5,000, Corporate Exhibitor $2,500, and Small Business / Community Vendor $125. Say each is opening soon. When asked about tax status, use this sentence exactly and do not call gifts tax-deductible: Building Generational Wealth Youth Program, Inc. is a Maryland nonprofit corporation. Its application for federal 501(c)(3) tax-exempt status is pending. The chat window already showed a welcome. Never greet the visitor, introduce yourself, or restate this role. Answer only the latest question, using earlier messages only for context.";

type Turn = { role: "user" | "model"; text: string };

function readHistory(value: unknown): Turn[] {
  if (!Array.isArray(value)) return [];
  const turns: Turn[] = [];
  for (const item of value.slice(-8)) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const text = (item as { text?: unknown }).text;
    if ((role !== "user" && role !== "model") || typeof text !== "string") continue;
    const trimmed = text.trim().slice(0, 500);
    if (!trimmed) continue;
    turns.push({ role, text: trimmed });
  }
  return turns;
}

function toContents(history: Turn[], message: string) {
  const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];
  for (const turn of [...history, { role: "user" as const, text: message }]) {
    const last = contents.at(-1);
    if (!last && turn.role === "model") continue;
    if (last?.role === turn.role) {
      last.parts[0].text = turn.text;
      continue;
    }
    contents.push({ role: turn.role, parts: [{ text: turn.text }] });
  }
  return contents;
}

function stripRepeatedGreeting(reply: string) {
  const parts = reply.split(/\n\s*\n/);
  if (parts.length < 2) return reply;
  const first = parts[0];
  const isGreeting = /welcome/i.test(first) && /website assistant|bgwyp|building generational wealth/i.test(first);
  const rest = parts.slice(1).join("\n\n").trim();
  return isGreeting && rest ? rest : reply;
}

function redact(value: string, apiKey: string) {
  return value.split(apiKey).join("[redacted]");
}

export async function handleChatPost(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let message = "";
  let history: Turn[] = [];
  try {
    const body = (await request.json()) as { message?: unknown; history?: unknown };
    if (typeof body?.message === "string") message = body.message.trim().slice(0, 500);
    history = readHistory(body?.history);
  } catch {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  if (!message) return Response.json({ error: "Message is required" }, { status: 400 });
  if (!allowSubmission(`chat:${clientIp(request)}`)) {
    return Response.json(
      { error: "Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const apiKey = process.env["GEMINI_API_KEY"]?.trim();
  if (!apiKey) {
    console.error("Gemini API Error: GEMINI_API_KEY is not set");
    return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents: toContents(history, message),
        }),
      },
    );

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
      promptFeedback?: { blockReason?: string };
      error?: { message?: string; status?: string };
    };
    const text = stripRepeatedGreeting(data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "");
    if (text) return Response.json({ reply: text });

    if (data.error || !response.ok) {
      console.error(
        "Gemini API Error:",
        redact(data.error?.message || data.error?.status || `HTTP ${response.status}`, apiKey),
      );
      return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
    }

    const reply = data.promptFeedback?.blockReason || CHAT_FALLBACK_REPLY;
    return Response.json({ reply });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "request failed";
    console.error("Gemini API Error:", redact(detail, apiKey));
    return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
  }
}
