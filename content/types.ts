export type Column = "shipped" | "paused" | "now" | "next";

export type Quarter = 1 | 2 | 3 | 4;

export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: string;
  column: Column;
  stack: string;
  links: { live?: string; github?: string };
  timeline?: { start: Quarter; end: Quarter; label: string };
  hasCaseStudy: boolean;
}

export interface Release {
  version: string;
  message: string;
}

export interface SpecEntry {
  problem: string;
  spec: string;
  shipped: string;
}

export interface SiteInfo {
  name: string;
  headline: string;
  intro: string;
  status: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
  year: number;
  timelineNote: string;
  specTotals: { written: string; shipped: string; accounts: string };
}
