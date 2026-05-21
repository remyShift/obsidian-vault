---
updated: 21-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
21-05-2026 — Filtering/sort integre sur le tab Products de la SearchPage ; types SearchResultItem simplifies.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS integration : infra en place, tests unitaires `uniquePerCategory` ecrits, PR prete, attente retour Diego
- Guards Payload : implementes, testes, 2 fichiers pilotes migres, PR `feat/custom-fix-type-inference-payload` prete
- PostHog bug : diagnostique, fix code pret, en attente implementation + verification staging
- SearchPage filtering : implemente sur branch `feat/add-filtering-search-page`, PR a ouvrir
- Page builder Payload blocks : plan approuve (5 types, apps/web, shop avant homepage), implementation a venir
- BrandsHomePage regression : fixee localement, PR a ouvrir

## Faits recents importants
- Migration Cursor -> Zed (PC en fin de vie, Cursor trop gourmand en ressources)
- `CategoriesFilter` lit tout depuis `translations[lang].*` — pas de changement backend pour le filtering SearchPage
- Backend : `isBundle: true` ajoute dans `searchController.js` avant l'interleave products/bundles
- Types nettoyés : `ProductSearchItem`, `BundleSearchItem`, `SearchResultItem` supprimes — `ShopProduct[]` partout
- `ProductResults.tsx` refonde : CategoriesFilter + layout deux colonnes + reset sur nouvelle query
- Bug PR #1700 : `filteredProducts` init `null` vs `[]` — fix applique localement

## Decisions actives
- Tests `uniquePerCategory` : unitaires uniquement (pas d'integration Payload), injection de dependance explicite
- Blocks : cibler `apps/web` (Next.js) uniquement, shop page avant homepage
- Blocks : 5 types — HeroBlock, ProductGridBlock, BrandOfMonthBlock, BannerBlock, FeaturesBlock
- PostHog : ne pas modifier `defaults` ni `cookieless_mode` — seul le re-apply au montage manque
- SearchPage : pas de type intermediaire, `ShopProduct` directement, discrimination via `isBundle`
- Fix BrandsHomePage : `null` initial > booleen `hasActiveFilters` supplementaire

## Prochaines etapes
- Ouvrir PR `feat/add-filtering-search-page` + tester en staging
- Ouvrir PR fix BrandsHomePage (regression #1700)
- Implementer fix PostHog dans les deux hooks + verifier staging
- Merger `chore/cms-int-tests-ci` apres retour Diego
- Resoudre bug S3 double declaration XML (bloquant)
- Implementer CRON + feed Meta
