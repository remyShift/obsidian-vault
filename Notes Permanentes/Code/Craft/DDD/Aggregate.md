---
tags: [SoftwareCraft, DDD]
---

Concept issu du [[Domain-Driven Design]]. Un Aggregate est un groupe d'[[Entity|Entities]] et de [[Value Object|Value Objects]] traité comme une **unité cohérente**. Il a une racine unique, l'**Aggregate Root**, qui est la seule porte d'entrée vers les objets internes. On ne modifie jamais directement un objet interne d'un Aggregate : on passe toujours par la racine.

---

## Pourquoi les Aggregates existent

Sans frontières, les objets du domaine peuvent être modifiés depuis n'importe où. Un service peut changer le statut d'une commande, un autre peut modifier ses items simultanément. Les invariants (les règles que le système doit toujours respecter) ne peuvent pas être garantis.

L'Aggregate est une **frontière de cohérence transactionnelle**. Tout ce qui est à l'intérieur d'un Aggregate est modifié dans la même transaction. Tout ce qui est à l'extérieur est accessible uniquement par référence (via un ID).

---

## Les 4 règles de Vaughn Vernon

**1. Protéger les invariants du domaine à l'intérieur de l'Aggregate**
Toutes les règles qui doivent toujours être vraies pour cet Aggregate sont appliquées par l'Aggregate Root. Personne d'autre ne peut les court-circuiter.

**2. Concevoir de petits Aggregates**
Un Aggregate trop grand devient difficile à charger, à modifier, et à tester. Si tu te retrouves à charger un Aggregate entier pour ne modifier qu'une petite partie, c'est souvent le signe que l'Aggregate est trop gros.

**3. Référencer les autres Aggregates uniquement par leur ID**
Un Aggregate ne charge pas un autre Aggregate en mémoire. Il stocke son identifiant. C'est le [[Repository]] qui se charge de résoudre les références quand c'est nécessaire.

**4. Mettre à jour plusieurs Aggregates via des Domain Events, pas dans la même transaction**
Si une action doit impacter deux Aggregates différents, l'un d'eux émet un événement, et l'autre réagit. On ne modifie pas deux Aggregates dans la même transaction.

---

## Application concrète chez Oli's Lab

`Order` est un Aggregate naturel dans le domaine e-commerce. Une commande contient des `OrderItem`, a un statut, peut avoir un code promo appliqué. Ces objets forment une unité cohérente : on ne modifie jamais un `OrderItem` directement.

```typescript
class Order {  // Aggregate Root
  private readonly id: OrderId
  private items: OrderItem[]     // Entity interne, non accessible directement
  private status: OrderStatus
  private promoCode: PromoCode | null  // Value Object

  // Toutes les modifications passent par l'Aggregate Root
  addItem(productId: ProductId, quantity: Quantity, unitPrice: Money): void {
    if (this.status !== OrderStatus.Pending) {
      throw new Error('Cannot modify a non-pending order')
    }
    const existing = this.items.find(i => i.productId.equals(productId))
    if (existing) {
      existing.increaseQuantity(quantity)
      return
    }
    this.items.push(new OrderItem(productId, quantity, unitPrice))
  }

  removeItem(productId: ProductId): void {
    if (this.status !== OrderStatus.Pending) {
      throw new Error('Cannot modify a non-pending order')
    }
    this.items = this.items.filter(i => !i.productId.equals(productId))
  }

  applyPromoCode(promo: PromoCode): void {
    if (!promo.isValid()) throw new Error('Promo code is expired')
    if (this.promoCode !== null) throw new Error('A promo code is already applied')
    this.promoCode = promo
  }

  confirm(): void {
    if (this.items.length === 0) throw new Error('Cannot confirm an empty order')
    this.status = OrderStatus.Confirmed
    // Ici on émettrait un OrderConfirmed Domain Event
  }

  // Référence à Customer par ID, pas par l'objet Customer chargé en mémoire
  // customerId: CustomerId  <- pas de Customer customer
}

class OrderItem {  // Entity interne à l'Aggregate, jamais exposée directement
  constructor(
    public readonly productId: ProductId,  // référence par ID
    private quantity: Quantity,
    private readonly unitPrice: Money
  ) {}

  increaseQuantity(additional: Quantity): void {
    this.quantity = this.quantity.add(additional)
  }

  get total(): Money {
    return this.unitPrice.multiply(this.quantity.value)
  }
}
```

Ce qu'on ne peut pas faire depuis l'extérieur :
- `order.items[0].quantity = 5` → propriété privée
- `new OrderItem(...)` directement dans un service → l'Aggregate contrôle la création de ses internes
- Modifier la commande sans passer par `addItem`, `removeItem`, `confirm`

---

## Où mettre la frontière de l'Aggregate

C'est souvent la question la plus difficile. Un `Cart` et un `Order` sont-ils le même Aggregate ou deux Aggregates différents ?

Règle pratique : si deux objets doivent toujours être cohérents dans la même transaction, ils peuvent être dans le même Aggregate. Si la cohérence peut être éventuelle (eventual consistency), ils sont dans deux Aggregates séparés qui communiquent par events.

Chez Oli's Lab, `Cart` et `Order` sont deux Aggregates distincts. Quand un panier est validé, `Cart` émet un `CheckoutCompleted` event, et un `Order` est créé en réponse. Les deux ne sont jamais modifiés dans la même transaction.

---

## Erreurs classiques

**Un Aggregate trop gros :** charger un `Customer` avec toutes ses commandes, tous ses produits favoris, son profil peau, son historique... C'est ingérable. `Customer`, `Order`, `SkinProfile` sont des Aggregates séparés reliés par des IDs.

**Modifier un Aggregate interne directement :** accéder à `order.items` et le modifier depuis un service. Ça contourne totalement les invariants.

**Deux Aggregates dans une même transaction :** signe que la frontière est mal placée ou qu'il faudrait un Domain Event.
