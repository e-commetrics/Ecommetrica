import { describe, expect, test } from "bun:test";
import {
  caseStudies,
  categoryLabel,
  getCaseStudy,
  getFeaturedCaseStudies,
  getInternalCaseStudies,
  getProjectVideo,
  getTestimonialCaseStudies,
  hasTestimonial,
  type CaseStudy,
} from "@/lib/work";

const BASE: CaseStudy = {
  slug: "test-project",
  name: "Test Project",
  category: "Other",
  description: { es: "desc", en: "desc" },
  webpage: "https://example.com",
};

describe("categoryLabel", () => {
  test("returns the label in the requested language", () => {
    expect(categoryLabel("Medical", "es")).toBe("Médico");
    expect(categoryLabel("Medical", "en")).toBe("Medical");
  });
});

describe("getProjectVideo", () => {
  test("prefers the project's own video over the testimonial's", () => {
    const project: CaseStudy = {
      ...BASE,
      video: "/videos/own.mp4",
      testimonial: { video: "/videos/testimonial.mp4", author: "Someone" },
    };
    expect(getProjectVideo(project)).toBe("/videos/own.mp4");
  });

  test("falls back to the testimonial's video when there's no own video", () => {
    const project: CaseStudy = {
      ...BASE,
      testimonial: { video: "/videos/testimonial.mp4", author: "Someone" },
    };
    expect(getProjectVideo(project)).toBe("/videos/testimonial.mp4");
  });

  test("returns undefined when there's neither", () => {
    expect(getProjectVideo(BASE)).toBeUndefined();
  });
});

describe("hasTestimonial", () => {
  test("is true only when testimonial is set", () => {
    expect(hasTestimonial(BASE)).toBe(false);
    expect(hasTestimonial({ ...BASE, testimonial: { video: "/v.mp4", author: "A" } })).toBe(true);
  });
});

describe("caseStudies data helpers", () => {
  test("getCaseStudy finds by slug and returns undefined otherwise", () => {
    const first = caseStudies[0];
    expect(first).toBeDefined();
    expect(getCaseStudy(first!.slug)?.slug).toBe(first!.slug);
    expect(getCaseStudy("__does-not-exist__")).toBeUndefined();
  });

  test("getFeaturedCaseStudies only returns featured entries", () => {
    for (const project of getFeaturedCaseStudies()) {
      expect(project.featured).toBe(true);
    }
  });

  test("getInternalCaseStudies excludes external entries", () => {
    for (const project of getInternalCaseStudies()) {
      expect(project.external).not.toBe(true);
    }
  });

  test("getTestimonialCaseStudies only returns entries with a testimonial", () => {
    for (const project of getTestimonialCaseStudies()) {
      expect(project.testimonial).toBeDefined();
    }
  });
});
