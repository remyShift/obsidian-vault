---
updated: 08-06-2026
project: ingredient-manager
tags: [hot-cache]
---

## Hot Cache — ingredient-manager

### Dernière mise à jour

08-06-2026 — Inspection complète du projet + 4 notes de lecture créées (vue d'ensemble, archi, scoring, critique Clean Code/DDD).

### État du projet

- Back-office de notation des produits Oli's Lab : pipeline données → matching INCI/COSING → scoring 10 règles (R01→R10).
- Sources : `shop` (Oli's Lab) vs `ext` (`ewg`, `lancome`) pour benchmark avec la même grille.
- Stack TypeScript strict + Zod + Express 5 + MongoDB driver natif + Next.js 14 (servi par le même process Express). Projet le plus propre côté typage de la mission.

### Faits récents importants

- Bonnes pratiques : évaluateurs = fonctions pures, règles & datasets data-driven et versionnés, score auditable via `observed_inputs`.
- Dette majeure : `ext-scoring.repo.ts` = 3314 lignes (God file), `scoring.repo.ts` = 1625 lignes.
- Abstraction par source qui fuit : `if (source === SHOP) … else …` remonte dans `scoring.service.ts`.
- Duplication shop/ext car la logique scoring a fui dans la couche data ; dépendance inversée (R01 importe `normalizeNameRule1` d'un repo) ; modèle non unifié (`cosingId` vs `cosing_id`).

### Décisions actives

- Plan de refacto priorisé acté (note 03) : (1) sortir le scoring des repos vers le domaine, (2) `assertAllMatched` méthode du port, (3) unifier `Match`, (4) découper `ext-scoring.repo.ts`, (5) remonter `normalizeNameRule1`, (6) nettoyage logs/fichiers.

### Prochaines étapes

- Si refacto : commencer par le point 1 (extraction logique scoring hors repos) — tue la duplication + dégonfle les God files.
- Surveiller `ext-scoring.repo.ts` pour qu'il ne grossisse plus.
- Trier les notes Inbox (statut to-process) : promotion en Notes Permanentes ou non.
