---
tags: [SoftwareCraft, CleanCode, Refactoring, DDD]
---
Une classe qui ne contient que des getters et setters, sans aucun comportement. Les données sont là, mais toute la logique qui devrait leur appartenir est dispersée dans des services externes qui la manipulent. C'est le modèle anémique décrit par Martin Fowler, et la matérialisation d'une violation du SRP et du principe "Tell, Don't Ask". Cf. [[Domain-Driven Design]].

```js
// ❌ Data Class — Order ne fait rien, elle subit
class Order {
  constructor(data) {
    this.id = data.id;
    this.items = data.items;
    this.status = data.status;
    this.total = data.total;
  }

  getId() { return this.id; }
  getItems() { return this.items; }
  getStatus() { return this.status; }
  setStatus(status) { this.status = status; }
  getTotal() { return this.total; }
}

// La logique métier est dans le service, qui "demande" et manipule
class OrderService {
  confirmOrder(order) {
    if (order.getItems().length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    if (order.getStatus() !== 'pending') {
      throw new Error('Order already processed');
    }
    order.setStatus('confirmed'); // le service dicte l'état
  }
}
```

Le problème : la règle "une commande vide ne peut pas être confirmée" vit dans `OrderService`, pas dans `Order`. Si quelqu'un crée un `OrderProcessingService` demain, il peut tout à fait appeler `setStatus('confirmed')` sans passer par cette règle.

```js
// ✅ modèle riche — la logique appartient à l'objet
class Order {
  constructor(data) {
    this.id = data.id;
    this.items = data.items;
    this.status = data.status;
  }

  confirm() {
    if (this.items.length === 0) throw new Error('Cannot confirm empty order');
    if (this.status !== 'pending') throw new Error('Order already processed');
    this.status = 'confirmed';
  }

  cancel() {
    if (this.status === 'confirmed') throw new Error('Cannot cancel a confirmed order');
    this.status = 'cancelled';
  }

  isConfirmed() {
    return this.status === 'confirmed';
  }
}
```

Les invariants sont dans l'objet, inviolables. `OrderService` appelle `order.confirm()` et n'a pas à connaître les règles internes.

**Fix :** déplacer les méthodes des services qui opèrent sur les données de la classe vers la classe elle-même. `Move Method`.

**Signal d'identification :** classe avec uniquement des getters/setters, services qui font `object.getX()`, comparent, puis appellent `object.setY()`, logique métier introuvable et dispersée dans des fichiers `*Service.js`.
