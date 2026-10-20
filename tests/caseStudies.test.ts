import { describe, expect, it } from "vitest";
import {
  getAdjacent,
  getCaseStudy,
  listCaseStudySlugs,
  parseCaseStudy,
} from "@/lib/caseStudies";

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

  it("loads real front-matter values, not just non-empty ones", () => {
    for (const slug of listCaseStudySlugs()) {
      const study = getCaseStudy(slug)!;
      for (const key of ["title", "status", "role", "stack", "tldr"] as const) {
        expect(typeof study[key]).toBe("string");
        expect(study[key].trim()).not.toBe("");
      }
    }
  });

  it("does not claim client data stays on the author's machine", () => {
    for (const slug of listCaseStudySlugs()) {
      const text = JSON.stringify(getCaseStudy(slug));
      expect(text).not.toMatch(/runs locally/i);
      expect(text).not.toMatch(/stays on my machine/i);
    }
  });
});

describe("CRS Calculator case study", () => {
  it("has no placeholders left and uses the launch-post facts", () => {
    const study = getCaseStudy("crs-calculator")!;
    const text = study.tldr + study.body;
    expect(text).not.toMatch(/\[[^\]]+\](?!\()/);
    expect(text).toContain("132 automated tests");
    expect(text).toMatch(/never leave your phone|never leave the phone/);
  });
});

describe("parseCaseStudy", () => {
  const valid = [
    "---",
    'title: "T"',
    'status: "live"',
    'role: "PM"',
    'stack: "Next.js"',
    'tldr: "Short."',
    "---",
    "",
    "## Problem",
    "",
  ].join("\n");

  it("parses a complete file", () => {
    expect(parseCaseStudy("demo", valid).title).toBe("T");
  });

  it.each(["title", "status", "role", "stack", "tldr"])(
    "throws a clear error naming the slug and the missing %s field",
    (field) => {
      const broken = valid
        .split("\n")
        .filter((line) => !line.startsWith(`${field}:`))
        .join("\n");
      expect(() => parseCaseStudy("demo", broken)).toThrow(
        new RegExp(`demo.*${field}|${field}.*demo`),
      );
    },
  );

  it("treats a blank field as missing", () => {
    const blank = valid.replace('tldr: "Short."', 'tldr: ""');
    expect(() => parseCaseStudy("demo", blank)).toThrow(/tldr/);
  });
});
