---
tags: [SoftwareCraft, DDD]
---
Séparer les opérations d'**écriture** (Commands) des opérations de **lecture** (Queries) en deux modèles distincts.

Règle fondamentale : une méthode soit lit des données, soit les modifie. Jamais les deux en même temps.

- **Command** : modifie l'état du système. Ne retourne pas de données (ou juste un accusé de réception).
- **Query** : lit l'état du système. Ne modifie rien.

La séparation Commands / Queries s'aligne naturellement sur [[Domain-Driven Design|DDD]] : une Command exprime une intention du domaine, une Query un besoin de lecture.

---

## Le problème qu'il résout

Dans une architecture CRUD classique, le même modèle sert à la fois pour lire et écrire. Ça devient un problème quand les patterns de lecture et d'écriture divergent : beaucoup plus de reads que de writes, logique métier complexe à l'écriture mais lectures simples et rapides, besoin de scaler les deux côtés indépendamment.

Un catalogue e-commerce est un exemple concret de ce déséquilibre : le produit est écrit rarement (via un CMS), lu des centaines de fois par jour sur le listing, la page produit, la recherche. Forcer le même modèle pour les deux est un compromis qui ne sert bien ni l'un ni l'autre.

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

Le Read Model est synchronisé depuis le Write Model, souvent via des events. Il peut avoir un format complètement différent, optimisé pour les requêtes de l'UI. Les projections prennent la forme de [[DTO|DTOs]], sans logique métier.

---

## Exemple concret

Le checkout est un flow d'écriture avec des règles métier : panier validé, stock vérifié, promo appliquée, commande créée. Ce flow n'a pas besoin de retourner une vue enrichie : il retourne un `orderId`, c'est tout.

```typescript
// Command : une intention du domaine, pas une requête de lecture
interface PlaceOrderCommand {
  cartId: string
  customerId: string
  shippingAddress: AddressDTO
}

async function handlePlaceOrder(cmd: PlaceOrderCommand): Promise<{ orderId: string }> {
  const cart = await cartRepository.findById(new CartId(cmd.cartId))
  if (!cart) throw new NotFoundError('Cart not found')

  const order = Order.createFromCart(cart, new CustomerId(cmd.customerId))
  await orderRepository.save(order)

  eventBus.publish({ type: 'OrderPlaced', orderId: order.id.value })

  return { orderId: order.id.value }
}
```

La page "mes commandes" n'a pas besoin de passer par les Aggregates de domaine. Elle veut une liste pré-formatée pour l'UI, rapidement.

```typescript
// Query : lit, ne modifie rien
async function handleGetCustomerOrders(
  customerId: string,
  page: number
): Promise<OrderSummaryDTO[]> {
  // Requête directe sur le Read Model, pas de reconstruction d'Aggregate
  return orderReadCollection
    .find({ customerId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * 10)
    .limit(10)
    .toArray()
    .then(docs => docs.map(toOrderSummaryDTO))
}
```

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

Associé à [[Event Sourcing]], CQRS résout le problème de reconstruction coûteuse que ce pattern crée, les deux forment alors [[CQRS + Event Sourcing]].
