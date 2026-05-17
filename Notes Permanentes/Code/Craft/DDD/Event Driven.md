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

Quand une commande est passée, plusieurs systèmes doivent réagir : email de confirmation via Klaviyo, soumission à BigBlue pour la logistique, décrémentation du stock, tracking analytics. Sans event-driven, le `CheckoutService` est couplé à tous ces systèmes. Avec event-driven, il émet `OrderPlaced` et ne sait pas qui écoute.

```typescript
// Couplage direct : CheckoutService connaît tous les systèmes
class CheckoutService {
  async placeOrder(cart: Cart, customer: Customer): Promise<Order> {
    const order = Order.createFromCart(cart, customer)
    await orderRepository.save(order)
    await klaviyoService.sendOrderConfirmation(order)  // couplage fort
    await bigblueService.submitFulfillment(order)      // couplage fort
    await analyticsService.trackPurchase(order)        // couplage fort
    return order
  }
}

// Event-driven : CheckoutService ne connaît que son domaine
class CheckoutService {
  async placeOrder(cart: Cart, customer: Customer): Promise<Order> {
    const order = Order.createFromCart(cart, customer)
    await orderRepository.save(order)
    eventBus.emit('OrderPlaced', { orderId: order.id.value, total: order.total })
    return order
  }
}

eventBus.on('OrderPlaced', (e) => klaviyoService.sendOrderConfirmation(e))
eventBus.on('OrderPlaced', (e) => bigblueService.submitFulfillment(e))
eventBus.on('OrderPlaced', (e) => analyticsService.trackPurchase(e))
```

Si demain on intègre un système de fidélité, on ajoute un `.on('OrderPlaced', ...)`. Le `CheckoutService` n'est pas touché.

---

## Synchrone vs Asynchrone

Les deux existent, avec des trade-offs très différents.

**Synchrone** : les handlers sont appelés dans le même thread, dans le même tick. Simple, prévisible, facile à tester. Mais si un handler est lent ou plante, ça bloque ou plante l'émetteur.

**Asynchrone** : les événements sont mis dans une queue (BullMQ, RabbitMQ, Kafka) et consommés séparément. Découplage total dans le temps, résilience, scalabilité. En contrepartie : eventual consistency, complexité opérationnelle, débogage plus difficile.

La confirmation de commande doit être immédiate. L'envoi d'email Klaviyo et la soumission BigBlue peuvent être asynchrones : si Klaviyo est lent, ça ne doit pas bloquer la réponse affichée à l'utilisateur.

```typescript
// Synchrone : sauvegarde de la commande (doit réussir avant de répondre)
await orderRepository.save(order)

// Asynchrone via queue : tout ce qui peut attendre sans bloquer l'UX
await queue.add('OrderPlaced', { orderId: order.id.value })
```

---

## Lien avec DDD et Event Sourcing

Les **Domain Events** en [[Domain-Driven Design|DDD]] sont une application directe de ce principe : `OrderConfirmed`, `PaymentReceived`, `StockDepleted` sont des faits du domaine qui déclenchent des réactions dans d'autres contextes.

[[Event Sourcing]] pousse cette logique encore plus loin : les événements deviennent la source de vérité, pas juste un signal. Ce sont deux choses distinctes. On peut faire de l'event-driven sans faire d'Event Sourcing.

---

## Les erreurs classiques

**Nommer les événements comme des commandes** : `sendEmail`, `updateStock`. Un événement décrit ce qui s'est passé, il est au passé : `OrderPlaced`, `PaymentReceived`. La différence est conceptuelle mais elle a un impact sur la façon de penser les responsabilités.

**Abuser des événements pour tout** : si A émet un événement juste pour que B réagisse et que la relation A→B est toujours exactement 1-to-1, c'est du couplage caché. L'event-driven a du sens quand plusieurs consommateurs peuvent réagir indépendamment, ou quand le découplage temporel est un besoin réel.

**Ignorer la gestion des erreurs** : si un handler asynchrone plante, qui le sait ? Il faut des stratégies de retry, de dead-letter queue, de monitoring des events non consommés.

---

## En pratique Node.js

`EventEmitter` natif pour du synchrone intra-process. BullMQ ou similaire pour de l'asynchrone avec persistance et retry. Kafka si la volumétrie ou la garantie de delivery devient un enjeu.

La complexité doit être justifiée par le besoin : commencer avec `EventEmitter`, passer à une queue quand le besoin de découplage temporel ou de résilience l'exige réellement.
