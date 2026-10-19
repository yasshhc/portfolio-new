# Portfolio redesign: progress notes

Read this first when picking the redesign back up in a new session.

## Where we are

- Process: brainstorming (questions → mockups → spec → plan → build).
- **Done:** goal, audience, evidence, three rounds of mockups.
- **Chosen direction:** mockup #11 "Career OS" (`mockups/CareerOS.dc.html`). Tweaks expected as we go.
- **Spec written:** `docs/superpowers/specs/2026-10-19-portfolio-career-os-design.md` (waiting for Yash's review).
- **Next step:** after spec approval, write the implementation plan, then build. Launch first on a private Vercel preview link, iterate, then move to yashchanne.com. No product code has been written yet.

Mockup canvas (private to Yash): https://claude.ai/artifact/XFwKGBFWzVfA7MoKxf7J5X
The `.dc.html` files here are copies of the canvas artboards. They need the canvas runtime to render, so treat them as reference for layout, colours and copy.

## Decisions so far

| Topic | Decision |
|---|---|
| Audience | Recruiters and hiring managers for **Product Manager / APM** roles |
| Story | Career switch. At work: customer calls → specs and tickets the product team ships (Yash doesn't write code at work). On the side: builds and ships own products. |
| Success | Recruiter downloads the resume or gets in touch |
| Content | Real projects from GitHub; no fake recommendations, no skill-percentage bars, no invented numbers |
| Concept | "My career, managed like a product" (from mockup #10) |
| Layout | Command-line style: `$ whoami`, `$ roadmap --view board`, ⌘K jump menu, `git log` release notes (from #9) |
| Colours | From #8: background `#F1F4EF`, ink/dark panels `#1B2421`, green `#2F6B4F`, lime `#D9F99D`, tiles `#FFFFFF` / `#E4ECE6` |
| Fonts | Space Grotesk (headings), Work Sans (body), JetBrains Mono (command labels) |

## Homepage sections (#11)

1. Hero: `$ whoami`, "My career, managed like a product.", status pill (open to PM/APM roles)
2. ⌘K jump menu: featured case study, live product, resume, email
3. Roadmap board: Shipped / Paused (on purpose) / Now / Next (PM role → contact)
4. 2026 timeline chart (dates to confirm)
5. Release notes as a `git log` (v1.0 init: CSM → v5.0 ship: CRS Calculator)
6. Footer: "Next milestone: Product Manager at your company."

## Projects to feature

| Project | Repo | Loop step | Status |
|---|---|---|---|
| CSM Assistant | yasshhc/csm-assistant | Listen | In daily use (featured case study) |
| Reddit Pain-Point Miner | yasshhc/reddit-pain-point-miner | Notice | Discovery tool |
| Coverage-nav | yasshhc/vehicle-optimization | Decide | Paused on purpose |
| CRS Calculator | yasshhc/crs-calculator | Build | Live at crscal.yashchanne.com |
| Bill Splitter | yasshhc/bill-splitter-next | Build | Live at billsplitter.yashchanne.com |
| Vitals | yasshhc/Whoop | Measure | Personal product, 73 tests |

Not yet reviewed: `hittheroad-concept` (no README), older repos. Bill Splitter's README is the Next.js default, so its story must come from Yash.

## Still needed from Yash

- Email, LinkedIn URL, resume PDF, photo (optional)
- Real numbers: client accounts managed, years in CS, time saved per call, churn risks caught
- Confirm project dates for the timeline
- One real client quote that changed what got built (optional)
- OK to name the employer (Citylogix) on the site?
- Ticket inventory: totals plus 4–6 example tickets → shipped features (public-safe wording) for the "Shipped from my specs" section

## Answered questions

- Depth: homepage + 3 case studies (CSM Assistant, CRS Calculator, Bill Splitter)
- Hosting: Vercel, private preview link first, then yashchanne.com
- Stack: Next.js + Tailwind + TypeScript, rebuilt in this repo

## Known issues in the current site

- `.github/workflows/static.yml` uploads the raw repo without building, so Pages serves a blank page.
- Placeholder content in `src/data/portfolioData.ts` (example.com email, fake recommendations, missing resume PDF).
