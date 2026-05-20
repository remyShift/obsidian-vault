---
updated: 20-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
20-05-2026 — Plan page builder Payload blocks rédigé et approuvé (homepage + shop page via Globals) ; SearchController backend créé, bug PostHog diagnostiqué.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS integration : infra en place (branche Diego), 5/5 passent, en attente validation merge
- Guards Payload : implementes, testes, 2 fichiers pilotes migres, PR `feat/custom-fix-type-inference-payload` prete
- PostHog bug : diagnostique, fix code pret, en attente implementation + verification staging
- SearchController : backend créé (`/search/products-bundles/:query/:lang`), frontend non encore branché (problème serveur bloquant)
- Page builder Payload blocks : plan approuvé, implémentation à venir

## Faits recents importants
- `globals: []` dans `payload.config.ts` — rien de défini, prêt à accueillir Homepage + ShopPage
- Shop page hardcode "Grown Alchemist" en dur dans `Shop.tsx` — cas d'usage direct pour BrandOfMonthBlock
- `apps/web` a déjà `PayloadSDK` server-side dans `lib/api/cms.ts` — prêt à consommer des globals via simple `getGlobal()`
- Payload blocks = union typée en tableau JSON, réorderable drag-and-drop dans l'admin ; Globals = singletons Payload (homepage, shop page)
- Bug PostHog : `useCookieConsent` ne reapplique jamais le consentement au rechargement — commit coupable `5db5dceee` (bump posthog-js 1.369.2, rend `defaults: 2025-05-24` strict)
- `searchController.js` : `interleaveProductsAndBundles` (1 bundle / 2 produits) + appels parallèles aux deux modèles
- `computeCartSnapshot.ts` avait un `else if ())` (condition vide) — corrige en `else`

## Decisions actives
- Blocks : cibler `apps/web` (Next.js) uniquement, pas `web_client` ; shop page en premier (scope plus petit, ROI immédiat)
- Blocks : 5 types prévus — HeroBlock, ProductGridBlock, BrandOfMonthBlock, BannerBlock, FeaturesBlock
- PostHog : ne pas modifier `defaults` ni `cookieless_mode` — RGPD-corrects, seul le re-apply au montage manque
- SearchController : 1 bundle / 2 produits, `isBundle` dérivé de `type`, pas de `SearchApi.ts` dédié
- Guards : factory closure, pas classe — evite binding `this`

## Prochaines etapes
- Résoudre le problème serveur préexistant puis rebrancher le frontend sur `/search/products-bundles`
- Implementer le fix PostHog dans les deux hooks useCookieConsent + verifier staging
- Ouvrir PR PostHog + ticket Linear
- Ouvrir PR `feat/custom-fix-type-inference-payload`
- Implémenter page builder blocks selon plan `dans-mon-cms-dans-parsed-cocoa.md` (8 étapes)
- Merger `chore/cms-int-tests-ci` apres retour Diego
- Resoudre bug S3 double declaration XML (bloquant)
- Implementer CRON + feed Meta
