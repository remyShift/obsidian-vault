> [!info]- Tags
> #SoftwareCraft #DesignPatterns #LectureNote

# Design Patterns — Creational

**Source :** GoF, Refactoring Guru
**Objectif :** Contrôler et abstraire **la création des objets**

---

## Factory Method

### Problème résolu
Tu as besoin de créer des objets, mais tu ne veux pas que le code appelant soit couplé à la classe concrète.

### Structure
Une méthode (ou classe) dont la responsabilité est de **décider quel objet créer** selon le contexte.

```js
// ❌ Sans Factory — couplage direct
const payment = new CreditCardPayment(amount);

// ✅ Avec Factory Method
class PaymentFactory {
  static create(type, amount) {
    switch(type) {
      case 'credit': return new CreditCardPayment(amount);
      case 'paypal': return new PaypalPayment(amount);
      case 'crypto': return new CryptoPayment(amount);
      default: throw new Error(`Unknown payment type: ${type}`);
    }
  }
}

const payment = PaymentFactory.create('credit', 100);
```

### Quand l'utiliser
- Tu ne sais pas à l'avance quel type d'objet créer
- Tu veux centraliser la logique de création
- Tu veux pouvoir ajouter de nouveaux types sans modifier le code appelant (OCP)

### Lien SOLID
OCP direct : ajouter un nouveau type de paiement = ajouter une classe + modifier la factory, pas le reste du code.

---

## Abstract Factory

### Problème résolu
Tu dois créer des **familles d'objets liés** qui doivent être compatibles entre eux.

### Structure
Une interface qui définit des méthodes pour créer chaque type d'objet d'une famille.

```js
// Exemple : UI components qui doivent être cohérents (Light theme / Dark theme)
class LightThemeFactory {
  createButton() { return new LightButton(); }
  createModal() { return new LightModal(); }
}

class DarkThemeFactory {
  createButton() { return new DarkButton(); }
  createModal() { return new DarkModal(); }
}

// Le code client ne connaît que la factory, pas les classes concrètes
function renderUI(factory) {
  const button = factory.createButton();
  const modal = factory.createModal();
  // garantit la cohérence : si factory = Dark, tout est Dark
}
```

### Différence avec Factory Method
- Factory Method → créer **un** type d'objet
- Abstract Factory → créer **une famille** d'objets cohérents

---

## Builder

### Problème résolu
Construire un objet complexe step by step, avec beaucoup de paramètres optionnels, sans constructeurs à rallonge.

```js
// ❌ Constructeur à rallonge (telescoping constructor)
new QueryBuilder(table, conditions, joins, orderBy, limit, offset, groupBy)

// ✅ Builder pattern
const query = new QueryBuilder('orders')
  .where('status', 'pending')
  .join('customers', 'orders.customer_id = customers.id')
  .orderBy('created_at', 'DESC')
  .limit(10)
  .build();
```

### Quand l'utiliser
- Objet avec nombreux paramètres optionnels
- Construction en plusieurs étapes
- Tu veux une API fluide et lisible

### En JavaScript / Node
C'est le pattern derrière beaucoup de query builders (Knex.js, Mongoose query), les builders de test (factories de fixtures), les configurations complexes.

---

## Singleton

### Problème résolu
Garantir qu'une classe n'a **qu'une seule instance** dans toute l'application.

```js
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.connection = createConnection(config);
    DatabaseConnection.instance = this;
  }
}
```

### ⚠️ Attention — pattern controversé

Uncle Bob et la communauté craft le considèrent souvent comme un **anti-pattern** :
- Crée un **état global** implicite
- Rend les **tests difficiles** (impossible de remplacer l'instance par un mock facilement)
- Viole le DIP (couplage à une instance concrète globale)
- Cache les dépendances

**Alternative préférée :** Injection de dépendances. Tu crées l'instance une fois au démarrage de l'app et tu l'injectes partout où elle est nécessaire.

### Quand c'est acceptable
Configuration globale en lecture seule, logger, cache. Mais toujours avec une stratégie de remplacement pour les tests.

---

## Prototype

### Problème résolu
Créer de nouveaux objets en **copiant** un objet existant (clonage), plutôt qu'en instanciant depuis une classe.

```js
const baseConfig = {
  timeout: 3000,
  retries: 3,
  headers: { 'Content-Type': 'application/json' }
};

// Clone et spécialise sans toucher à l'original
const authConfig = { ...baseConfig, headers: { ...baseConfig.headers, Authorization: token } };
```

### Quand l'utiliser
- Créer des objets coûteux à initialiser
- Créer des variantes d'un objet de base
- En JS : le spread operator et `Object.assign` sont des implémentations légères de ce pattern

---

## Tableau récapitulatif

| Pattern | Problème résolu | Signal d'usage |
|---|---|---|
| **Factory Method** | Créer un objet sans couplage au type concret | `new ConcreteClass()` disséminé partout |
| **Abstract Factory** | Créer des familles d'objets cohérents | Plusieurs types d'objets liés à créer ensemble |
| **Builder** | Construire un objet complexe lisiblement | Constructeur avec 4+ paramètres optionnels |
| **Singleton** | Une seule instance globale | ⚠️ Préférer l'injection de dépendances |
| **Prototype** | Cloner un objet existant | Objet coûteux à init, ou variantes d'un template |
