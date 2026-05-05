---
updated: 05-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
05-05-2026 — Session planification : US unit tests checkout + US E2E checkout produites et validees.

## Etat du projet
- SearchPage : 4 onglets operationnels (Products, Articles, Bundles, Actives), architecture extensible
- Tests unitaires checkout : 13 US definies (price engine, schemas custom, step machine), pret pour implementation
- Tests E2E checkout : 5 US definies (flow-focused, pas UI), Playwright a configurer dans apps/web
- Phase architecture feeds XML : structure definie (GMC, Meta, Klaviyo), en attente d'implementation et POC sandbox
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026

## Faits recents importants
- Le checkout est dans `apps/web/app/secure-checkout/` (pas `checkout-guest/`) — le plan Playwright a aussi le mauvais chemin
- `computePriceBreakdown()` gere un `voucherDiscountValue` : reduit `discountedSubtotalTTC` mais n'affecte pas le seuil de livraison gratuite
- La delivery step a un `canContinue()` qui bloque si relay selectionne sans pickup point
- Schemas : on teste uniquement le code custom (`.refine()` phone, cross-field billing) - pas les validateurs natifs Zod
- `createStepReducer` et `canContinue` probablement non exportes - a verifier avant les tests
- Tests E2E : valident que le flow aboutit (ordre cree, montant correct), pas que des elements HTML sont visibles

## Decisions actives
- Perimetre tests unitaires : price engine + form validation custom + step machine (payload builder exclu)
- Perimetre tests E2E : happy path, edition d'etape, voucher, carte refusee, livraison gratuite (flow uniquement)
- User stories ecrites au niveau metier, sans variables de code ni valeurs hardcodees
- 3 feeds XML distincts depuis Payload (gmc, meta, klaviyo) sur S3 + CloudFront
- POC sandbox requis avant suppression du code Content API v2.1

## Prochaines etapes
- Corriger le chemin dans le config Playwright (`/secure-checkout` pas `/checkout-guest`)
- Verifier exports (`createStepReducer`, `canContinue`) avant d'ecrire les tests unitaires
- Implementer les tests unitaires : `price-engine.test.ts`, `schemas.test.ts`, `useCheckoutSteps.test.ts`
- Configurer Playwright dans `apps/web/` et implementer `checkout-guest.spec.ts`
- Tester visuellement les 4 onglets SearchPage en conditions reelles
- Implémenter le service `feedGenerator` (Payload -> XML x3)
