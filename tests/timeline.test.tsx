import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
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

  it("places a single-quarter project in its own column", () => {
    expect(screen.getByTestId("bar-crs-calculator").style.gridColumn).toBe("12 / 13");
  });

  it("lists rows in start order, earliest first", () => {
    const rows = screen.getAllByTestId(/^bar-/).map((b) => b.dataset.testid);
    expect(rows.slice(0, 2)).toEqual(["bar-project-coordinator", "bar-customer-success-manager"]);
  });
});
