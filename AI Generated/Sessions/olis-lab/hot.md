---
updated: 25-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
25-05-2026 — Alignement equipe sur trading plan (3 phases, backsync legacy DB) et page builder blocks ; plans rédigés, PRs en attente d'ouverture.

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS : unitaires `uniquePerCategory` ecrits, PR prete, attente retour Diego
- Guards Payload : implementes, testes (20 tests verts), 2 fichiers pilotes migres, PR prete
- SearchPage filtering : branch `feat/add-filtering-search-page`, PR a ouvrir
- LoadingProductsSpinner : sur 8 pages listing, PR a ouvrir (`feat/loading-state-plp`)
- Trading plan CMS : plan approuve (3 phases), implementation a demarrer avant le 1er juin
- Page builder blocks : plan approuve, apres deadline trading plan

## Faits recents importants
- Trading plan = 3 phases : Global Payload miroir legacy DB + backsync → extension des deux DBs avec champs manquants → CRA lit depuis DB au lieu des valeurs hardcodees
- Trading plan et page builder sont orthogonaux : trading plan = données métier, page builder = layout/affichage
- Michele confirme : layout change "sooner than we think", blocks justifiés a terme
- Backsync Global Payload ↔ legacy DB permet de centraliser l'edition dans Payload sans toucher CRA immediatement
- `createAsserter(entity)` factory + `assertMedia<T extends MediaLike>` dans `@olis-lab/shared/payload`

## Decisions actives
- Trading plan phase 1 avant le 1er juin (deadline imperative)
- Page builder dans `apps/web` (Next.js) uniquement, shop page avant homepage
- Pas de connexion CRA directe au Global Payload pour le page builder
- Guards : `assertProduct` singleton dans `apps/web/lib/asserters.ts`
- SearchController : `isBundle` derive de `type`, interleave 1 bundle / 2 produits

## Prochaines etapes
- Demarrer trading plan phase 1 : Global Payload + backsync legacy DB (urgent, avant 1er juin)
- Ouvrir PR `feat/custom-fix-type-inference-payload`
- Ouvrir PR `feat/loading-state-plp`
- Ouvrir PR `feat/add-filtering-search-page`
- Implementer fix PostHog (useEffect de montage) + verifier staging
- Resoudre bug S3 double declaration XML (bloquant)
