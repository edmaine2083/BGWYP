import { CONTACT_EMAIL } from "@/config";

export const CHAT_ERROR_REPLY = `Sorry, I am having trouble connecting right now. Please email ${CONTACT_EMAIL} for immediate assistance.`;
export const CHAT_EMPTY_REPLY = `Sorry, I received an empty response. Please email ${CONTACT_EMAIL} for assistance.`;

const MODEL_NAME = "gemini-2.5-flash";
const SYSTEM_INSTRUCTION =
  "You are a helpful website assistant for Building Generational Wealth Youth Program (BGWYP). Help youth (ages 11-24), parents, and partners learn about the 6-week Summer Accelerator, application guidelines, and community resources.";

function redact(value: string, apiKey: string) {
  return value.split(apiKey).join("[redacted]");
}

export async function handleChatPost(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let message = "";
  try {
    const body = (await request.json()) as { message?: unknown };
    if (typeof body?.message === "string") message = body.message.trim().slice(0, 500);
  } catch {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  if (!message) return Response.json({ error: "Message is required" }, { status: 400 });

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
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      },
    );

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!reply) {
      console.error("Gemini API Full Response:", redact(JSON.stringify(data), apiKey));
      return Response.json({ reply: CHAT_EMPTY_REPLY }, { status: 500 });
    }
    return Response.json({ reply });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "request failed";
    console.error("Gemini API Error:", redact(detail, apiKey));
    return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
  }
}
