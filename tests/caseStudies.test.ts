import { describe, expect, it } from "vitest";
import { getAdjacent, getCaseStudy, listCaseStudySlugs } from "@/lib/caseStudies";

describe("case studies", () => {
  it("loads every case-study slug with the required fields", () => {
    const slugs = listCaseStudySlugs();
    expect(slugs.length).toBe(3);
    for (const slug of slugs) {
      const study = getCaseStudy(slug);
      expect(study).not.toBeNull();
      expect(study!.title).not.toBe("");
      expect(study!.tldr).not.toBe("");
      expect(study!.body).not.toBe("");
    }
  });

  it("returns null for an unknown slug", () => {
    expect(getCaseStudy("nope")).toBeNull();
  });

  it("has no previous for the first slug and no next for the last", () => {
    const slugs = listCaseStudySlugs();
    expect(getAdjacent(slugs[0]).prev).toBeNull();
    expect(getAdjacent(slugs[slugs.length - 1]).next).toBeNull();
    expect(getAdjacent(slugs[0]).next).toBe(slugs[1]);
  });

  it("every body has the Problem and Decision log sections", () => {
    for (const slug of listCaseStudySlugs()) {
      const body = getCaseStudy(slug)!.body;
      expect(body).toContain("## Problem");
      expect(body).toContain("## Decision log");
    }
  });
});
