---
updated: 20-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
20-05-2026 — Ticket PostHog iteré suite retour reviewer, reponse de code review redigée (explication defaults + cookieless_mode) ; tests CMS finalises, PR prete.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS integration : infra en place, tests unitaires `uniquePerCategory` ecrits, PR prete, attente retour Diego
- Guards Payload : implementes, testes, 2 fichiers pilotes migres, PR `feat/custom-fix-type-inference-payload` prete
- PostHog bug : diagnostique, fix code pret, en attente implementation + verification staging
- SearchController : backend créé (`/search/products-bundles/:query/:lang`), frontend non encore branché (problème serveur bloquant)
- Page builder Payload blocks : plan approuvé, implémentation à venir

## Faits recents importants
- `checkUniquePerCategory(field, value, data, find)` — logique pure extraite de `Subcategories.ts`, testable sans Payload
- `uniquePerCategory` = wrapper d'une ligne qui branche `req.payload.find` — les seuls casts sont là, centralisés
- `vitest.unit.config.mts` + `test:unit` dans package.json — 8 tests en 5ms, zéro DB
- PR description + commentaire `Subcategories.ts` rédigés et prêts
- Bug PostHog : commit coupable `5db5dceee`, fix = `useEffect` de montage pour re-appliquer consentement stocké
- `searchController.js` : `interleaveProductsAndBundles` (1 bundle / 2 produits) + appels parallèles

## Decisions actives
- Tests `uniquePerCategory` : unitaires uniquement (pas d'intégration Payload), injection de dépendance explicite
- Blocks : cibler `apps/web` (Next.js) uniquement, shop page avant homepage
- Blocks : 5 types — HeroBlock, ProductGridBlock, BrandOfMonthBlock, BannerBlock, FeaturesBlock
- PostHog : ne pas modifier `defaults` ni `cookieless_mode` — seul le re-apply au montage manque
- SearchController : 1 bundle / 2 produits, `isBundle` dérivé de `type`

## Prochaines etapes
- Merger `chore/cms-int-tests-ci` apres retour Diego
- Implementer fix PostHog dans les deux hooks + verifier staging
- Ouvrir PR PostHog + ticket Linear
- Résoudre problème serveur search puis rebrancher frontend
- Resoudre bug S3 double declaration XML (bloquant)
- Implementer CRON + feed Meta
