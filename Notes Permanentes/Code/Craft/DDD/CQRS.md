---
tags: [SoftwareCraft, DDD]
---

## Principe

Séparer les opérations d'**écriture** (Commands) des opérations de **lecture** (Queries) en deux modèles distincts.

Règle fondamentale : une méthode soit lit des données, soit les modifie. Jamais les deux en même temps.

- **Command** : modifie l'état du système. Ne retourne pas de données (ou juste un accusé de réception).
- **Query** : lit l'état du système. Ne modifie rien.

La séparation Commands / Queries s'aligne naturellement sur [[Domain-Driven Design|DDD]] : une Command exprime une intention du domaine, une Query un besoin de lecture.

---

## Le problème qu'il résout

Dans une architecture CRUD classique, le même modèle sert à la fois pour lire et écrire. Ça devient un problème quand :

- Les patterns de lecture et d'écriture sont très différents (ex. beaucoup plus de reads que de writes)
- La logique métier d'écriture est complexe mais les lectures sont simples et doivent être rapides
- On veut scaler indépendamment les deux côtés

---

## Architecture

```
    ┌──────────────────────────────────────┐
    │           Application                │
    └───────────┬─────────────┬────────────┘
          │             │
       Commands│             │Queries
          ▼             ▼
      ┌──────────────┐  ┌──────────────┐
      │  Write Model │  │  Read Model  │
      │  (complexe)  │  │  (optimisé)  │
      └──────┬───────┘  └──────┬───────┘
         │                 │
         ▼                 ▼
      ┌──────────────┐  ┌──────────────┐
      │  Write DB    │  │  Read DB     │
      │  (SQL, etc.) │  │  (NoSQL, etc)│
      └──────────────┘  └──────────────┘
```

Le Read Model est synchronisé depuis le Write Model (souvent via des events). Il peut avoir un format complètement différent, optimisé pour les requêtes de l'UI — les projections prennent la forme de [[DTO|DTOs]], sans logique métier.

---

## Avantages

- Scalabilité indépendante des lectures et des écritures
- Logique métier d'écriture isolée et non polluée par les besoins de lecture
- Read Model optimisable librement sans impacter le domaine

---

## Inconvénients et points de vigilance

- **Complexité** : deux modèles à maintenir au lieu d'un
- **Eventual consistency** : si le Read Model est synchronisé de façon asynchrone, les lectures peuvent être légèrement décalées — à gérer explicitement dans l'UI et dans les attentes utilisateurs
- **Pas adapté partout** : sur une petite app CRUD simple, c'est du sur-engineering

Associé à [[Event Sourcing]], CQRS résout le problème de reconstruction coûteuse que ce pattern crée — les deux forment alors [[CQRS + Event Sourcing]].
