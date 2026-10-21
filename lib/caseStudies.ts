import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projects } from "@/content/projects";

export interface CaseStudy {
  slug: string;
  title: string;
  status: string;
  role: string;
  stack: string;
  links: { live?: string; github?: string };
  tldr: string;
  screenshots: { src: string; caption: string }[];
  body: string;
}

export function listCaseStudySlugs(): string[] {
  return projects.filter((p) => p.hasCaseStudy).map((p) => p.slug);
}

const REQUIRED_FIELDS = ["title", "status", "role", "stack", "tldr"] as const;

export function parseCaseStudy(slug: string, raw: string): CaseStudy {
  const { data, content } = matter(raw);
  for (const field of REQUIRED_FIELDS) {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        `Case study "${slug}" (content/case-studies/${slug}.md) is missing the required front-matter field "${field}".`,
      );
    }
  }
  return {
    slug,
    title: data.title,
    status: data.status,
    role: data.role,
    stack: data.stack,
    links: data.links ?? {},
    tldr: data.tldr,
    screenshots: data.screenshots ?? [],
    body: content.trim(),
  };
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const file = path.join(process.cwd(), "content/case-studies", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return parseCaseStudy(slug, fs.readFileSync(file, "utf8"));
}

export function getAdjacent(slug: string): { prev: string | null; next: string | null } {
  const slugs = listCaseStudySlugs();
  const i = slugs.indexOf(slug);
  return {
    prev: i > 0 ? slugs[i - 1] : null,
    next: i >= 0 && i < slugs.length - 1 ? slugs[i + 1] : null,
  };
}
