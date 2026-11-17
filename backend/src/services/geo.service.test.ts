import { describe, expect, test } from "bun:test";
import { regionForCountry, resolveRegion } from "./geo.service";

describe("regionForCountry", () => {
  test("Mexico and Latin America get the Tijuana offer", () => {
    for (const country of ["MX", "GT", "CR", "DO", "CO", "BR", "AR", "CL", "PE"]) {
      expect(regionForCountry(country)).toBe("mx");
    }
  });

  test("every other country gets the San Diego offer", () => {
    for (const country of ["US", "CA", "ES", "GB", "DE", "JP"]) {
      expect(regionForCountry(country)).toBe("us");
    }
  });
});

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
