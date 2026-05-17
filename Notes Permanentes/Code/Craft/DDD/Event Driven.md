---
tags:
  - SoftwareCraft
  - DesignPatterns
---
Dans une architecture event-driven, les composants ne se parlent pas directement. Un composant **émet un événement** ("quelque chose s'est passé"), d'autres composants **réagissent** à cet événement sans que l'émetteur sache qui les écoute ou combien ils sont.

C'est une application directe du pattern [[Design Patterns Behavioral|Observer]] à l'échelle de l'architecture.

---

## Pourquoi c'est puissant

Le couplage entre les composants devient **unidirectionnel** : l'émetteur ne dépend de personne. Ajouter un nouveau comportement en réaction à un événement existant = ajouter un handler, sans toucher à l'émetteur.

```typescript
// Couplage direct : OrderService sait que EmailService et Analytics existent
class OrderService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const order = await this.save(data)
    await this.emailService.sendConfirmation(order)   // couplage fort
    await this.analyticsService.track(order)          // couplage fort
    return order
  }
}

// Event-driven : OrderService ne sait rien de ses consommateurs
class OrderService extends EventEmitter {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const order = await this.save(data)
    this.emit('order:created', order)  // il annonce, c'est tout
    return order
  }
}

orderService.on('order:created', (order) => emailService.sendConfirmation(order))
orderService.on('order:created', (order) => analyticsService.track(order))
orderService.on('order:created', (order) => inventoryService.reserve(order))
```

Chaque nouveau besoin en réaction = un nouveau `.on()`, zéro modification de `OrderService`.

---

## Synchrone vs Asynchrone

Les deux existent, avec des trade-offs très différents.

**Synchrone** : les handlers sont appelés dans le même thread, dans le même tick. Simple, prévisible, facile à tester. Mais si un handler est lent ou plante, ça bloque ou plante l'émetteur.

**Asynchrone** : les événements sont mis dans une queue (Redis, RabbitMQ, Kafka, BullMQ en Node.js) et consommés séparément. Découplage total dans le temps, résilience, scalabilité. En contrepartie : eventual consistency, complexité opérationnelle, débogage plus difficile.

```typescript
// Event synchrone : EventEmitter natif Node.js
emitter.emit('order:created', order) // bloquant jusqu'à ce que tous les handlers finissent

// Event asynchrone : via une queue
await queue.add('order:created', { orderId: order.id })
// le worker consomme ça séparément, plus tard
```

---

## Lien avec DDD et Event Sourcing

Les **Domain Events** en [[Domain-Driven Design|DDD]] sont une application directe de ce principe : `OrderConfirmed`, `PaymentReceived`, `StockDepleted` sont des faits du domaine qui déclenchent des réactions dans d'autres contextes.

[[Event Sourcing]] pousse cette logique encore plus loin : les événements deviennent la source de vérité, pas juste un signal. Mais ce sont deux choses distinctes. On peut faire de l'event-driven sans faire d'Event Sourcing.

---

## Les erreurs classiques

**Nommer les événements comme des commandes** : `sendEmail`, `updateStock`. Un événement décrit ce qui s'est passé, il est au passé : `OrderCreated`, `PaymentReceived`. La différence est conceptuelle mais elle a un impact sur la façon de penser les responsabilités.

**Abuser des événements pour tout** : si A émet un événement juste pour que B réagisse et que la relation A→B est toujours exactement 1-to-1, c'est du couplage caché. L'event-driven a du sens quand plusieurs consommateurs peuvent réagir indépendamment, ou quand le découplage temporel est un besoin réel.

**Ignorer la gestion des erreurs** : si un handler asynchrone plante, qui le sait ? Il faut des stratégies de retry, de dead-letter queue, de monitoring des events non consommés.

---

## En pratique Node.js

`EventEmitter` natif pour du synchrone intra-process. BullMQ ou similaire pour de l'asynchrone avec persistance et retry. Kafka si la volumétrie ou la garantie de delivery devient un enjeu.

La complexité doit être justifiée par le besoin : commencer avec `EventEmitter`, passer à une queue quand le besoin de découplage temporel ou de résilience l'exige réellement.

---

## Chez Oli's Lab

L'architecture event-driven est déjà présente chez Oli's Lab sous forme d'event tracking (PostHog, Google Analytics, Meta). Mais le pattern s'applique aussi en interne, sur les flows métier.

### Le flow checkout : l'exemple le plus direct

Le checkout est l'endroit où plusieurs systèmes doivent réagir à la même action. Sans event-driven, le `CheckoutService` est couplé à Klaviyo, BigBlue, l'analytics, le stock.

```typescript
// Sans event-driven : CheckoutService fait tout, couplage maximal
class CheckoutService {
  async placeOrder(cart: Cart, customer: Customer): Promise<Order> {
    const order = Order.createFromCart(cart, customer)
    await orderRepository.save(order)

    // Couplage fort vers tous les systèmes externes
    await klaviyoService.sendOrderConfirmation(order, customer)
    await bigblueService.submitFulfillment(order)
    await analyticsService.trackPurchase(order)
    await inventoryService.decrementStock(order)

    return order
  }
}

// Avec event-driven : CheckoutService ne connaît que son domaine
class CheckoutService {
  async placeOrder(cart: Cart, customer: Customer): Promise<Order> {
    const order = Order.createFromCart(cart, customer)
    await orderRepository.save(order)

    // Un seul fait annoncé, plusieurs systèmes réagissent indépendamment
    eventBus.emit('OrderPlaced', {
      orderId: order.id.value,
      customerId: customer.id.value,
      items: order.items,
      total: order.total,
    })

    return order
  }
}

// Chaque système réagit indépendamment
eventBus.on('OrderPlaced', (event) => klaviyoService.sendOrderConfirmation(event))
eventBus.on('OrderPlaced', (event) => bigblueService.submitFulfillment(event))
eventBus.on('OrderPlaced', (event) => analyticsService.trackPurchase(event))
eventBus.on('OrderPlaced', (event) => inventoryService.decrementStock(event))
```

Si demain Oli's Lab intègre un nouveau système de fidélité, on ajoute un `.on('OrderPlaced', ...)`. Le `CheckoutService` n'est pas touché.

### Synchrone ou asynchrone pour le checkout ?

La confirmation de commande doit être immédiate. L'envoi d'email Klaviyo et la soumission BigBlue peuvent être asynchrones : si Klaviyo est lent, ça ne doit pas bloquer la confirmation affichée à l'utilisateur.

```typescript
// Synchrone : sauvegarde de la commande (doit réussir avant de répondre)
await orderRepository.save(order)

// Asynchrone via queue : tout ce qui peut attendre
await queue.add('order:placed', { orderId: order.id.value })
// Workers séparés consomment l'event et appellent Klaviyo, BigBlue, etc.
```

### Event tracking analytics : déjà en place

Le travail sur l'event tracking (PostHog, GA, Meta) que tu as fait correspond exactement à ce pattern : le composant React émet un événement (`product_viewed`, `add_to_cart`, `checkout_started`), plusieurs systèmes analytics le consomment sans que le composant sache lequel. C'est de l'event-driven appliqué à la couche frontend.
