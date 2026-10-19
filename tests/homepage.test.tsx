import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import { releases } from "@/content/releases";
import { site } from "@/content/site";

function region(name: string) {
  return within(screen.getByRole("region", { name }));
}

describe("homepage", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("has a single h1 and the four section headings", () => {
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const name of ["Roadmap", "Shipped from my tickets", "Timeline", "Release notes"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  it("shows the four roadmap columns", () => {
    const board = region("Roadmap");
    for (const name of ["shipped", "paused", "now", "next"]) {
      expect(board.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
  });

  it("links case-study cards to their pages and others elsewhere", () => {
    const board = region("Roadmap");
    expect(board.getByRole("link", { name: /CSM Assistant/ })).toHaveAttribute(
      "href",
      "/work/csm-assistant",
    );
    expect(board.getByRole("link", { name: /CRS Calculator/ })).toHaveAttribute(
      "href",
      "/work/crs-calculator",
    );
    const vitals = board.queryByRole("link", { name: /Vitals/ });
    if (vitals) expect(vitals.getAttribute("href")).not.toMatch(/^\/work\//);
    expect(board.getByRole("link", { name: /PM \/ APM role/ })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("keeps the specs table and timeline grid inside a scroll box", () => {
    expect(screen.getByRole("table").closest(".overflow-x-auto")).not.toBeNull();
    expect(screen.getByTestId("timeline-grid").closest(".overflow-x-auto")).not.toBeNull();
  });

  it("flags the timeline dates as unconfirmed", () => {
    expect(region("Timeline").getByText("[confirm dates]")).toBeInTheDocument();
  });

  it("renders every release, newest first", () => {
    const items = region("Release notes").getAllByRole("listitem");
    expect(items).toHaveLength(releases.length);
    expect(items[0].textContent?.startsWith("v5.1")).toBe(true);
  });

  it("ends with the contact footer and its links", () => {
    expect(
      screen.getByRole("heading", { name: "Next milestone: Product Manager at your company." }),
    ).toBeInTheDocument();
    const footer = within(screen.getByRole("contentinfo"));
    const hrefs = footer.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining([site.email, "/resume.pdf", site.github, site.linkedin]),
    );
  });

  it("lets the email button wrap so a long address cannot overflow the footer", () => {
    const footer = within(screen.getByRole("contentinfo"));
    const email = footer.getByRole("link", { name: site.email.replace("mailto:", "") });
    expect(email).toHaveClass("break-all");
    expect(email).toHaveClass("min-w-0");
  });

  it("never describes the work as writing specs, only tickets", () => {
    expect(document.body.textContent).not.toMatch(/\bspec/i);
  });

  it("labels the ticket column as what the ticket asked for", () => {
    const headers = screen.getAllByRole("columnheader").map((th) => th.textContent);
    expect(headers).toContain("WHAT MY TICKET ASKED FOR");
  });

  it("has nav links to every section", () => {
    const nav = within(screen.getByRole("navigation", { name: "Main" }));
    const hrefs = nav.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining(["#board", "#specs", "#timeline", "#log", "#contact"]),
    );
  });
});
