import CommandLabel from "@/components/CommandLabel";
import { projects } from "@/content/projects";
import type { Column, Project } from "@/content/types";
import { listCaseStudySlugs } from "@/lib/caseStudies";

const columns: { name: Column; dot: string }[] = [
  { name: "shipped", dot: "bg-green" },
  { name: "now", dot: "bg-ink" },
  { name: "next", dot: "bg-[#65A30D]" },
];

function hrefFor(project: Project, caseStudies: string[]): string | undefined {
  if (caseStudies.includes(project.slug)) return `/work/${project.slug}`;
  if (project.column === "next") return "#contact";
  return project.links.live ?? project.links.github;
}

function Card({ project, href }: { project: Project; href?: string }) {
  const dark = project.column === "next";
  const className = `flex flex-col gap-2 rounded-[14px] p-[18px] no-underline ${
    dark ? "bg-ink text-bg" : "bg-tile text-ink"
  }`;
  const content = (
    <>
      <span className="font-heading text-lg font-bold leading-tight">{project.title}</span>
      <span className={`text-sm leading-normal ${dark ? "text-[#C9D5CF]" : "text-muted"}`}>
        {project.summary}
      </span>
      <span className="self-start rounded-md bg-lime px-2 py-[3px] font-mono text-[11px] text-ink">
        {project.status}
      </span>
    </>
  );
  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

export default function RoadmapBoard() {
  const caseStudies = listCaseStudySlugs();
  return (
    <section id="board" aria-labelledby="board-h" className="pt-20">
      <CommandLabel>roadmap --view board</CommandLabel>
      <h2 id="board-h" className="mb-6 font-heading text-[34px] font-bold tracking-tight">
        Roadmap
      </h2>
      <div className="flex flex-wrap items-start gap-4">
        {columns.map(({ name, dot }) => {
          const items = projects.filter((p) => p.column === name);
          return (
            <div
              key={name}
              className="flex flex-[1_1_240px] flex-col gap-2.5 rounded-[18px] bg-tile-alt p-3"
            >
              <div className="flex items-center justify-between px-2 py-1.5 font-mono text-[13px]">
                <div className="flex items-center gap-2 font-bold">
                  <span aria-hidden="true" className={`size-2.5 rounded-full ${dot}`} />
                  <h3>{name}</h3>
                </div>
                <span className="text-muted">{items.length}</span>
              </div>
              {items.map((p) => (
                <Card key={p.slug} project={p} href={hrefFor(p, caseStudies)} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
