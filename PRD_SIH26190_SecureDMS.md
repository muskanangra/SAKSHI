# Product Requirements Document (PRD)
## Secure Digital Document Management System — SIH Problem Statement 26190
### For AI Coding Agents (Antigravity / Cursor / Windsurf / Claude Code)

**Version:** 1.0 — FINAL (single-pass build spec, no revisions expected)
**Owner:** Smart India Hackathon Team
**Document type:** Build-ready PRD + Engineering Spec

> **Instruction to the AI coding agent:** This document is the single source of truth. Build the ENTIRE system — frontend, backend, database, auth, storage, audit engine, AI anomaly engine, and all 7 portals — exactly as specified below. Do not invent alternate tech choices. Do not skip sections. Do not leave TODOs, mocked data, or placeholder logic in the final build — every feature listed under "Definition of Done" must be functional end-to-end before this is considered complete. Ask no clarifying questions; every decision has already been made in this document.

---

## 1. Executive Summary

Build a **production-grade, multi-tenant, role-based Secure Digital Document Management System** for Indian law-enforcement and judicial workflows. The platform unifies FIR filing, criminal investigation tracking, digital/physical evidence chain-of-custody, court/legal documentation, a Women Safety helpline module, cryptographic document integrity, immutable audit logging, and AI-assisted anomaly detection — all behind strict backend-enforced RBAC/ABAC. The frontend must look and feel like a **professional, modern Indian government digital platform** (see Section 12 — Design System), not a generic admin template.

Non-negotiable principles (violating any of these is a critical bug):
1. **Backend-enforced security only.** The frontend never grants permission; every permission check happens server-side on every request.
2. **Case-centric data model.** Every FIR, evidence item, investigation record, legal filing, and document belongs to a Case.
3. **Cryptographic integrity.** Every document version is SHA-256 hashed at upload time and the hash is verifiable.
4. **Append-only immutability.** Finalized documents and all audit logs can never be edited or deleted — only new versions/entries are ever added.
5. **Explicit, restricted cross-district sharing.** No implicit cross-district visibility; shared access is View + Download only, never edit/delete/reshare.
6. **Every security-relevant action is audited automatically** by the backend (never by the client, never by a human typing a log entry).
7. **AI is advisory, not authoritative.** It scores risk and raises alerts; it never blocks a user or writes an audit record itself.

---

## 2. Locked Technology Stack

Use **exactly** this stack. Do not substitute frameworks, ORMs, databases, or auth libraries.

| Layer | Technology | Notes |
|---|---|---|
| Frontend framework | **React 18 + TypeScript + Vite** | SPA, strict TS, no `any` in committed code |
| Styling | **Tailwind CSS** (+ shadcn/ui component primitives) | Design tokens per Section 12 |
| State/data fetching | **TanStack Query (React Query)** + React Context for auth session | No Redux |
| Forms & validation | **React Hook Form + Zod** | Client-side validation mirrors backend Pydantic schemas |
| Routing | **React Router v6**, role-aware route guards that re-verify against JWT claims | |
| Backend framework | **FastAPI (Python 3.11+)**, fully async | Auto-generated OpenAPI docs at `/api/docs` |
| ORM | **SQLAlchemy 2.0 (async)** | Typed models |
| Migrations | **Alembic** | Every schema change is a migration, never manual DDL |
| Database | **PostgreSQL 16** | ACID, JSONB for flexible metadata, B-Tree indexes on all human-readable IDs |
| Object storage | **MinIO** (self-hosted, S3-compatible) for local/dev and hackathon demo; same code path is AWS-S3-ready via `boto3`-compatible SDK | No files ever touch the relational DB |
| Auth | **JWT (PyJWT)** access + refresh tokens, **Passlib with Argon2** password hashing, **TOTP/SMS OTP MFA** (`pyotp` for TOTP; pluggable SMS gateway interface, mocked in dev via console/log output) | No public self-registration, ever |
| Cryptography | **Python `hashlib` (SHA-256)** for document hashing and audit hash-chaining | |
| AI/anomaly engine | **Python rule engine + scikit-learn** (Isolation Forest optional for stretch), running as an **async background worker** (FastAPI `BackgroundTasks` or a lightweight APScheduler job) that consumes audit events | |
| Search | **PostgreSQL indexed identifier lookup** (`CASE-YYYY-XXXXX` etc.) — no external search engine, no vector DB | |
| Containerization | **Docker + docker-compose** — one command (`docker compose up`) must bring up frontend, backend, Postgres, and MinIO together | |
| Testing | **Pytest** (backend, incl. auth/RBAC negative tests) + **Vitest/React Testing Library** (frontend) | |

Do not add: GraphQL, MongoDB, Firebase, NextAuth, Supabase, Redux, or any tool not listed above. If a "nice to have" library is needed (e.g. a date picker), pick a small, well-known, actively maintained package and note it in code comments — never a new architectural layer.

---

## 3. User Roles & the 7 Portals

Single React codebase; a **portal router** loads the correct dashboard shell based on verified JWT claims (`role`, `department`, `district_id`). No portal is reachable by URL manipulation without the matching backend-verified claim — attempting to do so must render a 403 page, not a broken UI.

| # | Portal | Who | Core capability | Scope |
|---|---|---|---|---|
| 1 | **Central Admin** | National-level governance | User/role provisioning, global audit monitor, Level-2 (Critical) alert handling, exceptional correction approval | Global read; cannot directly edit finalized documents |
| 2 | **District/Area Admin** | District-level governance | District user management, local activity monitoring, Level-1 alert triage, exceptional approval within district | District-scoped |
| 3 | **FIR / Police Portal** | Police officers | File FIRs (auto-creates or links a Case), initial incident documentation | Department/district scoped |
| 4 | **Investigation Portal** | Investigating officers | Case file management, investigation diary entries, officer notes, document upload/versioning | Assigned cases / district |
| 5 | **Evidence / Forensic Portal** | Forensic & evidence officers | Evidence logging (digital + digitally-represented physical), chain-of-custody transfers, lab/forensic reports | Strict custody-chain logging |
| 6 | **Legal / Court Portal** | Prosecutors/court liaison officers | Charge sheet review, court filings, judgments, legal document versioning | Case read-only or explicit share |
| 7 | **Women Safety Portal** | Helpline/dispatch officers | Incident logging (WS-YYYY-XXXXX), dispatch tracking, FIR/Case **reference only** (no case content exposure) | Isolated data wall |

**Account provisioning:** There is no public sign-up screen anywhere in the product. All accounts are created exclusively by Central or District Admins from within their portal. Build the "Create User" form (official ID, name, role, department, district, initial temp password) as part of the Admin portals — this is a required feature, not optional.

---

## 4. Authentication & Authorization (build exactly this flow)

### 4.1 Login flow
1. `POST /api/v1/auth/login {official_id, password}` → backend verifies Argon2 password hash.
2. On success, generate a 6-digit OTP, store it server-side keyed to a short-lived session token (TTL 5 min), and "dispatch" it (SMS gateway interface — in dev, log to console/return in a dev-only response field so the hackathon demo works without a paid SMS vendor).
3. `POST /api/v1/auth/verify-otp {session_token, otp_code}` → on success, issue:
   - **Access JWT** (15 min expiry, in-memory storage on the client — never `localStorage`)
   - **Refresh JWT** (HttpOnly, Secure, SameSite=Strict cookie)
4. JWT claims include: `user_id`, `role`, `department`, `district_id`, `permissions[]`.
5. Every failed login and every failed OTP attempt writes an immutable audit record.

### 4.2 Authorization model (RBAC + ABAC), enforced via FastAPI dependency injection on **every** endpoint
Access is granted only if **all** of the following hold:
```
Access Granted = RoleHasPermission
              AND (JurisdictionMatch OR ExplicitShareGrant)
              AND NOT SpeciallyRestricted-unless-AdminClearance
```
Implement this as a reusable FastAPI dependency (e.g. `require_permission("document:read")`) applied to route handlers — never as a frontend `if (role === 'admin')` check. The frontend may hide UI elements for UX polish, but the backend must independently reject unauthorized calls with `401`/`403` regardless of what the frontend sent.

### 4.3 Session & token hygiene
- Access tokens are short-lived; refresh flow rotates the refresh token.
- Logout invalidates the refresh token server-side (maintain a revocation list/table).
- Rate-limit login and OTP endpoints (e.g. 5 attempts / 10 minutes per account) — lockout triggers an audit event and feeds the AI anomaly engine (Rule 1, Section 9).

---

## 5. Case-Centric Data Model & Human-Readable Identifiers

Every entity below uses a **UUIDv4 primary key** (technical) plus a **backend-generated human-readable identifier** (operational/legal). Generate identifiers atomically and gapless-enough per year using a Postgres sequence per entity-type-per-year.

| Entity | Format | Example |
|---|---|---|
| Case | `CASE-YYYY-XXXXX` | CASE-2026-00142 |
| FIR | `FIR-YYYY-XXXXX` | FIR-2026-00481 |
| Evidence | `EVD-YYYY-XXXXX` | EVD-2026-00917 |
| Document | `DOC-YYYY-XXXXX` | DOC-2026-04109 |
| Forensic Report | `FOR-YYYY-XXXXX` | FOR-2026-00128 |
| Women Safety Call | `WS-YYYY-XXXXX` | WS-2026-08821 |

### 5.1 Required tables (build via SQLAlchemy models + Alembic migrations)
`users`, `roles`, `permissions`, `role_permissions`, `departments`, `districts`, `cases`, `firs`, `investigations`, `evidence`, `chain_of_custody`, `forensic_reports`, `legal_records`, `documents`, `document_versions`, `document_shares`, `women_safety_incidents`, `audit_logs`, `security_alerts`, `alert_escalations`, `correction_requests`, `refresh_token_blacklist`.

Key field notes:
- `documents.is_finalized: bool`, `documents.current_version_id: FK`
- `document_versions`: `version_number`, `file_path` (object storage key), `sha256_hash`, `created_by`, `timestamp` — **rows are never updated or deleted**, only inserted.
- `audit_logs`: `actor_id`, `action`, `resource_type`, `resource_id`, `ip_address`, `timestamp`, `previous_log_hash`, `current_log_hash` — **insert-only table; no UPDATE or DELETE grants at the DB-user level for this table, enforced by Postgres role permissions, not just app logic.**
- `women_safety_incidents`: stores `fir_number_ref` / `case_number_ref` as **plain reference strings only** — never a live FK join that would let a query pull case content through this table.

---

## 6. Document Lifecycle, Versioning & Integrity

**Principle: nothing is overwritten; everything is versioned.**

1. **Draft** — editable only by its authorized creator.
2. **Upload** — file streamed to MinIO/S3 bucket (never touches Postgres); backend computes SHA-256 over the raw bytes; a new `document_versions` row is inserted with the hash, version number, and uploader.
3. **Finalize** — an explicit user action sets `is_finalized = true`; from this point the version is immutable at both the application layer (endpoint rejects further writes to that version) and ideally storage layer (object lock / retention flag if the storage backend supports it).
4. **Update after finalization** — creates version N+1; the previous version remains fully retrievable.
5. **Exceptional permanent correction** — requires a `correction_requests` workflow: request → Central Admin approval → correction applied as a new version, with the original preserved and the approval trail permanently logged.

### 6.1 File retrieval — signed URLs only
- Files are **never** publicly reachable by direct URL.
- `GET /api/v1/documents/{doc_number}/download`:
  1. Extract JWT claims.
  2. Run the full authorization check (Section 4.2) against this specific document/case.
  3. If granted: generate a **15-minute expiring presigned GET URL** from MinIO/S3, write an immutable `DOCUMENT_DOWNLOAD` audit record, and return `{download_url, sha256_hash}`.
  4. If denied: write an immutable `UNAUTHORIZED_ACCESS_ATTEMPT` audit record and return `403`.
- The frontend fetches the file directly from the presigned URL (not proxied through the API) and may optionally re-hash client-side to display an "integrity verified ✔" badge.

---

## 7. Evidence & Chain of Custody

- `EVD-YYYY-XXXXX` created on evidence discovery, capturing: seizing officer, GPS/location text field, timestamp, initial photo upload (goes through the same document pipeline/hash), and case linkage.
- Every custody transfer requires **dual confirmation** (OTP or in-app confirmation from both transferor and transferee) before the `chain_of_custody` row is written — this row is also insert-only.
- Forensic analysis results are uploaded as hashed documents referencing `FOR-YYYY-XXXXX`.
- Court production events (custodian, court ID, judicial receipt ID, return timestamp) are logged the same way.
- Build a **timeline/chain-of-custody visual component** on the Evidence detail page showing every custody event in order (this is a key demo feature — make it visually clear, e.g. a vertical stepper).

---

## 8. Cross-District Sharing

- Default visibility is strictly within the case's originating district.
- Sharing is an explicit action: `POST /api/v1/cases/{case_number}/share {target_user_id or target_district_id, expires_in_days}`.
- Shared access is **hard-locked to View + Download**; the API layer must reject any edit/delete/reshare attempt against a resource the requester only holds via a share record, even if they try to call the normal edit endpoint directly.
- Shares can have an expiration (default 30 days) after which the authorization check automatically fails — check `expires_at` on every access, don't rely on a cleanup job.
- Every share creation, and every access made through a share, is audited.

---

## 9. Immutable Audit Logging (hash-chained)

- The backend automatically writes an audit record for: login, failed login, OTP verify (pass/fail), document upload/view/download/share, versioning, permission changes, case/FIR/evidence/legal-record actions, user provisioning, and admin approvals.
- Each record is hash-chained:
  `current_log_hash = SHA256(audit_id ‖ timestamp ‖ actor_id ‖ action ‖ resource_id ‖ previous_log_hash)`
- Build an admin-facing **"Verify Audit Chain Integrity"** utility (a button + endpoint) that walks the full chain and reports the first point of tampering, if any — this is a strong demo feature for judges.
- No API endpoint, including an admin endpoint, may update or delete an audit row. Enforce this both in code and via restricted Postgres grants on the `audit_logs` table.

---

## 10. AI Security Monitoring & Anomaly Detection

Runs as an async worker consuming the audit event stream. Rule-based scoring (ship this fully working); scikit-learn Isolation Forest on login/access feature vectors is an optional stretch enhancement layered on top, not a replacement.

| Rule | Condition | Score |
|---|---|---|
| R1 | >5 failed logins in 10 min | +40 |
| R2 | >20 document downloads in 5 min | +60 |
| R3 | Access between 01:00–04:00 local time | +25 |
| R4 | Unauthorized cross-district access attempt | +50 |
| R5 | Suspicious action by a District Admin account | +80 |

Severity bands: `<30` informational (no alert) · `30–59` Medium · `60–84` High · `85+` Critical.

Escalation: Medium/High → District Admin dashboard first. If unresolved within a configurable time limit, or if Critical, or if the actor is itself a District Admin → escalate to Central Admin dashboard. Build both dashboards with a live alert feed, severity badges, and a "Resolve / Escalate" action that itself gets audited.

The AI engine **never** blocks a user and **never** writes to `audit_logs` directly — it only writes to `security_alerts`.

---

## 11. Women Safety Portal

- Isolated module with its own incident form: caller name/phone (permission-restricted field, only visible to authorized roles), incident location, timestamp, handling officer, dispatch details (vehicle, responding officer, dispatch time, arrival time).
- "Was an FIR filed?" toggle. If yes, capture `fir_number_ref` / `case_number_ref` as **reference strings** — do not join or expose the underlying case/FIR content through this portal's UI or API responses under any circumstance. Write a dedicated backend test asserting the Women Safety endpoints never return case/FIR field data beyond the two reference strings.

---

## 12. UI/UX Design System (based on the reference screenshots provided)

The reference material (India.gov.in, Embassy of India portal, eSanjeevani telemedicine platform) establishes the visual language: **clean, trustworthy, official Indian digital-government aesthetic** — generous white space, a confident primary accent (saffron/deep-orange or navy), the Ashoka-chakra-adjacent sense of formality, rounded card modules with soft shadows, icon+headline+description feature tiles, and a functional (not flashy) information hierarchy. Translate that into this product as follows:

- **Color system:** neutral white/light-gray base, a deep navy (`#0B2545`–ish) for headers/nav and text, a saffron/amber accent (`#F5793A`–ish) for primary CTAs and highlights, and a supporting green for "success/verified/finalized" states (Indian tricolor-adjacent without being kitschy). Severity colors for alerts: gray (info), amber (medium), orange (high), red (critical).
- **Layout:** persistent left sidebar per portal (role-specific nav items only — items the role can't access are not rendered, not just disabled), top bar with official ID, role badge, district, and notification/alert bell.
- **Dashboard home per portal:** stat cards (e.g. "Open Cases", "Pending Alerts", "Documents Awaiting Finalization") in a responsive card grid, exactly like the icon+headline+description tiles seen in the eSanjeevani reference — clean icon, bold label, one-line description.
- **Case detail page:** tabbed layout — Overview / FIRs / Investigation / Evidence / Documents / Legal / Audit Trail / Sharing — mirroring the multi-department "everything hangs off the Case" architecture.
- **Chain-of-custody & audit trail:** vertical timeline/stepper component (as seen in the eSanjeevani "Sign up → Login → Select OPD → Tele-consult" 4-step graphic) — reuse that visual pattern for custody events and for the FIR/document lifecycle status stepper (Draft → Finalized → Versioned).
- **Forms:** multi-step where appropriate (FIR creation, evidence intake), clear required-field marking, inline Zod validation errors, disabled submit until valid.
- **Typography:** one clean sans-serif (e.g. Inter), consistent type scale, high contrast for operational/low-light clarity as called out in the architecture doc; support a dark mode toggle.
- **Data tables:** sticky header, server-side pagination, search-by-identifier box prominent at the top of every list view (Case/FIR/Evidence lists) per the "structured ID search only" requirement in Section 13.
- **Trust signals:** show the SHA-256 hash (truncated with copy-to-clipboard) and a green "Integrity Verified" badge wherever a document is viewed; show "Finalized · Immutable" locked-padlock badges on finalized records.
- **Accessibility:** all interactive elements keyboard-navigable, sufficient color contrast, alt text on icons — this is a government platform and must meet basic WCAG AA.
- Do not use stock "SaaS dashboard" purple gradients or generic AI-app aesthetics — keep it formal, official, and calm, matching the reference screenshots.

---

## 13. Search

- No semantic/content search, no vector DB. Search is exclusively **structured identifier lookup** (`CASE-2026-00142`, `FIR-2026-00481`, `EVD-2026-00917`, etc.) against indexed Postgres columns.
- Every search endpoint applies the full authorization filter server-side — a user must never be able to discover the *existence* of a record they're not authorized to see (return empty results, not a 403, to avoid leaking existence via error codes vs empty state — decide once and apply consistently: **empty result set for unauthorized/nonexistent, to prevent enumeration**).

---

## 14. Security Requirements Checklist (all mandatory)

- [ ] No public registration endpoint anywhere.
- [ ] MFA (password + OTP) enforced for 100% of accounts, no bypass flag even in dev.
- [ ] All authorization decisions made server-side; verified with automated tests that hit endpoints directly (bypassing the UI) with mismatched roles/districts and assert `403`.
- [ ] Passwords hashed with Argon2 (Passlib); never logged, never returned in any API response.
- [ ] JWT access tokens short-lived and kept in memory client-side; refresh token in HttpOnly/Secure cookie.
- [ ] All file access via time-limited presigned URLs; buckets are private by default.
- [ ] SHA-256 computed and stored for every document version; verifiable on demand.
- [ ] `audit_logs` table is insert-only at both the ORM layer and the DB grant layer.
- [ ] Hash-chaining implemented and a working "verify chain" endpoint/UI exists.
- [ ] Rate limiting on auth endpoints.
- [ ] All secrets (DB creds, JWT signing key, storage keys) loaded from environment variables / `.env` (git-ignored), never hardcoded.
- [ ] Input validation via Pydantic (backend) and Zod (frontend) on every form/endpoint.
- [ ] CORS locked to the known frontend origin(s) only.
- [ ] HTTPS assumed in deployment config (document this even if local dev uses HTTP).
- [ ] SQL access exclusively through SQLAlchemy ORM/parameterized queries — no raw string-interpolated SQL anywhere.

---

## 15. Non-Functional Requirements

- **Reliability:** all state-changing operations wrapped in DB transactions; a failed file upload must not leave an orphaned `document_versions` row (use a two-phase pattern: upload to storage first, then commit metadata row, with cleanup on failure).
- **Performance:** paginate all list endpoints (default page size 25); index all foreign keys and all human-readable ID columns.
- **Observability:** structured JSON logging on the backend (separate from the audit log, this is operational logging), and a `/health` endpoint.
- **Portability:** entire stack runs via `docker compose up` with seeded demo data (see Section 17).
- **Config:** one `.env.example` file documenting every required environment variable.

---

## 16. API Surface (representative — implement all, follow REST conventions and this naming)

```
POST   /api/v1/auth/login
POST   /api/v1/auth/verify-otp
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout

POST   /api/v1/admin/users                     (Central/District Admin only)
GET    /api/v1/admin/users
PATCH  /api/v1/admin/users/{id}/status
POST   /api/v1/admin/roles

POST   /api/v1/cases
GET    /api/v1/cases/{case_number}
GET    /api/v1/cases?search=CASE-2026-00142
POST   /api/v1/cases/{case_number}/share

POST   /api/v1/firs
PATCH  /api/v1/firs/{fir_number}/finalize

POST   /api/v1/investigations
POST   /api/v1/investigations/{id}/diary-entry

POST   /api/v1/evidence
POST   /api/v1/evidence/{evd_number}/transfer-custody

POST   /api/v1/legal-records

POST   /api/v1/documents/upload
GET    /api/v1/documents/{doc_number}/download
POST   /api/v1/documents/{doc_number}/new-version
PATCH  /api/v1/documents/{doc_number}/finalize

POST   /api/v1/women-safety/incidents
GET    /api/v1/women-safety/incidents/{ws_number}

GET    /api/v1/audit/verify-chain
GET    /api/v1/audit?resource_id=...

GET    /api/v1/alerts
PATCH  /api/v1/alerts/{id}/resolve
PATCH  /api/v1/alerts/{id}/escalate
```

---

## 17. Seed Data (required for the hackathon demo)

Ship a seed script (run automatically on `docker compose up` first boot, or via `make seed`) that creates:
- 1 Central Admin, 2 District Admins (2 districts), and at least one user per remaining portal role.
- 3–4 sample Cases, each with a linked FIR, at least one Investigation entry, one Evidence item with a 2-step custody chain, one Legal record, and 2 versioned Documents (one finalized, one draft).
- 1 sample Women Safety incident referencing one of the seeded FIRs.
- Enough historical audit log entries (including a few intentionally "suspicious" ones — e.g. simulated off-hours access, simulated bulk downloads) so the AI anomaly dashboard has real alerts to display out of the box, not an empty state, on first login.

Print seeded login credentials (official ID + password; OTP shown in console/dev mode) to the terminal on seed completion so judges can log in immediately.

---

## 18. Definition of Done

The build is complete only when **all** of the following are true, verified manually and via the automated test suite:

1. `docker compose up` brings up the full stack with no manual steps beyond that.
2. All 7 portals are reachable, role-guarded both client- and server-side, and visually match the design system in Section 12.
3. Full auth flow (login → OTP → JWT) works; wrong password, wrong OTP, and expired session are all handled with correct error states.
4. A Case can be created, an FIR filed against it (auto-creating or linking the case), a document uploaded/hashed/finalized/versioned, evidence logged with a working chain-of-custody timeline, a legal record attached, and cross-district share created and correctly restricted to View+Download.
5. Attempting to bypass permissions via direct API calls (wrong role/district/no share) is rejected with `403` and produces an `UNAUTHORIZED_ACCESS_ATTEMPT` audit row.
6. The audit log is populated automatically for every action above, is hash-chained, and the "verify chain" feature correctly detects a tampering test case.
7. The AI anomaly engine produces at least one Medium/High/Critical alert from seed data and the District→Central escalation path is demonstrable in the UI.
8. The Women Safety portal never leaks case/FIR content — verified by an automated test.
9. No `TODO`, `FIXME`, mock/stub logic, or hardcoded secret remains in the codebase.
10. `pytest` (backend) and `vitest` (frontend) suites pass in CI/locally with meaningful coverage of the auth/RBAC and document-integrity paths in particular.

---

## 19. Explicit Non-Goals (do not build these)

- No public citizen-facing registration or self-service portal.
- No semantic/AI content search over documents.
- No blockchain — the "hash-chaining" is a Postgres-stored SHA-256 chain, not a distributed ledger.
- No mobile app — responsive web only.
- No payment, billing, or notification-marketing features.
- The Women Safety module is **not** a standalone public helpline product — it is an internal dispatch/logging module only.

---

*End of PRD. Build to this specification exactly; where a micro-decision isn't covered (e.g. exact button copy), default to the design system in Section 12 and the closest existing pattern in this document rather than introducing a new pattern.*
