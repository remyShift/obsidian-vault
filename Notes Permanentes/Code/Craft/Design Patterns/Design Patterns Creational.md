---
tags: [SoftwareCraft, DesignPatterns]
---

**Objectif :** Contrôler et abstraire **la création des objets**. Cf. [[Design Patterns]] pour la vue d'ensemble.

- [[Factory Method]] : créer un objet sans coupler le code appelant à la classe concrète
- [[Abstract Factory]] : créer une famille d'objets cohérents entre eux
- [[Builder]] : construire un objet complexe step by step, sans constructeur à rallonge
- [[Singleton]] : une seule instance globale, pattern controversé — préférer l'injection
- [[Prototype]] : cloner un objet existant plutôt qu'instancier depuis une classe

| Pattern | Signal d'usage |
|---|---|
| [[Factory Method]] | `new ConcreteClass()` éparpillé partout |
| [[Abstract Factory]] | Plusieurs types d'objets liés à créer ensemble |
| [[Builder]] | Constructeur avec 4+ paramètres optionnels |
| [[Singleton]] | Préférer l'injection de dépendances |
| [[Prototype]] | Objet coûteux à init, ou variantes d'un template |
