---
tags: [SoftwareCraft, DDD]
---

Concept issu du [[Domain-Driven Design]]. Le Domain Model est la représentation en code des **comportements et invariants** du domaine métier. Ce n'est pas un schéma de base de données. Ce n'est pas du CRUD. C'est une modélisation de comment le domaine fonctionne réellement : ses règles, ses contraintes, ses transitions d'état.

---

## L'anti-pattern central : le Modèle Anémique

Le Modèle Anémique (Martin Fowler) est le pattern le plus répandu dans les codebases qui croient faire du DDD sans en appliquer l'esprit. Les classes ne contiennent que des getters et setters, et toute la logique vit dans des services.

```typescript
// Modèle anémique : Order est un sac de données
class Order {
  id: string
  status: string
  items: OrderItem[]

  getStatus() { return this.status }
  setStatus(s: string) { this.status = s }
}

// Toute la logique est dans le service
class OrderService {
  confirm(order: Order) {
    if (order.getItems().length === 0) throw new Error('Empty order')
    if (order.getStatus() !== 'pending') throw new Error('Invalid status')
    order.setStatus('confirmed')  // manipulation directe de l'état
  }

  cancel(order: Order) {
    if (order.getStatus() === 'shipped') throw new Error('Cannot cancel shipped order')
    order.setStatus('cancelled')
  }
}
```

Problèmes :
- La logique métier est dispersée dans `OrderService`, potentiellement dans d'autres services aussi
- Rien n'empêche un autre code de faire `order.setStatus('confirmed')` directement sans passer par les validations
- Les invariants ne sont pas garantis : l'objet peut se retrouver dans un état invalide
- C'est une violation du SRP : `OrderService` connaît toutes les règles de `Order`

---

## Le modèle riche

```typescript
// Modèle riche : la logique appartient à l'objet
class Order {
  private constructor(
    private readonly id: OrderId,
    private readonly customerId: CustomerId,
    private items: OrderItem[],
    private status: OrderStatus
  ) {}

  static create(customerId: CustomerId): Order {
    return new Order(
      OrderId.generate(),
      customerId,
      [],
      OrderStatus.Pending
    )
  }

  confirm(): void {
    if (this.items.length === 0) {
      throw new DomainError('Cannot confirm an empty order')
    }
    if (this.status !== OrderStatus.Pending) {
      throw new DomainError(`Cannot confirm order with status ${this.status}`)
    }
    this.status = OrderStatus.Confirmed
  }

  cancel(): void {
    if (this.status === OrderStatus.Shipped) {
      throw new DomainError('Cannot cancel an order that has already shipped')
    }
    this.status = OrderStatus.Cancelled
  }

  // L'état interne n'est accessible qu'en lecture
  get currentStatus(): OrderStatus { return this.status }
  get itemCount(): number { return this.items.length }
}
```

Maintenant, il est **impossible** de confirmer une commande vide ou d'annuler une commande expédiée, peu importe d'où l'appel vient. Les règles sont dans l'objet, pas dans un service externe qui peut être contourné.

---

## Application concrète chez Oli's Lab

Le checkout est le flow critique chez Oli's Lab. Un Domain Model riche sécurise ce flow :

```typescript
class Cart {
  private items: CartItem[]
  private promoCode: PromoCode | null

  addProduct(productId: ProductId, quantity: Quantity, price: Money): void {
    const existing = this.items.find(i => i.productId.equals(productId))
    if (existing) {
      existing.updateQuantity(quantity)
      return
    }
    this.items.push(new CartItem(productId, quantity, price))
  }

  applyPromoCode(promo: PromoCode): void {
    if (this.promoCode !== null) {
      throw new DomainError('A promo code is already applied to this cart')
    }
    if (!promo.isValid()) {
      throw new DomainError('This promo code is expired or invalid')
    }
    this.promoCode = promo
  }

  checkout(): CheckoutData {
    if (this.items.length === 0) {
      throw new DomainError('Cannot checkout an empty cart')
    }
    // Retourne les données nécessaires pour créer une Order
    // sans coupler Cart à Order directement
    return new CheckoutData(this.items, this.promoCode, this.total)
  }

  get total(): Money {
    const subtotal = this.items.reduce(
      (sum, item) => sum.add(item.total),
      Money.zero('EUR')
    )
    if (this.promoCode) {
      return this.promoCode.apply(subtotal)
    }
    return subtotal
  }
}
```

---

## Comment évaluer si son modèle est anémique

Questions à se poser :
- Est-ce que les classes du domaine n'ont que des getters et setters ?
- Est-ce qu'un service externe peut mettre un objet dans un état invalide ?
- Est-ce que la logique métier est introuvable parce qu'elle est dispersée partout ?
- Est-ce qu'on ne peut pas écrire de test unitaire sur le domaine sans charger toute l'infrastructure ?

Si la réponse est oui à l'une de ces questions, le modèle est probablement anémique.

---

## Lien avec les autres concepts

Un Domain Model riche est composé d'[[Entity|Entities]] et de [[Value Object|Value Objects]] avec leur propre logique, organisés en [[Aggregate|Aggregates]] pour garantir la cohérence, accessibles via des [[Repository|Repositories]], et coordonnés par des [[Domain Service|Domain Services]] pour les opérations cross-objets.

Le Domain Model exprime l'[[Ubiquitous Language]] : si le code ne ressemble pas à la façon dont les experts métier décrivent le domaine, c'est un signal que le modèle ne capture pas correctement la réalité.
