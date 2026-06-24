---
updated: 24-06-2026
project: seed4t-perso
tags: [meta, hot-cache]
---

# Hot Cache — seed4t-perso

## Dernière mise à jour
24-06-2026 — TDD bien avancé : résolution transitive (`Catalog.resolve` récursif), Cart passé au modèle roots, 11 tests verts. Reste un bug latent de dédup masqué par `arrayContaining`.

## État du projet
- Monorepo pnpm `remyShift/seed4t` (privé), `packages/core` = domaine pur. Node 26.3.1 via `.tool-versions`. CI verte. `main` protégé (PR obligatoire, check `build-and-test`, squash-only).
- `packages/core/src` découpé : `Brick.ts` / `Catalog.ts` / `Cart.ts` / `index.ts` (barrel). Tests dans `src/tests/` (`Brick`/`Catalog`/`Cart` + `utils.ts`). 11/11 vert, lint + build OK.
- `Catalog.resolve(name)` : DFS récursif pre-order, `Set visited` (anti-cycle + dédup intra-résolution).
- `Cart` = **modèle roots** : `roots: string[]` source de vérité, `add`/`remove` éditent roots, `get bricks()` dérive via `flatMap(resolve)`.
- Branche `feat/enhance-domain-resolve-dependant`, pas encore commitée/PR.

## Faits récents importants
- **Bug latent** : `get bricks()` ne déduplique PAS entre roots → cas partagé sort un doublon (`[a,b,c,b]`). Vert seulement parce que les assertions sont en `arrayContaining` (aveugle aux doublons/longueur).
- `arrayContaining` teste la présence, jamais l'absence ni l'unicité → faux ami, surtout pour `remove`.
- Un test jamais vu rouge n'est pas fiable → mutation manuelle pour gagner la confiance.
- Principe : stocker l'entrée irréductible (roots), dériver la sortie (bricks). `bricks→roots` non inversible.
- Infra (rappel) : hooks préfixent `$(mise where node)/bin` au PATH ; `consistent-type-definitions: off` ; convention T/I.

## Décisions actives
- `Catalog` classe concrète (option A), dédup dans `build`, résolution dans `Catalog.resolve`.
- Pre-order = ordre de sélection (figé par les tests) ; post-order/topologique différé jusqu'à un vrai besoin d'install.
- Cart = roots ; bricks = getter dérivé.
- Posture mentor relâchée à la demande pour certaines tâches mécaniques.

## Prochaines étapes
- Corriger le bug latent : dédup par `name` dans `get bricks()`.
- Resserrer les assertions (`toHaveLength`) sur partagé/diamant/circulaire.
- Commit + PR (1er passage du flux protégé).
- Roadmap : versions en array + défaut « latest »/highest (bloc commenté `Brick.test.ts`).
