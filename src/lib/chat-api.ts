import { CONTACT_EMAIL } from "@/config";

export const CHAT_ERROR_REPLY = `Sorry, I am having trouble connecting right now. Please email ${CONTACT_EMAIL} for immediate assistance.`;
const CHAT_FALLBACK_REPLY = "I am here to help with BGWYP programs!";

const MODEL_NAME = "gemini-1.5-flash";
const SYSTEM_CONTEXT =
  "System Context: You are a helpful website assistant for Building Generational Wealth Youth Program (BGWYP). Help youth (ages 11-24), parents, and partners learn about the 6-week Summer Accelerator, application guidelines, and community resources.";

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
          contents: [
            {
              role: "user",
              parts: [{ text: SYSTEM_CONTEXT }, { text: message }],
            },
          ],
        }),
      },
    );

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
      promptFeedback?: { blockReason?: string };
    };
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || data.promptFeedback?.blockReason || CHAT_FALLBACK_REPLY;
    return Response.json({ reply });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "request failed";
    console.error("Gemini API Error:", redact(detail, apiKey));
    return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
  }
}
