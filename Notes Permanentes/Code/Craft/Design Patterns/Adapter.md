---
tags: [SoftwareCraft, DesignPatterns, Structural]
---

Faire collaborer deux interfaces **incompatibles**. Tu as une interface attendue par ton code et une classe existante (souvent externe) qui ne la respecte pas. L'Adapter fait le pont sans modifier aucun des deux côtés.

```js
// Interface attendue par ton app
// { charge(amount, currency) }

// API Stripe — interface différente
// stripe.createPaymentIntent({ amount, currency })

class StripeAdapter {
  constructor(stripe) {
    this.stripe = stripe;
  }

  charge(amount, currency) {
    return this.stripe.createPaymentIntent({ amount, currency });
  }
}

class PaypalAdapter {
  constructor(paypal) {
    this.paypal = paypal;
  }

  charge(amount, currency) {
    return this.paypal.makePayment(amount, { currency });
  }
}

// Le code appelant ne connaît que l'interface charge()
// Changer de provider = écrire un nouvel Adapter, rien d'autre
function processPayment(paymentGateway, amount, currency) {
  return paymentGateway.charge(amount, currency);
}
```

### Sur Oli's Lab

Chaque intégration externe (Stripe, Klaviyo, un transporteur, une API de stock) devrait être derrière un Adapter. Deux bénéfices immédiats :
- **Testabilité** : tu mocks l'Adapter, pas l'API externe
- **Flexibilité** : changer de provider = nouveau fichier, zéro impact sur le reste

### Lien SOLID

[[Les Principes SOLID|OCP + DIP]]. Ton code dépend d'une interface abstraite (le contrat `charge()`), pas de Stripe. L'Adapter est précisément ce qui rend le DIP concret dans le code.

### Différence avec Facade

[[Facade]] = **simplifier** une interface complexe. Adapter = **rendre compatible** deux interfaces incompatibles. Ce n'est pas le même problème.

### Erreur classique

Mettre de la logique métier dans l'Adapter. Il traduit, il ne décide pas. Si tu te retrouves à calculer des prix ou à valider des règles dans un Adapter, c'est une responsabilité mal placée.

---

- [[Design Patterns Structural]] — vue d'ensemble des patterns structural
- [[Les Principes SOLID]] — OCP, DIP
