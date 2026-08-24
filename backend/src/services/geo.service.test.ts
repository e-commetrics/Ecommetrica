import { describe, expect, test } from "bun:test";
import { resolveRegion } from "./geo.service";

describe("resolveRegion", () => {
  test("resolves a known Mexican IP to mx", () => {
    expect(resolveRegion("187.190.138.215")).toBe("mx");
  });

  test("resolves a known US IP to us", () => {
    expect(resolveRegion("8.8.8.8")).toBe("us");
  });

  test("falls back to mx for a local/unresolvable IP", () => {
    expect(resolveRegion("127.0.0.1")).toBe("mx");
  });
});
