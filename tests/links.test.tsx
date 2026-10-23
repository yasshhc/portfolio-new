import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CaseStudyPage from "@/app/work/[slug]/page";
import Home from "@/app/page";
import { listCaseStudySlugs } from "@/lib/caseStudies";
import { buildJumpItems } from "@/lib/jump";

const sectionIds = ["top", "board", "specs", "timeline", "log", "contact"];
const slugs = listCaseStudySlugs();

function isResolvable(href: string): boolean {
  if (href === "/" || href === "/resume.pdf") return true;
  const work = href.match(/^\/work\/([^/#]+)$/);
  if (work) return slugs.includes(work[1]);
  const hash = href.match(/^\/?#(.+)$/);
  if (hash) return sectionIds.includes(hash[1]);
  return false;
}

function internalHrefs(container: HTMLElement): string[] {
  return [...container.querySelectorAll("a[href]")]
    .map((a) => a.getAttribute("href")!)
    .filter((h) => h.startsWith("/") || h.startsWith("#"));
}

describe("internal links", () => {
  it("every jump-menu target is reachable", () => {
    for (const item of buildJumpItems()) {
      if (item.href.startsWith("/")) expect(isResolvable(item.href), item.href).toBe(true);
    }
  });

  it("every internal link on the homepage resolves, and every section id exists", () => {
    const { container } = render(<Home />);
    for (const href of internalHrefs(container)) expect(isResolvable(href), href).toBe(true);
    for (const id of sectionIds) expect(container.querySelector(`#${id}`), id).not.toBeNull();
  });

  it("every internal link on every case-study page resolves", async () => {
    for (const slug of slugs) {
      const { container, unmount } = render(
        await CaseStudyPage({ params: Promise.resolve({ slug }) }),
      );
      for (const href of internalHrefs(container)) expect(isResolvable(href), href).toBe(true);
      unmount();
    }
  });
});
