---
tags: [SoftwareCraft, DesignPatterns, Behavioral]
---

Définir une relation **1 → N** : quand un objet (le sujet) change d'état, tous ses observateurs sont notifiés automatiquement. Le sujet ne connaît pas les observateurs — il émet, ils réagissent.

```js
const EventEmitter = require('events');

class OrderService extends EventEmitter {
  createOrder(data) {
    const order = this.save(data);
    this.emit('order:created', order); // notification — sans connaître qui écoute
    return order;
  }
}

const orderService = new OrderService();

// Les observateurs s'abonnent indépendamment
orderService.on('order:created', (order) => emailService.sendConfirmation(order));
orderService.on('order:created', (order) => analyticsService.track(order));
orderService.on('order:created', (order) => inventoryService.reserve(order));
```

Ajouter une réaction à la création d'une commande = ajouter un `.on()`. Aucune modification de `OrderService`.

### En JavaScript — c'est partout

- `addEventListener` dans le DOM
- `EventEmitter` Node.js
- Stores Redux / Zustand (`subscribe`)
- `watch` et réactivité Vue.js
- RxJS Observables

Connaître le pattern permet de lire ces APIs avec clarté plutôt que de les utiliser comme des boîtes noires.

### Lien avec DDD

En [[Domain-Driven Design]], les **Domain Events** (`OrderCreated`, `PaymentFailed`) sont une implémentation d'Observer au niveau domaine. Le domaine émet des faits, l'infrastructure réagit. C'est ce qui permet de découpler les side effects (email, stock, analytics) du core domain.

### Erreur classique

Observer sans gestion des désabonnements. En Node, les listeners qui ne sont jamais retirés créent des memory leaks. Toujours penser au `removeListener` / `off()` dans les contextes longs.

### Signal d'usage

Réactions en cascade à un événement. Couplage fort entre une source et ses conséquences. Si `OrderService` appelle directement `emailService`, `analyticsService` et `inventoryService` — c'est le signal.

---

- [[Design Patterns Behavioral]] — vue d'ensemble des patterns behavioral
- [[Domain-Driven Design]] — Domain Events
