import CommandLabel from "@/components/CommandLabel";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Project } from "@/content/types";

const quarters = ["Q1", "Q2", "Q3", "Q4"];

function barClass(p: Project): string {
  if (p.column === "now") return "bg-ink text-bg";
  if (p.column === "paused") return "bg-[#FFEDD5] text-[#7C2D12]";
  if (p.status === "live") return "bg-green text-white";
  return "bg-lime text-ink";
}

export default function Timeline() {
  const bars = projects
    .filter((p): p is Project & Required<Pick<Project, "timeline">> => Boolean(p.timeline))
    .sort((a, b) => a.timeline.start - b.timeline.start || b.timeline.end - a.timeline.end);
  return (
    <section id="timeline" aria-labelledby="tl-h" className="pt-20">
      <CommandLabel>roadmap --view timeline --year 2026</CommandLabel>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="tl-h" className="font-heading text-[34px] font-bold tracking-tight">
          Timeline
        </h2>
        <span className="font-mono text-xs text-muted">{site.timelineNote}</span>
      </div>
      <div className="overflow-x-auto rounded-[18px] bg-tile">
        <div
          data-testid="timeline-grid"
          className="grid min-w-[760px] grid-cols-[180px_repeat(4,minmax(0,1fr))] gap-y-3 p-6"
        >
          <span aria-hidden="true" />
          {quarters.map((q) => (
            <span key={q} className="px-2 font-mono text-xs text-muted">
              {q}
            </span>
          ))}
          {bars.map((p) => (
            <div key={p.slug} className="contents">
              <span className="col-start-1 flex items-center text-sm font-semibold">
                {p.title}
              </span>
              <span
                style={{ gridColumn: `${p.timeline.start + 1} / ${p.timeline.end + 2}` }}
                className={`mx-1 rounded-lg px-3 py-2.5 font-mono text-xs font-medium ${barClass(p)}`}
              >
                {p.timeline.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
