---
tags:
---
## Principe

Séparer les opérations d'**écriture** (Commands) des opérations de **lecture** (Queries) en deux modèles distincts.

Règle fondamentale : une méthode soit lit des données, soit les modifie. Jamais les deux en même temps.

- **Command** : modifie l'état du système. Ne retourne pas de données (ou juste un accusé de réception).
- **Query** : lit l'état du système. Ne modifie rien.

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

Le Read Model est synchronisé depuis le Write Model (souvent via des events). Il peut avoir un format complètement différent, optimisé pour les requêtes de l'UI.

---

## Avantages

- Scalabilité indépendante des lectures et des écritures
- Logique métier d'écriture isolée et non polluée par les besoins de lecture
- Read Model optimisable librement sans impacter le domaine

---

## Inconvénients et points de vigilance

- **Complexité** : deux modèles à maintenir au lieu d'un
- **Eventual consistency** : si le Read Model est synchronisé de façon asynchrone, les lectures peuvent être légèrement décalées
- **Pas adapté partout** : sur une petite app CRUD simple, c'est du sur-engineering

---

## Lien avec d'autres concepts

- Souvent associé au **DDD** : les Commands correspondent aux intentions du domaine
- Les **DTOs** servent typiquement sur le Read side pour projeter les données vers l'UI
- Fonctionne très bien avec **Event Sourcing** : voir "CQRS + Event Sourcing"

---

## Sources

- https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
- https://mia-platform.eu/blog/understanding-event-sourcing-and-cqrs-pattern/
- Greg Young : *CQRS Documents* (PDF)
