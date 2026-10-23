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
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=test-key",
    );
    expect(new Headers(init.headers).get("Content-Type")).toBe("application/json");
    const payload = JSON.parse(String(init.body)) as {
      system_instruction?: unknown;
      contents: { parts: { text: string }[] }[];
    };
    expect(payload.system_instruction).toBeUndefined();
    expect(payload.contents[0].parts.map((part) => part.text)).toEqual([
      expect.stringContaining("System Context: You are a helpful website assistant"),
      "Who can join?",
    ]);
  });

  it("uses a block reason, then a friendly line, when Gemini returns no text", async () => {
    vi.stubEnv("GEMINI_API_KEY", "test-key");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ promptFeedback: { blockReason: "SAFETY" } }))
      .mockResolvedValueOnce(Response.json({}));
    vi.stubGlobal("fetch", fetchMock);

    const blocked = await post({ message: "Hello" });
    expect(blocked.status).toBe(200);
    expect(await blocked.json()).toEqual({ reply: "SAFETY" });

    const empty = await post({ message: "Hello again" });
    expect(empty.status).toBe(200);
    expect(await empty.json()).toEqual({ reply: "I am here to help with BGWYP programs!" });
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