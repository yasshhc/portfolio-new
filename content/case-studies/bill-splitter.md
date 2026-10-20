---
title: "Bill Splitter"
status: "live"
role: "PM + builder"
stack: "Next.js, TypeScript, Tailwind CSS, Gemini API"
links:
  live: "https://billsplitter.yashchanne.com"
tldr: "A phone-first web app for splitting a grocery receipt or a restaurant bill. Snap the receipt, fix any misread lines, tap who had what, and share everyone's total, with tax and tip spread fairly and every share adding up to the bill."
---

## Problem

Splitting a grocery receipt or a restaurant bill between several people is slow, manual work: going line by line, working out who had what, then adding tax and tip. It falls hardest on students and people who live together and don't have a shared account, because they split bills like this again and again.

## Users and jobs to be done

- **Housemates after a grocery run:** split one receipt fairly without a shared account.
- **Students after a meal out:** everyone pays exactly their share, tax and tip included.
- **Whoever paid:** send each person their total straight from their phone.

## Decision log

| Decision | Why |
|---|---|
| Fix the money maths before touching the design | The first version rounded each person's share on its own, so three people added up to $50.32 on a $50.31 bill, and switching tax on without marking items could make the tax vanish. I added tests for the maths first. |
| Spare pennies go to the first person in the list | Shares always add up to the exact bill. Simple and predictable. |
| Mocked two options per screen, then picked one each | Items became a receipt-style list, Assign kept item cards with tappable faces, and Summary became big totals that expand. |
| Share through the phone's share menu | People send results in chat apps; it falls back to copying text where there's no share menu. |
| Switched receipt reading from Groq to Gemini, fastest model first | Groq's model was retired and its replacement misread long receipts. Gemini models are tried in order within free limits. |
| "Check sale prices" reminder after a scan | The fast models can read the original price on discounted lines. |

## Results

- **Live** at billsplitter.yashchanne.com
- **Passed** a full new-user run-through in light and dark mode
- **About 1,040** free receipt scans a day across the Gemini models
- **450+** [users or bills split?]

## What I'd do next

Bring the Scan screen up to the new design, then test a person-first Assign screen against the item-first one to see which is faster.
