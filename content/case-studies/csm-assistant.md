---
title: "CSM Assistant"
status: "in daily use"
role: "PM + builder"
stack: "FastAPI, React, Claude API"
links: {}
tldr: "I turned the most repetitive part of my CS job, writing up client calls, into a tool that also surfaces churn risk across every account."
---

## Problem

After each call I pasted the transcript into a chatbot. No memory per client, no cross-client view. Pain points lived in my head, and churn signals got missed until renewal.

## Users and jobs to be done

- **CSM after a call:** send an accurate follow-up in minutes, not half an hour.
- **CSM before a call:** see every open action item for that client.
- **CS lead:** spot which accounts are drifting toward churn.

## Decision log

| Decision | Why |
|---|---|
| Two AI passes per meeting, not one | Client-facing output and internal risk notes need different tone and structure. |
| Action items persist across meetings | A task list that resets every call is useless to a CSM. |
| Pain points stored as structured data | Topic, severity and quote make cross-client rollups possible. |
| Client data kept private | Call transcripts contain client information, so keeping it private comes first. |

## Results

- **[X min]** saved per client call
- **[N]** churn risks flagged early
- **[N]** pain points shared with product

## What I'd do next

Date-range filters and CSV export for the pain-points table, then a shared version so the whole CS team feeds one view to the product team.
