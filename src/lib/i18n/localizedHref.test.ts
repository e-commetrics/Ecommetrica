import { describe, expect, test } from "bun:test";
import { localizedHref, swapLangInPath, withTrailingSlash } from "@/lib/i18n/localizedHref";

describe("localizedHref", () => {
  test("es paths pass through unchanged", () => {
    expect(localizedHref("es", "/work")).toBe("/work");
    expect(localizedHref("es", "/")).toBe("/");
  });

  test("en paths get an /en prefix", () => {
    expect(localizedHref("en", "/work")).toBe("/en/work");
    expect(localizedHref("en", "/")).toBe("/en");
  });
});

describe("swapLangInPath", () => {
  test("es -> en adds the prefix", () => {
    expect(swapLangInPath("/work", "en")).toBe("/en/work");
    expect(swapLangInPath("/", "en")).toBe("/en");
  });

  test("en -> es strips the prefix", () => {
    expect(swapLangInPath("/en/work", "es")).toBe("/work");
    expect(swapLangInPath("/en", "es")).toBe("/");
  });

  test("swapping to the language already active is a no-op", () => {
    expect(swapLangInPath("/work", "es")).toBe("/work");
    expect(swapLangInPath("/en/work", "en")).toBe("/en/work");
  });
});

describe("withTrailingSlash", () => {
  test("appends a trailing slash", () => {
    expect(withTrailingSlash("/work")).toBe("/work/");
  });

  test("leaves the root path alone", () => {
    expect(withTrailingSlash("/")).toBe("/");
  });
});
