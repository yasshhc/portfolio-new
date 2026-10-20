import CommandLabel from "@/components/CommandLabel";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { pastRoles } from "@/content/timeline";
import type { TimelineSpan, YearQuarter } from "@/content/types";

interface Bar {
  slug: string;
  title: string;
  timeline: TimelineSpan;
  className: string;
}

const index = ({ year, quarter }: YearQuarter) => year * 4 + (quarter - 1);

function bars(): Bar[] {
  const fromProjects = projects.flatMap((p) => {
    if (!p.timeline) return [];
    let className = "bg-lime text-ink";
    if (p.column === "now") className = "bg-ink text-bg";
    else if (p.column === "paused") className = "bg-[#FFEDD5] text-[#7C2D12]";
    else if (p.status === "live") className = "bg-green text-white";
    return [{ slug: p.slug, title: p.title, timeline: p.timeline, className }];
  });
  const fromRoles = pastRoles.map((r) => ({ ...r, className: "bg-tile-alt text-ink" }));
  return [...fromRoles, ...fromProjects].sort(
    (a, b) =>
      index(a.timeline.start) - index(b.timeline.start) ||
      index(b.timeline.end) - index(a.timeline.end),
  );
}

export default function Timeline() {
  const rows = bars();
  const first = Math.min(...rows.map((r) => index(r.timeline.start)));
  const last = Math.max(...rows.map((r) => index(r.timeline.end)));
  const quarters = Array.from({ length: last - first + 1 }, (_, i) => {
    const n = first + i;
    return `Q${(n % 4) + 1} '${String(Math.floor(n / 4) % 100).padStart(2, "0")}`;
  });

  return (
    <section id="timeline" aria-labelledby="tl-h" className="pt-20">
      <CommandLabel>{`roadmap --view timeline --since ${Math.floor(first / 4)}`}</CommandLabel>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="tl-h" className="font-heading text-[34px] font-bold tracking-tight">
          Timeline
        </h2>
        <span className="font-mono text-xs text-muted">{site.timelineNote}</span>
      </div>
      <div className="overflow-x-auto rounded-[18px] bg-tile">
        <div
          data-testid="timeline-grid"
          style={{ gridTemplateColumns: `160px repeat(${quarters.length}, minmax(72px, 1fr))` }}
          className="grid min-w-[1000px] gap-y-3 p-6"
        >
          <span aria-hidden="true" />
          {quarters.map((q) => (
            <span
              key={q}
              data-testid="timeline-quarter"
              className="whitespace-nowrap px-2 font-mono text-xs text-muted"
            >
              {q}
            </span>
          ))}
          {rows.map((r) => (
            <div key={r.slug} className="contents">
              <span className="col-start-1 flex items-center pr-3 text-sm font-semibold">
                {r.title}
              </span>
              <span
                data-testid={`bar-${r.slug}`}
                style={{
                  gridColumn: `${index(r.timeline.start) - first + 2} / ${index(r.timeline.end) - first + 3}`,
                }}
                className={`mx-1 truncate rounded-lg px-2 py-2.5 font-mono text-xs font-medium ${r.className}`}
              >
                {r.timeline.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
