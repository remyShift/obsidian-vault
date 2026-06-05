---
tags: [SoftwareCraft, DDD, Architecture]
---
L'architecture hexagonale (Alistair Cockburn, 2005) place le **domaine au centre** et traite tout ce qui est externe comme un détail interchangeable. HTTP, MongoDB, Stripe, Klaviyo : ce sont tous des détails. Le domaine ne les connaît pas.

Le nom "hexagonal" n'a pas de signification précise sur la forme. Ce qui compte c'est l'idée : le domaine est entouré de **ports** (interfaces) et d'**adapters** (implémentations concrètes).

- **Port** : une interface définie par le domaine, exprimant ce dont il a besoin.
- **Adapter** : une implémentation concrète de ce port, branchée depuis l'extérieur.

---

## La distinction fondamentale : Driving vs Driven

```
                    ┌─────────────────────────────┐
  HTTP Request      │                             │
  ──────────►  [Adapter]──►[Port]                 │
                    │        │                    │
  CLI Command       │        ▼                    │
  ──────────►  [Adapter]   DOMAINE   [Port]──►[Adapter]──► MongoDB
                    │        ▲                    │
  Queue Message     │        │                    │    [Port]──►[Adapter]──► Stripe
  ──────────►  [Adapter]──►[Port]                 │
                    │                             │    [Port]──►[Adapter]──► Klaviyo
                    └─────────────────────────────┘

         DRIVING SIDE (gauche)              DRIVEN SIDE (droite)
      Ce qui déclenche le domaine        Ce que le domaine pilote
```

**Driving adapters** (côté gauche) : ce qui appelle le domaine. Un controller HTTP, un consumer de queue, un test unitaire. Le domaine ne les connaît pas.

**Driven adapters** (côté droit) : ce que le domaine pilote via ses ports. MongoDB, Stripe, Klaviyo. Le domaine définit ce dont il a besoin, l'adapter l'implémente.

---

## Application concrète

### Structure

```
src/
  domain/                          # Centre : aucune dépendance externe
    order/
      Order.js
      OrderItem.js
      OrderFactory.js
      ports/
        OrderRepository.js         # Port (interface) : ce dont le domaine a besoin
        PaymentGateway.js          # Port : abstraction du paiement
        FulfillmentService.js      # Port : abstraction de la logistique
    skinScience/
      SkinProfile.js
      CompatibilityScorer.js
      ports/
        ProductScienceRepository.js

  application/                     # Orchestration des cas d'usage
    checkout/
      PlaceOrderUseCase.js
    recommendations/
      GetRecommendationsUseCase.js

  adapters/
    driving/                       # Ce qui déclenche le domaine
      http/
        orderController.js         # Adapter HTTP
        productController.js
      queue/
        orderEventConsumer.js      # Adapter queue (BullMQ)

    driven/                        # Ce que le domaine pilote
      persistence/
        MongoOrderRepository.js    # Implémente OrderRepository (port)
        MongoSkinProfileRepository.js
      payment/
        StripePaymentGateway.js    # Implémente PaymentGateway (port)
      fulfillment/
        BigBlueFulfillmentService.js # Implémente FulfillmentService (port)
      email/
        KlaviyoEmailService.js
      cms/
        PayloadProductAdapter.js   # Adapte les webhooks Payload CMS au domaine
```

### Les ports : le domaine exprime ses besoins

```javascript
// domain/order/ports/OrderRepository.js
// Le domaine définit ce dont il a besoin, sans savoir comment c'est implémenté
class OrderRepository {
  async findById(id) { throw new Error('Not implemented') }
  async findByCustomerId(customerId) { throw new Error('Not implemented') }
  async save(order) { throw new Error('Not implemented') }
}

// domain/order/ports/PaymentGateway.js
class PaymentGateway {
  async charge({ amount, currency, customerId, paymentMethodId }) {
    throw new Error('Not implemented')
  }
  async refund({ paymentIntentId, amount }) {
    throw new Error('Not implemented')
  }
}

// domain/order/ports/FulfillmentService.js
class FulfillmentService {
  async submitOrder({ orderId, items, shippingAddress }) {
    throw new Error('Not implemented')
  }
}
```

### Les adapters driven : les implémentations concrètes

```javascript
// adapters/driven/payment/StripePaymentGateway.js
// Stripe est un détail d'implémentation. Le domaine ne sait pas que Stripe existe.
class StripePaymentGateway extends PaymentGateway {
  constructor(stripeClient) {
    super()
    this.stripe = stripeClient
  }

  async charge({ amount, currency, customerId, paymentMethodId }) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount.inCents(),   // traduction : Money -> centimes Stripe
      currency: currency.toLowerCase(),
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
    })
    return { paymentIntentId: paymentIntent.id, status: paymentIntent.status }
  }
}

// adapters/driven/persistence/MongoOrderRepository.js
class MongoOrderRepository extends OrderRepository {
  constructor(collection) {
    super()
    this.collection = collection
  }

  async findById(id) {
    const doc = await this.collection.findOne({ _id: id })
    if (!doc) return null
    return this.toDomain(doc)
  }

  async save(order) {
    await this.collection.replaceOne(
      { _id: order.id },
      this.toDocument(order),
      { upsert: true }
    )
  }

  toDomain(doc) {
    return Order.reconstitute({
      id: doc._id,
      customerId: doc.customerId,
      items: doc.items.map(i => OrderItem.reconstitute(i)),
      status: doc.status,
    })
  }
}
```

### L'adapter driving : le controller HTTP

```javascript
// adapters/driving/http/orderController.js
// Le controller traduit HTTP -> domaine. Il ne connaît pas MongoDB, pas Stripe.
class OrderController {
  constructor(placeOrderUseCase) {
    this.placeOrderUseCase = placeOrderUseCase
  }

  async placeOrder(req, res) {
    try {
      const result = await this.placeOrderUseCase.execute({
        cartId: req.body.cartId,
        customerId: req.user.id,
        shippingAddress: req.body.shippingAddress,
        paymentMethodId: req.body.paymentMethodId,
      })
      res.status(201).json(result)
    } catch (error) {
      if (error instanceof DomainError) return res.status(422).json({ error: error.message })
      if (error instanceof NotFoundError) return res.status(404).json({ error: error.message })
      throw error
    }
  }
}
```

### L'injection de dépendances : le câblage

```javascript
// infrastructure/container.js
// C'est ici que tout se branche. Le domaine reste pur.
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY)
const orderCollection = db.collection('orders')

const orderRepository = new MongoOrderRepository(orderCollection)
const paymentGateway = new StripePaymentGateway(stripeClient)
const fulfillmentService = new BigBlueFulfillmentService(bigblueClient)

const placeOrderUseCase = new PlaceOrderUseCase({
  orderRepository,
  paymentGateway,
  fulfillmentService,
  eventBus,
})

const orderController = new OrderController(placeOrderUseCase)
```

---

## Ce que ça change pour les tests

Le vrai bénéfice de l'architecture hexagonale c'est la testabilité. Le domaine est testable sans aucune infrastructure. Les use cases sont testables avec des adapters en mémoire.

```javascript
// Test du use case : pas de MongoDB, pas de Stripe
it('should place an order and emit OrderPlaced event', async () => {
  const orderRepository = new InMemoryOrderRepository()
  const paymentGateway = new FakePaymentGateway({ shouldSucceed: true })
  const eventBus = new SpyEventBus()

  const useCase = new PlaceOrderUseCase({ orderRepository, paymentGateway, eventBus })

  await useCase.execute({ cartId: 'cart-1', customerId: 'c-1', ... })

  expect(eventBus.published).toContainEqual(
    expect.objectContaining({ type: 'OrderPlaced' })
  )
})
```

---

## Lien avec la [[Context Map]]

Chaque [[Bounded Context]] a sa propre hexagone. La [[Context Map]] montre comment les hexagones sont reliés, via des adapters et des Anti-Corruption Layers.

```
[Contexte E-commerce]                  [Contexte Scientifique]
       │                                        │
  [ACL Adapter] ◄── Domain Events ────► [ACL Adapter]
```

---

## Comment l'hexagone émerge du TDD

L'architecture hexagonale n'est pas un point de départ : c'est un **résultat**. En TDD inside-out (voir [[TDD Outside-In vs Inside-Out]]), chaque port apparaît au **refactor**, quand un test révèle une dépendance que le domaine n'a pas besoin de connaître. On ne pré-crée pas les ports ni les Value Objects.

L'heuristique à se poser à chaque refactor : **« de quoi ce code dépend-il qu'il n'a pas besoin de connaître ? »** La réponse devient un port.

Exemple de séquence d'émergence (bootstrapper ts-seed) :
1. Premier test avec des strings brutes → on nomme le retour (`Patch`, `BrickFile`) au refactor.
2. Une string invalide passe silencieusement → un **Value Object** (`BrickVersion`) émerge pour porter l'invariant.
3. Le test ne doit pas écrire sur le disque → le **port** `ProjectWriter` émerge.
4. « Qui orchestre builder + writer ? » → un **Application Service** émerge.
5. Couplage concret dans le service → le **port** `BrickBuilder` émerge.

Pré-designer les abstractions dès le plan TDD est l'anti-pattern : ça impose une architecture au lieu de la laisser se révéler.

---

### Erreurs classiques

**Ports dans la mauvaise direction :** définir le port côté infrastructure plutôt que côté domaine. Le port appartient au domaine, pas à l'adapter.

**Logique métier dans les adapters :** un `MongoOrderRepository` qui applique des règles de validation. L'adapter traduit et persiste, il ne décide pas.

**Adapter qui connaît le domaine en profondeur :** un controller qui instancie des Entities ou des Value Objects. Le controller traduit la requête HTTP en commande, c'est tout.
