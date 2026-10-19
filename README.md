# Yash Channe: portfolio

A static Next.js site that presents Yash's career as a product: a roadmap board, a timeline, release notes and three case studies. It is aimed at recruiters and hiring managers for Product Manager / APM roles.

- Design spec: `docs/superpowers/specs/2026-10-19-portfolio-career-os-design.md`
- Build plan: `docs/superpowers/plans/2026-10-19-portfolio-career-os.md`
- Where the redesign stands: `docs/redesign/PROGRESS.md`

## Run it

Needs Node 22.

```
npm install
npm run dev          # http://localhost:3000
npm test             # unit and content tests
npm run typecheck
npm run lint
npm run build        # static site in out/
```

## Where the content lives

All copy is in `content/`, so updating the site never means touching components.

| File | What it holds |
|---|---|
| `content/site.ts` | name, headline, intro, status pill, email, LinkedIn, GitHub, resume path, spec totals |
| `content/projects.ts` | one entry per roadmap card and timeline bar |
| `content/releases.ts` | the `git log` release notes, newest first |
| `content/specs.ts` | the "Shipped from my specs" table (anonymised, public-safe wording only) |
| `content/case-studies/<slug>.md` | one Markdown file per case study; the header fields are front matter |

Anything written as `[like this]` is a placeholder for a fact still to be supplied. Nothing is invented.

### Edit a roadmap card

Open `content/projects.ts` and change the entry. `column` picks the board column (`shipped`, `paused`, `now`, `next`). A card links to its case study when `hasCaseStudy` is `true` (and `content/case-studies/<slug>.md` exists), otherwise to `links.live`, otherwise to `links.github`. Give it a `timeline` (`start` and `end` quarter, 1 to 4) to show it as a bar on the timeline.

### Add the resume

Put the PDF at `public/resume.pdf`. Until then the resume links point at a missing file, which is fine for a preview.

## Launch

Both steps happen in the Vercel dashboard.

**Phase 1: private preview**

1. Vercel, Add New Project, import `yasshhc/portfolio-new`. Framework: Next.js, default settings.
2. Deploy branch `claude/wizardly-mendel-w7okf9` as a preview.
3. Turn on Deployment Protection (Vercel Authentication) so the preview link stays private.

**Phase 2: yashchanne.com**

1. Run `npm run check:placeholders`. It exits with an error while any `[placeholder]` is left in `content/`; it has to print "No placeholders left." first.
2. Merge to `main`.
3. Add `yashchanne.com` under Project, Domains. The `crscal.` and `billsplitter.` subdomains are not touched.
