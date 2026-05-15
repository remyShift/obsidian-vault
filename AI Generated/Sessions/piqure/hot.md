---
updated: 15-05-2026
project: piqure
tags: [meta, hot-cache]
---

# Hot Cache — piqure

## Dernière mise à jour
15-05-2026 — Deux contributions TDD prêtes à merger, reviewer de la PR has() répondu, squash commits appris.

## État du projet
- PR `has()` en attente de squash + merge (reviewer convaincu)
- PR circular dep detection prête à ouvrir
- Toutes les implémentations sont sur des branches séparées

## Faits récents importants
- `has()` : une ligne, délègue à `Map.has()`, maintenu face à l'alternative `key<T | undefined>` du reviewer
- Circular deps : `Set resolving` dans la closure, `finally` pour le cleanup, détecte direct et indirect
- `--force-with-lease` à utiliser après `git rebase -i` pour le squash en local
- `key<T | undefined>` est ambigu : ne distingue pas "non enregistré" de "enregistré avec undefined"

## Décisions actives
- Branches séparées pour chaque contribution : pas de mélange de features dans une même PR
- TDD strict maintenu : RED observable avant tout code

## Prochaines étapes
- Squash + merge PR `has()`
- Ouvrir PR circular dep detection
- Prochaine contribution envisagée : meilleurs messages d'erreur sur `inject()` manquant
