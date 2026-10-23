import { afterEach, describe, expect, it, vi } from "vitest";
import { CHAT_ERROR_REPLY, handleChatPost } from "@/lib/chat-api";

function post(body: unknown, method = "POST") {
  return handleChatPost(
    new Request("http://localhost/api/chat", {
      method,
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("POST /api/chat", () => {
  it("rejects anything except POST", async () => {
    const response = await handleChatPost(new Request("http://localhost/api/chat", { method: "GET" }));
    expect(response.status).toBe(405);
    expect(await response.json()).toEqual({ error: "Method not allowed" });
  });

  it("rejects an empty message", async () => {
    const response = await post({ message: "   " });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Message is required" });
  });

  it("asks Gemini with the key only on the server request", async () => {
    vi.stubEnv("GEMINI_API_KEY", "test-key");
    const fetchMock = vi.fn(async () =>
      Response.json({
        candidates: [{ content: { parts: [{ text: "Ages 11 to 24 can join." }] } }],
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await post({ message: "Who can join?" });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.reply).toBe("Ages 11 to 24 can join.");
    expect(JSON.stringify(data)).not.toContain("test-key");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=test-key",
    );
    expect(new Headers(init.headers).get("Content-Type")).toBe("application/json");
    const payload = JSON.parse(String(init.body)) as {
      system_instruction?: { parts?: { text?: string }[] };
      contents: { role: string; parts: { text: string }[] }[];
    };
    expect(payload.system_instruction?.parts?.[0]?.text).toContain("Never greet");
    expect(payload.system_instruction?.parts?.[0]?.text).toContain("operates throughout the year");
    expect(payload.system_instruction?.parts?.[0]?.text).toContain("6-week");
    expect(payload.system_instruction?.parts?.[0]?.text).toContain("school year with a curriculum and deliverables");
    expect(payload.contents).toEqual([{ role: "user", parts: [{ text: "Who can join?" }] }]);
  });

  it("continues an existing conversation without asking the model to introduce itself", async () => {
    vi.stubEnv("GEMINI_API_KEY", "test-key");
    const fetchMock = vi.fn(async () =>
      Response.json({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "Hello! Welcome to the **Building Generational Wealth Youth Program (BGWYP)** website assistant. I'm here to help youth (ages 11-24), parents, and partners navigate our programs and resources.\n\nApplications are reviewed in the spring.",
                },
              ],
            },
          },
        ],
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await post({
      message: "When are applications reviewed?",
      history: [
        { role: "user", text: "Who can join?" },
        { role: "model", text: "Youth ages 11 to 24." },
      ],
    });

    expect(await response.json()).toEqual({ reply: "Applications are reviewed in the spring." });
    const payload = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body)) as {
      contents: { role: string; parts: { text: string }[] }[];
    };
    expect(payload.contents.map((turn) => `${turn.role}:${turn.parts[0].text}`)).toEqual([
      "user:Who can join?",
      "model:Youth ages 11 to 24.",
      "user:When are applications reviewed?",
    ]);
    expect(JSON.stringify(payload.contents)).not.toContain("System Context");
  });

  it("does not turn a Gemini model error into the same canned reply", async () => {
    vi.stubEnv("GEMINI_API_KEY", "test-key");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({ error: { message: "models/gemini-1.5-flash is not found", status: "NOT_FOUND" } }, { status: 404 }),
      ),
    );
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await post({ message: "Who can join?" });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ reply: CHAT_ERROR_REPLY });
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain("test-key");
    errorSpy.mockRestore();
  });

  it("returns the contact fallback when Gemini is unavailable", async () => {
    vi.stubEnv("GEMINI_API_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await post({ message: "Who can join?" });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ reply: CHAT_ERROR_REPLY });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});