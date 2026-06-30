---
tags: [SoftwareCraft, CleanCode, Refactoring, DDD]
---

Utiliser des types primitifs (`string`, `number`, `boolean`) pour représenter des concepts métier qui ont leurs propres règles de validité, leur propre comportement, ou leur propre signification dans le domaine. En DDD, c'est exactement ce que résolvent les [[Value Object|Value Objects]].

```js
// ❌ Primitive Obsession — tout est string ou number, aucune règle encapsulée
function createOrder(customerId, productId, quantity, priceAmount, priceCurrency) {
  if (quantity <= 0) throw new Error('Quantity must be positive');
  if (priceAmount < 0) throw new Error('Price cannot be negative');
  if (!priceCurrency) throw new Error('Currency required');
  // ces validations vont être répétées partout où quantity et price sont utilisés
}

// Rien n'empêche d'appeler :
createOrder('prod_123', 'cust_456', -1, 99, 'EUR'); // customerId et productId inversés, silencieux
```

Deux problèmes distincts. Le premier : les règles de validité (`quantity > 0`, `price >= 0`) vivent dans les fonctions qui utilisent les primitives, pas dans les primitives elles-mêmes. Elles seront soit dupliquées, soit oubliées. Le second : rien dans le système de types ne distingue un `customerId` d'un `productId`. Ce sont deux strings interchangeables pour le compilateur mais pas pour le domaine.

```js
// ✅ types dédiés — les règles vivent dans l'objet, les types se distinguent
class Quantity {
  constructor(value) {
    if (!Number.isInteger(value) || value <= 0) throw new Error('Quantity must be a positive integer');
    this.value = value;
    Object.freeze(this);
  }
}

class Money {
  constructor(amount, currency) {
    if (amount < 0) throw new Error('Amount cannot be negative');
    if (!currency) throw new Error('Currency required');
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this);
  }

  add(other) {
    if (this.currency !== other.currency) throw new Error('Currency mismatch');
    return new Money(this.amount + other.amount, this.currency);
  }
}

function createOrder(customerId, productId, quantity, price) {
  // quantity est déjà valide par construction, price aussi
  // customerId et productId peuvent être des Value Objects distincts si besoin
}
```

Le bénéfice dépasse la validation : `Money` peut encapsuler l'addition, la comparaison, la conversion. `Email` peut normaliser la casse. Ces comportements sont maintenant réutilisables et testés une seule fois.

**Fix :** `Replace Primitive with Object`. En DDD : créer un Value Object. Cf. [[Value Object]].

**Signal d'identification :** validations identiques du même primitif répétées à plusieurs endroits, paramètres du même type primitif qui pourraient être confondus à l'appel, comportements spécifiques à une valeur dispersés dans des utils ou des helpers.
