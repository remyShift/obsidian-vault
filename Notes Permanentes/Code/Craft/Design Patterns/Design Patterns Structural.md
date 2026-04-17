---
tags: [SoftwareCraft, DesignPatterns]
---

**Objectif :** Définir comment **assembler et composer** les objets et classes. Cf. [[Design Patterns]] pour la vue d'ensemble.

---

## Adapter

Faire collaborer deux interfaces **incompatibles**. Tu as une interface attendue et une classe existante qui ne la respecte pas — l'Adapter fait le pont.

```js
class StripeAdapter {
  constructor(stripe) { this.stripe = stripe; }

  charge(amount, currency) { // interface attendue par ton app
    return this.stripe.createPaymentIntent({ amount, currency }); // API Stripe
  }
}
```

Lien SOLID : OCP + DIP. Ton code dépend de l'interface Adapter, pas de Stripe. Changer de provider = écrire un nouvel Adapter, rien d'autre.

**Différence avec Facade :** Adapter = rendre compatible, Facade = simplifier.

---

## Facade

Fournir une **interface simplifiée** à un sous-système complexe.

```js
class VideoProcessingFacade {
  process(videoFile) {
    const metadata = new MetadataExtractor().extract(videoFile);
    const encoded = new VideoEncoder().encode(videoFile);
    const thumbnail = new ThumbnailGenerator().generate(videoFile.firstFrame);
    return { encoded, thumbnail, metadata };
  }
}
// L'appelant ne connaît que la Facade
```

Signal d'usage : trop de classes à connaître pour réaliser une action simple.

---

## Decorator

Ajouter des **comportements dynamiquement** à un objet, sans modifier sa classe, sans héritage en cascade.

```js
class TimestampLogger {
  constructor(logger) { this.logger = logger; }
  log(message) {
    this.logger.log(`[${new Date().toISOString()}] ${message}`);
  }
}

const logger = new LevelLogger(new TimestampLogger(new BasicLogger()), 'INFO');
logger.log('User connected');
// → [INFO] [2024-01-15T10:30:00Z] User connected
```

En JS : les middlewares Express, les Higher-Order Components React.

**Différence avec Proxy :** Decorator = ajouter des comportements, Proxy = contrôler l'accès.

---

## Proxy

Contrôler l'accès à un objet. Se place entre l'appelant et l'objet réel pour ajouter une couche (cache, sécurité, lazy loading, logging).

```js
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
```

Types courants : Cache Proxy, Protection Proxy, Virtual Proxy (lazy loading), Logging Proxy.

---

## Composite

Traiter des **objets individuels et des groupes d'objets de la même manière**. Utile pour les structures arborescentes.

```js
class Folder {
  getSize() {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }
}
class File {
  getSize() { return this.size; }
}
// Utilisation uniforme — Folder et File ont la même interface
```

En React : le Virtual DOM est une implémentation de Composite.

---

## Tableau récapitulatif

| Pattern | Problème résolu | Signal d'usage |
|---|---|---|
| **Adapter** | Interfaces incompatibles | Intégration d'une librairie externe |
| **Facade** | Sous-système trop complexe | Trop de classes à connaître pour une action simple |
| **Decorator** | Ajouter des comportements dynamiquement | Explosion de sous-classes ou comportements transversaux |
| **Proxy** | Contrôler l'accès à un objet | Cache, sécurité, lazy loading |
| **Composite** | Arbres d'objets traités uniformément | Structures hiérarchiques (menu, filesystem, DOM) |
