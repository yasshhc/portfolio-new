---
title: "CRS Calculator"
status: "live"
role: "PM + builder"
stack: "Next.js, TypeScript, Tailwind CSS"
links:
  live: "https://crscal.yashchanne.com"
tldr: "Canada’s Express Entry rules change on Nov 3, 2026. CRSCal shows your CRS score under today’s rules and from Nov 3 side by side, explains where every point comes from, and shows the biggest ways to raise it. No sign-up, and your answers never leave your phone."
---

## Problem

The Express Entry rules change on Nov 3, 2026, when a Labour Market Integration factor adds a high-wage work bonus and new job offer points. For many people in the pool, their score is about to move. I wanted to know exactly how mine would change, and I couldn’t find a simple way to see both numbers side by side, so I built one.

## Users and jobs to be done

- **Express Entry candidate:** see my estimated score today and from Nov 3, 2026, side by side.
- **Candidate with a skilled job:** check whether my job qualifies for the new high-wage bonus (up to +70), by searching my job title or NOC code.
- **Candidate planning next steps:** see where every point comes from, and which changes would raise my score most, with “what if” sliders.

## Decision log

| Decision | Why |
|---|---|
| Two rule sets, scored side by side | The rules change on Nov 3, 2026, so the same profile has two valid scores. |
| Rules only from official sources | IRCC’s official pages, the official high-wage occupation list and Statistics Canada’s NOC 2021 list, so every number can be traced. |
| Scoring engine built and tested before the website | 132 automated tests check the scoring before every update goes live; the site imports the tested engine. |
| Tips come from re-running the engine | Each point gain is computed, not hand-written, so tips cannot drift from the scoring rules. |
| Rules live in data files with a `checkedOn` date | Updating a rule is a data edit, a date and a test run, not a code change. |
| No sign-up, no account | Your answers never leave your phone. |
| Every screen designed as a mockup first | Each screen was built to match an agreed design. |
| “Estimate only” disclaimer | Not affiliated with IRCC, and not immigration or legal advice. |

## Results

- **Live** at crscal.yashchanne.com
- **132** automated tests run before every update
- **[25,000]** visits since launch
- **551 vs 511:** the reference test profile scores 551 from Nov 3, 2026 and 511 today

## What I'd do next

Compare scores that users report against their official Express Entry scores, and fix any difference. I asked people to tell me when their numbers don’t match; that is how the calculator gets more accurate.
