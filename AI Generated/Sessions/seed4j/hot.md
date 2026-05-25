---
updated: 25-05-2026
project: seed4j
tags: [meta, hot-cache]
---

# Hot Cache — seed4j

## Dernière mise à jour
25-05-2026 — Brainstorming + design + plan d'implémentation complet pour TS-Seed, nouveau projet perso.

## État du projet
- Seed4J est le projet de référence étudié (fork JHipster Lite, Spring Boot + Vue)
- TS-Seed est le nouveau projet né de cette session : bootstrapper TS à la Seed4J, pas encore créé

## Faits récents importants
- Design document validé : Next.js fullstack, hexagonal DDD, bounded contexts `brick/` et `catalog/`
- Terminologie propre : Brick / BrickBuilder / BrickContext / Patch / BrickRegistry / ProjectWriter
- Plan Phase 1 prêt : 10 tâches TDD, ~30 tests, 1 brique `typescript-core` fonctionnelle via API

## Décisions actives
- Pas de liste de briques V1 figée — ajout progressif au fil de l'eau
- Compatibilité inter-briques reportée à plus tard (pas de résolution de dépendances pour l'instant)
- `hexagonal-structure` = brique dédiée optionnelle pour les projets qui veulent l'archi hexa
- Next.js isolé dans `infrastructure/primary/` — domaine testable en TS pur sans framework

## Prochaines étapes
- Créer le projet `ts-seed` (Next.js + TypeScript + vitest)
- Exécuter le plan Phase 1 (Task 1 à 10)
- Planifier Phase 2 : UI React + briques supplémentaires
