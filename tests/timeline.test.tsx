import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/content/site", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/content/site")>();
  return { site: { ...actual.site, year: 2031 } };
});

import Timeline from "@/components/Timeline";

describe("timeline", () => {
  it("takes the year in its command label from site.year", () => {
    render(<Timeline />);
    expect(screen.getByText("$ roadmap --view timeline --year 2031")).toBeInTheDocument();
  });
});
