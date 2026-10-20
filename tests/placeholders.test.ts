import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { findPlaceholders, scanPlaceholders } from "@/lib/placeholders";

describe("findPlaceholders", () => {
  it("finds a bracketed placeholder", () => {
    expect(findPlaceholders("a [your email] b")).toEqual(["[your email]"]);
  });

  it("ignores Markdown links", () => {
    expect(findPlaceholders("see [docs](https://x)")).toEqual([]);
  });

  it("ignores GFM checkboxes", () => {
    expect(findPlaceholders("- [ ] task\n- [x] done\n- [X] done")).toEqual([]);
  });

  it("finds every placeholder, including ones with punctuation", () => {
    expect(findPlaceholders("[N] accounts and [Q? 2026]")).toEqual(["[N]", "[Q? 2026]"]);
  });
});

describe("scanPlaceholders", () => {
  it("finds placeholders in both .ts and .md files and skips Markdown links", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "placeholders-"));
    fs.mkdirSync(path.join(dir, "case-studies"));
    fs.writeFileSync(path.join(dir, "site.ts"), 'export const a = "[ts hole]";\n');
    fs.writeFileSync(
      path.join(dir, "case-studies", "x.md"),
      "A [md hole] and a [link](https://x.test).\n",
    );
    const hits = scanPlaceholders(dir).map((h) => `${path.relative(dir, h.file)}: ${h.placeholder}`);
    expect(hits.sort()).toEqual(["case-studies/x.md: [md hole]", "site.ts: [ts hole]"]);
  });

  it("scans the real content folder, .ts and .md files only", () => {
    // Placeholder count reaches zero at launch, so check what is scanned, not how many hits.
    const root = path.join(process.cwd(), "content");
    for (const hit of scanPlaceholders(root)) {
      expect(hit.file.startsWith(root)).toBe(true);
      expect(hit.file).toMatch(/\.(ts|md)$/);
    }
  });
});
