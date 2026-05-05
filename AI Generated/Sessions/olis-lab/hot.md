---
updated: 05-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
05-05-2026 — Plan de refacto search page redige et soumis a l'equipe (3 options, Option A recommandee).

## Etat du projet
- SearchPage : 5 onglets operationnels (Products, Articles, Bundles, Actives, Brands)
- Brands endpoint : `GET /brands/search/:query` dans `notionBrandsController` / `notionBrandsRouter` (monte sur `/brands`)
- SEO CMS : `@payloadcms/plugin-seo` avec `generateTitle`/`generateDescription` branchees sur OpenAI — operationnel
- Tests unitaires checkout : 13 US definies (price engine, schemas custom, step machine), implementation a faire
- Tests E2E checkout : 5 US definies (flow-focused, pas UI), Playwright a configurer dans apps/web
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Search refactor : plan soumis a l'equipe, en attente de decision

## Faits recents importants
- `searchBrands` est dans `notionBrandsController.js` (pas `products.controller.js`) — le brands router est monte sur `/brands`
- `ProductsApi.ts` appelle `/brands/search/:query` (pas `/products/search/brands/:query`)
- `validateInput.js` existe dans le serveur mais est vide — prevu comme middleware de validation partage, jamais implemente
- Les 5 endpoints search actuels : pas de validation Joi, nommage incoherent, 5 requetes paralleles cote client
- Le checkout est dans `apps/web/app/secure-checkout/` (pas `checkout-guest/`) — le plan Playwright a le mauvais chemin

## Decisions actives
- Search refactor : Option A recommandee — endpoint unifie `GET /search?q=&lang=`, `validateInput.js` a implementer, anciens endpoints inchanges
- Analytics search : tracker uniquement les counts par categorie, pas la query brute (GDPR)
- Brands : liste de liens simples, pas de cards, query sans `lang`
- Perimetre tests unitaires : price engine + form validation custom + step machine (payload builder exclu)
- Perimetre tests E2E : happy path, edition d'etape, voucher, carte refusee, livraison gratuite (flow uniquement)
- SEO : plugin officiel uniquement, pas de plugin tiers
- 3 feeds XML distincts depuis Payload (gmc, meta, klaviyo) sur S3 + CloudFront

## Prochaines etapes
- Attendre decision equipe sur le refacto search, puis implementer (plan pret)
- Corriger le chemin Playwright (`/secure-checkout` pas `/checkout-guest`)
- Verifier exports (`createStepReducer`, `canContinue`) avant les tests unitaires
- Implementer : `price-engine.test.ts`, `schemas.test.ts`, `useCheckoutSteps.test.ts`
- Configurer Playwright dans `apps/web/` et implementer `checkout-guest.spec.ts`
- Implémenter le service `feedGenerator` (Payload -> XML x3)
