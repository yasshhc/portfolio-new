import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Column } from "@/content/types";

describe("content model", () => {
  it("slugs are unique and kebab-case", () => {
    const slugs = projects.map((p) => p.slug);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("case-study projects are exactly the three in the spec", () => {
    const slugs = projects.filter((p) => p.hasCaseStudy).map((p) => p.slug).sort();
    expect(slugs).toEqual(["bill-splitter", "crs-calculator", "csm-assistant"]);
  });

  it("every column has at least one card", () => {
    const columns: Column[] = ["shipped", "paused", "now", "next"];
    for (const column of columns) {
      expect(projects.some((p) => p.column === column)).toBe(true);
    }
  });

  it("timeline quarters are in order", () => {
    for (const p of projects) {
      if (p.timeline) expect(p.timeline.start).toBeLessThanOrEqual(p.timeline.end);
    }
  });

  it("links are absolute https or mailto", () => {
    const links = [
      ...projects.flatMap((p) => Object.values(p.links)),
      site.email,
      site.linkedin,
      site.github,
    ];
    for (const link of links) expect(link).toMatch(/^(https:\/\/|mailto:)/);
  });

  it("copy never claims coding at work", () => {
    const now = projects.filter((p) => p.column === "now");
    const copy = JSON.stringify([site, now]);
    expect(copy).not.toMatch(/ship(ped)? (the )?(fix|code) at work/i);
  });
});
