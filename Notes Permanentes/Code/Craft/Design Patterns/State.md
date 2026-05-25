---
tags: [SoftwareCraft, DesignPatterns, Behavioral]
---

Permettre à un objet de **changer de comportement selon son état interne**, comme s'il changeait de classe à l'exécution. Chaque état encapsule ses propres règles de transition et d'action.

```js
// ❌ Sans State — conditions imbriquées qui explosent à chaque nouvel état
class Order {
  process(action) {
    if (this.status === 'pending') {
      if (action === 'pay') { this.status = 'paid'; }
      else if (action === 'cancel') { this.status = 'cancelled'; }
    } else if (this.status === 'paid') {
      if (action === 'ship') { this.status = 'shipped'; }
      // nouveau statut = modification de cette méthode
    }
  }
}

// ✅ Avec State
class PendingState {
  pay(order) {
    console.log('Processing payment...');
    order.setState(new PaidState());
  }
  cancel(order) {
    order.setState(new CancelledState());
  }
  ship(order) {
    throw new Error('Cannot ship a pending order');
  }
}

class PaidState {
  pay(order) {
    throw new Error('Already paid');
  }
  ship(order) {
    console.log('Shipping...');
    order.setState(new ShippedState());
  }
  cancel(order) {
    console.log('Refunding...');
    order.setState(new CancelledState());
  }
}

class Order {
  constructor() {
    this.state = new PendingState();
  }
  setState(state) {
    this.state = state;
  }
  pay()    { this.state.pay(this); }
  ship()   { this.state.ship(this); }
  cancel() { this.state.cancel(this); }
}
```

Ajouter un état = nouvelle classe. Les transitions invalides sont explicitement gérées par état, pas dans un if/else central.

### Sur Oli's Lab

Le cycle de vie d'une commande (`pending` → `paid` → `shipped` → `delivered` / `cancelled` → `refunded`) est un cas parfait. Sans State, ce code devient rapidement ingérable.

### Signal d'usage

- Machine à états avec des règles de transition différentes par état
- if/else ou switch sur un `status` qui grandit dans plusieurs méthodes
- Lien avec le [[Code Smells|smell Divergent Change]] : si chaque nouveau statut force à modifier plusieurs méthodes

### Erreur classique

Implémenter State alors qu'il n'y a que 2-3 états simples et stables. Un switch/case reste lisible et suffisant dans ce cas. State vaut son coût quand la machine à états est réellement complexe.

---

- [[Design Patterns Behavioral]] — vue d'ensemble des patterns behavioral
- [[Code Smells]] — Divergent Change
