---
updated: 22-06-2026
project: seed4t-perso
tags: [meta, hot-cache]
---

# Hot Cache — seed4t-perso

## Dernière mise à jour
22-06-2026 — Repo perso créé (copie isolée du mob), migré Jest→Vitest + ESLint/Prettier, README recentré sur le but, SPECS.md transformé en test-list vivante T1→T11.

## État du projet
- Générateur de scaffolding TS construit en TDD. Repo perso `seed4t-perso` (local) / `remyShift/seed4t` (GitHub privé, branche `main`). Stack : TS6 strict + Vitest 4 + ESLint 10 flat + Prettier, Node 20.19.5.
- Domaine pur en place : `Brick`, `createBrick`, `CatalogBrick {brick, dependant}`, `CatalogBuilder`, `Cart`. 4 tests verts. Pas encore de TDD démarré sur la roadmap.
- Posture : Claude ne code JAMAIS sur ce projet, il guide/revue. Rémy écrit chaque test.

## Faits récents importants
- Dossier local = `seed4t-perso` car macOS case-insensitive (collision avec `seed4T`) ; repo GitHub = `seed4t`.
- Pièges env : Homebrew node cassé (libllhttp) → node de mise ; Node 21 incompatible Vitest → épinglé 20.19.5.
- Limites domaine à corriger en TDD : `dependant` unique mono-niveau, pas de dédup au `Cart.add`, `remove` ignore les deps, aucune sortie réelle.

## Décisions actives
- Hexagone émergent : 1er port à la résolution de version (T8 `VersionResolver`), 2e à la sortie de recette (T11 `RecipeWriter`), structure dossiers en dernier (Phase 4).
- Deps stockées par nom (`string[]`), catalogue = source de vérité.
- Docs repo en anglais (README + SPECS). Phase 0 retirée de SPECS (test-list strictement comportementale).

## Prochaines étapes
- Hygiène : renommer `calc.test.ts` → `Brick.test.ts`, fixer nom `package.json` (résidu `ts-template-with-jest-tests`).
- Commit + push docs (README + SPECS), vérifier CI verte sur GitHub.
- Démarrer TDD T1 (dédup catalogue) red→green→refactor, montrer le cycle pour revue.
