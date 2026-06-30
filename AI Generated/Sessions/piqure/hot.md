---
updated: 19-05-2026
project: piqure
tags: [hot-cache]
---

# Hot Cache — piqure

## Dernière mise à jour
19-05-2026 — Discussion reviewer sur `has()` vs Optional monad, position maintenue, merge en attente.

## État du projet
- PR `has()` : reviewer convaincu, squash + merge à faire
- PR circular deps : prête à ouvrir
- Position défendue : `undefined` dans un DI est un anti-pattern

## Faits récents importants
- `Optional<T>` Java != `T | undefined` TS : monade avec ifPresent/map/flatMap, pas disponible nativement en JS
- `inject()` retourne `T` (pas `T | undefined`) — choix délibéré du design de piqure vs Vue
- `null` = intentionnel, `undefined` = ambigu — dans un DI, `undefined` ne devrait pas exister
- Gnuk (auteur) n'a pas d'objection à merger malgré ses réserves théoriques

## Décisions actives
- Branches séparées par contribution, PRs indépendantes
- `has()` maintenu : le pattern `key<T | undefined>` déplace l'optionalité dans les types sans la rendre explicite au niveau du container

## Prochaines étapes
- Squash + merge PR `has()`
- Ouvrir PR circular dep detection
- Prochaine contribution envisagée : meilleurs messages d'erreur sur `inject()` manquant
