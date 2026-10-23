import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  DONATIONS_ENABLED,
  ENROLLMENT_OPEN,
} from "@/config";

export const CHAT_ERROR_REPLY = `Sorry, I am having trouble connecting right now. Please email ${CONTACT_EMAIL} for immediate assistance.`;

const FALLBACK_REPLY = "I am here to help with BGWYP programs!";
const MODEL_NAME = "gemini-2.5-flash";

function systemInstruction(): string {
  const enrollment = ENROLLMENT_OPEN
    ? "Enrollment is open. Space is limited to 60 young people and depends on funded capacity. Families join the interest list on the Programs page."
    : "Enrollment is not open yet. Space is limited to 60 young people and depends on funded capacity. Families join the interest list on the Programs page.";
  const giving = DONATIONS_ENABLED
    ? "Online giving is open on the Donate page."
    : "Online giving is not open yet. Supporters can join the notification list on the Donate page.";

  return [
    "You are a helpful assistant for Building Generational Wealth Youth Program (BGWYP). Help youth (ages 11-24), parents, and partners learn about the 6-week Summer Accelerator, application guidelines, and community resources.",
    "Use only the published facts below. If you do not have a fact, say so and share the contact details. Do not invent dates, locations, tuition, or tax status.",
    `Contact: Baltimore, Maryland. Phone ${CONTACT_PHONE}. Email ${CONTACT_EMAIL}. If a young person is in danger, say to call 911.`,
    "Who can join: Baltimore young people ages 11 to 24. Stages: Foundations (grades 6–8), Exploration (grades 9–10), Mastery (grades 11–12), Transition-Age (ages 18–24).",
    "Summer Accelerator: six weeks, 24 days, 96 hours. Weeks: 1 The Baltimore Legacy, 2 Wealth Fundamentals, 3 Creative Entrepreneurship, 4 Social Capital & Power, 5 The Generational Plan, 6 Showcase and Next Steps. Dates are not posted yet. The location is posted once the site agreement is signed. Included: meals, transportation support, materials, and mentors. No family tuition is published.",
    "School year: September through May, with a First Saturday workshop, a Second Saturday lab or exposure visit, and a monthly virtual checkpoint.",
    enrollment,
    "Safety: every adult is screened with fingerprint, FBI, and sex-offender registry checks and trained before contact. No adult is ever alone with a young person. Ratios are one adult for every ten young people in grades 6 to 8, and one for every fifteen in older groups.",
    `${giving} The first-year goal is $437,608 for 60 young people, $6,630 per young person, plus a 10% reserve. A summer facilitator is $3,600.`,
    "BGWYP is a Maryland nonprofit corporation. The federal 501(c)(3) application is pending, so deductibility depends on IRS approval.",
    "Edward J. Shepard, MBA, founded the program in 2026.",
  ].join("\n");
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

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error("Gemini API Error: GEMINI_API_KEY is not set");
    return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction() }],
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
    if (!response.ok) {
      console.error("Gemini API Error:", response.status);
      return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || FALLBACK_REPLY;
    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error instanceof Error ? error.message : "request failed");
    return Response.json({ reply: CHAT_ERROR_REPLY }, { status: 500 });
  }
}
