import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getCaseStudy } from "@/lib/caseStudies";
import CaseStudyPage, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "@/app/work/[slug]/page";

async function renderStudy(slug: string) {
  render(await CaseStudyPage({ params: Promise.resolve({ slug }) }));
}

describe("case-study page", () => {
  it("pre-renders exactly the three case studies and nothing else", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "crs-calculator" },
      { slug: "bill-splitter" },
      { slug: "csm-assistant" },
    ]);
    expect(dynamicParams).toBe(false);
  });

  it("sets the page title", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "crs-calculator" }) });
    expect(meta.title).toBe("CRS Calculator | Yash Channe");
  });

  it("uses each case study's TL;DR as its meta description", async () => {
    for (const slug of ["crs-calculator", "bill-splitter", "csm-assistant"]) {
      const meta = await generateMetadata({ params: Promise.resolve({ slug }) });
      expect(meta.description).toBe(getCaseStudy(slug)!.tldr);
    }
  });

  it("renders the header, TL;DR, decision-log table and navigation", async () => {
    await renderStudy("crs-calculator");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("CRS Calculator");
    expect(screen.getByText("TL;DR")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Decision log" })).toBeInTheDocument();
    expect(screen.getByRole("table").closest(".overflow-x-auto")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Back to the roadmap" })).toHaveAttribute(
      "href",
      "/#board",
    );
    expect(screen.getByRole("link", { name: /^Next/ })).toHaveAttribute(
      "href",
      "/work/bill-splitter",
    );
    expect(screen.queryByRole("link", { name: /^Previous/ })).toBeNull();
  });

  it("links to the live site from the header", async () => {
    await renderStudy("crs-calculator");
    expect(screen.getByRole("link", { name: /Live site/ })).toHaveAttribute(
      "href",
      "https://crscal.yashchanne.com",
    );
  });

  it("has no Next link on the last case study", async () => {
    await renderStudy("csm-assistant");
    expect(screen.queryByRole("link", { name: /^Next/ })).toBeNull();
    const footer = within(screen.getByRole("contentinfo"));
    expect(footer.getByRole("link", { name: /^Previous/ })).toHaveAttribute(
      "href",
      "/work/bill-splitter",
    );
  });
});

describe("case-study markup", () => {
  it("does not leak react-markdown's node prop into the DOM", async () => {
    const { container } = render(
      await CaseStudyPage({ params: Promise.resolve({ slug: "crs-calculator" }) }),
    );
    expect(container.querySelectorAll("[node]")).toHaveLength(0);
  });
});
