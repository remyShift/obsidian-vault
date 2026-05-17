---
tags: [SoftwareCraft, DDD]
---
Au lieu de stocker l'état actuel d'une entité dans la base de données, on stocke la **séquence chronologique des événements** qui ont amené à cet état.

L'état actuel se reconstruit en "rejouant" les événements dans l'ordre. En [[Domain-Driven Design|DDD]], les événements correspondent aux faits du domaine : ce qui s'est passé, exprimé dans l'Ubiquitous Language.

---

## Le problème qu'il résout

Dans une architecture classique, une opération de mise à jour écrase l'état précédent. On perd l'historique : impossible de savoir pourquoi un score est passé de 78 à 45, qui a modifié quoi, ni de revenir en arrière. C'est acceptable pour des données sans valeur historique. C'est problématique pour un système de scoring dont la formule évolue dans le temps et dont chaque changement doit pouvoir être expliqué et rejoué.

---

## Analogie

Un compte bancaire en CRUD classique : `{ solde: 1250 }`

Un compte bancaire en Event Sourcing :

```json
[
  { "type": "AccountOpened", "amount": 1000, "date": "..." },
  { "type": "MoneyDeposited", "amount": 500, "date": "..." },
  { "type": "MoneyWithdrawn", "amount": 250, "date": "..." }
]
```

Le solde de 1250 se calcule en rejouant ces trois événements. L'historique est complet et inviolable. Les valeurs dans les payloads, comme `amount`, se prêtent naturellement à des [[Value Object|Value Objects]] : immuables, sans identité, définis uniquement par leurs valeurs.

---

## Propriétés fondamentales

- **Append-only** : on n'update jamais un événement, on n'en supprime jamais. L'historique est sacré.
- **Source of truth** : l'event store est la seule vérité du système
- **Audit trail complet** : on peut savoir exactement ce qui s'est passé à n'importe quel moment
- **Rejouabilité** : on peut reconstruire n'importe quel état passé en rejouant les événements jusqu'à ce point

---

## Exemple concret

Un système de scoring produit dont la formule évolue régulièrement. Chaque reclassification d'ingrédient est un événement. Si la formule change, on rejoue tous les événements avec le nouvel algorithme et on obtient les nouveaux scores sans perdre l'historique.

```typescript
type ProductScienceEvent =
  | {
      type: 'IngredientReclassified'
      activeId: string
      previousRating: number
      newRating: number
      reason: string
      occurredAt: Date
    }
  | {
      type: 'ProductCompatibilityScored'
      productId: string
      skinType: string
      score: number
      formulaVersion: string
      occurredAt: Date
    }

// Reconstruire le score d'un produit à une date donnée
function reconstructScoreAt(
  events: ProductScienceEvent[],
  productId: string,
  atDate: Date
): number {
  return events
    .filter(e => e.occurredAt <= atDate)
    .reduce((score, event) => {
      if (event.type === 'ProductCompatibilityScored' && event.productId === productId) {
        return event.score
      }
      return score
    }, 0)
}
```

La question "pourquoi ce produit avait un score de 78 il y a 3 mois et 45 aujourd'hui ?" devient répondable : on rejoue l'event store jusqu'à cette date et on liste les événements qui expliquent la différence.

---

## Avantages

- Traçabilité totale : chaque changement d'état est enregistré avec son contexte
- Capacité à reconstruire l'état à n'importe quel point dans le temps
- Déboggage facilité : on peut rejouer exactement ce qui s'est passé
- Possibilité de créer de nouvelles projections a posteriori à partir des événements existants

---

## Inconvénients et points de vigilance

- **Reconstruction coûteuse** : reconstruire l'état depuis des millions d'événements peut être lent, on résout ça avec des snapshots ou en combinant avec [[CQRS + Event Sourcing|CQRS]]
- **Versioning des events** : si le schéma d'un événement change, il faut gérer la compatibilité avec les anciens événements stockés
- **Paradigme différent** : demande un changement de façon de penser, courbe d'apprentissage réelle
- **Pas adapté partout** : inutilement complexe pour des données sans besoin d'historique. Le catalogue produit, les profils clients, les commandes une fois passées : CRUD classique suffit largement. Event Sourcing se justifie là où l'historique a une valeur métier réelle et où rejouer le passé est un besoin concret.
