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
  body: string;
}

export function listCaseStudySlugs(): string[] {
  return projects.filter((p) => p.hasCaseStudy).map((p) => p.slug);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const file = path.join(process.cwd(), "content/case-studies", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: data.title,
    status: data.status,
    role: data.role,
    stack: data.stack,
    links: data.links ?? {},
    tldr: data.tldr,
    body: content.trim(),
  };
}

export function getAdjacent(slug: string): { prev: string | null; next: string | null } {
  const slugs = listCaseStudySlugs();
  const i = slugs.indexOf(slug);
  return {
    prev: i > 0 ? slugs[i - 1] : null,
    next: i >= 0 && i < slugs.length - 1 ? slugs[i + 1] : null,
  };
}
