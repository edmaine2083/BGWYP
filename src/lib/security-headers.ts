const CANONICAL_HOST = "www.bgwyp.org";

function requestHost(request: Request) {
  const url = new URL(request.url);
  const forwarded = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  return (forwarded || url.host).split(":")[0].toLowerCase();
}

function requestProto(request: Request) {
  const url = new URL(request.url);
  const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  return (forwarded || url.protocol.replace(":", "")).toLowerCase();
}

/** 301 http and non-www bgwyp.org requests to https://www.bgwyp.org. Local hosts are left alone. */
export function redirectToCanonical(request: Request): Response | null {
  const host = requestHost(request);
  if (host !== "bgwyp.org" && host !== "www.bgwyp.org") return null;
  const proto = requestProto(request);
  if (proto === "https" && host === CANONICAL_HOST) return null;
  const url = new URL(request.url);
  const destination = new URL(`${url.pathname}${url.search}`, `https://${CANONICAL_HOST}`);
  return new Response(null, {
    status: 301,
    headers: { Location: destination.toString() },
  });
}

function supabaseOrigin() {
  const raw = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  try {
    return new URL(raw).origin;
  } catch {
    return "";
  }
}

export function contentSecurityPolicy(request: Request) {
  const supabase = supabaseOrigin();
  const connect = [
    "'self'",
    "https://api.web3forms.com",
    "https://hcaptcha.com",
    "https://*.hcaptcha.com",
    "https://form.jotform.com",
    "https://*.jotform.com",
    supabase,
  ].filter(Boolean);
  const upgrade = requestHost(request).endsWith("bgwyp.org") ? "upgrade-insecure-requests;" : "";
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "script-src 'self' 'unsafe-inline' https://js.hcaptcha.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src ${connect.join(" ")}`,
    "frame-src https://hcaptcha.com https://*.hcaptcha.com https://newassets.hcaptcha.com https://form.jotform.com https://*.jotform.com",
    "form-action 'self' https://api.web3forms.com",
    upgrade,
  ]
    .filter(Boolean)
    .join("; ");
}

export function applySecurityHeaders(response: Response, request: Request) {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", contentSecurityPolicy(request));
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-Frame-Options", "DENY");
  if (requestHost(request).endsWith("bgwyp.org")) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
