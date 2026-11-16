const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

export function cleanValue(value: unknown): unknown {
  if (typeof value === "string") return stripHtml(value);
  if (Array.isArray(value))
    return value.map((item) => (typeof item === "string" ? stripHtml(item) : item));
  return value;
}

/** Drop a column PostgREST says is missing so an unapplied migration does not reject the row. */
export function omitMissingColumn(row: Record<string, unknown>, message: string) {
  const missing = /Could not find the '([^']+)' column/.exec(message);
  const column = missing?.[1];
  if (!column || !Object.prototype.hasOwnProperty.call(row, column)) return null;
  const next = { ...row };
  delete next[column];
  return next;
}

/** Allows the request when this IP is under 5 submissions in 10 minutes. */
export function allowSubmission(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("cf-connecting-ip") || "unknown";
}
