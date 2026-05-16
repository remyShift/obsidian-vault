---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Deux classes qui se connaissent trop : l'une accède aux détails internes de l'autre, contourne son interface publique, ou les deux se dépendent mutuellement. C'est du couplage fort qui rend les deux classes impossibles à modifier ou tester indépendamment. Cf. [[Coupling & Cohesion]].

```js
// ❌ Inappropriate Intimacy — OrderService fouille dans les entrailles de Payment
class Payment {
  constructor(data) {
    this._amount = data.amount;
    this._status = data.status;
    this._transactions = data.transactions; // détail interne
  }
}

class OrderService {
  confirmPayment(payment) {
    // accède directement aux détails internes
    if (payment._transactions.length > 0 &&
        payment._transactions[payment._transactions.length - 1].type === 'capture') {
      payment._status = 'confirmed'; // modifie l'état interne directement
    }
  }
}
```

`OrderService` connaît la structure interne de `Payment` jusque dans ses détails d'implémentation. Si `Payment` change la façon dont elle gère ses transactions, `OrderService` se casse. Les deux sont maintenant liées par les entrailles.

```js
// ✅ interface claire — Payment expose ce dont les autres ont besoin
class Payment {
  constructor(data) {
    this._amount = data.amount;
    this._status = data.status;
    this._transactions = data.transactions;
  }

  isCaptured() {
    const last = this._transactions[this._transactions.length - 1];
    return last?.type === 'capture';
  }

  confirm() {
    if (!this.isCaptured()) throw new Error('Payment not captured');
    this._status = 'confirmed';
  }
}

class OrderService {
  confirmPayment(payment) {
    payment.confirm(); // parle à l'interface, pas aux entrailles
  }
}
```

**Fix :** définir une interface publique claire sur la classe "envahie", déplacer les méthodes qui accèdent à ses données vers elle (`Move Method`), et supprimer tout accès direct aux propriétés privées depuis l'extérieur.

**Signal d'identification :** accès à des propriétés préfixées `_` depuis une autre classe, tests d'une classe qui doivent connaître la structure interne d'une autre pour fonctionner, deux classes qui s'importent mutuellement.
