---
tags: [SoftwareCraft, DesignPatterns]
---

**Objectif :** Contrôler et abstraire **la création des objets**. Cf. [[Design Patterns]] pour la vue d'ensemble.

---

## Factory Method

Tu dois créer des objets sans que le code appelant soit couplé à la classe concrète.

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
```

Lien SOLID : OCP direct — ajouter un nouveau type = nouvelle classe, pas de modification existante.

---

## Abstract Factory

Tu dois créer des **familles d'objets liés** qui doivent être compatibles entre eux.

```js
class DarkThemeFactory {
  createButton() { return new DarkButton(); }
  createModal() { return new DarkModal(); }
}
// Garantit la cohérence : si factory = Dark, tout est Dark
```

Différence avec Factory Method : Factory Method crée **un** type d'objet, Abstract Factory crée **une famille**.

---

## Builder

Construire un objet complexe step by step, avec beaucoup de paramètres optionnels, sans constructeurs à rallonge.

```js
const query = new QueryBuilder('orders')
  .where('status', 'pending')
  .join('customers', 'orders.customer_id = customers.id')
  .orderBy('created_at', 'DESC')
  .limit(10)
  .build();
```

En JS/Node : pattern derrière Knex.js, Mongoose query, les factories de fixtures de test.

---

## Singleton

Garantir qu'une classe n'a **qu'une seule instance** dans toute l'application.

**Attention — pattern controversé.** Uncle Bob le considère souvent comme un anti-pattern :
- Crée un **état global** implicite
- Rend les **tests difficiles** (impossible de remplacer par un mock)
- Viole le DIP ([[Les Principes SOLID]])

**Alternative préférée :** injection de dépendances. Tu crées l'instance une fois au démarrage et tu l'injectes partout.

---

## Prototype

Créer de nouveaux objets en **copiant** un objet existant plutôt qu'en instanciant depuis une classe.

En JS : le spread operator et `Object.assign` sont des implémentations légères de ce pattern.

---

## Tableau récapitulatif

| Pattern | Problème résolu | Signal d'usage |
|---|---|---|
| **Factory Method** | Créer un objet sans couplage au type concret | `new ConcreteClass()` disséminé partout |
| **Abstract Factory** | Créer des familles d'objets cohérents | Plusieurs types d'objets liés à créer ensemble |
| **Builder** | Construire un objet complexe lisiblement | Constructeur avec 4+ paramètres optionnels |
| **Singleton** | Une seule instance globale | Préférer l'injection de dépendances |
| **Prototype** | Cloner un objet existant | Objet coûteux à init, ou variantes d'un template |
