import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { releases } from "@/content/releases";
import { site } from "@/content/site";
import { pastRoles } from "@/content/timeline";
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
    const columns: Column[] = ["shipped", "now", "next"];
    for (const column of columns) {
      expect(projects.some((p) => p.column === column)).toBe(true);
    }
  });

  it("timeline spans end on or after they start", () => {
    const index = (t: { year: number; quarter: number }) => t.year * 4 + t.quarter;
    const spans = [...projects.map((p) => p.timeline), ...pastRoles.map((r) => r.timeline)];
    for (const t of spans) {
      if (t) expect(index(t.start)).toBeLessThanOrEqual(index(t.end));
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

  it("site metadata and copy say tickets, not specs", () => {
    // layout.tsx loads next/font, which does not run under Vitest, so read its source.
    const layout = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    const description = layout.match(/description:\s*"([^"]+)"/s)?.[1] ?? "";
    expect(description).toMatch(/tickets/);
    expect(JSON.stringify([site, projects, description])).not.toMatch(/\bspecs?\b|specced/i);
  });

  it("Coverage-nav is not on the site anywhere", () => {
    expect(JSON.stringify([projects, releases])).not.toMatch(/coverage/i);
  });

  it("copy never claims coding at work", () => {
    const now = projects.filter((p) => p.column === "now");
    const copy = JSON.stringify([site, now]);
    expect(copy).not.toMatch(/ship(ped)? (the )?(fix|code) at work/i);
  });
});
