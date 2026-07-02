---
updated: 02-07-2026
project: olis-lab
tags: [hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
02-07-2026 — Navbar CTA "Shop All" rendu éditable via le global Payload `navbar` (groupe "Bottom CTA"), branché dans les deux fronts. PR #1874 ouverte.

## État du projet
- **PR #1874 ouverte** (`refactor/add-bottom-cta-to-navbar-global` → develop) : groupe `cta` top-level dans le global `navbar` (label localisé required + path required validé interne), consommé par web_client (`useNavbarQuery`/`HomepageNavbar`) ET apps/web (`Navbar.tsx` desktop + `NavbarMenu.tsx` mobile, navigation `app: 'legacy'`). `packages/ui` inchangé. Typecheck vert.
- **Pas de migration de seed** (choix Rémy, seed à la main). cms_dev déjà seedé (EN/FR + path `/shopAll`, publié) — path à passer en `/products` dans l'admin.
- **PR #1870 (ProductActives localisé)** toujours en attente : bug `limit` à corriger (find sans `pagination:false, limit:0` → 10 docs max), gotcha faux dans le PR body, migration pas exécutée.

## Faits récents importants
- **`.env.local` prime sur `.env` pour `payload migrate`** : une migration test est partie sur cms_dev (Atlas) au lieu de cms_local. Nettoyé (record supprimé, data cta laissée). Toujours vérifier la base ciblée avant `migrate`.
- Guard `assertNavbar` **sans fallback** sur `cta` (champ required, fail fast) : doc non seedé → throw → apps/web retombe sur legacy (catch `getNavbar`), web_client flag ON = menus vides. Seeder chaque env AVANT d'activer `dev_payload_navbar`.
- Le CTA s'affiche sous les 3 menus (footer du dropdown) → champ top-level, pas dans `shop`.
- `packages/shared` consommé via `dist/` → rebuild obligatoire avant typecheck après modif.
- `cmsClient` REST non authentifié ne lit que la version publiée des globals.

## Décisions actives
- Seed manuel des globals plutôt que migrations (navbar cta).
- Fail fast dans les guards pour les champs required du CMS.
- Items/CTA CMS navigués en `app: 'legacy'` (full reload) dans apps/web tant que la migration des routes n'est pas finie.

## Prochaines étapes
- PR #1874 : review + merge ; path `/products` dans l'admin cms_dev ; seeder stage/prod avant flag.
- PR #1870 : fix `pagination/limit`, corriger le PR body, poster les réponses Diego, exécuter la migration sur cms_local (vérifier la base !), review + merge.
- Curated PLP : backfiller `cartProduct` + trancher drop-post-pagination.
- Cart #1859 → CI + review Diego + merge ; navbar #1839 ; PR #1853 SKU/EAN ; plan globals apps/cms.
