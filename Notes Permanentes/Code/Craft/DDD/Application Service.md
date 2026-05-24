---
tags: [SoftwareCraft, DDD]
---
Un Application Service orchestre un cas d'usage. Il reçoit une intention depuis l'extérieur (HTTP, queue, CLI), charge les objets nécessaires via les [[Repository|Repositories]], délègue la logique au domaine, sauvegarde le résultat, et retourne une réponse.

Il n'a pas de logique métier propre. S'il commence à décider si une action est valide ou non, c'est une responsabilité qui appartient au domaine.

```
HTTP Request
     │
     ▼
Controller        (validation format, parsing)
     │
     ▼
Application Service   (orchestration : load, execute, save, publish)
     │
     ▼
Domain               (règles métier : Entities, Aggregates, Domain Services)
     │
     ▼
Repository / Infrastructure
```

---

## Ce qu'il fait, ce qu'il ne fait pas

Il fait :
- Charger les Aggregates via les Repositories
- Appeler les méthodes métier sur ces Aggregates
- Coordonner plusieurs Aggregates ou Domain Services si nécessaire
- Sauvegarder les changements
- Publier des Domain Events
- Mapper le résultat en DTO pour la couche supérieure

Il ne fait pas :
- Valider des règles métier (c'est le domaine)
- Contenir de la logique `if/else` sur l'état des objets métier
- Accéder directement à la base de données ou à des APIs tierces
- Construire des Aggregates complexes (c'est la [[Factory]])

---

## Exemple concret chez Oli's Lab

```typescript
class CheckoutApplicationService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderFactory: OrderFactory,
    private readonly eventBus: EventBus
  ) {}

  async placeOrder(cmd: PlaceOrderCommand): Promise<PlaceOrderResult> {
    // 1. Charger les objets nécessaires
    const cart = await this.cartRepository.findById(new CartId(cmd.cartId))
    if (!cart) throw new NotFoundError(`Cart ${cmd.cartId} not found`)

    const customer = await this.customerRepository.findById(new CustomerId(cmd.customerId))
    if (!customer) throw new NotFoundError(`Customer ${cmd.customerId} not found`)

    const shippingAddress = Address.create(cmd.shippingAddress)

    // 2. Déléguer la logique au domaine
    // La Factory applique les règles de création (panier non vide, client éligible...)
    const order = this.orderFactory.createFromCart(cart, customer, shippingAddress)

    // 3. Sauvegarder
    await this.orderRepository.save(order)

    // 4. Publier les événements
    await this.eventBus.publish({
      type: 'OrderPlaced',
      orderId: order.id.value,
      customerId: customer.id.value,
      total: order.total,
    })

    // 5. Retourner un DTO, pas l'Aggregate
    return { orderId: order.id.value }
  }
}
```

Le `CheckoutApplicationService` ne sait pas ce que "panier vide" signifie. Il ne sait pas si un client est éligible. Il ne connaît pas les règles de construction d'un `Order`. Il orchestre, c'est tout.

---

## Application Service vs Domain Service

C'est la distinction la plus importante à maîtriser.

| | Application Service | [[Domain Service]] |
|---|---|---|
| Contient | Orchestration | Logique métier cross-objets |
| Dépend de | Repositories, infra, Domain Services | Objets du domaine uniquement |
| Connaît | Les cas d'usage | Les règles métier |
| Testable | Avec mocks de repositories | Sans infrastructure |
| Exemple | `CheckoutApplicationService` | `CompatibilityScorer`, `PromoCodeApplicator` |

Si une méthode dans un Application Service commence à calculer quelque chose ou à prendre une décision métier, c'est un signal que cette logique doit descendre dans le domaine.

---

## Un Application Service par cas d'usage

L'erreur courante c'est de créer un `OrderService` fourre-tout avec `placeOrder`, `cancelOrder`, `updateShipping`, `applyPromo`... C'est le même problème que le controller God.

Un Application Service peut regrouper plusieurs cas d'usage liés, mais chaque méthode publique correspond à exactement un cas d'usage. Si la classe grossit trop, découper par sous-domaine : `CheckoutApplicationService`, `OrderManagementService`, `OrderQueryService`.

---

### Erreurs classiques

**Logique métier dans l'Application Service :** `if (order.items.length === 0) throw new Error(...)`. Cette règle appartient à l'Aggregate `Order` ou à la Factory, pas ici.

**Accès direct à la base de données :** `const doc = await db.collection('orders').findOne(...)`. L'Application Service ne connaît pas MongoDB, il parle aux Repositories.

**Retourner l'Aggregate directement :** le layer au-dessus (controller) ne doit pas recevoir un objet domaine. Il reçoit un DTO. L'Application Service fait ce mapping.

**Un seul Application Service pour tout le domaine :** `ApplicationService.doEverything()`. Découpez par cas d'usage ou par sous-domaine.
