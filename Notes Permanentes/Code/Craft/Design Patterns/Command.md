---
tags: [SoftwareCraft, DesignPatterns, Behavioral]
---

Encapsuler une **action** comme un objet. Ça permet de la mettre en file, de l'annuler (undo), de la rejouer, de la loguer — sans que l'appelant sache comment elle s'exécute.

```js
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

class CommandBus {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const last = this.history.pop();
    last?.undo();
  }
}

// Usage
const bus = new CommandBus();
bus.execute(new CreateOrderCommand(orderService, orderData));
bus.undo(); // annule la commande
```

### En pratique — Redux

Les **actions Redux** sont une implémentation directe de Command. Chaque action est un objet `{ type, payload }` que le store peut recevoir, exécuter (reducer), et théoriquement rejouer. Redux DevTools time-travel = undo/redo sur la Command history.

### Job queues

**BullMQ**, **Agenda** et les job queues en général : chaque job est un Command sérialisé. Le worker le dépile, l'exécute, le relance en cas d'échec.

### Signal d'usage

- Besoin d'undo/redo (éditeur, panier e-commerce)
- Traitements asynchrones en queue
- Transactionnalité : si une étape échoue, tu peux rejouer ou compenser

### Erreur classique

Mettre de la logique métier dans la Command. Elle orchestre, elle ne décide pas. La logique reste dans le service injecté.

---

- [[Design Patterns Behavioral]] — vue d'ensemble des patterns behavioral
