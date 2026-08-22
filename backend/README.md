# SAKSHI — Backend & Database Engine

**SAKSHI**: *Secure Audit & Kernel for Shared High-integrity Investigations*

This is the backend & database layer for SAKSHI built with Python, FastAPI, PostgreSQL, SQLAlchemy 2.x, and Alembic.

---

## 🏗️ Architecture & Database Design

The database is built on PostgreSQL with strict relational integrity, UUID primary keys, and comprehensive indexing.

### Created Entities & Tables (19 Tables)

1. **`districts`**: Multi-jurisdictional district organization (`district_code`, `name`, `state`, etc.).
2. **`roles`**: System & custom roles (`CENTRAL_ADMIN`, `DISTRICT_ADMIN`, `POLICE_OFFICER`, `INVESTIGATION_OFFICER`, `EVIDENCE_OFFICER`, `LEGAL_OFFICER`, `WOMEN_SAFETY_OFFICER`).
3. **`permissions`**: Granular resource-action authorization mappings (`CASE_CREATE`, `CASE_TRANSFER`, `FIR_CREATE`, `DOCUMENT_FINALIZE`, etc.).
4. **`role_permissions`**: Association table linking roles with permissions.
5. **`users`**: Official account entities with `official_id` (unique), role assignment, and district scoping.
   - *Rule*: `district_id` is `NULL` only for `CENTRAL_ADMIN`. All other roles require a valid `district_id`.
6. **`cases`**: Central entity (`case_id` e.g., `CASE-2026-000142`), district-scoped, optional linking to FIRs, Evidence, Investigation & Legal records.
7. **`case_transfers`**: Audit-logged inter-district case transfers preserving complete historical custody.
8. **`firs`**: First Information Reports (`fir_id` e.g., `FIR-2026-00481`), optionally linked to cases.
9. **`investigation_records`**: District-scoped investigation notes, assigned officers, and progress tracking.
10. **`evidence`**: Digital and physical evidence registry with custodian assignments.
11. **`evidence_custody_events`**: Chronological, immutable chain of custody audit records.
12. **`legal_records`**: Court filings, charge sheets, legal notices, and judgments.
13. **`documents`**: Document metadata (`DOC-2026-000142`), file size, storage keys, and version pointers (Object storage pointers).
14. **`document_versions`**: Deterministic versioning (`v1, v2...`), SHA-256 integrity file hashes, and immutable finalization states.
15. **`approvals`**: Workflow authorization requests for permanent modifications or special access.
16. **`document_shares`**: Controlled explicit cross-district and cross-user document sharing records.
17. **`women_safety_records`**: Integrated dispatch and response record management module (`WS-2026-00142`).
18. **`audit_logs`**: Append-only, tamper-evident audit log with cryptographic SHA-256 hash chains (`event_hash` & `previous_hash`).
19. **`security_alerts`**: District and Central Admin security alert detection and escalation engine (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

---

## 🚀 Setup & Execution Instructions

### 1. Prerequisites & Environment
Ensure PostgreSQL is running locally or via Docker:
```bash
createdb sakshi_db
```

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Database Migrations (Alembic)
To run Alembic database migrations:
```bash
alembic upgrade head
```

To create a new migration after model changes:
```bash
alembic revision --autogenerate -m "describe_changes"
```

### 3. Seed Development Data
To seed roles, permissions, districts, Central Admin, District Admins, and operational officer accounts:
```bash
python3 app/seed.py
```

### 4. Running Database Unit Tests
Run the test suite via pytest:
```bash
python3 -m pytest -v
```

### 5. Running Backend Server (FastAPI)
```bash
uvicorn app.main:app --reload --port 8000
```
Health Check: `GET http://localhost:8000/health`
