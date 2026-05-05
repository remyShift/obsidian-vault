---
updated: 05-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
05-05-2026 — US checkout produites (13 unit + 5 E2E) + tentative migration SEO plugin abandonnee, OpenAI deja integre via plugin natif.

## Etat du projet
- SearchPage : 4 onglets operationnels (Products, Articles, Bundles, Actives)
- SEO CMS : `@payloadcms/plugin-seo` avec `generateTitle`/`generateDescription` branchees sur OpenAI (`gpt-4o-mini`) — operationnel
- Tests unitaires checkout : 13 US definies (price engine, schemas custom, step machine), pret pour implementation
- Tests E2E checkout : 5 US definies (flow-focused, pas UI), Playwright a configurer dans apps/web
- Phase architecture feeds XML : structure definie (GMC, Meta, Klaviyo), en attente d'implementation
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026

## Faits recents importants
- Le checkout est dans `apps/web/app/secure-checkout/` (pas `checkout-guest/`) — le plan Playwright a le mauvais chemin
- `computePriceBreakdown()` : `voucherDiscountValue` reduit `discountedSubtotalTTC` mais n'affecte pas le seuil de livraison gratuite
- La delivery step a un `canContinue()` qui bloque si relay selectionne sans pickup point
- `@payload-enchants/seo` incompatible avec Payload stable — ne pas utiliser
- SEO OpenAI fonctionne nativement via `generateTitle`/`generateDescription` dans la config `seoPlugin`

## Decisions actives
- Perimetre tests unitaires : price engine + form validation custom + step machine (payload builder exclu)
- Perimetre tests E2E : happy path, edition d'etape, voucher, carte refusee, livraison gratuite (flow uniquement)
- SEO : plugin officiel uniquement, pas de plugin tiers
- 3 feeds XML distincts depuis Payload (gmc, meta, klaviyo) sur S3 + CloudFront

## Prochaines etapes
- Corriger le chemin Playwright (`/secure-checkout` pas `/checkout-guest`)
- Verifier exports (`createStepReducer`, `canContinue`) avant les tests unitaires
- Implementer : `price-engine.test.ts`, `schemas.test.ts`, `useCheckoutSteps.test.ts`
- Configurer Playwright dans `apps/web/` et implementer `checkout-guest.spec.ts`
- Tester visuellement les 4 onglets SearchPage en conditions reelles
- Implémenter le service `feedGenerator` (Payload -> XML x3)
