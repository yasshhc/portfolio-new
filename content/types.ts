export type Column = "shipped" | "now" | "next";

export type Quarter = 1 | 2 | 3 | 4;

export interface YearQuarter {
  year: number;
  quarter: Quarter;
}

export interface TimelineSpan {
  start: YearQuarter;
  end: YearQuarter;
  label: string;
}

// A role or project shown on the timeline but not on the roadmap board.
export interface TimelineEntry {
  slug: string;
  title: string;
  timeline: TimelineSpan;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: string;
  column: Column;
  stack: string;
  links: { live?: string; github?: string };
  timeline?: TimelineSpan;
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
