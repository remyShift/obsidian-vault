---
tags: [SoftwareCraft, DesignPatterns, Structural]
---

Ajouter des **comportements dynamiquement** à un objet en l'enveloppant, sans modifier sa classe et sans héritage en cascade. Chaque Decorator respecte la même interface que l'objet original.

```js
// Interface commune : { log(message) }

class BasicLogger {
  log(message) {
    console.log(message);
  }
}

class TimestampLogger {
  constructor(logger) {
    this.logger = logger;
  }
  log(message) {
    this.logger.log(`[${new Date().toISOString()}] ${message}`);
  }
}

class LevelLogger {
  constructor(logger, level) {
    this.logger = logger;
    this.level = level;
  }
  log(message) {
    this.logger.log(`[${this.level}] ${message}`);
  }
}

// Composition — l'ordre des wrappers compte
const logger = new LevelLogger(new TimestampLogger(new BasicLogger()), 'INFO');
logger.log('User connected');
// → [INFO] [2024-01-15T10:30:00Z] User connected
```

Ajouter un comportement = nouveau wrapper. Aucune modification des classes existantes. [[Les Principes SOLID|OCP]] pur.

### En JavaScript

- **Middlewares Express** : chaque middleware est un Decorator de la requête
- **Higher-Order Components React** : `withAuth(Component)`, `withLoading(Component)` — même structure
- **Wrapping de fonctions** :

```js
function withLogging(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

const loggedCreate = withLogging(createOrder);
```

### Différence avec Proxy

[[Proxy]] = **contrôler l'accès** à un objet (cache, sécurité, lazy loading). Decorator = **ajouter des comportements**. La distinction est dans l'intention : Proxy ne change pas le comportement fonctionnel, il en gate l'accès ou l'optimise. Decorator enrichit.

### Signal d'usage

- Explosion de sous-classes : `LoggedCachedAuthenticatedService` vs 3 Decorators composables
- Comportements transversaux (logging, caching, auth) qui s'appliquent à plusieurs classes

### Erreur classique

Chaînes de Decorators trop longues sans lisibilité. Si la composition devient obscure, une [[Facade]] qui encapsule la chaîne peut aider.

---

- [[Design Patterns Structural]] — vue d'ensemble des patterns structural
- [[Proxy]] — contrôler l'accès vs enrichir le comportement
- [[Les Principes SOLID]] — OCP
