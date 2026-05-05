---
updated: 05-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
05-05-2026 — Session planification : production des user stories pour les tests unitaires du checkout (secure-checkout).

## Etat du projet
- SearchPage : 4 onglets operationnels (Products, Articles, Bundles, Actives), architecture extensible
- Tests unitaires checkout : US definies, pret pour implementation (price engine, schemas custom, step machine)
- Phase architecture feeds XML : structure definie (GMC, Meta, Klaviyo), en attente d'implementation et POC sandbox
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026

## Faits recents importants
- `useSearchPageQuery` retourne `{ products, articles, bundles, actives }` — toutes les collections search en un hook
- Le checkout est dans `apps/web/app/secure-checkout/` (pas `checkout-guest/`)
- `computePriceBreakdown()` gere un `voucherDiscountValue` : reduit `discountedSubtotalTTC` mais n'affecte pas le seuil de livraison gratuite
- La delivery step a un `canContinue()` qui bloque si relay selectionne sans pickup point
- Schemas : on teste uniquement le code custom (`.refine()` phone, cross-field billing) - pas les validateurs natifs Zod
- `createStepReducer` et `canContinue` probablement non exportes - a verifier avant les tests
- GMC + Meta partagent le format RSS 2.0, Klaviyo requiert flat XML — 3 feeds distincts obligatoires

## Decisions actives
- Perimetre tests unitaires : price engine + form validation custom + step machine (payload builder exclu pour l'instant)
- User stories ecrites au niveau metier, sans variables de code ni valeurs hardcodees
- Pattern map pour les onglets SearchPage (extensible sans toucher au JSX)
- 3 feeds XML distincts depuis Payload (gmc, meta, klaviyo) sur S3 + CloudFront
- POC sandbox requis avant suppression du code Content API v2.1

## Prochaines etapes
- Verifier exports (`createStepReducer`, `canContinue`) avant d'ecrire les tests
- Implementer les tests : `price-engine.test.ts`, `schemas.test.ts`, `useCheckoutSteps.test.ts`
- Tester visuellement les 4 onglets SearchPage en conditions reelles
- Implémenter le service `feedGenerator` (Payload -> XML x3)
- Configurer S3 + CloudFront pour les feeds
- POC sandbox : GMC DataSources + Meta + Klaviyo
- Valider criteres go/no-go avant de virer l'ancien code Content API
