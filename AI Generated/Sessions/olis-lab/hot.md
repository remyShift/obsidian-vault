---
updated: 27-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
27-05-2026 — Refonte fixtures guardProduct (tsc clean, 41 verts), bug apostrophe typographique corrige, TradingPlan Global refactore.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Guards Payload : tsc clean, 41 tests verts, PR prete a ouvrir (`feat/custom-fix-type-inference-payload`)
- Trading plan CMS : Global refactore + plan integration web_client approuve, a executer
- Page builder blocks : plan approuve, apres deadline trading plan

## Faits recents importants
- `assertProduct` prend `Product` directement (plus de `RawProduct`) — `brand` retourne l'objet complet, pas `brand.name`
- Strings avec apostrophes = guillemets doubles obligatoires (formatter convertit les apostrophes ASCII en U+2018/U+2019)
- Tests `assertProduct` : pas de `makeRawProduct` ni `as unknown as Product` — cas null/impossible appartiennent a `guard.test.ts`
- `tsc --noEmit` a lancer regulierement — vitest/esbuild masque des erreurs de type reelles
- `@payloadcms/sdk` supporte `findGlobal()` — pattern identique a `apps/web/lib/api/cms.ts`
- `TradingPlan` type deja genere dans `packages/shared/src/payload-types.ts:1048`
- `REACT_APP_PAYLOAD_CMS_URL` absent de `.env.prod` — a ajouter avant deploy prod
- `resolveUploadUrl` dans `sync/transformers/` est une reimplementation de `assertMedia` — a remplacer
- `resolveUploadUrlNullable` retourne null (voulu) — ne pas remplacer

## Decisions actives
- Trading plan phase 1 avant le 1er juin (deadline imperative)
- Guards : `assertProduct(raw: Product)` sans type intermediaire, `as Product` sur le retour de `makeProduct`
- Strings contenant apostrophes = guillemets doubles dans tout le projet
- `title`/`ctaLink` brandOfTheMonth : persistes en DB, auto-remplis via hook `beforeChange`
- Trading plan web_client : `@payloadcms/sdk` + `findGlobal`, calque exact sur `apps/web/lib/api/cms.ts`

## Prochaines etapes
- Ouvrir PR `feat/custom-fix-type-inference-payload` (guards + tests + fix computeCartSnapshot + guardProduct refacto)
- Executer plan integration trading plan dans `apps/web_client` (SDK + hook + wiring Shop/Home)
- Ajouter `REACT_APP_PAYLOAD_CMS_URL` dans `.env.prod`
- Remplacer `resolveUploadUrl` dans transformers par `assertMedia`
- Ouvrir PR `feat/loading-state-plp` et `feat/add-filtering-search-page`
- Resoudre bug S3 double declaration XML (bloquant)
