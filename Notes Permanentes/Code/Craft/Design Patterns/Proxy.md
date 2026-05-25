---
tags: [SoftwareCraft, DesignPatterns, Structural]
---

Se placer entre l'appelant et l'objet réel pour **contrôler l'accès** — sans que l'appelant le sache. Le Proxy respecte la même interface que l'objet original.

```js
class UserRepository {
  findById(id) {
    // accès base de données
    return db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  }
}

// Cache Proxy — même interface, comportement transparent
class CachedUserRepository {
  constructor(repository) {
    this.repository = repository;
    this.cache = new Map();
  }

  findById(id) {
    if (this.cache.has(id)) return this.cache.get(id);
    const user = this.repository.findById(id);
    this.cache.set(id, user);
    return user;
  }
}

// Le code appelant ne sait pas s'il parle au repo direct ou au proxy
const repo = new CachedUserRepository(new UserRepository());
const user = repo.findById(42); // DB au 1er appel, cache ensuite
```

### Types de Proxy

- **Cache Proxy** — mémoïse les résultats (voir exemple ci-dessus)
- **Protection Proxy** — vérifie les permissions avant de déléguer
- **Virtual Proxy** — lazy loading, l'objet réel n'est créé qu'au premier accès
- **Logging Proxy** — intercepte les appels pour les loguer sans modifier l'objet

```js
// Protection Proxy
class SecuredOrderRepository {
  constructor(repository, authService) {
    this.repository = repository;
    this.authService = authService;
  }

  findById(id, user) {
    if (!this.authService.canAccess(user, 'orders', 'read')) {
      throw new Error('Access denied');
    }
    return this.repository.findById(id);
  }
}
```

### Proxy natif en JavaScript

ES6 fournit `Proxy` comme primitive du langage :

```js
const handler = {
  get(target, prop) {
    console.log(`Accessing ${prop}`);
    return target[prop];
  }
};

const proxied = new Proxy(myObject, handler);
```

Utilisé par Vue 3 pour la réactivité, par les ORMs pour le lazy loading des relations.

### Différence avec Decorator

[[Decorator]] = **ajouter des comportements** fonctionnels. Proxy = **contrôler l'accès ou optimiser** sans changer le comportement métier. Un Cache Proxy ne change pas ce que `findById` renvoie — il optimise comment. Un Decorator de logging change le pipeline d'exécution.

### Signal d'usage

- Cache sur une ressource coûteuse
- Contrôle d'accès sans polluer l'objet métier
- Lazy loading d'objets lourds
- Logging ou monitoring transparent

---

- [[Design Patterns Structural]] — vue d'ensemble des patterns structural
- [[Decorator]] — enrichir le comportement vs contrôler l'accès
