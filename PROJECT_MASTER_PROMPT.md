# PROJECT MASTER PROMPT — Duck-Omega

> Canonical repository: `belentani7/Duck-Omega`. Do not create additional repositories or combine independent DUCK Studio products by inference.

## Product source and scope

Duck-Omega is the existing DUCK/Zion artistic and production hub, built on Astro, with React islands, a Node/Express backend, tRPC, Drizzle contracts and Vitest coverage. Preserve the branding, source components and contracts from `src/`, `client/`, `server/`, `shared/` and `drizzle/`. The hub may connect a catalog of beats, production projects, revision comments, file deliveries, producer CRM and test/prod payment flows. Do not claim paid orders, rights licenses, provider integrations or public deployment without actual integration verification.

## Maximum coherent functional vision

1. Accessible, responsive home and DUCK artist identity; clear route between catalog, creator studio and client portal.
2. Persistent studio workflow for authentic owner/producer/client roles: CRM → projects → revision requests → deliverables → versioned files → verified delivery.
3. Secure uploads: signed-in role checks, proper client/project assignment, filenames and MIME checks, canonical Base64 bounds for current JSON route; transition to streaming or presigned multipart uploads for large media after choosing an existing provider. Inspect actual media signatures; run content scanning and retention controls if infrastructure supports it.
4. Least-privilege signed URLs, no storage keys or signed secrets in logs, correct file version isolation and owner/client resource access tests.
5. Honest checkout and contracts: no production payment claims without verified provider credentials, HMAC+replay defense, idempotency for webhooks and lawful licensing; dry-run flows distinct from real commercial payments.
6. Operational reliability: rate and size controls, request budget, structured non-private telemetry, documented migrations and reliable failure recovery for storage/database problems.
7. Release criteria: frozen pnpm installation, `pnpm check`, `pnpm test`, `pnpm astro:check`, `pnpm build`, real authenticated upload/download tests, valid CI, provenance of outputs, licensing, accessibility/browser smoke test and end-to-end infrastructure verification.

## Current phases

- **A** — upload transport validation: reject malformed Base64, unsupported MIME, invalid identifiers, dangerous filenames and unauthorized use before storage; unit and route regression coverage.
- **B** — access-control integration: trace cross-account client/project/stem/download boundaries and signed URL expiry.
- **C** — resilient versioning: file completion semantics, idempotency, storage rollback and crash consistency.
- **D** — full artistic/product experience: workflow quality, accessibility and actual deployment.
- **E** — verified release with safe merge and publish once CI, smoke tests and security gates pass.

## Agent instructions

Before edits inspect main, recent commits, existing PRs and release targets. Implement code and tests, not just roadmap text. Maintain existing business rights and user data, never spend money or expose private content by default. Run tests when an execution environment is available, make provenance explicit, do not equate a GitHub Actions job that never got a runner with a passing test. User wants eventual merge and publication **after** checks succeed, not indefinite PR-only staging. When done with this repository, choose a different existing historical project.

## Checkpoint 2026-10-23

An active branch adds stricter file upload validation and regression tests to the HTTP route. CI and real storage testing are not yet confirmed. Treat this as pending integration, not a completed release.
