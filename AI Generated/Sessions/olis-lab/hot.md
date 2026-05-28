---
updated: 27-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
27-05-2026 — guardProduct entierement finalise (58 tests verts, tsc clean), TradingPlan Global + sync crees, HowToApply fix.

## Etat du projet
- Feed GMC : operationnel
- Feed Klaviyo : operationnel
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Guards Payload : 58 tests verts, tsc clean, PR a ouvrir (`feat/payload-type-inference-issue`)
- Trading plan CMS : Global finalise (schema + sync Payload->legacy) ; types a regenerer ; integration web_client planifiee
- Page builder blocks : plan approuve, apres deadline trading plan

## Faits recents importants
- `skinTypes` et `textureImage` : noms originaux conserves dans l'output du guard (pas de renommage)
- `cartProduct` : field-by-field assertion, `TCartProduct` defini dans `guardProduct.ts` (shared), exporte depuis shared
- `tags` : aplatissement en `ProductTag[]` dans le guard (group1 + group2 aplatis)
- `howToUse` extrait de `rawRest` — evite fuite du type brut Payload dans `TProduct` ; step via `assert.populated`
- `assert.required` pour group fields, `assert.populated` pour relationship fields — distinction critique
- `HowToApply.tsx` : `.steps` -> `.step` (nom reel Payload)
- Types Payload pas encore regeneres — `curationSettings` a encore l'ancien type flat
- `curationSettings` = group `homepage`/`shop` (brandOfTheMonth, prioritySkus, maxPerBrand)
- Strings avec apostrophes = guillemets doubles (formatter convertit ASCII -> typographique)

## Decisions actives
- Trading plan phase 1 avant le 1er juin (deadline imperative)
- Le guard est responsable de toute la narrowing — zero assertion de type dans les composants
- `howToUse` : processing optionnel dans `defaultReturn`, assertion requise dans branche regular brand
- Sync curationSettings : Payload -> legacy, declenche manuellement via bouton admin
- `assertProduct(raw: Product)` sans type intermediaire, `as Product` sur `makeProduct`

## Prochaines etapes
- Ouvrir PR `feat/payload-type-inference-issue` (guards + tests + fix HowToApply)
- Regenerer les types Payload : `pnpm run sync-payload-types` depuis `apps/cms/`
- Remplir `curationSettings` dans Payload et tester le sync -> legacy
- Executer plan integration `web_client` (SDK + hook + wiring Shop/Home)
- Ajouter `REACT_APP_PAYLOAD_CMS_URL` dans `.env.prod`
- Remplacer `resolveUploadUrl` dans transformers par `assertMedia`
- Ouvrir PR `feat/loading-state-plp` et `feat/add-filtering-search-page`
- Resoudre bug S3 double declaration XML (bloquant)
