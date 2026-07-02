---
updated: 02-07-2026
project: olis-lab
tags: [hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
02-07-2026 — PR #1870 mergée mais migration exécutée (local + prod) avec le bug limit → 10 actives traduits seulement ; fix `pagination/limit` fait, PR ouverte par Rémy, re-run à orchestrer. Navbar Bottom CTA : PR #1874 ouverte.

## État du projet
- **Migration ProductActives (#1870, mergée `8e4f39d12`) incomplète en prod ET local** : `payload.find` sans `pagination:false, limit:0` → 10 docs traités. Les autres actives : rien d'écrit, "fr = en" apparent = fallback sur scalaire legacy intact. **Fix fait** sur `fix/product-actives-migration-limit`, PR ouverte par Rémy. Re-run = Rémy supprime le record `payload-migrations` (local + prod) puis `pnpm migrate` ; le re-run écrasera les 10 FR déjà écrits (accepté, aucune correction manuelle faite).
- **PR #1874 ouverte** (navbar Bottom CTA) : groupe `cta` top-level dans le global `navbar`, consommé par web_client ET apps/web. `packages/ui` inchangé. Pas de migration : seed manuel (cms_dev seedé, path à passer en `/products` ; stage/prod à faire avant flag).

## Faits récents importants
- **`payload.find` sans pagination explicite = 10 docs max** — toute migration qui balaye une collection doit porter `pagination: false, limit: 0`.
- **`.env.local` prime sur `.env` pour `payload migrate`** (une migration test navbar est partie sur cms_dev Atlas ; nettoyée). Vérifier la base ciblée avant chaque run.
- Détection "fr manquant" : uniquement via `locale: 'all'` ou `fallbackLocale: 'none'` — un read fr normal sert EN par fallback.
- Guard `assertNavbar` **fail fast** sur `cta` (required, pas de fallback) : doc non seedé → apps/web retombe sur legacy, web_client flag ON = menus vides. Seeder AVANT d'activer `dev_payload_navbar`.
- `packages/shared` consommé via `dist/` → rebuild avant typecheck après modif.

## Décisions actives
- Re-run #1870 en Option A (fix en place + delete record + re-run), pas de migration corrective.
- Seed manuel des globals plutôt que migrations (navbar cta) ; fail fast dans les guards pour les champs required.
- Items/CTA CMS navigués en `app: 'legacy'` (full reload) dans apps/web.

## Prochaines étapes
- Merger la PR du fix limit → delete records `payload-migrations` (local + prod, par Rémy) → re-run `pnpm migrate` → contrôler le mapping EN→FR, relire les trads INCI.
- PR #1874 : review + merge ; path `/products` dans l'admin cms_dev ; seeder stage/prod avant flag.
- Curated PLP : backfiller `cartProduct` ; cart #1859 ; navbar #1839 ; PR #1853 ; plan globals apps/cms.
