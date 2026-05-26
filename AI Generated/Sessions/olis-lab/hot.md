---
updated: 26-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
26-05-2026 — Tests guardProduct ecrits (33 verts), bugs corriges dans guardProduct.ts, computeCartSnapshot.ts fixe, audit guards CMS fait.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Guards Payload : tests ecrits (33 verts), bugs corriges, computeCartSnapshot fixe, PR prete a ouvrir
- Branch `feat/custom-fix-type-inference-payload` prete
- Trading plan CMS : plan approuve (3 phases), implementation urgente avant le 1er juin
- Page builder blocks : plan approuve, apres deadline trading plan

## Faits recents importants
- `@olis-lab/shared` exporte `payload` comme namespace — import depuis `@olis-lab/shared/payload` obligatoire
- `assertPopulated` / `assertMedia` standalone = 3 args `(value, entity, path)` ; `createAsserter(entity)` = 2 args
- Le formatter projet convertit les apostrophes ASCII en guillemets typographiques dans les nouveaux fichiers — casse esbuild
- `resolveUploadUrl` dans `sync/transformers/brands.ts` et `products.ts` est une reimplementation de `assertMedia` — a remplacer
- `resolveUploadUrlNullable` retourne null (comportement voulu) — ne pas remplacer
- `RawProduct` type avec `AnyRecord` permet des fixtures de test sans casts `as unknown as`

## Decisions actives
- Trading plan phase 1 avant le 1er juin (deadline imperative)
- Page builder dans `apps/web` (Next.js) uniquement, shop page avant homepage
- Guards : utiliser fonctions standalone avec 3 args explicites (pas `createAsserter`)
- `assertPopulated` pour brand (verifie population reelle, pas juste non-null)

## Prochaines etapes
- Ouvrir PR `feat/custom-fix-type-inference-payload` (guards + tests + fix computeCartSnapshot)
- Remplacer `resolveUploadUrl` dans `sync/transformers/brands.ts` et `products.ts` par `assertMedia`
- Demarrer trading plan phase 1 : Global Payload + backsync legacy DB (urgent)
- Ouvrir PR `feat/loading-state-plp`
- Ouvrir PR `feat/add-filtering-search-page`
- Resoudre bug S3 double declaration XML (bloquant)
