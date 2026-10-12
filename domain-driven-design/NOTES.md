# Notes

- User wants extremely concise communication (global pref). Lessons can be rich, but chat replies stay terse.
- Review mode: finished the book. Prefer retrieval practice and spaced or interleaved quizzes over re-teaching.
- Weight all 4 parts of the book equally. Interleave them in every session.
- Made-up scenarios only. Mix quizzes with interview-style scenario exercises (free answer, then model answer and self-grade).
- Lessons carry a "copy results" button. Ask the user to paste results back so learning records are based on evidence.
- Topic tags used in quizzes: `strategic` (Part I), `tactical` (Part II), `practice` (Part III), `beyond` (Part IV).
- Structure (user request): one lesson per book chapter, lesson number = chapter number (`0003-…` = ch. 3). No standalone mixed sweeps (user found them confusing; diagnostic removed). Interleave via 2–3 spaced-review questions from earlier chapters at the start of each lesson. Course map: `index.html`.

## Claims to verify against the book (from memory, not checked)
If the user disputes any of these, the book wins. Fix the lesson.
- Ch. 4: "avoid separate ways for core"; an open-host service serves multiple published-language versions; the "every consumer builds an ACL" warning sign.
- Ch. 5: active record isn't an antipattern for simple logic; returning a response counts as an implicit distributed transaction; the page-visit counter retry example.
- Ch. 6: domain services read several aggregates but don't change several in one transaction.
- Ch. 7: the names of the event-sourcing drawbacks; the stance on snapshots.
- Ch. 8: message subscribers in presentation, the bus in data access; synchronous projection checkpoints; onion/clean architecture treated as ports & adapters.
- Ch. 9: stateful translation (aggregation, unifying sources); a process manager is started explicitly; the campaign saga example.
- Ch. 10: exact wording of the decision tree's first question (the cheat sheet uses money/audit/analysis); "tree in reverse" is a paraphrase.
- Ch. 11: the two ways to migrate to event sourcing; partnership → customer–supplier after a team split; generic → supporting transition.
- Ch. 12: the order of the 10 EventStorming steps.
- Ch. 13: shared DB as a temporary strangler exception; "undercover DDD"; value objects before aggregates as refactoring order.
- Ch. 14: "every microservice is a BC, not vice versa" wording; compressing public interfaces via OHS/ACL.
- Ch. 15: heuristics wording (assume network fails, public vs private events); event notification for sensitive data.
- Ch. 16: warehouse/lake weaknesses framing; projections for data products.
