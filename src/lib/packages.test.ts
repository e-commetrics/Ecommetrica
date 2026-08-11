import { describe, expect, test } from "bun:test";
import { findAddon } from "@/lib/packages";

describe("findAddon", () => {
  test("finds an addon regardless of which phase it lives in", () => {
    expect(findAddon("seo-pro")?.id).toBe("seo-pro");
    expect(findAddon("crm")?.id).toBe("crm");
    expect(findAddon("ux-ui")?.id).toBe("ux-ui");
  });

  test("returns undefined for an unknown id", () => {
    expect(findAddon("__does-not-exist__")).toBeUndefined();
  });
});
