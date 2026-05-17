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

## Exemple concret

Un système de scoring dont la formule évolue régulièrement. Quand un ingrédient est reclassifié, tous les produits qui le contiennent doivent être recalculés. Sans CQRS, ce recalcul bloque les lectures. Avec CQRS, le Write side applique la reclassification et émet un event ; le Read side recalcule les projections de façon asynchrone ; le catalogue reste disponible pendant ce temps.

```typescript
// Write side : Command et production d'event
async function handleReclassifyIngredient(cmd: ReclassifyIngredientCommand): Promise<void> {
  const active = await activeRepository.findById(cmd.activeId)
  if (!active) throw new NotFoundError(`Active ${cmd.activeId} not found`)

  const event = {
    type: 'IngredientReclassified' as const,
    activeId: cmd.activeId,
    previousRating: active.currentRating,
    newRating: cmd.newRating,
    reason: cmd.reason,
    occurredAt: new Date(),
  }

  await eventStore.append(event)
  await eventBus.publish(event)  // déclenche la mise à jour des projections
}

// Read side : projection reconstruite depuis les events
async function onIngredientReclassified(event: IngredientReclassifiedEvent): Promise<void> {
  const affectedProducts = await productReadModel.findByActiveId(event.activeId)

  for (const product of affectedProducts) {
    const allEvents = await eventStore.getEventsForProduct(product.id)
    const newScore = reconstructCompatibilityScore(allEvents)
    await productReadModel.updateCompatibilityScore(product.id, newScore)
  }
}
```

Le frontend lit depuis les projections du Read side, qui sont pré-calculées et indexées. Aucune latence de reconstruction à chaque requête.

---

## Ce que ça change

**Séparation claire des responsabilités** : le Write side se concentre sur la validité des opérations et la capture des faits. Le Read side se concentre sur la performance des lectures et les besoins de présentation.

**Flexibilité des projections** : puisque les événements sont stockés en permanence, on peut créer de nouvelles projections à tout moment en rejouant l'historique. Un nouveau besoin d'affichage demain = nouvelle projection + replay, sans modifier le Write side.

**Consistance éventuelle** : la synchronisation entre Write side et Read side est asynchrone. Une lecture juste après une écriture peut ne pas encore refléter le changement. C'est acceptable sur un catalogue produit, pas sur un flow de commande où la confirmation doit être immédiate. Ce trade-off est à évaluer domaine par domaine.

---

## Quand utiliser cette combinaison

Pertinent quand le domaine est complexe avec beaucoup de règles métier à l'écriture, que l'auditabilité est une exigence forte, et que les besoins de lecture et d'écriture sont très différents en volume ou en format.

Pas pertinent sur une app CRUD simple, quand la consistance immédiate est non-négociable, ou quand l'équipe n'a pas encore l'expérience pour gérer cette complexité.

---

## Inconvénients de la combinaison

- **Complexité accrue** : deux sides, un event store, des projections, de la synchronisation asynchrone
- **Versioning des events** : les events stockés sont permanents, leur schéma doit être versionné avec soin
- **Eventual consistency** : à gérer explicitement dans l'UI et dans les attentes utilisateurs
- **Courbe d'apprentissage** : paradigme suffisamment différent pour nécessiter une vraie montée en compétences
