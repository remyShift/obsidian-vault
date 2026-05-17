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

---

## Chez Oli's Lab

La combinaison CQRS + Event Sourcing n'est pas pertinente sur toute l'app, mais il y a un domaine où elle aurait de la valeur réelle : **le système de scoring scientifique produit**.

### Le scénario concret

Patrick fait évoluer la formule de scoring des ingrédients. Chaque évolution doit pouvoir être rejouée pour recalculer les scores de compatibilité de tous les produits. Et on veut pouvoir expliquer à Olivia pourquoi le score d'un produit a changé entre deux versions de la formule.

```typescript
// Write side : Command et Event Store
interface ReclassifyIngredientCommand {
  activeId: string
  newRating: number
  reason: string
}

async function handleReclassifyIngredient(cmd: ReclassifyIngredientCommand): Promise<void> {
  // Validation domaine
  const active = await activeRepository.findById(cmd.activeId)
  if (!active) throw new NotFoundError(`Active ${cmd.activeId} not found`)

  // Production de l'event (append-only dans l'event store)
  const event = {
    type: 'IngredientReclassified' as const,
    activeId: cmd.activeId,
    previousRating: active.currentRating,
    newRating: cmd.newRating,
    reason: cmd.reason,
    occurredAt: new Date(),
  }

  await eventStore.append(event)

  // Déclenche la mise à jour asynchrone des projections
  await eventBus.publish(event)
}

// Read side : projection qui se reconstruit depuis les events
async function onIngredientReclassified(event: IngredientReclassifiedEvent): Promise<void> {
  // Trouver tous les produits qui contiennent cet ingrédient
  const affectedProducts = await productReadModel.findByActiveId(event.activeId)

  for (const product of affectedProducts) {
    // Recalculer le score depuis l'event store
    const allEvents = await eventStore.getEventsForProduct(product.id)
    const newScore = reconstructCompatibilityScore(allEvents)

    // Mettre à jour la projection de lecture
    await productReadModel.updateCompatibilityScore(product.id, newScore)
  }
}
```

### Ce que ça permet concrètement

- Olivia demande "pourquoi le produit X a un score de 45 alors qu'il avait 78 il y a 2 mois ?" : on rejoue l'event store jusqu'à cette date et on lui donne la réponse avec les événements qui expliquent la différence.
- Patrick sort une nouvelle version de la formule de scoring : on rejoue tous les événements avec le nouvel algorithme et on obtient les nouveaux scores sans perdre l'historique.
- Le Read side (catalogue, page produit) ne subit aucune latence due aux recalculs : les projections sont pré-calculées de façon asynchrone.

### Pourquoi pas sur le checkout

Le checkout a besoin de consistance immédiate. Si un client passe commande, il doit voir sa commande confirmée instantanément, pas après que les projections se soient mises à jour. L'eventual consistency du Read side est acceptable sur le catalogue, pas sur le flow de commande. C'est exactement le type de décision à prendre domaine par domaine, pas de façon uniforme sur toute l'app.
