---
tags: [SoftwareCraft, DesignPatterns, Creational]
---

Garantir qu'une classe n'a **qu'une seule instance** dans toute l'application, avec un point d'accès global.

```js
// Implémentation classique en JS
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.connection = createConnection();
    DatabaseConnection.instance = this;
  }
}
```

En Node.js, le cache de modules (`require`) donne un comportement Singleton de facto : un module exporté est mis en cache et réutilisé partout.

```js
// db.js — module instancié une seule fois grâce au cache Node
const connection = createConnection(config);
module.exports = connection;
```

### Pourquoi c'est controversé

Uncle Bob le classe souvent parmi les anti-patterns. Les problèmes :

- **État global implicite** — n'importe quelle partie du code peut le modifier, les effets de bord sont difficiles à tracer
- **Tests difficiles** — impossible de remplacer l'instance par un mock entre deux tests, l'état persiste
- **Couplage fort** — le code qui consomme le Singleton dépend directement de lui, viole le [[Les Principes SOLID|DIP]]

### L'alternative

**Injection de dépendances.** Tu crées l'instance une fois au démarrage (ex: dans `app.js`) et tu l'injectes partout où c'est nécessaire. Le comportement est identique, mais le code reste testable et les dépendances sont explicites.

```js
// Au lieu de DatabaseConnection.getInstance() partout
// app.js
const db = new DatabaseConnection(config);
const userRepo = new UserRepository(db); // db injecté, pas récupéré globalement
const orderRepo = new OrderRepository(db);
```

### Signal pour reconsidérer

Si tu te retrouves à appeler `.getInstance()` depuis 15 endroits différents, c'est le signe que tu as un problème d'architecture, pas un problème de pattern.

---

- [[Design Patterns Creational]] — vue d'ensemble des patterns creational
- [[Les Principes SOLID]] — DIP
