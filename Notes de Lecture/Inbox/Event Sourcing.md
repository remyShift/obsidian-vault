---
tags:
---
## Principe

Au lieu de stocker l'état actuel d'une entité dans la base de données, on stocke la **séquence chronologique des événements** qui ont amené à cet état.

L'état actuel se reconstruit en "rejouant" les événements dans l'ordre.

---

## Le problème qu'il résout

Dans une architecture classique, une opération de mise à jour écrase l'état précédent. On perd l'historique : impossible de savoir pourquoi le solde est de 1250, qui a fait quoi, ni de revenir en arrière.

---

## Analogie

Un compte bancaire en CRUD classique : `{ solde: 1250 }`

Un compte bancaire en Event Sourcing :
```
[
  { type: 'AccountOpened', amount: 1000, date: '...' },
  { type: 'MoneyDeposited', amount: 500, date: '...' },
  { type: 'MoneyWithdrawn', amount: 250, date: '...' },
]
```

Le solde de 1250 se calcule en rejouant ces trois événements. L'historique est complet et inviolable.

---

## Propriétés fondamentales

- **Append-only** : on n'update jamais un événement, on n'en supprime jamais. L'historique est sacré.
- **Source of truth** : l'event store est la seule vérité du système
- **Audit trail complet** : on peut savoir exactement ce qui s'est passé à n'importe quel moment
- **Rejouabilité** : on peut reconstruire n'importe quel état passé en rejouant les événements jusqu'à ce point

---

## Avantages

- Traçabilité totale : chaque changement d'état est enregistré avec son contexte
- Capacité à reconstruire l'état à n'importe quel point dans le temps
- Débogage facilité : on peut rejouer exactement ce qui s'est passé
- Possibilité de créer de nouvelles projections a posteriori à partir des événements existants

---

## Inconvénients et points de vigilance

- **Reconstruction coûteuse** : reconstruire l'état depuis des millions d'événements peut être lent (solution : snapshots ou CQRS)
- **Versioning des events** : si le schéma d'un événement change, il faut gérer la compatibilité avec les anciens événements stockés
- **Paradigme différent** : demande un changement de façon de penser, courbe d'apprentissage réelle
- **Pas adapté partout** : inutilement complexe pour des données sans besoin d'historique

---

## Lien avec d'autres concepts

- Souvent associé au **DDD** : les événements correspondent aux faits du domaine
- Le problème de reconstruction coûteuse se résout avec **CQRS** : voir "CQRS + Event Sourcing"
- Les **Value Objects** sont souvent utilisés dans les payloads des événements

---

## Sources

- https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
- https://developer.confluent.io/courses/event-sourcing/cqrs/
- https://mia-platform.eu/blog/understanding-event-sourcing-and-cqrs-pattern/
