---
updated: 19-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
19-05-2026 — Guards Payload centralisés dans `@olis-lab/shared`, `product.ts` et `computeCartSnapshot.ts` migrés, 20 tests unitaires verts, PR `feat/custom-fix-type-inference-payload` prête.

## Etat du projet
- Feed GMC : opérationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : opérationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implémenté
- Bug S3 double déclaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 août 2026
- Tests CMS intégration : infra en place (branche Diego), 5/5 passent, en attente validation merge
- Guards Payload : implémentés, testés, 2 fichiers pilotes migrés, PR prête

## Faits recents importants
- `packages/shared/src/payload/guard.ts` : `createAsserter(entity)` factory + `assertMedia<T extends MediaLike>` standalone — générique, zéro import Payload
- `computeCartSnapshot.ts` avait un `else if ())` (condition vide) qui bypassait silencieusement la résolution du brand sur les objets populés — corrigé en `else`
- `assertMedia` throw sur `url: ''` (falsy) intentionnellement — URL vide aussi inutilisable que null
- Race condition `initPayload()` identifiée : fix = cacher la Promise, pas le résultat

## Decisions actives
- Guards : factory closure, pas classe — évite binding `this`
- `assertMedia` générique sur `T extends MediaLike` structural — ne dépend pas des types générés Payload
- `@olis-lab/shared` a maintenant subpath `./payload` et Vitest configuré (20 tests)
- Tests intégration CMS : `pool: 'threads'`, `singleThread: true`, `isolate: false`
- `uniquePerCategory` à reclasser en unit tests (hors scope branche Diego)

## Prochaines etapes
- Ouvrir PR `feat/custom-fix-type-inference-payload` (message déjà rédigé)
- Merger `chore/cms-int-tests-ci` après retour Diego
- Appliquer fix race condition `initPayload()` (cacher Promise)
- Écrire unit tests `uniquePerCategory` + transformateurs dans `tests/unit/`
- Résoudre bug S3 double déclaration XML (bloquant)
- Migrer autres mappers/hooks vers `createAsserter`
- Implémenter CRON + feed Meta
