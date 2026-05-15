---
tags:
---
## Deux patterns distincts, souvent combinés

CQRS et Event Sourcing sont deux patterns indépendants qui fonctionnent très bien ensemble. Il est possible d'utiliser CQRS sans Event Sourcing, et vice-versa, mais leur combinaison est la plus courante en pratique.

---

## CQRS - Command Query Responsibility Segregation

### Principe

Séparer les opérations d'**écriture** (Commands) des opérations de **lecture** (Queries) en deux modèles distincts.

Règle fondamentale : une méthode soit lit des données, soit les modifie. Jamais les deux en même temps.

- **Command** : modifie l'état du système. Ne retourne pas de données (ou juste un accusé de réception).
- **Query** : lit l'état du système. Ne modifie rien.

### Pourquoi

Dans une architecture CRUD classique, le même modèle sert à la fois pour lire et écrire. Ça devient un problème quand :
- Les patterns de lecture et d'écriture sont très différents (ex. beaucoup plus de reads que de writes)
- La logique métier d'écriture est complexe mais les lectures sont simples et doivent être rapides
- On veut scaler indépendamment les deux côtés

### Architecture

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

Le Read Model est synchronisé depuis le Write Model (souvent via des events). Il peut avoir un format complètement différent, optimisé pour les requêtes de l'UI.

---

## Event Sourcing

### Principe

Au lieu de stocker l'état actuel d'une entité dans la base de données, on stocke la **séquence chronologique des événements** qui ont amené à cet état.

L'état actuel se reconstruit en "rejouant" les événements dans l'ordre.

### Analogie

Un compte bancaire en CRUD classique : `{ solde: 1250 }`

Un compte bancaire en Event Sourcing :
```
[
  { type: 'AccountOpened', amount: 1000, date: '...' },
  { type: 'MoneyDeposited', amount: 500, date: '...' },
  { type: 'MoneyWithdrawn', amount: 250, date: '...' },
]
```
Le solde de 1250 se calcule en rejouant ces trois événements.

### Propriétés

- **Append-only** : on n'update jamais un événement, on n'en supprime jamais. L'historique est sacré.
- **Source of truth** : l'event store est la seule vérité du système
- **Audit trail complet** : on peut savoir ce qui s'est passé à n'importe quel moment dans le temps
- **Rejouabilité** : on peut reconstruire n'importe quel état passé

### Le problème sans CQRS

Reconstituer l'état actuel à partir de millions d'événements peut devenir coûteux. C'est pourquoi CQRS est souvent combiné : le Write side gère l'event store, le Read side matérialise des vues pré-calculées.

---

## La combinaison CQRS + Event Sourcing

```
UI → Command → Command Handler → Event Store (write)
                                      │
                                      │ projection
                                      ▼
                                 Read Store (read) → Query → UI
```

Les événements du Write side sont consommés de façon asynchrone pour construire les vues du Read side. C'est ce qui introduit la **consistance éventuelle** (eventual consistency) : une lecture juste après une écriture peut ne pas encore refléter le changement.

---

## Avantages

- Scalabilité indépendante des lectures et des écritures
- Audit trail complet et inviolable
- Capacité à reconstruire l'état à n'importe quel point dans le temps
- Découplage fort entre logique métier et logique de présentation

---

## Inconvénients et points de vigilance

- **Complexité** : c'est significativement plus complexe qu'un CRUD classique
- **Eventual consistency** : les lectures peuvent être décalées par rapport aux écritures
- **Versioning des events** : si le schéma d'un événement change, il faut gérer la compatibilité avec les anciens événements
- **Pas adapté partout** : pour une petite app sans besoins de scalabilité, c'est du sur-engineering

---

## Liens avec d'autres patterns

- Souvent associé au **DDD** : les Commands et Events correspondent aux concepts du domaine
- Les **Value Objects** sont souvent utilisés dans les payloads des Commands et Events
- Les **DTOs** servent typiquement sur le Read side pour projeter les données vers l'UI

---

## Ressources

- CQRS Pattern (Microsoft Azure Docs) : https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
- Event Sourcing Pattern (Microsoft Azure Docs) : https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
- Confluent (exemple shopping cart détaillé) : https://developer.confluent.io/courses/event-sourcing/cqrs/
- Greg Young : *CQRS Documents* (PDF) - référence fondatrice du pattern
