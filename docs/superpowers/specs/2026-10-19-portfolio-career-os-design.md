# Portfolio redesign: "Career OS" design spec

Date: 2026-10-19
Owner: Yash Channe
Status: approved in conversation; awaiting review of this written spec

## 1. Goal

Get Yash interviews for **Product Manager / Associate PM** roles.

- **Audience:** recruiters and hiring managers.
- **Story:** a Customer Success Manager (municipal SaaS) who already does product work in two ways:
  - **At work:** turns customer calls into specs and tickets that the product team builds and ships. Yash does not write the code at work.
  - **On the side:** builds and ships personal products end to end.
  Never claim Yash shipped code at work, or that every side project came from a customer call.
- **Success:** a visitor reads a case study, then downloads the resume or emails Yash.
- **Rule:** only real content. No invented numbers, quotes or testimonials. Unknown facts stay visible as `[placeholders]` until Yash supplies them.

## 2. Concept and visual design

Chosen mockup: **#11 "Career OS"** (`docs/redesign/mockups/CareerOS.dc.html`), on the canvas at https://claude.ai/artifact/XFwKGBFWzVfA7MoKxf7J5X.

- **Concept:** "My career, managed like a product." The career is shown as a roadmap, a timeline and release notes.
- **Layout language:** command-line labels above each section (`$ whoami`, `$ roadmap --view board`, `$ git log --oneline career`), and a ⌘K jump menu.
- **Colours:**

  | Token | Hex | Use |
  |---|---|---|
  | `bg` | `#F1F4EF` | page background |
  | `ink` | `#1B2421` | text, dark panels |
  | `muted` | `#44514C` | secondary text |
  | `green` | `#2F6B4F` | links, command labels |
  | `lime` | `#D9F99D` | highlights, status pill, footer |
  | `tile` | `#FFFFFF` | cards |
  | `tile-alt` | `#E4ECE6` | board columns |
  | `paused` | `#C2410C` | paused status dot |

- **Fonts (Google Fonts via `next/font`):** Space Grotesk (headings), Work Sans (body), JetBrains Mono (command labels, tags).
- The design will change as we go; this spec fixes the starting point, not the final look.

## 3. Stack and hosting

- **Next.js (App Router) + TypeScript + Tailwind CSS**, matching `crs-calculator` and `bill-splitter-next`.
- **Fully static** output: every page is generated at build time; no server code, database or auth.
- Built in this repo (`yasshhc/portfolio-new`). The Lovable/Vite code is removed; it remains in git history.
- `.github/workflows/static.yml` (broken GitHub Pages deploy) is deleted.
- **Hosting: Vercel.**
  - Phase 1: deploy to a **private Vercel preview link** and iterate there.
  - Phase 2: when Yash is happy, point **yashchanne.com** at the project. The `crscal.` and `billsplitter.` subdomains are untouched.
  - Connecting the repo to Vercel and DNS changes are done by Yash in the Vercel dashboard; the repo just needs to build cleanly.

## 4. Pages

| Route | Content |
|---|---|
| `/` | Homepage (section 5) |
| `/work/csm-assistant` | Case study |
| `/work/crs-calculator` | Case study |
| `/work/bill-splitter` | Case study |
| `/resume.pdf` | Resume file in `public/` |
| 404 | Simple not-found page in the same style |

## 5. Homepage sections (top to bottom)

1. **Nav:** `~/yash-channe` home link; links to roadmap, timeline, log, contact. Wraps on phones.
2. **Hero:** `$ whoami`, headline "My career, managed like a product.", intro ("At work, I turn customer calls into specs and tickets that the product team ships. On the side, I build and ship my own products."), lime status pill "open to PM / APM roles".
3. **⌘K jump menu** (section 7).
4. **Roadmap board** (`$ roadmap --view board`), four columns:
   - **Shipped:** CRS Calculator (live), Bill Splitter (live), CSM Assistant (in daily use), Reddit Pain-Point Miner, Vitals.
   - **Paused:** Coverage-nav, "paused on purpose".
   - **Now:** Customer Success Manager, municipal SaaS: customer calls in, specs and tickets out.
   - **Next:** PM / APM role, linking to the contact section.
   Cards with a case study link to it; the rest link to the live site or GitHub.
5. **Shipped from my specs** (`$ tickets --author yash --status shipped`): from Yash's inventory of tickets and the features shipped from them. Three number tiles (tickets written, features shipped, client accounts) and a table: customer problem, what was specced, when it shipped, status. Shown as totals plus 4–6 anonymised examples in general terms: no client names, ticket IDs or internal details.
6. **Timeline** (`$ roadmap --view timeline`): quarterly bars for the CS job and each project. Scrolls sideways on phones. Dates marked `[confirm dates]` until confirmed.
7. **Release notes** (`$ git log --oneline career`): versioned career milestones, newest first.
8. **Contact footer** (`$ roadmap --next`): "Next milestone: Product Manager at your company." Email, resume, GitHub, LinkedIn.

## 6. Case-study pages

Layout from mockup #4 (PRD style), restyled with section 2's colours and command labels.

Sections, each optional per project:
1. Header: title, status tag, role, stack, links (live site / GitHub)
2. **TL;DR** (2–3 sentences)
3. **Problem**
4. **Users and jobs to be done**
5. **Decision log** (table: decision, why)
6. **Results** (metric tiles; placeholders until real numbers exist)
7. **What I'd do next**
8. Footer: previous / next case study, back to roadmap

Starting content comes from each repo's README; Yash fills in results and anything only Yash knows.

## 7. ⌘K jump menu

- A text input that filters a fixed list: the case studies, the live products, resume, email.
- Opens/focuses with ⌘K (Mac) or Ctrl+K; arrow keys move, Enter follows, Escape clears.
- The shortcut listener only acts on that exact key combination.
- Everything it reaches is also reachable through normal links, so the page works without it.

## 8. Content model

All content lives in plain files so updates never require touching components:

- `content/site.ts`: name, headline, intro, status, contact links, resume path.
- `content/projects.ts`: one entry per project: `slug`, `title`, `summary`, `status`, `column` (`shipped | paused | now | next`), `stack`, `links`, `timeline` (quarter start/end), `hasCaseStudy`.
- `content/releases.ts`: release-note entries (`version`, `message`).
- `content/specs.ts`: shipped-from-my-specs entries (`problem`, `spec`, `shipped` quarter, optional `ticketCount` totals). Public-safe wording only.
- `content/case-studies/<slug>.md`: case-study body in Markdown with front matter for the header.

Placeholders use the form `[like this]` so they are easy to find.

## 9. Accessibility and responsiveness

- Text contrast at least 4.5:1 (checked for every colour pair used for text).
- Real links and buttons, visible focus styles, labelled inputs, one `h1` per page.
- Works from 360px wide: nav and columns wrap, timeline and tables scroll inside their own box.
- Decorative SVGs marked `aria-hidden`.

## 10. Testing and checks

- Unit tests for the jump-menu filter and keyboard handling.
- Content tests: every project has the required fields, every `hasCaseStudy` project has a Markdown file, every internal link resolves.
- A **pre-launch check** that fails while any `[placeholder]` remains (run before phase 2, not before previews).
- `next build` must pass; lint and typecheck clean.
- Manual check of the preview link at phone and desktop width before each phase.

## 11. Out of scope

Blog, dark mode, contact form, analytics, CMS, the old skills/certifications/recommendations sections.

## 12. Content still needed from Yash

- Email, LinkedIn URL, resume PDF, optional photo
- Whether to name the employer (Citylogix)
- Real numbers: client accounts, years in CS, time saved per call, churn risks caught
- Project dates for the timeline
- Bill Splitter: what problem it solves and who uses it
- Results for each case study
- The ticket inventory: totals (tickets written, features shipped) and 4–6 examples, worded so nothing confidential to Citylogix or its clients is published
