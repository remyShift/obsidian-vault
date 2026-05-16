---
tags: [SoftwareCraft, Architecture, DesignPatterns]
---

Dans une architecture event-driven, les composants ne se parlent pas directement. Un composant **émet un événement** ("quelque chose s'est passé"), d'autres composants **réagissent** à cet événement sans que l'émetteur sache qui les écoute ou combien ils sont.

C'est une application directe du pattern [[Design Patterns Behavioral|Observer]] à l'échelle de l'architecture.

---

## Pourquoi c'est puissant

Le couplage entre les composants devient **unidirectionnel** : l'émetteur ne dépend de personne. Ajouter un nouveau comportement en réaction à un événement existant = ajouter un handler, sans toucher à l'émetteur.

```js
// ❌ couplage direct — OrderService sait que EmailService et Analytics existent
class OrderService {
  async createOrder(data) {
    const order = await this.save(data);
    await this.emailService.sendConfirmation(order);  // couplage fort
    await this.analyticsService.track(order);         // couplage fort
    return order;
  }
}

// ✅ event-driven — OrderService ne sait rien de ses consommateurs
class OrderService extends EventEmitter {
  async createOrder(data) {
    const order = await this.save(data);
    this.emit('order:created', order);  // il annonce, c'est tout
    return order;
  }
}

orderService.on('order:created', (order) => emailService.sendConfirmation(order));
orderService.on('order:created', (order) => analyticsService.track(order));
orderService.on('order:created', (order) => inventoryService.reserve(order));
```

Chaque nouveau besoin en réaction = un nouveau `.on()`, zéro modification de `OrderService`.

---

## Synchrone vs Asynchrone

Les deux existent, avec des trade-offs très différents.

**Synchrone** : les handlers sont appelés dans le même thread, dans le même tick. Simple, prévisible, facile à tester. Mais si un handler est lent ou plante, ça bloque ou plante l'émetteur.

**Asynchrone** : les événements sont mis dans une queue (Redis, RabbitMQ, Kafka, BullMQ en Node.js) et consommés séparément. Découplage total dans le temps, résilience, scalabilité. En contrepartie : eventual consistency, complexité opérationnelle, débogage plus difficile.

```js
// Event synchrone — EventEmitter natif Node.js
emitter.emit('order:created', order); // bloquant jusqu'à ce que tous les handlers finissent

// Event asynchrone — via une queue
await queue.add('order:created', { orderId: order.id });
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
