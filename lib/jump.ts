import { projects } from "@/content/projects";
import { site } from "@/content/site";

export interface JumpItem {
  title: string;
  sub: string;
  kind: "case study" | "live" | "file" | "contact";
  href: string;
}

export function buildJumpItems(): JumpItem[] {
  const caseStudies: JumpItem[] = projects
    .filter((p) => p.hasCaseStudy)
    .map((p) => ({
      title: p.title,
      sub: `Case study · ${p.status}`,
      kind: "case study",
      href: `/work/${p.slug}`,
    }));
  const live: JumpItem[] = projects.flatMap((p) =>
    p.links.live
      ? [
          {
            title: p.title,
            sub: `Live product · ${new URL(p.links.live).host}`,
            kind: "live" as const,
            href: p.links.live,
          },
        ]
      : [],
  );
  return [
    ...caseStudies,
    ...live,
    { title: "Download resume", sub: "PDF", kind: "file", href: site.resume },
    {
      title: `Email ${site.name.split(" ")[0]}`,
      sub: site.email.replace("mailto:", ""),
      kind: "contact",
      href: site.email,
    },
  ];
}

export function filterJumpItems(items: JumpItem[], query: string): JumpItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((i) => `${i.title} ${i.sub}`.toLowerCase().includes(q));
}

export interface JumpGroup {
  label: string;
  items: { item: JumpItem; index: number }[];
}

const groupLabels: Record<JumpItem["kind"], string> = {
  "case study": "Case studies",
  live: "Live products",
  file: "Resume and contact",
  contact: "Resume and contact",
};

// `index` is the row's place in `results`, which is what the arrow keys move through.
export function groupJumpItems(results: JumpItem[], searching: boolean): JumpGroup[] {
  const groups: JumpGroup[] = [];
  results.forEach((item, index) => {
    const label = searching ? "Results" : groupLabels[item.kind];
    const group = groups.find((g) => g.label === label);
    if (group) group.items.push({ item, index });
    else groups.push({ label, items: [{ item, index }] });
  });
  return groups;
}
