---
tags: [SoftwareCraft, DDD, Architecture]
---

L'architecture en couches est le point de départ de la plupart des codebases. Elle organise le code en **couches horizontales**, chacune ayant une responsabilité distincte. Une couche ne dépend que de la couche immédiatement en dessous.

C'est l'architecture implicite de la plupart des projets Express : router, controller, service, modèle. Le problème c'est que sans discipline, les dépendances traversent les couches dans tous les sens et la logique métier finit dans les mauvais endroits.

---

## Les 4 couches

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │  Routes, Controllers, Middlewares
│         (HTTP, CLI, Queue consumer)     │  Reçoit les requêtes, retourne les réponses
└────────────────────┬────────────────────┘
                     │ dépend de
┌────────────────────▼────────────────────┐
│           Application Layer             │  Application Services, Use Cases
│         (orchestration)                 │  Coordonne le domaine, pas de règles métier
└────────────────────┬────────────────────┘
                     │ dépend de
┌────────────────────▼────────────────────┐
│             Domain Layer                │  Entities, Aggregates, Value Objects
│         (logique métier pure)           │  Domain Services, Repositories (interfaces)
└────────────────────┬────────────────────┘
                     │ dépend de
┌────────────────────▼────────────────────┐
│          Infrastructure Layer           │  Implémentations MongoDB, Stripe, Klaviyo
│         (détails techniques)            │  Repositories concrets, adapters externes
└─────────────────────────────────────────┘
```

**Règle fondamentale : les dépendances ne vont que vers le bas.** Le Domain Layer ne dépend de rien au-dessus, et surtout pas de l'Infrastructure.

---

## Application concrète

### Structure de fichiers

```
src/
  presentation/
    routes/
      orderRoutes.js
      productRoutes.js
    middlewares/
      authMiddleware.js
      validationMiddleware.js

  application/
    checkout/
      PlaceOrderService.js       // Application Service
      GetCustomerOrdersService.js
    recommendations/
      GetRecommendationsService.js

  domain/
    order/
      Order.js                   // Aggregate Root
      OrderItem.js               // Entity
      OrderStatus.js             // Value Object
      OrderFactory.js            // Factory
      OrderRepository.js         // Interface (contrat)
    cart/
      Cart.js
      CartRepository.js
    shared/
      Money.js                   // Value Object partagé
      DomainError.js

  infrastructure/
    persistence/
      MongoOrderRepository.js    // Implémentation concrète
      MongoCartRepository.js
    external/
      StripePaymentGateway.js
      KlaviyoEmailService.js
      BigBlueLogisticsService.js
    config/
      database.js
```

### Flux d'une requête de checkout

```javascript
// 1. Presentation Layer : reçoit la requête HTTP
// orderRoutes.js
router.post('/orders', authMiddleware, validate(placeOrderSchema), async (req, res) => {
  const result = await placeOrderService.execute({
    cartId: req.body.cartId,
    customerId: req.user.id,
    shippingAddress: req.body.shippingAddress,
  })
  res.status(201).json(result)
})

// 2. Application Layer : orchestre sans logique métier
// PlaceOrderService.js
class PlaceOrderService {
  constructor({ cartRepository, customerRepository, orderRepository, orderFactory, eventBus }) {
    this.cartRepository = cartRepository
    this.customerRepository = customerRepository
    this.orderRepository = orderRepository
    this.orderFactory = orderFactory
    this.eventBus = eventBus
  }

  async execute(cmd) {
    const cart = await this.cartRepository.findById(cmd.cartId)
    if (!cart) throw new NotFoundError('Cart not found')

    const customer = await this.customerRepository.findById(cmd.customerId)
    if (!customer) throw new NotFoundError('Customer not found')

    // Délègue la logique métier au domaine
    const order = this.orderFactory.createFromCart(cart, customer, cmd.shippingAddress)

    await this.orderRepository.save(order)
    await this.eventBus.publish({ type: 'OrderPlaced', orderId: order.id })

    return { orderId: order.id }
  }
}

// 3. Domain Layer : logique métier pure
// Order.js
class Order {
  confirm() {
    if (this.items.length === 0) throw new DomainError('Cannot confirm an empty order')
    if (this.status !== 'pending') throw new DomainError(`Cannot confirm order with status ${this.status}`)
    this.status = 'confirmed'
  }
}

// 4. Infrastructure Layer : détails techniques
// MongoOrderRepository.js
class MongoOrderRepository {
  async save(order) {
    const doc = this.toDocument(order)
    await this.collection.replaceOne({ _id: doc._id }, doc, { upsert: true })
  }

  async findById(id) {
    const doc = await this.collection.findOne({ _id: id })
    if (!doc) return null
    return this.toDomain(doc)
  }
}
```

---

## Le piège classique : le couplage infrastructure-domaine

Dans une codebase Express sans architecture explicite, le glissement le plus courant c'est ça :

```javascript
// Service qui fait tout : application + domaine + infrastructure mélangés
class OrderService {
  async placeOrder(cartId, customerId) {
    // Infrastructure directement dans le "service"
    const cartDoc = await CartModel.findById(cartId)

    // Logique métier dans le service, pas dans le domaine
    if (cartDoc.items.length === 0) throw new Error('Empty cart')

    // Création d'un document, pas d'un objet domaine
    const orderDoc = new OrderModel({
      customerId,
      items: cartDoc.items,
      status: 'pending',
    })
    await orderDoc.save()

    return orderDoc._id
  }
}
```

Impossible à tester sans MongoDB. Logique métier dispersée. Pas d'objet domaine. C'est le signe que les couches ne sont pas respectées.

---

## Limite de l'architecture en couches

La règle "les dépendances vont vers le bas" pose un problème : si le Domain Layer définit une interface `OrderRepository`, et que son implémentation est dans l'Infrastructure Layer, alors l'Infrastructure dépend du Domain, mais le Domain ne peut pas dépendre de l'Infrastructure pour récupérer ses objets.

La solution c'est l'**inversion de dépendance** : le Domain définit le contrat (interface), l'Infrastructure l'implémente, et un mécanisme d'injection de dépendances connecte les deux. C'est ce que formalise l'[[Hexagonal Architecture]].

---

### Erreurs classiques

**Logique métier dans la couche Presentation :** un controller qui valide des règles métier au lieu de déléguer à l'Application Layer.

**Infrastructure dans la couche Domain :** un Aggregate qui importe un modèle Mongoose. Dès que ça arrive, les tests unitaires nécessitent une vraie base de données.

**Couche Application vide :** tout est dans les controllers ou tout est dans les services sans distinction. La couche Application doit exister et avoir une responsabilité claire : orchestrer, pas décider.
