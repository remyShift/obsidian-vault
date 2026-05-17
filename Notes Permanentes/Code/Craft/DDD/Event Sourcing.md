---
tags: [SoftwareCraft, DDD]
---
Au lieu de stocker l'état actuel d'une entité dans la base de données, on stocke la **séquence chronologique des événements** qui ont amené à cet état.

L'état actuel se reconstruit en "rejouant" les événements dans l'ordre. En [[Domain-Driven Design|DDD]], les événements correspondent aux faits du domaine : ce qui s'est passé, exprimé dans l'Ubiquitous Language.

---

## Le problème qu'il résout

Dans une architecture classique, une opération de mise à jour écrase l'état précédent. On perd l'historique : impossible de savoir pourquoi le solde est de 1250, qui a fait quoi, ni de revenir en arrière.

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
- **Pas adapté partout** : inutilement complexe pour des données sans besoin d'historique

---

## Chez Oli's Lab

Event Sourcing complet sur toute l'app serait du sur-engineering. Mais il y a un domaine où le pattern a une valeur réelle : le **scoring scientifique des produits**.

### Le problème sans Event Sourcing

Aujourd'hui, quand Patrick met à jour le score de compatibilité d'un produit, l'ancien score est écrasé. Si Olivia demande "pourquoi ce produit avait un meilleur score il y a 3 mois ?", personne ne peut répondre. La formule de scoring évolue, les ingrédients sont reclassifiés, mais l'historique est perdu.

### Ce que Event Sourcing apporterait ici

```typescript
// Event store pour le domaine scientifique
type ProductScienceEvent =
  | {
      type: 'ProductIngredientAdded'
      productId: string
      ingredient: { name: string; activeId: string; concentration: number }
      addedAt: Date
    }
  | {
      type: 'IngredientReclassified'
      activeId: string
      previousRating: number
      newRating: number
      reason: string
      reclassifiedAt: Date
    }
  | {
      type: 'ScoringFormulaUpdated'
      version: string
      changes: string
      updatedAt: Date
    }
  | {
      type: 'ProductCompatibilityScored'
      productId: string
      skinType: string
      score: number
      formulaVersion: string
      scoredAt: Date
    }

// Reconstruire le score d'un produit à une date donnée
function reconstructScoreAt(
  events: ProductScienceEvent[],
  productId: string,
  atDate: Date
): number {
  const relevantEvents = events
    .filter(e => new Date(e.scoredAt ?? e.updatedAt ?? e.addedAt) <= atDate)
    .filter(e => 'productId' in e ? e.productId === productId : true)

  // Rejouer les événements dans l'ordre pour reconstruire l'état
  return relevantEvents.reduce((score, event) => {
    if (event.type === 'ProductCompatibilityScored' && event.productId === productId) {
      return event.score
    }
    return score
  }, 0)
}
```

### Le cas du rating system de Patrick

Patrick travaille sur un système de recommandation produit. Chaque fois qu'un ingrédient est reclassifié (la science avance), tous les scores des produits qui le contiennent doivent être recalculés. Avec Event Sourcing, ce recalcul est possible en rejouant les événements avec la nouvelle classification. Sans historique, il faut recalculer depuis zéro et on ne peut pas expliquer pourquoi un score a changé.

### Ce qui n'a pas besoin d'Event Sourcing chez Oli's Lab

Le catalogue produit (nom, prix, description), les commandes une fois passées, les profils clients : des données CRUD classiques. L'historique n'a pas de valeur métier sur ces objets. Ajouter Event Sourcing là-dessus serait de la complexité gratuite.

La règle : Event Sourcing là où **l'historique a de la valeur métier** et où **rejouer le passé est un besoin réel**.
