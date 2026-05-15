---
updated: 15-05-2026
project: piqure
tags: [meta, hot-cache]
---

# Hot Cache — piqure

## Dernière mise à jour
15-05-2026 — Première session : exploration de la lib, deux contributions TDD réalisées (has() et circular dep detection)

## État du projet
- Deux branches prêtes à PR : `has(key)` et détection de dépendances circulaires
- Lib comprise en profondeur : architecture Map + Value wrappers (StaticValue / LazyValue)

## Faits récents importants
- `has()` : délègue à `Map.has()`, une ligne, interface `Piqure` mise à jour
- Circular deps : `Set resolving` dans la closure de `piqure()`, check avant chaque résolution lazy, throw clair avec le nom de la clé
- Le `resolving.delete(key)` doit être dans un `finally` pour gérer les providers qui throwent pour d'autres raisons
- Branche `has()` et branche circular deps sont indépendantes — normal qu'elles ne partagent pas les mêmes tests

## Décisions actives
- Contributions séparées par branche = PRs indépendantes, plus facile à reviewer
- TDD strict : RED observable (stack overflow ou erreur absente) avant tout code

## Prochaines étapes
- Ouvrir les deux PRs
- Prochaine contribution envisagée : meilleurs messages d'erreur sur `inject()` (lister les clés enregistrées)
- Contribution async providers : plus complexe, à planifier
