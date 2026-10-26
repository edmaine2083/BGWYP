import { describe, expect, it } from "vitest";
import { DONATIONS_ENABLED, SUPPORT_HREF } from "@/config";

describe("donate flag", () => {
  it("support buttons open the notify list while donations are off, /donate when on", () => {
    expect(SUPPORT_HREF).toBe(DONATIONS_ENABLED ? "/donate" : "/donate#notify");
  });
});
