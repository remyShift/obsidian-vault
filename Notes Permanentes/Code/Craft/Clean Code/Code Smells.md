---
tags: [SoftwareCraft, CleanCode, Refactoring]
---

Un **code smell** n'est pas un bug. C'est un signal que quelque chose dans la structure du code va rendre la maintenance plus difficile, plus risquée, plus coûteuse. Le smell est le déclencheur du [[Le Refactoring|refactoring]].

Les smells ne demandent pas tous un refactoring immédiat. Ils **informent** une décision. Si tu touches au code concerné : règle du boy-scout, corrige en passant. Sinon : note-le, ne le laisse pas s'aggraver.

---

## Smells liés aux fonctions

**Long Method** — une fonction qui fait trop de choses. Si tu cherches des commentaires pour segmenter le corps, chaque segment est une fonction à extraire. Fix : `Extract Function`. Cf. [[Structurer le code]].

**Long Parameter List** — plus de 2-3 paramètres = données mal regroupées. Fix : `Introduce Parameter Object`.

**Flag Argument** — passer un booléen pour changer le comportement (`processOrder(order, true)`). Fix : deux fonctions aux noms explicites.

**Dead Code** — code commenté, fonctions jamais appelées. Fix : supprimer. Git existe pour ça.

**Duplicate Code** — même logique répétée. Si la règle métier change, tu dois la changer partout et tu en oublieras une. Fix : `Extract Function` + centraliser.

---

## Smells liés aux classes

**God Class** — une classe qui sait tout faire. Violation directe du SRP. Fix : `Extract Class`.

**Data Class** — que des getters/setters, aucun comportement. Le comportement qui devrait lui appartenir est dispersé ailleurs. Lien direct avec le [[Domain-Driven Design|modèle anémique]]. Fix : déplacer les opérations dans la classe.

**Refused Bequest** — une sous-classe hérite mais refuse certaines méthodes (lève une exception). Violation du LSP. Fix : revoir la hiérarchie, souvent remplacer par composition.

---

## Smells liés aux dépendances

**Feature Envy** — une méthode est plus intéressée par les données d'une *autre* classe que par celles de la sienne. Fix : `Move Method` vers la classe dont les données sont utilisées.

**Inappropriate Intimacy** — deux classes se connaissent trop. L'une accède aux détails internes de l'autre. Fix : interface claire, `Move Method/Field`.

**Message Chains** — `a.getB().getC().doSomething()`. Violation de la [[Loi de Déméter]]. Fix : `Hide Delegate`.

**Middle Man** — une classe ne fait que déléguer. Fix : `Remove Middle Man`, ou si la délégation est légitime → Facade/Proxy (cf. [[Design Patterns Structural]]).

---

## Smells liés aux données

**Primitive Obsession** — types primitifs là où un objet dédié serait plus expressif (`string` pour un email, `number` pour un montant). Fix : `Replace Primitive with Object`. En DDD : c'est exactement ce que résolvent les [[Domain-Driven Design|Value Objects]].

**Data Clumps** — données qui apparaissent toujours ensemble sans être regroupées (`street`, `city`, `zipCode`). Fix : `Extract Class` → `Address`.

**Magic Numbers / Magic Strings** — valeurs littérales sans nom. Fix : constante nommée.

---

## Smells liés au changement

**Divergent Change** — une classe change pour des raisons différentes à chaque modification. Violation du SRP. Fix : `Extract Class`.

**Shotgun Surgery** — un seul changement conceptuel t'oblige à toucher à plein de classes différentes. Fix : regrouper ce qui change ensemble (`Move Method/Field`).

---

## Smells liés aux commentaires

**Comments as Deodorant** — un commentaire qui explique *ce que* fait le code. Le code devrait s'expliquer lui-même. Fix : renommer, extraire une fonction bien nommée. Cf. [[L’art du nommage]], [[L’utilisation des commentaires]].

---

## Tableau de synthèse

| Smell | Cause | Fix |
|---|---|---|
| Long Method | Trop de responsabilités | Extract Function |
| God Class | Trop de responsabilités | Extract Class |
| Feature Envy | Mauvaise attribution | Move Method |
| Message Chains | Violation Déméter | Hide Delegate |
| Primitive Obsession | Manque d'abstraction | Replace Primitive with Object |
| Data Clumps | Données non regroupées | Extract Class |
| Shotgun Surgery | Couplage dispersé | Move Method/Field |
| Divergent Change | SRP violé | Extract Class |
| Magic Numbers | Manque de nommage | Constante nommée |
| Dead Code | Négligence | Supprimer |
