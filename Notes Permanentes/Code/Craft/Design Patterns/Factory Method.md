---
tags: [SoftwareCraft, DesignPatterns, Creational]
---

Créer des objets sans que le code appelant soit couplé à la classe concrète. Le `new` est isolé dans la factory, pas éparpillé partout.

```js
class PaymentFactory {
  static create(type, amount) {
    switch(type) {
      case 'credit': return new CreditCardPayment(amount);
      case 'paypal': return new PaypalPayment(amount);
      default: throw new Error(`Unknown payment type: ${type}`);
    }
  }
}

// L'appelant ne connaît que PaymentFactory
const payment = PaymentFactory.create('credit', 100);
payment.process();
```

Ajouter un nouveau type de paiement = nouvelle classe + nouveau `case`. Aucune modification du code existant. C'est l'[[Les Principes SOLID|OCP]] à l'état pur.

## Erreur classique

Mettre la logique métier dans la factory. La factory crée, elle ne décide pas.

## Différence avec Abstract Factory

Factory Method crée **un** type d'objet. [[Abstract Factory]] crée **une famille** d'objets cohérents.

---

- [[Design Patterns Creational]] — vue d'ensemble des patterns creational
- [[Les Principes SOLID]] — OCP, DIP
