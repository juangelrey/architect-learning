# Notes

- User wants extremely concise chat (global pref). Lessons can be rich; chat replies terse.
- Format mirrors ../domain-driven-design: quizzes + interview-style scenario exercises (free answer → model answer → rubric self-grade). "Copy results" button; ask user to paste results so learning records rest on evidence.
- Review mode: user did Anthropic Academy courses. Prefer retrieval practice, spacing, interleaving over re-teaching.
- Made-up scenarios only. Each lesson opens with 2–3 spaced-review questions from earlier lessons (no standalone mixed sweeps — user found them confusing in DDD).
- Course map: `index.html`.
- Quiz answers same length; options shuffled by quiz.js.
- **User preference (2026-10-12): teach the CURRENT state from the latest docs, even where the July 2026 exam guide is older. No hedging toward obsolete vocabulary.** The blueprint defines *which topics* to cover; the latest docs define *what's true*. At most a one-line "formerly X" note so old terms are recognisable.
- Never trust parametric knowledge: every claim cites docs/exam guide. Claude Code features change fast — verify against current docs.
- Topic tags in quizzes: `d1`…`d7` = exam domains. quiz.js supports multiple-response (`data-answer="0,2"`, all-or-nothing) to mirror exam format.
- Course plan: 8 lessons (D3 split in two), then optional timed 63-item mock (exam-format rehearsal, distinct from the "mixed sweep" the user disliked; ask before building).

- All 8 lessons built 2026-10-12. Lessons 2–8 were written by parallel research agents and checked for structure, dead links and equal option word counts. Each lesson has a cheat sheet in reference/.
- No glossary yet, on purpose: add terms only once pasted results show the user understands them. Candidates: context rot, pass@k/pass^k, confused deputy, token passthrough, progressive disclosure, capability bloat, contextual retrieval, SLI/SLO/SLA, excessive agency, ZDR, BAA, managed settings.

## Currency audit (2026-10-12)
All 8 lessons + cheat sheets re-verified against latest docs; hedges removed; current state taught (MCP 2026-07-28, A2A v1.0, Claude 5 lineup, Managed Agents, Jan 2026 multi-agent guidance, OWASP 2026 lists, FedRAMP Certification Classes, current AUP of 15 Sep 2025). Re-audit when: new MCP spec, new model family, Claude Code major features, or AUP 12 Nov 2026 takes effect.
Open conflicts in primary sources (taught as "the signed contract/docs decide"):
- Computer use HIPAA: docs table says eligible, BAA article says not.
- Microsoft Foundry HIPAA: API docs vs BAA article disagree (not in lesson).
- Per-model EU region availability on Bedrock/Google: no table found.
- No public contractual uptime SLA for the Standard tier.

## Claims to verify (no public primary source)
- D1 business value pillars: only names from the guide; the detailed framing is in Partner Academy courses. User's course notes win.
- D3: structure-aware chunking; structured data → SQL/tool rather than embeddings; re-embed on embedding-model change.
- D4: one change at a time; shadow/canary; diagnosis-table framing.
- D6: audience framing, discovery checklist, narrow first use case, handoff-doc contents (marked "Generic practice" in lesson).
