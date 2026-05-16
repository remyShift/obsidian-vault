---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Une classe qui ne fait que déléguer : toutes ses méthodes se contentent d'appeler une méthode du même nom sur un objet qu'elle contient. Elle n'ajoute aucune valeur, elle est juste dans le chemin.

```js
// ❌ Middle Man — OrderFacade ne fait que transférer les appels
class OrderFacade {
  constructor(orderService) {
    this.orderService = orderService;
  }

  createOrder(data) { return this.orderService.createOrder(data); }
  cancelOrder(id) { return this.orderService.cancelOrder(id); }
  getOrder(id) { return this.orderService.getOrder(id); }
  confirmOrder(id) { return this.orderService.confirmOrder(id); }
}
```

Si 80% des méthodes d'une classe ne font que déléguer sans aucune logique ajoutée, la classe est un Middle Man : elle complexifie le code sans rien apporter.

```js
// ✅ Remove Middle Man — accéder directement à la vraie logique
// Les appelants utilisent directement orderService
orderService.createOrder(data);
```

La nuance importante : si la délégation **ajoute quelque chose** (abstraction d'une interface complexe, protection contre un système externe, point d'extension pour de la logique transversale future), elle est légitime. C'est ce que font les patterns Facade et Proxy. Le smell, c'est quand la délégation est purement mécanique, sans valeur ajoutée. Cf. [[Design Patterns Structural]].

```js
// ✅ délégation légitime — la façade simplifie un sous-système complexe
class PaymentFacade {
  constructor(stripe, fraudDetection, auditLog) {
    this.stripe = stripe;
    this.fraudDetection = fraudDetection;
    this.auditLog = auditLog;
  }

  async charge(userId, amount) {
    await this.fraudDetection.check(userId, amount); // logique ajoutée
    const result = await this.stripe.createCharge(amount);
    await this.auditLog.record(userId, result);     // logique ajoutée
    return result;
  }
}
```

**Fix :** `Remove Middle Man` si la délégation n'ajoute rien. Garder si elle ajoute une abstraction réelle.

**Signal d'identification :** classe dont toutes les méthodes ont exactement une ligne qui appelle `this.autreChose.mêmeNomDeMéthode(mêmesArgs)`, classe qu'on pourrait supprimer sans changer aucun comportement.
