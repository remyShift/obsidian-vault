---
type: index
projet: Oli's Lab
updated: 2026-05-05
---

# ADR Index - Oli's Lab

Architectural Decision Records for the Oli's Lab project.
All ADRs are written in English (audience: Michele, Diego, team).

---

## How to use

- **Status: Accepted** - decision is in effect
- **Status: Proposed** - decision is pending team validation
- **Status: Deprecated** - superseded or no longer relevant

---

## CMS & Content

| ID | Title | Status | Date | Meeting |
|---|---|---|---|---|
| [[ADR-001]] | Payload CMS as content source of truth | Accepted | 2026-02-11 | [[11-02-2026 Payload CMS POC Premier Etat des Lieux]] |
| [[ADR-002]] | CMS hosting - ECS Fargate for production | Accepted | 2026-02-17 | [[17-02-2026 CMS Infrastructure Image Upload]] |
| [[ADR-003]] | CMS media - two separate Payload collections | Accepted | 2026-03-02 | [[02-03-2026 CMS Payload Strategie Images]] |
| [[ADR-004]] | CMS sync - per-collection endpoints | Accepted | 2026-03-31 | [[31-03-2026 CMS Sync Script Code Review]] |
| [[ADR-015]] | CMS translation - Payload plugin over custom solution | Accepted | 2026-04-30 | [[30-04-2026 Automated Translation SEO Plugin]] |

## Frontend Migration

| ID | Title | Status | Date | Meeting |
|---|---|---|---|---|
| [[ADR-005]] | Frontend migration from CRA to Next.js App Router | Accepted | 2026-03-02 | [[02-03-2026 Tech Weekly]] |
| [[ADR-006]] | API runtime - persistent Node.js server over Lambda | Accepted | 2026-03-02 | [[02-03-2026 Tech Weekly]] |
| [[ADR-013]] | Cart storage - database as single source of truth | Accepted | 2026-03-02 | [[02-03-2026 Tech Weekly]] |

## Search

| ID | Title | Status | Date | Meeting |
|---|---|---|---|---|
| [[ADR-007]] | Search - dedicated CRA page instead of Next.js modal | Accepted | 2026-04-29 | [[29-04-2026 Search Page Strategie Decision]] |
| [[ADR-008]] | Search API - unified endpoint replacing 5 parallel calls | Proposed | 2026-05-05 | [[29-04-2026 Search Page Strategie Decision]] |

## Marketing & Integrations

| ID | Title | Status | Date | Meeting |
|---|---|---|---|---|
| [[ADR-009]] | Product feeds - XML on S3 + CloudFront | Accepted | 2026-04-28 | [[28-04-2026 Product Catalogue Management]] |
| [[ADR-010]] | Google Merchant - migration to Merchant API v1 | Accepted | 2026-04-21 | [[Migration Merchant API]] |

## Analytics

| ID | Title | Status | Date | Meeting |
|---|---|---|---|---|
| [[ADR-011]] | Analytics - custom client-side wrapper service | Accepted | 2025-10-07 | [[07-10-2025 Tech Weekly]] |
| [[ADR-012]] | Analytics - two event patterns (behavioral vs transactional) | Accepted | 2026-03-03 | [[03-03-2026 Events Capturing]] |

## Data Model

| ID | Title | Status | Date | Meeting |
|---|---|---|---|---|
| [[ADR-014]] | Categories - dedicated MongoDB collections | Accepted | 2026-01-22 | [[22-01-2026 Migration Categories Subcategories]] |

## Architecture & Patterns

| ID | Title | Status | Date | Meeting |
|---|---|---|---|---|
| [[ADR-016]] | API v2 backend pattern - load / execute / return | Accepted | 2026-01-28 | [[28-01-2026 Code Review Tests Architecture API]] |
