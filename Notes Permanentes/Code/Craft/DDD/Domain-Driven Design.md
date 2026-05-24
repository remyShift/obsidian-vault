---
tags: [SoftwareCraft, DDD]
---
Le **Domain-Driven Design** est une approche de conception qui place le **domaine métier** au centre de toutes les décisions techniques. Formalisé par Eric Evans en 2003.

> La complexité d'un logiciel vient rarement de la technique. Elle vient de la **complexité du domaine métier** qu'il modélise.

Le DDD propose de modéliser cette complexité explicitement dans le code sans la cacher derrière une architecture.

Dans la plupart des projets, il existe un fossé entre ce que les experts métier comprennent et ce que les développeurs ont codé.
- Résultat : logique métier dispersée dans des services, des controllers, des utils, et une base de données que personne ne peut expliquer à un non-développeur.

Le DDD se compose de 2 niveaux :
- **DDD Stratégique** : comment découper et organiser un système complexe à grande échelle.
- **DDD Tactique** : comment modéliser le domaine dans le code.

La plupart des équipes sautent au tactique et c'est une erreur car le stratégique donne du sens au tactique.

---

## Concepts stratégiques

- [[Ubiquitous Language]] : développeurs et experts métier parlent le même langage, utilisé partout, y compris dans le code.
- [[Bounded Context]] : frontière explicite à l'intérieur de laquelle le modèle est cohérent.
- [[Context Map]] : représentation des relations entre Bounded Contexts et de leurs patterns d'intégration.

---

## Blocs de construction tactiques

- [[Entity]] : objet défini par son **identité**, pas ses attributs.
- [[Value Object]] : objet défini par ses **valeurs**, sans identité propre. Immuable.
- [[Aggregate]] : groupe d'Entities et Value Objects traité comme une unité cohérente.
- [[Repository]] : abstraction qui isole la logique métier de la persistance.
- [[Domain Service]] : logique métier qui n'appartient naturellement à aucune Entity ni Value Object.
- [[Factory]] : encapsule la création d'Aggregates ou d'Entities complexes.
- [[Domain Model]] : représentation en code des comportements et invariants du domaine.
- [[Domain Invariants]] : règles qui doivent toujours être vraies, encodées dans les objets du domaine.

---

## Couche applicative

- [[Application Service]] : orchestre un cas d'usage. Charge, délègue au domaine, sauvegarde. Aucune logique métier propre.

---

## Architectures pour appliquer le DDD

- [[Architectures DDD]] : vue d'ensemble et guide de choix.
- [[Layered Architecture]] : point de départ classique, couches horizontales avec dépendances vers le bas.
- [[Hexagonal Architecture]] : domaine au centre, ports et adapters autour. Cible naturelle pour Oli's Lab.
- [[Clean Architecture]] : variante formalisée de l'hexagonale avec couches concentriques explicites.
- [[Vertical Slice Architecture]] : organisation par feature plutôt que par couche.

---

## Patterns avancés

- [[CQRS]] : séparer les opérations d'écriture (Commands) des opérations de lecture (Queries).
- [[Event Sourcing]] : stocker les événements plutôt que l'état courant.
- [[CQRS + Event Sourcing]] : combinaison naturelle des deux patterns.
- [[Event Driven]] : architecture pilotée par les événements.
- [[DTO]] : objet de transfert de données entre couches ou systèmes.

---

## Liens avec les autres pratiques Craft

| Pratique                | Lien avec DDD                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Ubiquitous Language** | Application directe de l'intention ([[Clean Code]])                                                          |
| **Value Objects**       | Éliminent la [[Primitive Obsession]]                                                                         |
| **Aggregates**          | Application du SRP et de la [[Loi de Déméter]]                                                               |
| **Repository**          | Application du DIP ([[Les Principes SOLID]])                                                                 |
| **Bounded Contexts**    | Faible couplage entre sous-systèmes ([[Coupling & Cohesion]])                                                |
| **TDD**                 | [[TDD Outside-In vs Inside-Out\|Outside-In]] est naturel en DDD : on part du comportement attendu du domaine |
