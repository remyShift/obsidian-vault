---
updated: 20-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
20-05-2026 — SearchController backend créé (endpoint unifié products+bundles), frontend en attente résolution problème serveur ; bug PostHog diagnostiqué, fix pas encore appliqué.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS integration : infra en place (branche Diego), 5/5 passent, en attente validation merge
- Guards Payload : implementes, testes, 2 fichiers pilotes migres, PR `feat/custom-fix-type-inference-payload` prete
- PostHog bug : diagnostique, fix code pret, en attente implementation + verification staging
- SearchController : backend créé (`/search/products-bundles/:query/:lang`), frontend non encore branché (problème serveur bloquant le test)

## Faits recents importants
- Bug PostHog : `useCookieConsent` ne reapplique jamais le consentement au rechargement — `opt_in_capturing()` uniquement appele sur interaction banniere, jamais au montage pour les utilisateurs ayant deja consenti
- Commit coupable : `5db5dceee` (17 avril 2026) — bump posthog-js 1.335.2 -> 1.369.2, rend `defaults: '2025-05-24'` strict (chaque session demarre en etat "pending")
- `searchController.js` : `interleaveProductsAndBundles` (1 bundle / 2 produits) + appels parallèles à `shopProductSchema.getSearchProducts` et `Bundles.getSearchBundles`
- Les deux modèles ajoutent déjà `type: 'product'` / `type: 'bundle'` sur chaque item — inutile de le faire dans le controller
- `isBundle` absent du select MongoDB de `getSearchBundles` → dériver de `type` côté frontend
- `computeCartSnapshot.ts` avait un `else if ())` (condition vide) — corrige en `else`

## Decisions actives
- SearchController : 1 bundle / 2 produits, ordre de pertinence respecté, pas de `SearchApi.ts` dédié (axios inline dans le hook)
- `isBundle` dérivé de `type` avant `mapMixedProducts` — zéro duplication de mapping
- PostHog : ne pas modifier `defaults: '2025-05-24'` ni `cookieless_mode: 'on_reject'` — RGPD-corrects, seul le re-apply au montage manque
- Guards : factory closure, pas classe — evite binding `this`
- `@olis-lab/shared` a maintenant subpath `./payload` et Vitest configure (20 tests)

## Prochaines etapes
- Résoudre le problème serveur préexistant puis rebrancher le frontend sur `/search/products-bundles`
- Implementer le fix PostHog dans les deux hooks useCookieConsent + verifier staging
- Ouvrir PR PostHog + ticket Linear (template en anglais pret)
- Ouvrir PR `feat/custom-fix-type-inference-payload` (message deja redige)
- Merger `chore/cms-int-tests-ci` apres retour Diego
- Resoudre bug S3 double declaration XML (bloquant)
- Implementer CRON + feed Meta
