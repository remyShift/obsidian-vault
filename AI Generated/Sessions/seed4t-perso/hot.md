---
updated: 24-06-2026
project: seed4t-perso
tags: [hot-cache]
---

# Hot Cache — seed4t-perso

## Dernière mise à jour
24-06-2026 — Review subjective de la PR #2, 3 blockers corrigés (barrel + garde-fou CI, stockage des deps par nom, throw sur dep inconnue), SPECS recentré produit, PR mergée, CI réparée (lockfile).

## État du projet
- Monorepo pnpm `remyShift/seed4t` (privé), domaine pur dans **`packages/domain`** (renommé depuis `packages/core` ; mais le **nom du package est resté `@seed4t/core`** → à aligner). Node 26.3.1, `main` protégé (PR + squash + check `build-and-test`).
- **PR #2 mergée** (branche `feat/enhance-domain-resolve-dependant`). 14 tests verts, lint + build OK.
- `src` = `Brick.ts` / `Catalog.ts` / `Cart.ts` / `uniqueBy.ts` / `index.ts` (barrel) + `tests/`. Le domaine **résout** une grappe mais ne **produit rien** encore (pas d'output package.json).
- CI : étape `verify:exports` (`scripts/check-entrypoints.mjs`) qui vérifie que le `main` de chaque package existe après build.

## Faits récents importants
- **Deps stockées par nom** (`dependencies: string[]`) = le catalog est la source de vérité (clé étrangère, pas l'objet copié). Invariant : une dépendance DOIT être une entrée du catalog, sinon `build()` throw.
- `uniqueBy(items, key)` factorise la dédup (build + Cart.bricks) ; le `Set` de `resolve` reste pour l'anti-cycle.
- **Modèle acté** : brick = package npm individuel, grappe = brick + ses deps. La transitivité profonde / diamants / cycles = terrain TDD, **hors besoin produit** (les grappes réelles sont plates : peer deps, bundles outillage).
- Rename de dossier pnpm → lockfile désynchronisé (indexé par chemin) → CI casse à `--frozen-lockfile`. Réflexe : `pnpm install` après tout rename.

## Décisions actives
- Surface barrel assumée (Catalog/CatalogBuilder/Cart + types, pas CatalogBrick).
- arrayContaining gardé tant que l'ordre n'est pas un besoin (posture TDD).
- SPECS recentré produit, gitignoré (local-only) à `packages/domain/src/SPECS.md`.

## Prochaines étapes
- **Phase 3 : output `package.json`** (`Recipe` + sérialisation) — le vrai cœur V1 manquant. Priorité.
- Phase 2 : versions (défaut « latest » + ranges) → premier port `IVersionResolver`.
- T12 : `dependencies` vs `devDependencies` (kind sur la brick).
- Aligner `@seed4t/core` → `@seed4t/domain` ; trancher SPECS tracké vs gitignoré ; trancher le cycle (silence vs throw au build).
