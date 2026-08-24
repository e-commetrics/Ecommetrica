import { describe, expect, test } from "bun:test";
import { findAddon } from "@/lib/packages";

describe("findAddon", () => {
  test("finds an addon regardless of which phase it lives in", () => {
    expect(findAddon("coding")?.id).toBe("coding");
    expect(findAddon("video-production")?.id).toBe("video-production");
    expect(findAddon("mgmt-only-meta")?.id).toBe("mgmt-only-meta");
  });

  test("returns undefined for an unknown id", () => {
    expect(findAddon("__does-not-exist__")).toBeUndefined();
  });
});
