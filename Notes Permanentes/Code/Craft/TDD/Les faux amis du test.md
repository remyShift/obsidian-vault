---
tags: [Code, Craft, TDD]
type: permanent
---

# Les faux amis du test (présence, absence, unicité)

Une assertion qui passe ne prouve pas ce qu'on croit. Le vrai filet de sécurité, c'est un test qu'on a **vu rouge au moins une fois** : un test jamais vu échouer ne garantit rien (il peut valider une tautologie).

## `arrayContaining` ne teste que la présence

`expect(result).toEqual(expect.arrayContaining([a, b]))` vérifie que `a` et `b` sont **présents**. Il ne teste **ni l'absence** d'autres éléments, **ni les doublons**, **ni l'ordre**. Pour ces propriétés il faut une assertion explicite :
- absence → `expect(result).not.toContain(x)` ou comparer la longueur.
- unicité / pas de doublon → `expect(result).toHaveLength(n)` ou `expect(new Set(result).size).toBe(result.length)`.
- égalité stricte du contenu → `toEqual` sur le tableau complet.

## Réflexe

Avant de faire passer un test au vert, le casser exprès pour confirmer qu'il échoue pour la bonne raison (cf [[Red]]). Au [[Refactor]], se demander quelle propriété l'assertion ne couvre PAS encore.
