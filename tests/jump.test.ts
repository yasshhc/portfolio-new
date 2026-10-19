import { describe, expect, it } from "vitest";
import { buildJumpItems, filterJumpItems } from "@/lib/jump";

const items = buildJumpItems();

describe("buildJumpItems", () => {
  it("covers case studies, live products, resume and email", () => {
    const hrefs = items.map((i) => i.href);
    expect(hrefs).toEqual(
      expect.arrayContaining([
        "/work/csm-assistant",
        "/work/crs-calculator",
        "/work/bill-splitter",
        "https://crscal.yashchanne.com",
        "https://billsplitter.yashchanne.com",
        "/resume.pdf",
      ]),
    );
    expect(items.filter((i) => i.kind === "contact")).toHaveLength(1);
    expect(items.filter((i) => i.kind === "file")).toHaveLength(1);
  });
});

describe("filterJumpItems", () => {
  it("returns everything for an empty or blank query", () => {
    expect(filterJumpItems(items, "")).toEqual(items);
    expect(filterJumpItems(items, "   ")).toEqual(items);
  });

  it("matches title or sub, case-insensitively", () => {
    const result = filterJumpItems(items, "crs");
    expect(result.length).toBeGreaterThan(0);
    for (const item of result) {
      expect(`${item.title} ${item.sub}`.toLowerCase()).toContain("crs");
    }
    expect(result.length).toBeLessThan(items.length);
  });

  it("trims the query", () => {
    const result = filterJumpItems(items, "  RESUME ");
    expect(result.map((i) => i.href)).toContain("/resume.pdf");
  });

  it("returns nothing when nothing matches", () => {
    expect(filterJumpItems(items, "zzz")).toEqual([]);
  });
});
