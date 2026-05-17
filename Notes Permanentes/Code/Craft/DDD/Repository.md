---
tags: [SoftwareCraft, DDD]
---
Un Repository est une abstraction qui **isole la logique métier de la persistance**. Le domaine ne sait pas si les données viennent de MongoDB, d'une API externe, d'un cache Redis, ou d'un fichier. Il demande un objet, il le reçoit.

C'est une application directe du Dependency Inversion Principle ([[Les Principes SOLID]]) --> la couche domaine dépend d'une interface abstraite, pas d'une implémentation concrète.

Il cache trois choses au domaine :
- La technologie de persistance (MongoDB, SQL, API...)
- La structure de stockage (collections, tables, schémas...)
- Les détails de requêtage (queries, indexes, projections...)

Au final le domaine ne voit qu'un contrat comme : "donne-moi un Order par ID", "sauvegarde cet Order".

---

## Structure

Le Repository a deux parties : une interface définie dans le domaine, une implémentation dans la couche infrastructure.

```typescript
// Dans le domaine : le contrat
// Le domaine ne sait rien de MongoDB
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>
  findByCustomerId(customerId: CustomerId): Promise<Order[]>
  save(order: Order): Promise<void>
  delete(id: OrderId): Promise<void>
}

// Dans l'infrastructure : l'implémentation MongoDB
class MongoOrderRepository implements OrderRepository {
  constructor(private readonly collection: Collection<OrderDocument>) {}

  async findById(id: OrderId): Promise<Order | null> {
    const doc = await this.collection.findOne({ _id: id.value })
    if (!doc) return null
    return this.toDomain(doc)  // mapping document -> objet domaine
  }

  async save(order: Order): Promise<void> {
    const doc = this.toDocument(order)  // mapping objet domaine -> document
    await this.collection.replaceOne(
      { _id: doc._id },
      doc,
      { upsert: true }
    )
  }

  private toDomain(doc: OrderDocument): Order {
    return new Order(
      new OrderId(doc._id.toString()),
      new CustomerId(doc.customerId),
      doc.items.map(i => new OrderItem(
        new ProductId(i.productId),
        new Quantity(i.quantity),
        new Money(i.unitPrice.amount, i.unitPrice.currency)
      )),
      doc.status as OrderStatus
    )
  }

  private toDocument(order: Order): OrderDocument {
    // mapping inverse
  }
}
```

---

## Règles d'un bon Repository

**Un Repository par Aggregate Root :** il n'y a pas de `OrderItemRepository`, les `OrderItem` ne sont accessibles et modifiables qu'à travers `OrderRepository`, parce qu'ils font partie de l'[[Aggregate]] `Order`.

**L'interface appartient au domaine, l'implémentation à l'infrastructure :** le dossier `domain/` contient l'interface, le dossier `infrastructure/` contient la classe MongoDB/Mongoose.

**Retourner des objets domaine, pas des documents :** le Repository fait le mapping, un service ne reçoit jamais un document Mongoose brut, il reçoit une `Order`.

**Pas de logique métier dans le Repository :** filtrer des commandes selon une règle métier complexe ne se fait pas dans le Repository. On charge les objets, et la logique s'applique sur les objets domaine.

---

## Ce que ça change pour les tests

Sans Repository, tester la logique métier nécessite une vraie connexion MongoDB, alors qu'avec un Repository, on mock l'interface :

```typescript
// Dans les tests unitaires
class InMemoryOrderRepository implements OrderRepository {
  private store: Map<string, Order> = new Map()

  async findById(id: OrderId): Promise<Order | null> {
    return this.store.get(id.value) ?? null
  }

  async save(order: Order): Promise<void> {
    this.store.set(order.id.value, order)
  }
}

// Le test est rapide, déterministe, sans infra
it('should confirm a pending order', async () => {
  const repo = new InMemoryOrderRepository()
  const order = Order.create(new CustomerId('c1'), [someItem])
  await repo.save(order)

  await confirmOrder(order.id.value, repo)

  const saved = await repo.findById(order.id)
  expect(saved.status).toBe(OrderStatus.Confirmed)
})
```

---

### Les Erreurs classiques

**Injecter directement un model Mongoose dans un service :** `OrderService` qui appelle `OrderModel.findOne(...)` directement
- La logique métier est couplée à MongoDB, les tests nécessitent une vraie base.

**Un Repository fourre-tout :** `findByStatusAndCustomerIdAndDateRange...`. Si les queries deviennent très spécifiques à des besoins d'affichage, c'est souvent le signe qu'on a besoin d'un Read Model séparé ([[CQRS]]).

**Exposer des méthodes qui ne correspondent pas à des opérations métier :** `update(id, partialData)`. Le Repository ne fait pas de PATCH générique, il sauvegarde un Aggregate entier après que le domaine a appliqué ses règles.
