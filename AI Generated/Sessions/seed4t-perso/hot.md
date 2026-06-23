---
updated: 23-06-2026
project: seed4t-perso
tags: [meta, hot-cache]
---

# Hot Cache — seed4t-perso

## Dernière mise à jour
23-06-2026 — Échafaudage de rigueur bouclé : TS Strict+, ESLint type-checked, nommage T/I, alias `@/`, hooks robustes, protection `main` (PR + squash + CI). Reste à démarrer le vrai TDD (T1).

## État du projet
- Monorepo pnpm `remyShift/seed4t` (privé), `packages/core` = domaine pur. Node 26.3.1 via `.tool-versions`. CI verte.
- Rigueur en place : TS Strict+ (noUncheckedIndexedAccess...), ESLint strictTypeChecked, `prefer-readonly`, convention **T/I (B)** (value objects = `type TBrick`, contrats = `interface I...`), `@/` alias (tsc-alias + vitest natif).
- Hooks : husky + lint-staged + commitlint ; **les hooks prefixent `$(mise where node)/bin` au PATH** (sinon node système 21 → crash listr2).
- `main` protégé : push direct bloqué, PR obligatoire (0 review), check `build-and-test` requis, squash-only, bypass vide. Template PR générisé.
- Domaine inchangé (Brick/Catalog/Cart, 4 tests). TDD pas encore démarré.

## Faits récents importants
- **mise ne lit pas `.nvmrc` par défaut** → `.tool-versions` est la source node (l'avoir supprimé avait recassé les commits).
- `consistent-type-definitions` mis à `off` (sinon force `interface`, casse Convention B).
- Une PR fermée ne se supprime pas sur GitHub ; la PR #1 garde un commit co-signé résiduel (cosmétique).
- Règle "jamais de Co-Authored-By" gravée dans le CLAUDE.md global.

## Décisions actives
- Posture mentor : Claude ne code jamais le domaine, guide/revue ; Rémy écrit chaque test.
- Custom rule "type-comme-contrat" → Phase 2 (1er port). boundaries/dependency-cruiser/import-no-cycle → Phase 4.
- Repo non recréé malgré le résidu de PR fermée (pas la peine).

## Prochaines étapes
- **T1 — dédup catalogue** : red → green → refactor dans une branche `feat/...` → PR (1er passage du flux protégé).
- Trancher : forcer des titres de PR conventional (squash commit = titre PR, hors commitlint) via check "semantic PR title".
