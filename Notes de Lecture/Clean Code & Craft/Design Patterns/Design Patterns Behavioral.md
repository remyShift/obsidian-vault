> [!info]- Tags
> #SoftwareCraft

# Design Patterns — Behavioral

**Source :** GoF, Refactoring Guru
**Objectif :** Définir comment les objets **communiquent et se répartissent les responsabilités**

---

## Strategy

### Problème résolu
Définir une **famille d'algorithmes interchangeables** et les encapsuler pour pouvoir les changer à l'exécution.

```js
// ❌ Sans Strategy — if/else qui grossit à chaque nouveau type
class Sorter {
  sort(data, type) {
    if (type === 'bubble') { /* ... */ }
    else if (type === 'quick') { /* ... */ }
    else if (type === 'merge') { /* ... */ }
    // À chaque nouveau type → modifier cette classe (violation OCP)
  }
}

// ✅ Avec Strategy
class BubbleSort { sort(data) { /* ... */ } }
class QuickSort { sort(data) { /* ... */ } }
class MergeSort { sort(data) { /* ... */ } }

class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  setStrategy(strategy) { this.strategy = strategy; }
  sort(data) { return this.strategy.sort(data); }
}

const sorter = new Sorter(new QuickSort());
sorter.sort(data);
sorter.setStrategy(new MergeSort()); // changer d'algo à l'exécution
```

### Quand l'utiliser
- Plusieurs variantes d'un même algorithme ou comportement
- Le comportement doit être interchangeable à l'exécution
- Éliminer des if/else ou switch sur des types de comportement

### Lien SOLID
OCP direct : ajouter un algorithme = nouvelle classe, zéro modification existante.

---

## Observer

### Problème résolu
Définir une relation **1 → N** : quand un objet (le sujet) change d'état, tous ses dépendants (les observateurs) sont notifiés automatiquement.

```js
class EventEmitter {
  constructor() { this.listeners = {}; }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data));
  }
}

// Sujet
class OrderService extends EventEmitter {
  createOrder(data) {
    const order = this.save(data);
    this.emit('order:created', order); // notifie tous les observateurs
    return order;
  }
}

// Observateurs
const orderService = new OrderService();
orderService.on('order:created', (order) => emailService.sendConfirmation(order));
orderService.on('order:created', (order) => analyticsService.track(order));
orderService.on('order:created', (order) => inventoryService.reserve(order));
```

### Quand l'utiliser
- Réactions en cascade à un événement
- Découpler la source d'un événement de ses conséquences
- Architecture événementielle (event-driven)

### En JavaScript
`addEventListener`, les EventEmitters Node.js, les stores React/Redux, les `watch` Vue.js — tout ça est de l'Observer.

---

## Command

### Problème résolu
Encapsuler une **requête/action** comme un objet — pour pouvoir la mettre en file, l'annuler (undo), la rejouer, la loguer.

```js
// Interface commune à toutes les commandes
class Command {
  execute() {}
  undo() {}
}

// Commandes concrètes
class CreateOrderCommand {
  constructor(orderService, data) {
    this.orderService = orderService;
    this.data = data;
    this.createdOrder = null;
  }
  execute() {
    this.createdOrder = this.orderService.create(this.data);
  }
  undo() {
    this.orderService.cancel(this.createdOrder.id);
  }
}

// Invoker — ne connaît que l'interface Command
class CommandBus {
  constructor() { this.history = []; }
  execute(command) {
    command.execute();
    this.history.push(command);
  }
  undo() {
    const last = this.history.pop();
    last?.undo();
  }
}
```

### Quand l'utiliser
- Undo/Redo
- Queue de tâches (job queue)
- Transactionnalité : pouvoir annuler une série d'actions
- Découpler l'émetteur d'une requête de son exécuteur

### En JavaScript
Les actions Redux sont une implémentation de Command. Les jobs queues (Bull, BullMQ) aussi.

---

## State

### Problème résolu
Permettre à un objet de **changer de comportement selon son état interne**, comme s'il changeait de classe.

```js
// ❌ Sans State — conditions imbriquées partout
class Order {
  process(action) {
    if (this.status === 'pending') {
      if (action === 'pay') { /* ... */ }
      else if (action === 'cancel') { /* ... */ }
    } else if (this.status === 'paid') {
      if (action === 'ship') { /* ... */ }
      // ...
    }
    // Ça explose avec chaque nouvel état ou action
  }
}

// ✅ Avec State
class PendingState {
  pay(order) { order.setState(new PaidState()); }
  cancel(order) { order.setState(new CancelledState()); }
  ship(order) { throw new Error("Cannot ship a pending order"); }
}

class PaidState {
  pay(order) { throw new Error("Already paid"); }
  cancel(order) { order.setState(new RefundedState()); }
  ship(order) { order.setState(new ShippedState()); }
}

class Order {
  constructor() { this.state = new PendingState(); }
  setState(state) { this.state = state; }
  pay() { this.state.pay(this); }
  ship() { this.state.ship(this); }
  cancel() { this.state.cancel(this); }
}
```

### Quand l'utiliser
- Machine à états (order lifecycle, auth flow, connexion réseau)
- Comportement qui dépend fortement de l'état interne
- Éliminer des if/else conditionnels sur un statut/état

---

## Template Method

### Problème résolu
Définir le **squelette d'un algorithme** dans une classe de base, en laissant les sous-classes remplir certaines étapes.

```js
// Classe abstraite — définit la séquence
class DataExporter {
  export(data) { // Template Method
    const formatted = this.format(data);      // étape variable
    const validated = this.validate(formatted); // étape variable
    return this.write(validated);              // étape variable
  }
  // Sous-classes implémentent ces méthodes
  format(data) { throw new Error('Must implement format()'); }
  validate(data) { return data; } // comportement par défaut
  write(data) { throw new Error('Must implement write()'); }
}

class CSVExporter extends DataExporter {
  format(data) { return data.map(row => row.join(',')).join('\n'); }
  write(data) { return fs.writeFileSync('output.csv', data); }
}

class JSONExporter extends DataExporter {
  format(data) { return JSON.stringify(data, null, 2); }
  write(data) { return fs.writeFileSync('output.json', data); }
}
```

### Quand l'utiliser
- Algorithme avec une structure fixe mais des étapes variables
- Éviter la duplication dans des classes qui suivent la même séquence
- Frameworks (hooks de lifecycle, pipelines de build)

### Différence avec Strategy
- **Template Method** : la variation est dans les *étapes* d'un algorithme unique (héritage)
- **Strategy** : la variation est l'*algorithme entier* (composition) — préférable en général

---

## Chain of Responsibility

### Problème résolu
Passer une requête à travers une **chaîne de gestionnaires**. Chaque maillon décide de traiter la requête ou de la passer au suivant.

```js
class Handler {
  setNext(handler) {
    this.next = handler;
    return handler; // permet le chaînage
  }
  handle(request) {
    if (this.next) return this.next.handle(request);
    return null;
  }
}

class AuthMiddleware extends Handler {
  handle(request) {
    if (!request.token) return { error: 'Unauthorized' };
    return super.handle(request);
  }
}

class RateLimitMiddleware extends Handler {
  handle(request) {
    if (isRateLimited(request.ip)) return { error: 'Too Many Requests' };
    return super.handle(request);
  }
}

class RouteHandler extends Handler {
  handle(request) {
    return processRoute(request);
  }
}

// Composition de la chaîne
const auth = new AuthMiddleware();
const rateLimit = new RateLimitMiddleware();
const route = new RouteHandler();

auth.setNext(rateLimit).setNext(route);
auth.handle(request);
```

### Quand l'utiliser
- Pipelines de traitement (middlewares)
- Validation en plusieurs étapes
- Quand plusieurs objets peuvent traiter une requête et tu ne veux pas coupler l'émetteur aux gestionnaires

### En JavaScript
Le système de middlewares Express **est** une Chain of Responsibility.

---

## Iterator

### Problème résolu
Parcourir les éléments d'une collection **sans exposer sa structure interne**.

```js
// En JavaScript, natif avec les iterables / generators
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

for (const n of new Range(1, 5)) {
  console.log(n); // 1, 2, 3, 4, 5
}
```

### En JavaScript
`for...of`, spread operator, `Array.from()`, les generators (`function*`) — tous implémentent Iterator nativement. Moins besoin de l'implémenter manuellement qu'en Java/C#.

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
| **Iterator** | Parcourir une collection uniformément | Structure interne à ne pas exposer |
