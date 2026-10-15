import { describe, expect, test } from "bun:test";
import { findAddon } from "@/lib/packages";

describe("findAddon", () => {
  test("finds an addon regardless of which phase it lives in", () => {
    expect(findAddon("branding-identity")?.id).toBe("branding-identity");
    expect(findAddon("video-production")?.id).toBe("video-production");
    expect(findAddon("mgmt-pure-meta")?.id).toBe("mgmt-pure-meta");
  });

  test("returns undefined for an unknown id", () => {
    expect(findAddon("__does-not-exist__")).toBeUndefined();
  });
});
