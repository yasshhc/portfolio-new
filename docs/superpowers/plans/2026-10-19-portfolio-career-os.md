# Portfolio "Career OS" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Lovable site in this repo with a static Next.js "Career OS" portfolio (homepage + 3 case studies) ready to deploy to a private Vercel preview.

**Architecture:** Next.js App Router with `output: "export"`, so every page is pre-rendered HTML. All copy lives in `content/` (TypeScript data files plus one Markdown file per case study); components only render it. The ⌘K jump menu is the one client component; its filtering logic is a pure function tested on its own.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, `gray-matter` + `react-markdown` + `remark-gfm`, Vitest 5 + Testing Library + jsdom. Node 22.

**Spec:** `docs/superpowers/specs/2026-10-19-portfolio-career-os-design.md`

## Global Constraints

- Only real content. Unknown facts are written as `[placeholder]` in square brackets, never invented.
- Never say Yash writes code at work. Work = customer calls → specs and tickets the product team ships. Side projects = built end to end.
- Ticket examples are anonymised: no client names, ticket IDs or internal details.
- Colours (Tailwind theme tokens): `bg #F1F4EF`, `ink #1B2421`, `muted #44514C`, `green #2F6B4F`, `lime #D9F99D`, `tile #FFFFFF`, `tile-alt #E4ECE6`, `paused #C2410C`.
- Fonts via `next/font/google`: Space Grotesk (headings, `--font-heading`), Work Sans (body, `--font-body`), JetBrains Mono (labels, `--font-mono`).
- Text contrast ≥ 4.5:1. Visible focus outline on every link, button and input. One `h1` per page. Real `<a>`/`<button>`/`<input>` with labels. Decorative SVG `aria-hidden="true"`.
- Works from 360px wide; timeline and tables scroll inside their own `overflow-x-auto` box, never the page.
- Out of scope: blog, dark mode, contact form, analytics, CMS.
- Fully static: no API routes, no server actions, no middleware.

## Review Focus

1. **Jump menu with no matches:** shows "No matches", and Enter does nothing (Task 5 test `shows empty state and ignores Enter`).
2. **⌘K / Ctrl+K while focus is in another field, or other shortcuts:** only the exact combo focuses the menu and calls `preventDefault`; Ctrl+Shift+K and plain "k" are ignored (Task 5 test `ignores other key combos`).
3. **Unknown case-study URL** (`/work/does-not-exist`): renders the 404 page, not an error (Task 6: `dynamicParams = false` + test that `generateStaticParams` returns exactly the three slugs).
4. **Phone width:** the timeline grid and specs table must not widen the page (Task 4 tests assert both sit inside an element with class `overflow-x-auto`).
5. **Placeholders slipping into launch:** the pre-launch check must find `[...]` in both `content/*.ts` and `content/case-studies/*.md`, but ignore Markdown links like `[text](url)` (Task 7 tests).

---

## File structure

```
app/
  layout.tsx            fonts, metadata, <body> shell
  globals.css           Tailwind import + @theme tokens
  page.tsx              homepage: composes sections
  not-found.tsx         404
  work/[slug]/page.tsx  case-study page
components/
  Nav.tsx  Hero.tsx  RoadmapBoard.tsx  ShippedSpecs.tsx
  Timeline.tsx  ReleaseNotes.tsx  ContactFooter.tsx
  CommandLabel.tsx      the "$ command" line above sections
  JumpMenu.tsx          client component
content/
  types.ts  site.ts  projects.ts  releases.ts  specs.ts
  case-studies/csm-assistant.md  crs-calculator.md  bill-splitter.md
lib/
  caseStudies.ts        read + parse Markdown
  jump.ts               jump items + filter (pure)
  placeholders.ts       find [placeholders] (pure)
scripts/check-placeholders.ts
public/resume.pdf       (added by Yash; until then the link points at a missing file, which is acceptable in preview)
tests/                  one test file per lib/component, named <unit>.test.ts(x)
```

---

### Task 1: Replace Lovable scaffold with a Next.js shell

**Files:**
- Delete: `src/`, `index.html`, `vite.config.ts`, `components.json`, `eslint.config.js`, `postcss.config.js`, `tailwind.config.ts`, `tsconfig*.json`, `bun.lockb`, `package-lock.json`, `public/placeholder.svg`, `.github/workflows/static.yml`
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/not-found.tsx`, `.gitignore` (add `.next/`, `out/`, `node_modules/`)
- Test: `tests/smoke.test.tsx`

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `test` (`vitest run`), `lint`, `typecheck` (`tsc --noEmit`), `check:placeholders` (added in Task 7). Tailwind utilities `bg-bg text-ink text-muted text-green bg-lime bg-tile bg-tile-alt text-paused`, `font-heading font-body font-mono`. Path alias `@/*` → repo root.

- [ ] **Step 1:** Delete the files listed above; keep `public/favicon.ico`, `public/robots.txt`, `docs/`, `README.md`.
- [ ] **Step 2:** Create `package.json` with dependencies `next@16`, `react@19`, `react-dom@19`, `gray-matter`, `react-markdown`, `remark-gfm`; dev deps `typescript`, `@types/react`, `@types/node`, `tailwindcss@4`, `@tailwindcss/postcss`, `eslint`, `eslint-config-next`, `vitest@5`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `tsx`. Run `npm install`.
- [ ] **Step 3:** `next.config.ts`: `{ output: "export", images: { unoptimized: true } }`. `vitest.config.ts`: jsdom environment, `@` alias, setup file importing `@testing-library/jest-dom/vitest`.
- [ ] **Step 4:** `app/globals.css`: `@import "tailwindcss";` plus `@theme` with the eight colour tokens and three font variables from Global Constraints. `app/layout.tsx`: load the three fonts with `variable` names, `<html lang="en">`, `<body className="bg-bg text-ink font-body">`, metadata title "Yash Channe | Customer Success → Product", description from spec section 1 story.
- [ ] **Step 5: Write the failing test** `tests/smoke.test.tsx`: render `app/page.tsx` default export; `expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("My career, managed like a product.")`.
- [ ] **Step 6:** Run `npm test`. Expected: FAIL (heading missing).
- [ ] **Step 7:** `app/page.tsx` renders `<main><h1>My career, managed like a product.</h1></main>`; `app/not-found.tsx` renders an `h1` "Page not found" and a link "Back to the roadmap" → `/`.
- [ ] **Step 8:** Run `npm test && npm run typecheck && npm run lint && npm run build`. Expected: all pass, `out/index.html` exists.
- [ ] **Step 9: Commit** `chore: replace Lovable scaffold with Next.js shell`.

---

### Task 2: Content model and data

**Files:**
- Create: `content/types.ts`, `content/site.ts`, `content/projects.ts`, `content/releases.ts`, `content/specs.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces (in `content/types.ts`):
  - `type Column = "shipped" | "paused" | "now" | "next"`
  - `type Quarter = 1 | 2 | 3 | 4`
  - `interface Project { slug: string; title: string; summary: string; status: string; column: Column; stack: string; links: { live?: string; github?: string }; timeline?: { start: Quarter; end: Quarter; label: string }; hasCaseStudy: boolean }`
  - `interface Release { version: string; message: string }`
  - `interface SpecEntry { problem: string; spec: string; shipped: string }`
  - `interface SiteInfo { name: string; headline: string; intro: string; status: string; email: string; linkedin: string; github: string; resume: string; year: number; specTotals: { written: string; shipped: string; accounts: string } }`
- Exports: `site: SiteInfo`, `projects: Project[]`, `releases: Release[]`, `specs: SpecEntry[]`.

- [ ] **Step 1: Write the failing tests** in `tests/content.test.ts`:
  - `slugs are unique and kebab-case` — every `slug` matches `/^[a-z0-9]+(-[a-z0-9]+)*$/`, no duplicates.
  - `case-study projects are exactly the three in the spec` — slugs with `hasCaseStudy` equal `["bill-splitter","crs-calculator","csm-assistant"]` (sorted).
  - `every column has at least one card` — each of `shipped, paused, now, next` appears.
  - `timeline quarters are in order` — for each `timeline`, `start <= end`.
  - `links are absolute https or mailto` — every link value and `site.email/linkedin/github` starts with `https://` or `mailto:`.
  - `copy never claims coding at work` — no string in `site` or the `now`-column project matches `/ship(ped)? (the )?(fix|code) at work/i`.
- [ ] **Step 2:** Run `npm test tests/content.test.ts`. Expected: FAIL (modules missing).
- [ ] **Step 3:** Write the data. Exact values:
  - `site.headline`: "My career, managed like a product."
  - `site.intro`: "Customer Success Manager for municipal software. At work, I turn customer calls into specs and tickets that the product team ships. On the side, I build and ship my own products. Next milestone: a Product Manager or APM role."
  - `site.status`: "open to PM / APM roles"; `site.year`: 2026; `site.email`: "mailto:[your email]"; `site.linkedin`: "https://linkedin.com/in/[handle]"; `site.github`: "https://github.com/yasshhc"; `site.resume`: "/resume.pdf"; `specTotals` all "[N]".
  - Projects (column / status / links): CRS Calculator (shipped / "live" / live `https://crscal.yashchanne.com`, case study); Bill Splitter (shipped / "live" / live `https://billsplitter.yashchanne.com`, case study, summary "[What Bill Splitter does, in one line]"); CSM Assistant (shipped / "in daily use" / case study); Reddit Pain-Point Miner (shipped / "discovery tool"); Vitals (shipped / "personal"); Coverage-nav (paused / "paused on purpose"); Customer Success Manager (now / "day job", summary "Customer calls in, specs and tickets out. [N] client accounts."); PM / APM role (next / "your team?", summary "Where customer insight drives the roadmap."). Summaries for the others come from mockup #11 (`docs/redesign/mockups/CareerOS.dc.html`). GitHub links only for repos Yash confirms are public; otherwise omit.
  - Timeline (`start`–`end`, `label`): Customer Success Manager 1–4 "CSM, municipal SaaS (ongoing)"; CSM Assistant 1–1 "built"; Reddit Pain-Point Miner 2–2 "built"; Vitals 3–3 "built"; Coverage-nav 3–3 "paused"; CRS Calculator 4–4 "shipped live". Bill Splitter has no `timeline` until Yash confirms its date. The section shows "[confirm dates]" (Task 4).
  - `releases`: the six `v1.0`–`v5.0` entries from mockup #11, plus `v5.1 ship: Bill Splitter live at billsplitter.yashchanne.com` (newest first).
  - `specs`: four entries with `[placeholder]` text from mockup #11 until Yash's ticket export arrives.
- [ ] **Step 4:** Run tests. Expected: PASS.
- [ ] **Step 5: Commit** `feat: add portfolio content model and data`.

---

### Task 3: Case-study loader and Markdown files

**Files:**
- Create: `lib/caseStudies.ts`, `content/case-studies/csm-assistant.md`, `content/case-studies/crs-calculator.md`, `content/case-studies/bill-splitter.md`
- Test: `tests/caseStudies.test.ts`

**Interfaces:**
- Consumes: `projects` (Task 2).
- Produces:
  - `interface CaseStudy { slug: string; title: string; status: string; role: string; stack: string; links: { live?: string; github?: string }; tldr: string; body: string }`
  - `listCaseStudySlugs(): string[]` — slugs of projects with `hasCaseStudy`, in `projects` order.
  - `getCaseStudy(slug: string): CaseStudy | null` — reads `content/case-studies/<slug>.md` with `gray-matter`; `null` if the file is missing.
  - `getAdjacent(slug: string): { prev: string | null; next: string | null }`.

- [ ] **Step 1: Write the failing tests:** every slug from `listCaseStudySlugs()` returns a non-null `CaseStudy` with non-empty `title`, `tldr`, `body`; `getCaseStudy("nope")` is `null`; `getAdjacent` of the first slug has `prev: null`, of the last has `next: null`; each body contains the headings `## Problem` and `## Decision log`.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement `lib/caseStudies.ts` (read with `fs.readFileSync(path.join(process.cwd(), "content/case-studies", slug + ".md"))`).
- [ ] **Step 4:** Write the three Markdown files. Front matter keys match `CaseStudy` minus `slug` and `body`. Body sections, in order: `## Problem`, `## Users and jobs to be done`, `## Decision log` (GFM table: Decision | Why), `## Results`, `## What I'd do next`.
  - CSM Assistant: copy from mockup #4 (`docs/redesign/mockups/Spec.dc.html`); results stay `[placeholders]`.
  - CRS Calculator: from the `yasshhc/crs-calculator` README (two rule sets, Nov 3 2026 change, tested engine, ranked tips, "estimate only" disclaimer).
  - Bill Splitter: headings with `[placeholder]` content only; Yash supplies the story.
- [ ] **Step 5:** Run. Expected: PASS.
- [ ] **Step 6: Commit** `feat: add case-study loader and content`.

---

### Task 4: Homepage sections

**Files:**
- Create: `components/CommandLabel.tsx`, `Nav.tsx`, `Hero.tsx`, `RoadmapBoard.tsx`, `ShippedSpecs.tsx`, `Timeline.tsx`, `ReleaseNotes.tsx`, `ContactFooter.tsx`
- Modify: `app/page.tsx` (compose sections in spec order; `JumpMenu` slot added in Task 5)
- Test: `tests/homepage.test.tsx`

**Interfaces:**
- Consumes: `site`, `projects`, `releases`, `specs` (Task 2); `listCaseStudySlugs` (Task 3).
- Produces: `CommandLabel({ children }: { children: string })` renders `$ ` + text in `font-mono text-green`. Section ids: `board`, `specs`, `timeline`, `log`, `contact` (Nav links target these).

Visual reference: mockup #11 `docs/redesign/mockups/CareerOS.dc.html` — match its spacing, radii, colours and command labels (`$ whoami`, `$ roadmap --view board`, `$ tickets --author yash --status shipped`, `$ roadmap --view timeline --year 2026`, `$ git log --oneline career`, `$ roadmap --next`).

- [ ] **Step 1: Write the failing tests** (render `app/page.tsx`):
  - exactly one `h1`; `h2`s "Roadmap", "Shipped from my specs", "Timeline", "Release notes" exist.
  - Roadmap: four column labels `shipped`, `paused`, `now`, `next`; the CSM Assistant card links to `/work/csm-assistant`; the CRS Calculator card links to `/work/crs-calculator`; the Vitals card does not link under `/work/`; the "next" card links to `#contact`.
  - Specs: the table and the timeline grid each have an ancestor with class `overflow-x-auto`.
  - Timeline shows the text "[confirm dates]".
  - Release notes render `releases.length` list items, first one starts with `v5.1`.
  - Contact: heading "Next milestone: Product Manager at your company."; links to `site.email`, `/resume.pdf`, `site.github`, `site.linkedin`.
  - Nav: links to `#board`, `#specs`, `#timeline`, `#log`, `#contact`.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement the components (server components; Tailwind only; `flex-wrap` rows so columns stack under ~640px).
- [ ] **Step 4:** Run tests, then `npm run build`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: build Career OS homepage sections`.

---

### Task 5: ⌘K jump menu

**Files:**
- Create: `lib/jump.ts`, `components/JumpMenu.tsx` (`"use client"`)
- Modify: `app/page.tsx` (place `JumpMenu` after `Hero`)
- Test: `tests/jump.test.ts`, `tests/JumpMenu.test.tsx`

**Interfaces:**
- Consumes: `projects`, `site` (Task 2).
- Produces:
  - `interface JumpItem { title: string; sub: string; kind: "case study" | "live" | "file" | "contact"; href: string }`
  - `buildJumpItems(): JumpItem[]` — one per case study (`/work/<slug>`), one per project with `links.live` (kind `live`), resume (`file`), email (`contact`).
  - `filterJumpItems(items: JumpItem[], query: string): JumpItem[]` — case-insensitive match on `title` or `sub`; trimmed empty query returns all items unchanged.

- [ ] **Step 1: Write the failing tests:**
  - `jump.test.ts`: `filterJumpItems(items, "")` returns all; `"crs"` returns only items whose title/sub contain "CRS"; `"  RESUME "` matches the resume item; `"zzz"` returns `[]`.
  - `JumpMenu.test.tsx` (user-event):
    - `focuses on Cmd+K and Ctrl+K` — `{Meta>}k{/Meta}` and `{Control>}k{/Control}` each focus the input labelled "Jump to".
    - `ignores other key combos` — `k` alone and `{Control>}{Shift>}k{/Shift}{/Control}` leave focus unchanged.
    - `arrow keys move the active option and Enter follows it` — type "crs", ArrowDown, Enter → the active option's link is the one followed (assert via `aria-activedescendant` and a mocked `window.location.assign`).
    - `Escape clears the query` — type "crs", Escape → input value is "".
    - `shows empty state and ignores Enter` — type "zzz" → text "No matches" visible; Enter → `location.assign` not called.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement `lib/jump.ts`, then `JumpMenu`: input with visible label text "Jump to" (visually hidden), `role="combobox"` + `aria-controls` listbox, options are `<a>` elements (so every target is also a normal link), `⌘K` hint chip `aria-hidden`. Keydown listener on `window` acts only when `(e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "k"`. Styling: dark `bg-ink` panel from mockup #11.
- [ ] **Step 4:** Run tests. Expected: PASS.
- [ ] **Step 5: Commit** `feat: add keyboard jump menu`.

---

### Task 6: Case-study pages

**Files:**
- Create: `app/work/[slug]/page.tsx`
- Test: `tests/caseStudyPage.test.tsx`

**Interfaces:**
- Consumes: `listCaseStudySlugs`, `getCaseStudy`, `getAdjacent` (Task 3); `CommandLabel` (Task 4).
- Produces: `generateStaticParams(): { slug: string }[]`; `export const dynamicParams = false`; `generateMetadata` with title `<title> | Yash Channe`.

- [ ] **Step 1: Write the failing tests:** `generateStaticParams()` deep-equals the three slugs; rendering the page for `crs-calculator` shows one `h1` with the case-study title, a TL;DR box, a `table` (decision log) inside an `overflow-x-auto` wrapper, a link "Back to the roadmap" → `/#board`, and a "Next" link to the adjacent case study; for the last slug there is no "Next" link.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement: header (status tag, role, stack, live/GitHub links), TL;DR box (`bg-lime`), body via `react-markdown` + `remark-gfm` with Tailwind-styled `h2`, `p`, `ul`, `table` (wrap tables in `overflow-x-auto` via the `components` prop), footer prev/next. Command label above the title: `$ open work/<slug>`.
- [ ] **Step 4:** Run tests, then `npm run build`. Expected: PASS; `out/work/csm-assistant.html`, `out/work/crs-calculator.html`, `out/work/bill-splitter.html` exist.
- [ ] **Step 5: Commit** `feat: add case-study pages`.

---

### Task 7: Pre-launch checks (placeholders, links, contrast)

**Files:**
- Create: `lib/placeholders.ts`, `scripts/check-placeholders.ts`
- Modify: `package.json` (`"check:placeholders": "tsx scripts/check-placeholders.ts"`)
- Test: `tests/placeholders.test.ts`, `tests/links.test.ts`, `tests/contrast.test.ts`

**Interfaces:**
- Produces: `findPlaceholders(text: string): string[]` — returns every `[...]` not immediately followed by `(` (so Markdown links are ignored) and not a GFM checkbox `[ ]`/`[x]`.

- [ ] **Step 1: Write the failing tests:**
  - `placeholders.test.ts`: `findPlaceholders("a [your email] b")` → `["[your email]"]`; `"see [docs](https://x)"` → `[]`; `"- [ ] task"` → `[]`; `"[N] accounts and [Q? 2026]"` → both.
  - `links.test.ts`: every internal `href` used in content and jump items (`/work/*`, `/#*`, `#*`, `/resume.pdf`) points to a case-study slug, a homepage section id from Task 4, or `/resume.pdf`.
  - `contrast.test.ts`: implement WCAG relative-luminance contrast in the test; assert ≥ 4.5 for text pairs ink/bg, muted/bg, green/bg, ink/lime, ink/tile, muted/tile, bg/ink, ink/tile-alt, muted/tile-alt.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement `findPlaceholders`; the script scans `content/**/*.ts` and `content/case-studies/*.md`, prints `file: [placeholder]` per hit, exits 1 if any, else prints "No placeholders left." and exits 0. If a colour pair fails contrast, darken the foreground token (not the background) until it passes and note the new hex in the spec.
- [ ] **Step 4:** Run `npm test`. Expected: PASS. Run `npm run check:placeholders`. Expected today: exit 1 listing placeholders (correct; it gates phase 2 only).
- [ ] **Step 5: Commit** `test: add placeholder, link and contrast checks`.

---

### Task 8: Preview-ready handoff

**Files:**
- Modify: `README.md` (replace Lovable text: what the site is, `npm run dev/test/build`, where content lives, how to edit a card, the phase 1/phase 2 launch steps below), `docs/redesign/PROGRESS.md` (status: built, awaiting preview)

- [ ] **Step 1:** Run the full gate: `npm test && npm run typecheck && npm run lint && npm run build`. Expected: all pass.
- [ ] **Step 2:** Serve `out/` locally (`npx serve out`) and check with Playwright (Chromium at `/opt/pw-browsers`) at 360px and 1440px widths: no horizontal page scroll on `/` and `/work/crs-calculator`; ⌘K focuses the menu. Save screenshots to the session scratchpad and share them with Yash.
- [ ] **Step 3:** Write the README launch steps (Yash does these in the Vercel dashboard):
  - Phase 1: Vercel → Add New Project → import `yasshhc/portfolio-new` → framework Next.js, default settings → deploy branch `claude/wizardly-mendel-w7okf9` as a preview; turn on Deployment Protection (Vercel Authentication) so the link stays private.
  - Phase 2: when `npm run check:placeholders` passes, merge to `main`, then add `yashchanne.com` under Project → Domains.
- [ ] **Step 4: Commit and push** `docs: add run and launch instructions` → `git push -u origin claude/wizardly-mendel-w7okf9`.
