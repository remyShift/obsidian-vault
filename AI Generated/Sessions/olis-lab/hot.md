---
updated: 24-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
24-05-2026 — Guards Payload implementes et testes, mapper migre, singleton assertProduct cree, PR feat/custom-fix-type-inference-payload prete, decision Diego : mapper conserve (selection de champs != type narrowing).

## Etat du projet
- Feed GMC : operationnel, route `GET /sitemap/gmc-feed?lang=fr`
- Feed Klaviyo : operationnel, route `GET /sitemap/klaviyo-feed?lang=fr`
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Tests CMS : unitaires `uniquePerCategory` ecrits, PR prete, attente retour Diego
- Guards Payload : implementes, testes (20 tests verts), 2 fichiers pilotes migres, PR prete
- SearchPage filtering : branch `feat/add-filtering-search-page`, PR a ouvrir
- Page builder Payload blocks : plan approuve, implementation a venir
- LoadingProductsSpinner : sur toutes les pages listing, PR a ouvrir

## Faits recents importants
- `createAsserter(entity)` factory + `assertMedia<T extends MediaLike>` standalone — generique, zero import Payload
- `computeCartSnapshot.ts` avait un `else if ())` (condition vide) qui bypassait la resolution du brand — corrige
- Mapper et asserter sont orthogonaux : asserter = type narrowing, mapper = selection de champs — les deux coexistent
- Diego confirme : ne pas supprimer de champs dans cette PR, juste brancer l'asserter
- `as unknown as TProduct` pattern accepte pour les mocks de stories quand le type est trop strict

## Decisions actives
- `assertProduct` singleton dans `apps/web/lib/asserters.ts` — instancie une fois, importe partout
- `assertMedia` generique `T extends MediaLike` — pas de couplage aux types Payload generes
- Mapper conserve : responsabilite = selection de champs (pas du type narrowing)
- Subpath export `./payload` dans `@olis-lab/shared/package.json`
- Tests `*.test.ts` exclus du build tsc dans `packages/shared/tsconfig.json`

## Prochaines etapes
- Ouvrir PR `feat/custom-fix-type-inference-payload` (message deja redige)
- Migrer les autres mappers/hooks vers `createAsserter`
- Merger `chore/cms-int-tests-ci` apres retour Diego
- Ecrire unit tests transformateurs
- Resoudre bug S3 double declaration XML (bloquant)
- Ouvrir PR LoadingProductsSpinner + SearchPage filtering
