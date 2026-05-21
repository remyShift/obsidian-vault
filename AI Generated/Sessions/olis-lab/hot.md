---
updated: 21-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
21-05-2026 — Diagnostic et fix regression PR #1700 (BrandsHomePage / Oli's Lab Collectibles).

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS integration : infra en place, tests unitaires `uniquePerCategory` ecrits, PR prete, attente retour Diego
- Guards Payload : implementes, testes, 2 fichiers pilotes migres, PR `feat/custom-fix-type-inference-payload` prete
- PostHog bug : diagnostique, fix code pret, en attente implementation + verification staging
- SearchController : backend cree (`/search/products-bundles/:query/:lang`), frontend non encore branche (probleme serveur bloquant)
- Page builder Payload blocks : plan approuve (5 types, apps/web, shop avant homepage), implementation a venir
- BrandsHomePage regression : fixee localement, PR a ouvrir

## Faits recents importants
- Migration Cursor -> Zed (PC en fin de vie, Cursor trop gourmand en ressources)
- Zed Rules Library : palette commandes > "agent: open rules library" > section "Commit message" -> prompt personnalisable sans provider externe
- System prompt par projet Zed : fichier `.zed/rules/project.md` au root du repo (equivalent CLAUDE.md)
- Bug PR #1700 : `filteredProducts` initialise a `[]` = indiscernable de "filtre actif 0 resultats" -> Oli's Lab Collectibles ne montrait plus de produits
- Fix : init `null`, condition `filteredProducts !== null && filteredProducts.length === 0`, fallback `filteredProducts ?? products`
- `CategoriesFilter` masquait le bug sur les marques normales car il appelle `onFilteredProducts` au montage avec tous les produits
- Bug PostHog : commit coupable `5db5dceee`, fix = `useEffect` de montage pour re-appliquer consentement stocke

## Decisions actives
- Tests `uniquePerCategory` : unitaires uniquement (pas d'integration Payload), injection de dependance explicite
- Blocks : cibler `apps/web` (Next.js) uniquement, shop page avant homepage
- Blocks : 5 types — HeroBlock, ProductGridBlock, BrandOfMonthBlock, BannerBlock, FeaturesBlock
- PostHog : ne pas modifier `defaults` ni `cookieless_mode` — seul le re-apply au montage manque
- SearchController : 1 bundle / 2 produits, `isBundle` derive de `type`
- Fix BrandsHomePage : `null` initial > booleen `hasActiveFilters` supplementaire

## Prochaines etapes
- Ouvrir PR fix BrandsHomePage (regression #1700)
- Configurer regle "Commit message" dans Zed Rules Library (Conventional Commits)
- Creer `.zed/rules/project.md` dans olis-lab avec contexte projet
- Merger `chore/cms-int-tests-ci` apres retour Diego
- Implementer fix PostHog dans les deux hooks + verifier staging
- Resoudre probleme serveur search puis rebrancher frontend
- Resoudre bug S3 double declaration XML (bloquant)
- Implementer CRON + feed Meta
