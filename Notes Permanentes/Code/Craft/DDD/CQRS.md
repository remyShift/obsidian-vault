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

---

## Chez Oli's Lab

Oli's Lab a exactement le déséquilibre read/write qui justifie CQRS sur certains flows : le catalogue produit est lu des centaines de fois par jour, écrit rarement (via Payload CMS). Le scoring scientifique est calculé une fois, consulté à chaque visite.

### Write side : le checkout

La commande est un flow d'écriture avec des règles métier complexes. Panier validé, stock vérifié, promo appliquée, commande créée. Ce flow n'a pas besoin de retourner une vue enrichie : il retourne un `orderId` et c'est tout.

```typescript
// Command : une intention du domaine, pas une requête de lecture
interface PlaceOrderCommand {
  cartId: string
  customerId: string
  shippingAddress: AddressDTO
}

// Command Handler : logique métier pure, retourne juste un identifiant
async function handlePlaceOrder(cmd: PlaceOrderCommand): Promise<{ orderId: string }> {
  const cart = await cartRepository.findById(new CartId(cmd.cartId))
  if (!cart) throw new NotFoundError('Cart not found')

  const order = Order.createFromCart(cart, new CustomerId(cmd.customerId))
  await orderRepository.save(order)

  // Émet un event pour que le Read side se mette à jour
  eventBus.publish({ type: 'OrderPlaced', orderId: order.id.value })

  return { orderId: order.id.value }
}
```

### Read side : l'historique commandes

La page "mes commandes" n'a pas besoin de passer par les Aggregates de domaine. Elle veut juste une liste de données pré-formatées pour l'UI, rapidement.

```typescript
// Query : lit, ne modifie rien
interface GetCustomerOrdersQuery {
  customerId: string
  page: number
  limit: number
}

// Read Model : projection optimisée pour l'UI, MongoDB avec index sur customerId
interface OrderSummaryDTO {
  id: string
  status: string
  total: { amount: number; currency: string }
  itemCount: number
  createdAt: string
}

async function handleGetCustomerOrders(
  query: GetCustomerOrdersQuery
): Promise<OrderSummaryDTO[]> {
  // Requête directe sur le Read Model, pas de reconstruction d'Aggregate
  const docs = await orderReadCollection
    .find({ customerId: query.customerId })
    .sort({ createdAt: -1 })
    .skip((query.page - 1) * query.limit)
    .limit(query.limit)
    .toArray()

  return docs.map(toOrderSummaryDTO)
}
```

### Catalogue produit : le cas le plus évident

Le catalogue est lu constamment. L'écriture se fait via Payload CMS (rare, asynchrone). Ce sont deux flows complètement différents qui n'ont aucune raison de partager le même modèle.

```typescript
// Write side : Payload CMS écrit le document produit complet
// (données e-commerce + données scientifiques + métadonnées CMS)

// Read side : projection catalogue, optimisée pour le listing
interface ProductListingDTO {
  id: string
  name: string
  slug: string
  price: { amount: number; currency: string }
  inStock: boolean
  thumbnailUrl: string
  compatibilityScore: number | null  // injecté si profil skin disponible
}

// Cette projection est mise à jour quand Payload publie un produit
// Le frontend lit depuis cette projection, pas depuis le document complet
```

Le lien avec le travail en cours sur la migration Payload : le CMS est le Write side naturel du catalogue. La synchronisation vers un Read Model optimisé (collection MongoDB indexée pour le listing) est exactement ce que le pattern préconise.
