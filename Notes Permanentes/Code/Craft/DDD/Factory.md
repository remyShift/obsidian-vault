---
tags: [SoftwareCraft, DDD]
---
Une Factory encapsule la **logique de création d'un [[Aggregate]] ou d'une [[Entity]] complexe**. Son rôle : garantir qu'un objet est créé dans un état valide, sans disperser cette logique de construction partout dans le code.

La question à se poser : qui est responsable de créer cet objet ?
- Pas le constructeur : trop de logique, difficile à tester, et le constructeur ne peut pas appeler des repositories.
- Pas le service applicatif : il ne doit pas connaître les détails de construction d'un Aggregate.
- Pas le [[Repository]] : il reconstruit depuis la persistance, il ne crée pas à partir de données brutes.

C'est le rôle de la Factory.

---

## Deux formes

### Factory Method sur l'Aggregate

Quand la construction est simple et auto-contenue, une méthode statique sur l'Aggregate suffit. C'est la forme la plus légère.

```typescript
class Order {
  private constructor(
    private readonly id: OrderId,
    private readonly customerId: CustomerId,
    private items: OrderItem[],
    private status: OrderStatus
  ) {}

  // Factory method : seule façon valide de créer un Order neuf
  static create(customerId: CustomerId): Order {
    return new Order(
      OrderId.generate(),
      customerId,
      [],
      OrderStatus.Pending
    )
  }
}

// Utilisation
const order = Order.create(new CustomerId('c1'))
```

Le constructeur privé garantit qu'on ne peut pas créer un `Order` dans un état arbitraire depuis l'extérieur.

### Factory dédiée

Quand la construction implique plusieurs objets, des règles métier de création complexes, ou la coordination entre plusieurs Aggregates. Une classe Factory dédiée est justifiée.

```typescript
class OrderFactory {
  createFromCart(cart: Cart, customer: Customer): Order {
    if (cart.isEmpty()) {
      throw new DomainError('Cannot create an order from an empty cart')
    }

    if (!customer.isEligibleToOrder()) {
      throw new DomainError('This customer is not eligible to place orders')
    }

    const items = cart.items.map(item =>
      OrderItem.create(item.productId, item.quantity, item.unitPrice)
    )

    const order = Order.create(customer.id)
    items.forEach(item => order.addItem(item))

    return order
  }
}
```

La règle "on ne peut pas créer une commande depuis un panier vide" est une règle métier. Elle appartient à la Factory, pas au service applicatif.

---

## Application concrète chez Oli's Lab

La création d'un `Order` à partir d'un `Cart` est le cas typique. Le panier contient des `CartItem`, la commande contient des `OrderItem` : ce ne sont pas les mêmes objets, même s'ils portent des données similaires. La Factory gère cette transformation.

```typescript
class OrderFactory {
  createFromCart(cart: Cart, customer: Customer, shippingAddress: Address): Order {
    if (cart.isEmpty()) {
      throw new DomainError('Cannot place an order with an empty cart')
    }

    const order = Order.create(customer.id, shippingAddress)

    cart.items.forEach(cartItem => {
      order.addItem(OrderItem.create(
        cartItem.productId,
        cartItem.quantity,
        cartItem.snapshot.unitPrice  // snapshot du prix au moment de l'achat
      ))
    })

    return order
  }
}
```

Le snapshot du prix est une règle métier de création : on fixe le prix au moment où la commande est passée, pas au moment où le produit a été ajouté au panier. Cette règle n'a pas sa place dans le service applicatif.

---

## Factory vs Repository

C'est une distinction souvent floue.

| | Factory | [[Repository]] |
|---|---|---|
| Rôle | Créer un nouvel objet | Retrouver un objet existant |
| Source | Données brutes, d'autres objets | Persistance (base de données) |
| Résultat | Objet nouveau, jamais persisté | Objet reconstruit depuis le stockage |

Le Repository peut en interne utiliser une Factory pour reconstruire un Aggregate depuis un document de base de données. C'est courant et correct.

```typescript
class MongoOrderRepository implements OrderRepository {
  async findById(id: OrderId): Promise<Order | null> {
    const doc = await this.collection.findOne({ _id: id.value })
    if (!doc) return null
    return this.reconstitute(doc)  // reconstruction depuis persistance, pas création
  }

  private reconstitute(doc: OrderDocument): Order {
    // logique de mapping document -> Aggregate
  }
}
```

---

### Erreurs classiques

**Mettre la logique de construction dans le service applicatif :** si le `CheckoutService` construit lui-même les `OrderItem` depuis les `CartItem`, il en sait trop. Cette logique appartient à la Factory.

**Confondre Factory et Builder :** le Builder pattern construit un objet étape par étape avec de nombreuses options. La Factory crée un objet valide en une passe. Pour un Aggregate, la Factory est presque toujours suffisante.

**Laisser le constructeur public avec des paramètres optionnels :** `new Order(id, customerId, [], null, undefined)`. N'importe qui peut créer un `Order` dans n'importe quel état. Le constructeur privé + factory method est la solution.
