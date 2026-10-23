import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Timeline from "@/components/Timeline";

describe("timeline", () => {
  beforeEach(() => {
    render(<Timeline />);
  });

  it("spans every quarter from the earliest start (Q2 2024) to the latest end (Q4 2026)", () => {
    const quarters = screen.getAllByTestId("timeline-quarter").map((q) => q.textContent);
    expect(quarters).toHaveLength(11);
    expect(quarters[0]).toBe("Q2 '24");
    expect(quarters[3]).toBe("Q1 '25");
    expect(quarters[10]).toBe("Q4 '26");
  });

  it("says where it starts in the command label", () => {
    expect(screen.getByText("$ roadmap --view timeline --since 2024")).toBeInTheDocument();
  });

  it("shows the Project Coordinator role from Q2 2024 to Q3 2025", () => {
    expect(screen.getByText("Project Coordinator")).toBeInTheDocument();
    expect(screen.getByTestId("bar-project-coordinator").style.gridColumn).toBe("2 / 8");
  });

  it("starts the Customer Success Manager bar in Q3 2025 and runs to Q4 2026", () => {
    expect(screen.getByTestId("bar-customer-success-manager").style.gridColumn).toBe("7 / 13");
  });

  it("shows Bill Splitter as live in Q1 2026", () => {
    const bar = screen.getByTestId("bar-bill-splitter");
    expect(bar.style.gridColumn).toBe("9 / 10");
    expect(bar).toHaveTextContent("live");
  });

  it("does not show Coverage-nav", () => {
    expect(screen.queryByText("Coverage-nav")).toBeNull();
  });

  it("shows Reddit Pain-Point Miner in Q1 2026", () => {
    expect(screen.getByTestId("bar-reddit-pain-point-miner").style.gridColumn).toBe("9 / 10");
  });

  it("places a single-quarter project in its own column", () => {
    expect(screen.getByTestId("bar-crs-calculator").style.gridColumn).toBe("12 / 13");
  });

  it("lists rows in start order, earliest first", () => {
    const rows = screen.getAllByTestId(/^bar-/).map((b) => b.dataset.testid);
    expect(rows.slice(0, 2)).toEqual(["bar-project-coordinator", "bar-customer-success-manager"]);
  });
});

describe("timeline scrolling", () => {
  const original = {
    scrollLeft: Object.getOwnPropertyDescriptor(Element.prototype, "scrollLeft"),
    scrollWidth: Object.getOwnPropertyDescriptor(Element.prototype, "scrollWidth"),
  };

  afterEach(() => {
    Object.defineProperty(Element.prototype, "scrollLeft", original.scrollLeft!);
    Object.defineProperty(Element.prototype, "scrollWidth", original.scrollWidth!);
  });

  it("opens scrolled to the latest quarters", () => {
    const setScrollLeft = vi.fn();
    Object.defineProperty(Element.prototype, "scrollWidth", { configurable: true, get: () => 2000 });
    Object.defineProperty(Element.prototype, "scrollLeft", {
      configurable: true,
      get: () => 0,
      set: setScrollLeft,
    });
    render(<Timeline />);
    expect(setScrollLeft).toHaveBeenCalledWith(2000);
  });

  it("is a labelled, keyboard-scrollable region", () => {
    render(<Timeline />);
    const scroller = screen.getByRole("region", { name: /scroll left for earlier quarters/i });
    expect(scroller).toHaveAttribute("tabindex", "0");
    expect(scroller).toContainElement(screen.getByTestId("timeline-grid"));
  });

  it("sizes quarter columns so four fill the visible width", () => {
    render(<Timeline />);
    const grid = screen.getByTestId("timeline-grid");
    expect(grid).toHaveClass("timeline-grid");
    expect(grid.style.getPropertyValue("--visible-quarters")).toBe("4");
    expect(grid.style.getPropertyValue("--quarters")).toBe("11");
  });

  it("keeps the row names pinned while scrolling", () => {
    render(<Timeline />);
    expect(screen.getByText("Project Coordinator")).toHaveClass("sticky");
  });
});
