import { describe, expect, it } from "vitest";
import { allowSubmission, stripHtml } from "@/lib/form-guard";
import { parsePublicForm } from "@/lib/public-form";
import { applySecurityHeaders, redirectToCanonical } from "@/lib/security-headers";

describe("form guard", () => {
  it("strips html from text", () => {
    expect(stripHtml("  Hello <b>there</b> <script>alert(1)</script>  ")).toBe(
      "Hello there alert(1)",
    );
  });

  it("allows five submissions in ten minutes and blocks the sixth", () => {
    const ip = "203.0.113.10";
    const start = 1_700_000_000_000;
    for (let i = 0; i < 5; i += 1) expect(allowSubmission(ip, start + i)).toBe(true);
    expect(allowSubmission(ip, start + 6)).toBe(false);
    expect(allowSubmission(ip, start + 10 * 60 * 1000 + 7)).toBe(true);
  });

  it("rejects a safety report that is missing a message", () => {
    const result = parsePublicForm("safety_reports", {
      name: "Ada",
      email: "ada@example.com",
      phone: "",
      message: "",
    });
    expect(result.ok).toBe(false);
  });
});

describe("canonical host", () => {
  it("redirects apex and http requests to https://www.bgwyp.org", () => {
    const apex = redirectToCanonical(new Request("https://bgwyp.org/faq?q=1"));
    expect(apex?.status).toBe(301);
    expect(apex?.headers.get("Location")).toBe("https://www.bgwyp.org/faq?q=1");

    const insecure = redirectToCanonical(
      new Request("http://www.bgwyp.org/safety", { headers: { "x-forwarded-proto": "http" } }),
    );
    expect(insecure?.headers.get("Location")).toBe("https://www.bgwyp.org/safety");

    expect(redirectToCanonical(new Request("https://www.bgwyp.org/about"))).toBeNull();
    expect(redirectToCanonical(new Request("http://localhost:8080/"))).toBeNull();
  });

  it("sets the security headers, and HSTS only on bgwyp.org", () => {
    const live = applySecurityHeaders(new Response("ok"), new Request("https://www.bgwyp.org/"));
    expect(live.headers.get("Strict-Transport-Security")).toBe(
      "max-age=31536000; includeSubDomains",
    );
    expect(live.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(live.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(live.headers.get("Permissions-Policy")).toContain("camera=()");
    expect(live.headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
    expect(live.headers.get("Content-Security-Policy")).not.toContain("fonts.googleapis.com");

    const local = applySecurityHeaders(new Response("ok"), new Request("http://localhost:8080/"));
    expect(local.headers.get("Strict-Transport-Security")).toBeNull();
  });
});
