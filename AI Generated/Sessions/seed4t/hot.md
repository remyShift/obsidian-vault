---
updated: 29-05-2026
project: ts-seed
tags: [meta, hot-cache]
---

# Hot Cache — ts-seed

## Derniere mise a jour
29-05-2026 — Setup complet du projet : docs/skills en anglais, plan TDD detaille pour la premiere brique validé.

## Etat du projet
- Boilerplate Next.js + vitest en place, zero code metier encore
- CLAUDE.md, add-brick.md, tdd-cycle.md, hexagonal-architecture.md ecrits et valides
- Plan TDD pour la brique `typescript` pret a etre execute

## Faits recents importants
- Pas de base de donnees : catalogue statique (InMemoryBrickRegistry), app stateless
- L'archi hexagonale emerge du TDD — ne pas la pre-designer : chaque port nait d'un refactor qui revele une dependance problematique
- Premier test = `TypescriptBrickBuilder.build('5.x')` avec une string brute, aucun type sophistique

## Decisions actives
- Approche TDD naive-first : strings brutes en entree, types extraits uniquement quand un test le force
- Sequence d'emergence des types documentee dans le plan (`~/.claude/plans/`)
- Skill `/hexagonal-architecture` disponible pour guidance pendant l'implementation

## Prochaines etapes
- Implementer `TypescriptBrickBuilder` via TDD (6 etapes du plan)
- Laisser `BrickVersion`, `ProjectWriter`, `BrickRegistry` etc. emerger naturellement
- Ne pas toucher Next.js avant que le service applicatif soit complet et teste
