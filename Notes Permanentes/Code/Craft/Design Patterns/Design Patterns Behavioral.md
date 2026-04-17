---
tags: [SoftwareCraft, DesignPatterns]
---

**Objectif :** Définir comment les objets **communiquent et se répartissent les responsabilités**. Cf. [[Design Patterns]] pour la vue d'ensemble.

---

## Strategy

Définir une **famille d'algorithmes interchangeables** et les encapsuler pour pouvoir les changer à l'exécution.

```js
// ❌ Sans Strategy — if/else qui grossit à chaque nouveau type (violation OCP)
class Sorter {
  sort(data, type) {
    if (type === 'bubble') { /* ... */ }
    else if (type === 'quick') { /* ... */ }
  }
}

// ✅ Avec Strategy
class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  sort(data) { return this.strategy.sort(data); }
}

const sorter = new Sorter(new QuickSort());
sorter.sort(data);
sorter.setStrategy(new MergeSort()); // changer d'algo à l'exécution
```

Signal d'usage : if/else ou switch sur un type de comportement qui va grandir. Lien SOLID : OCP direct.

**Différence avec Template Method :** Strategy = l'algorithme entier est interchangeable (composition). Template Method = seulement certaines étapes varient (héritage). Préférer Strategy en général.

---

## Observer

Définir une relation **1 → N** : quand un objet (le sujet) change d'état, tous ses dépendants (les observateurs) sont notifiés automatiquement.

```js
class OrderService extends EventEmitter {
  createOrder(data) {
    const order = this.save(data);
    this.emit('order:created', order);
    return order;
  }
}

orderService.on('order:created', (order) => emailService.sendConfirmation(order));
orderService.on('order:created', (order) => analyticsService.track(order));
```

Signal d'usage : réactions en cascade à un événement, couplage fort entre une source et ses conséquences.

En JavaScript : `addEventListener`, EventEmitters Node.js, stores React/Redux, `watch` Vue.js — tout ça est de l'Observer. Lien avec les [[Domain-Driven Design|Domain Events]] en DDD.

---

## Command

Encapsuler une **action** comme un objet — pour pouvoir la mettre en file, l'annuler (undo), la rejouer, la loguer.

```js
class CreateOrderCommand {
  constructor(orderService, data) {
    this.orderService = orderService;
    this.data = data;
    this.createdOrder = null;
  }
  execute() { this.createdOrder = this.orderService.create(this.data); }
  undo() { this.orderService.cancel(this.createdOrder.id); }
}

class CommandBus {
  execute(command) {
    command.execute();
    this.history.push(command);
  }
  undo() { this.history.pop()?.undo(); }
}
```

Signal d'usage : besoin d'undo/redo, queue de tâches, transactionnalité.

En JavaScript : les actions Redux sont une implémentation de Command. Les job queues (BullMQ) aussi.

---

## State

Permettre à un objet de **changer de comportement selon son état interne**, comme s'il changeait de classe.

```js
// ❌ Sans State — conditions imbriquées qui explosent avec chaque nouvel état
class Order {
  process(action) {
    if (this.status === 'pending') {
      if (action === 'pay') { /* ... */ }
    } else if (this.status === 'paid') {
      if (action === 'ship') { /* ... */ }
    }
  }
}

// ✅ Avec State
class PendingState {
  pay(order) { order.setState(new PaidState()); }
  cancel(order) { order.setState(new CancelledState()); }
  ship(order) { throw new Error("Cannot ship a pending order"); }
}

class Order {
  constructor() { this.state = new PendingState(); }
  setState(state) { this.state = state; }
  pay() { this.state.pay(this); }
}
```

Signal d'usage : machine à états (order lifecycle, auth flow), if/else conditionnels sur un statut qui grandit. Lien avec le [[Code Smells|smell Divergent Change]].

---

## Template Method

Définir le **squelette d'un algorithme** dans une classe de base, en laissant les sous-classes remplir certaines étapes.

```js
class DataExporter {
  export(data) { // Template Method — la séquence est fixe
    const formatted = this.format(data);   // étape variable
    const validated = this.validate(formatted);
    return this.write(validated);
  }
  validate(data) { return data; } // comportement par défaut
  format(data) { throw new Error('Must implement'); }
  write(data) { throw new Error('Must implement'); }
}
```

Signal d'usage : même séquence d'étapes, étapes différentes selon le contexte. Utilisé massivement dans les frameworks (hooks de lifecycle, pipelines).

---

## Chain of Responsibility

Passer une requête à travers une **chaîne de gestionnaires**. Chaque maillon décide de traiter la requête ou de la passer au suivant.

```js
class AuthMiddleware extends Handler {
  handle(request) {
    if (!request.token) return { error: 'Unauthorized' };
    return super.handle(request); // passe au suivant
  }
}

// Composition de la chaîne
auth.setNext(rateLimit).setNext(route);
auth.handle(request);
```

Signal d'usage : pipelines de traitement, validation en plusieurs étapes.

En JavaScript : le système de middlewares Express **est** une Chain of Responsibility.

---

## Iterator

Parcourir les éléments d'une collection **sans exposer sa structure interne**.

En JavaScript, c'est natif avec `Symbol.iterator` et les generators. `for...of`, spread operator, `Array.from()` — tous implémentent Iterator. Moins besoin de l'implémenter manuellement qu'en Java/C#.

---

## Tableau récapitulatif

| Pattern | Problème résolu | Signal d'usage |
|---|---|---|
| **Strategy** | Algorithmes interchangeables | if/else sur un type de comportement |
| **Observer** | Réaction en cascade à un événement | Couplage fort entre source et conséquences |
| **Command** | Action encapsulée comme objet | Besoin d'undo, queue, transactionnel |
| **State** | Comportement dépend de l'état interne | if/else sur un statut qui grandit |
| **Template Method** | Squelette d'algo avec étapes variables | Même séquence, étapes différentes |
| **Chain of Responsibility** | Pipeline de gestionnaires | Middlewares, validation multi-étapes |
| **Iterator** | Parcourir une collection uniformément | Natif en JS via Symbol.iterator |
