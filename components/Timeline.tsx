import CommandLabel from "@/components/CommandLabel";
import TimelineScroller from "@/components/TimelineScroller";
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

// Row names stay pinned on the left; four quarters fill the rest of the visible width
// (never narrower than 72px), and anything earlier sits off to the left. The column
// formula is the .timeline-grid rule in globals.css.
const NAME_WIDTH = "140px";
const VISIBLE_QUARTERS = 4;

function bars(): Bar[] {
  const fromProjects = projects.flatMap((p) => {
    if (!p.timeline) return [];
    let className = "bg-lime text-ink";
    if (p.column === "now") className = "bg-ink text-bg";
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
        <span className="font-mono text-xs text-muted">
          {site.timelineNote} <span aria-hidden="true">← scroll for earlier</span>
        </span>
      </div>
      <TimelineScroller>
        <div
          data-testid="timeline-grid"
          style={
            {
              "--name-width": NAME_WIDTH,
              "--quarters": quarters.length,
              "--visible-quarters": VISIBLE_QUARTERS,
            } as React.CSSProperties
          }
          className="timeline-grid grid w-max gap-y-3 py-6 pr-6"
        >
          <span aria-hidden="true" className="sticky left-0 z-10 bg-tile" />
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
              <span className="sticky left-0 z-10 col-start-1 flex items-center bg-tile pl-6 pr-3 text-sm font-semibold">
                {r.title}
              </span>
              <span
                data-testid={`bar-${r.slug}`}
                style={{
                  gridColumn: `${index(r.timeline.start) - first + 2} / ${index(r.timeline.end) - first + 3}`,
                }}
                className={`mx-1 overflow-clip rounded-lg px-2 py-2.5 font-mono text-xs font-medium ${r.className}`}
              >
                {/* Sticks just right of the pinned names, so a bar that starts off-screen
                    still shows its label. overflow-clip (not hidden) keeps sticky working. */}
                <span className="sticky left-[calc(var(--name-width)+0.5rem)] block w-max max-w-[calc(100cqw-var(--name-width)-2.5rem)]">
                  {r.timeline.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </TimelineScroller>
    </section>
  );
}
