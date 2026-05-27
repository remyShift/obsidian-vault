---
updated: 27-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
27-05-2026 — TradingPlan Global finalise (curationSettings restructure, sync Payload->legacy cree, tsc clean).

## Etat du projet
- Feed GMC : operationnel
- Feed Klaviyo : operationnel
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Guards Payload : tsc clean, 41 tests verts, PR prete (`feat/custom-fix-type-inference-payload`)
- Trading plan CMS : Global finalise (schema + sync Payload->legacy) ; types a regenerer ; integration web_client planifiee
- Page builder blocks : plan approuve, apres deadline trading plan

## Faits recents importants
- `curationSettings` = group `homepage`/`shop` avec `brandOfTheMonth` (brands), `prioritySkus` (products), `maxPerBrand`
- Sync curationSettings : Payload -> legacy (meme direction que brands/products), bouton admin sans `useDocumentInfo`
- Types Payload pas encore regeneres — `curationSettings` a encore l'ancien type flat dans `payload-types.ts`
- Guard `?? {}` + early return dans l'endpoint pour tenir jusqu'a la regeneration des types
- Hook `beforeChange` Global recoit `originalDoc` (etat courant avant modif) — utile pour merger tableaux
- `prioritySkus` = relationship vers products (pas text) pour eviter les typos
- `@payloadcms/sdk` supporte `findGlobal()` — plan integration `web_client` approuve

## Decisions actives
- Trading plan phase 1 avant le 1er juin (deadline imperative)
- Sync curationSettings declenche manuellement (pas automatique)
- Auto-sync brandOfTheMonth -> curationSettings.shop abandonne (trop couple)
- `title`/`ctaLink` brandOfTheMonth : persistes en DB, auto-remplis via `beforeChange`
- Guards : `assertProduct(raw: Product)` sans type intermediaire
- Strings avec apostrophes = guillemets doubles dans tout le projet

## Prochaines etapes
- Regenerer les types Payload : `pnpm run sync-payload-types` depuis `apps/cms/`
- Remplir `curationSettings` dans Payload et tester le sync -> legacy
- Executer plan integration `web_client` (SDK + hook + wiring Shop/Home)
- Ajouter `REACT_APP_PAYLOAD_CMS_URL` dans `.env.prod`
- Ouvrir PR `feat/custom-fix-type-inference-payload`
- Remplacer `resolveUploadUrl` dans transformers par `assertMedia`
- Resoudre bug S3 double declaration XML (bloquant)
