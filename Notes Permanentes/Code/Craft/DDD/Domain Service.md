---
tags: [SoftwareCraft, DDD]
---

Un Domain Service contient de la **logique métier qui n'appartient naturellement à aucune [[Entity]] ni [[Value Object]]**.

- Ce n'est pas un service applicatif, ce n'est pas un utilitaire technique, c'est une opération du domaine qui implique plusieurs objets et qui ne peut pas être assignée à l'un d'entre eux sans créer une responsabilité artificielle.

⚠️ A utiliser avec parcimonie, l'erreur classique est d'en créer trop, ce qui revient à faire du [[Domain Model|Modèle Anémique]] avec un nom différent.

La question à se poser d'abord : est-ce que cette logique peut appartenir à une Entity ou un Value Object existant ? Si oui, elle doit y être.

Un Domain Service est justifié quand :

- L'opération implique plusieurs Aggregates qui ne doivent pas se connaître directement
- L'opération est une règle métier significative qui n'a pas de "maison" naturelle
- Assigner la responsabilité à l'une des Entities créerait un couplage artificiel

---

## Exemple : ce qui n'est PAS un Domain Service

```typescript
// Ce n'est pas un Domain Service, c'est de la logique qui appartient à Order
class OrderPricingService {
  calculateTotal(order: Order): Money { ... }
}

// C'est ici que ça doit vivre
class Order {
  get total(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.total),
      Money.zero('EUR')
    )
  }
}
```

Si la logique ne concerne qu'un seul objet, elle appartient à cet objet. Un Domain Service pour ça, c'est du Modèle Anémique enrobé dans un nom DDD.

---

## Application concrète chez Oli's Lab

### Cas 1 : Application d'un code promo avec vérification externe

La règle métier : un code promo est valide si son code existe, n'est pas expiré, et n'a pas déjà été utilisé par ce client. Cette règle implique `Order`, `PromoCode`, et `Customer`. Elle ne peut pas appartenir uniquement à `Order` sans que `Order` connaisse `Customer`.

```typescript
class PromoCodeApplicationService {  // Domain Service
  constructor(
    private readonly promoCodeRepository: PromoCodeRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  async apply(orderId: OrderId, code: string, customerId: CustomerId): Promise<void> {
    const order = await this.orderRepository.findById(orderId)
    if (!order) throw new NotFoundError('Order not found')

    const promo = await this.promoCodeRepository.findByCode(code)
    if (!promo) throw new NotFoundError('Promo code not found')

    // La règle métier : ce service orchestre, mais la validation appartient au domaine
    if (!promo.isApplicableFor(customerId)) {
      throw new DomainError('This promo code cannot be used by this customer')
    }

    // L'application effective reste dans l'Aggregate
    order.applyPromoCode(promo)
    await this.orderRepository.save(order)
  }
}
```

### Cas 2 : Calcul de la compatibilité produit/profil (domaine scientifique)

Le calcul d'un score de compatibilité implique un `Product` (pour ses ingrédients) et un `SkinProfile` (pour les concerns et sensibilités). Ce n'est la responsabilité ni du produit ni du profil seul.

```typescript
class CompatibilityScorer {  // Domain Service
  score(product: Product, profile: SkinProfile): CompatibilityScore {
    const ingredientScores = product.scientificIngredients.map(ingredient =>
      this.scoreIngredientForProfile(ingredient, profile)
    )
    return CompatibilityScore.aggregate(ingredientScores)
  }

  private scoreIngredientForProfile(
    ingredient: ScientificIngredient,
    profile: SkinProfile
  ): number {
    if (profile.hasSensitivityTo(ingredient.active)) return -2
    if (profile.concerns.some(c => ingredient.treats(c))) return +2
    return 0
  }
}
```

---

## Domain Service vs Application Service

C'est une distinction importante et souvent floue.

| | Domain Service | Application Service |
|---|---|---|
| Contient | Logique métier | Orchestration (load, execute, return) |
| Dépend de | Autres objets du domaine | Repositories, Domain Services, infrastructure |
| Testable | Sans infrastructure | Nécessite des mocks de repositories |
| Exprime | Une règle du domaine | Un cas d'usage |

Un Application Service coordonne : il charge depuis le Repository, appelle le Domain Service ou l'Entity, sauvegarde. Il n'a pas de règles métier propres.

```typescript
// Application Service : orchestration
class CheckoutService {
  async checkout(cartId: CartId, customerId: CustomerId): Promise<OrderId> {
    const cart = await this.cartRepository.findById(cartId)
    const customer = await this.customerRepository.findById(customerId)

    // Domain Service : règle métier cross-objets
    const order = this.orderFactory.createFromCart(cart, customer)

    await this.orderRepository.save(order)
    return order.id
  }
}
```

---

## Erreurs classiques

**Créer un Domain Service pour chaque opération :** `OrderService`, `ProductService`, `CustomerService` qui contiennent toute la logique. C'est du Modèle Anémique habillé en DDD, les Entities deviennent des sacs de données.

**Confondre Domain Service et Application Service :** un Domain Service ne charge pas depuis un Repository, ne répond pas à une requête HTTP, ne log pas, il applique une règle métier, c'est tout.

**Nommer le service d'après une entité plutôt que d'après l'opération :** `OrderService` est vague, `PromoCodeApplicationService` ou `CompatibilityScorer` dit exactement ce que le service fait.
