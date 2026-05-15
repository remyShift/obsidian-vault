---
tags: [SoftwareCraft, DDD]
---
## Pourquoi les combiner ?

[[CQRS]] et [[Event Sourcing]] sont deux patterns indépendants, mais ils se complètent naturellement. Event Sourcing crée un problème que CQRS résout.

Le problème : en Event Sourcing, reconstituer l'état actuel depuis des millions d'événements peut devenir très coûteux à chaque lecture. Si le compte bancaire a 10 ans d'historique, chaque requête "quel est le solde ?" rejoue des centaines de milliers d'événements.

La solution CQRS : séparer le Write side (qui gère l'event store) du Read side (qui matérialise des vues pré-calculées depuis les événements). La reconstruction ne se fait qu'une fois à l'écriture, pas à chaque lecture.

---

## Architecture combinée

```
UI → Command → Command Handler → Event Store (write)
                   │
                   │ projection (asynchrone)
                   ▼
                Read Store (read) → Query → UI
```

- Le **Write side** reçoit des Commands, les valide, produit des Events, les stocke dans l'event store
- Les Events sont consommés de façon asynchrone pour construire les **projections** du Read side
- Le **Read side** expose des [[DTO|DTOs]] optimisés pour les besoins de l'UI, sans logique métier

En [[Domain-Driven Design|DDD]], Commands et Events correspondent directement aux concepts du domaine : les Commands expriment des intentions, les Events des faits. Les payloads de ces deux structures font souvent appel à des [[Value Object|Value Objects]].

---

## Ce que ça change

### Séparation claire des responsabilités

- Le Write side se concentre sur la validité des opérations et la capture des faits
- Le Read side se concentre sur la performance des lectures et les besoins de présentation

### Flexibilité des projections

Puisque les événements sont stockés en permanence, on peut créer de nouvelles projections à tout moment en rejouant l'historique. Si on a besoin d'une nouvelle vue des données demain, il suffit de créer une nouvelle projection et de rejouer les événements depuis le début.

### Consistance éventuelle (eventual consistency)

La synchronisation entre le Write side et le Read side est asynchrone. Une lecture juste après une écriture peut ne pas encore refléter le changement. C'est un trade-off à assumer explicitement.

---

## Quand utiliser cette combinaison

Pertinent quand :

- Le domaine est complexe avec beaucoup de règles métier à l'écriture
- L'auditabilité et la traçabilité sont des exigences fortes
- Les besoins de lecture et d'écriture sont très différents en termes de volume ou de format
- On a besoin de reconstruire des états passés ou de créer de nouvelles vues a posteriori

Pas pertinent quand :

- L'application est simple, CRUD, sans historique requis
- La consistance immédiate est non-négociable
- L'équipe n'a pas l'expérience pour gérer cette complexité

---

## Inconvénients de la combinaison

- **Complexité accrue** : deux sides, un event store, des projections, de la synchronisation asynchrone
- **Versioning des events** : les events stockés sont permanents, leur schéma doit être versionné avec soin
- **Eventual consistency** : à gérer explicitement dans l'UI et dans les attentes utilisateurs
- **Courbe d'apprentissage** : paradigme suffisamment différent pour nécessiter une vraie montée en compétences
