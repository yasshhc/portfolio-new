import type { SpecEntry } from "./types";

// Each row: the customer problem, what Yash's ticket asked for (the PM scoped it and the
// product team built it), and the quarter it shipped. Anonymised: no client names,
// ticket IDs or internal details.
export const specs: SpecEntry[] = [
  {
    problem:
      "Clients loading years of repair history often logged a repair with the wrong date, and there was no way to correct it, so pavement condition (PCI) history came out wrong.",
    spec: "A way to change a repair date after it is logged, with how I expected it to behave and edge-case test scenarios.",
    shipped: "Q2 2026",
  },
  {
    problem:
      "The new AI search matched street names letter for letter, so “main st” missed “Main St” and quietly returned incomplete answers.",
    spec: "Found while testing the AI search with 19 plain-English queries; reported it and suggested case-insensitive matching.",
    shipped: "Q2 2026",
  },
  {
    problem:
      "One contractor invoice often covers work on several street segments, and there was no way to split that cost across them.",
    spec: "A way to log one project cost and split it across the segments, with a suggested way to allocate it.",
    shipped: "Q3 2026",
  },
  {
    problem:
      "On the mobile app, typing an address forced a jump to the map, and the auto-placed pin often landed in the wrong spot, adding a correction step to every field work order.",
    spec: "Reported the gap between mobile and desktop address entry.",
    shipped: "Q2 2026",
  },
  {
    problem: "Selecting an area with the lasso tool didn’t update the summary metrics.",
    spec: "Asked for lasso selections to update the metrics too.",
    shipped: "Q3 2026",
  },
  {
    problem: "The radius filter picked up work orders outside the chosen range.",
    spec: "Reported it, found during proximity testing.",
    shipped: "Q2 2026",
  },
];
