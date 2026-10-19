---
title: "CRS Calculator"
status: "live"
role: "PM + builder"
stack: "Next.js, TypeScript, Tailwind CSS"
links:
  live: "https://crscal.yashchanne.com"
tldr: "An Express Entry score estimator that shows your CRS score under today’s rules and under the rules that start on Nov 3, 2026, with ranked tips for gaining points."
---

## Problem

Canada’s Express Entry CRS rules change on Nov 3, 2026, when a Labour Market Integration factor adds a high-wage work bonus and job offer points. The same profile scores differently before and after, so one number is not enough. [Why you built it and who asked for it]

## Users and jobs to be done

- **Express Entry candidate:** see my estimated score today and from Nov 3, 2026, side by side.
- **Express Entry candidate:** find which changes would add the most points.
- [Anything you learned about who actually uses it]

## Decision log

| Decision | Why |
|---|---|
| Two rule sets, scored side by side | The rules change on Nov 3, 2026, so the same profile has two valid scores. |
| Scoring engine built and tested before the website | Phase 1 is the engine and its tests; the site imports it, so the numbers are checked independently of the interface. |
| Tips come from re-running the engine | Each point gain is computed, not hand-written, so tips cannot drift from the scoring rules. |
| Rules live in data files with a `checkedOn` date | Updating a rule is a data edit, a date and a test run, not a code change. |
| “Estimate only” disclaimer | Not affiliated with IRCC and not legal advice. |

## Results

- **551 vs 511:** the reference test profile scores 551 from Nov 3, 2026 and 511 today
- **[N]** visits since launch
- **[N]** [what people did with it]

## What I'd do next

[What you would do next]
