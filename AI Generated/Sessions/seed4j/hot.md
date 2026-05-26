---
updated: 26-05-2026
project: seed4j
tags: [meta, hot-cache]
---

# Hot Cache — seed4j

## Derniere mise a jour
26-05-2026 — Projet ts-seed cree, repo GitHub lie, environnement pret pour TDD.

## Etat du projet
- ts-seed existe dans `/Users/remy_mac/Desktop/everything/Code/ts-seed`
- Repo public : https://github.com/remyShift/ts-seed
- Aucun code metier encore ecrit — environnement pret a l'emploi

## Faits recents importants
- Stack : Next.js 16 + TypeScript 5 + vitest + prettier + eslint (flat config)
- Package manager : npm (defaut create-next-app)
- Approche choisie : TDD libre, laisser l'archi hexagonale emerger au refactor
- Clue cle : "de quoi ce code depend-il qu'il n'a pas besoin de connaitre ?" a chaque etape refactor

## Decisions actives
- Pas de plan Phase 1 impose — exploration TDD a tatons
- Dependances ajoutees au fil de l'eau selon les besoins reels
- Design doc et plan Phase 1 disponibles dans Obsidian comme reference (pas comme script)

## Prochaines etapes
- Ecrire le premier test rouge dans ts-seed
- Laisser l'archi emerger du cycle Red / Green / Refactor
