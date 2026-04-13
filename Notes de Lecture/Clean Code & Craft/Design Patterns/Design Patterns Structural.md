> [!info]- Tags
> #SoftwareCraft #DesignPatterns #LectureNote

# Design Patterns — Structural

**Source :** GoF, Refactoring Guru
**Objectif :** Définir comment **assembler et composer** les objets et classes

---

## Adapter

### Problème résolu
Faire collaborer deux interfaces **incompatibles**. Tu as une interface attendue et une classe existante qui ne la respecte pas — l'Adapter fait le pont.

```js
// Interface attendue par ton app
// paymentProcessor.charge(amount, currency)

// Bibliothèque externe avec une interface différente
class StripeSDK {
  createPaymentIntent({ amount, currency }) { ... }
}

// ✅ Adapter qui traduit
class StripeAdapter {
  constructor(stripe) {
    this.stripe = stripe;
  }

  charge(amount, currency) {
    return this.stripe.createPaymentIntent({ amount, currency });
  }
}

// Ton app utilise StripeAdapter comme si c'était n'importe quel payment processor
const processor = new StripeAdapter(new StripeSDK());
processor.charge(100, 'EUR');
```

### Quand l'utiliser
- Intégrer une librairie externe sans polluer ton code avec son API
- Faire évoluer une interface sans casser les appelants existants
- Remplacer une dépendance par une autre (ex : changer de provider email)

### Lien SOLID
OCP + DIP : ton code dépend de l'interface Adapter, pas de Stripe. Changer de provider = écrire un nouvel Adapter, toucher à rien d'autre.

---

## Facade

### Problème résolu
Fournir une **interface simplifiée** à un sous-système complexe.

```js
// Sous-système complexe avec plusieurs classes
class VideoEncoder { encode(file) { ... } }
class AudioMixer { mix(tracks) { ... } }
class ThumbnailGenerator { generate(frame) { ... } }
class MetadataExtractor { extract(file) { ... } }

// ✅ Facade — interface simple pour l'appelant
class VideoProcessingFacade {
  process(videoFile) {
    const metadata = new MetadataExtractor().extract(videoFile);
    const encoded = new VideoEncoder().encode(videoFile);
    const audio = new AudioMixer().mix(videoFile.audioTracks);
    const thumbnail = new ThumbnailGenerator().generate(videoFile.firstFrame);
    return { encoded, audio, thumbnail, metadata };
  }
}

// L'appelant ne connaît que la Facade
const result = new VideoProcessingFacade().process(file);
```

### Quand l'utiliser
- Simplifier l'accès à un sous-système complexe
- Créer un point d'entrée unique pour une feature
- Réduire le couplage entre le code client et le sous-système

### Différence avec Adapter
- **Adapter** : faire fonctionner deux interfaces incompatibles ensemble
- **Facade** : simplifier l'accès à un système complexe

---

## Decorator

### Problème résolu
Ajouter des **comportements dynamiquement** à un objet, sans modifier sa classe, sans héritage en cascade.

```js
// Interface de base
class BasicLogger {
  log(message) {
    console.log(message);
  }
}

// Decorators qui wrappent le logger de base
class TimestampLogger {
  constructor(logger) { this.logger = logger; }
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

// Composition libre
const logger = new LevelLogger(new TimestampLogger(new BasicLogger()), 'INFO');
logger.log('User connected');
// → [INFO] [2024-01-15T10:30:00Z] User connected
```

### Quand l'utiliser
- Ajouter des comportements transversaux (logging, caching, validation) sans modifier la classe
- Éviter une explosion de sous-classes (`TimestampedLogger`, `LeveledLogger`, `TimestampedLeveledLogger`...)
- Composer des comportements dynamiquement

### En JavaScript
Les **middlewares Express** sont une forme de Decorator / Chain of Responsibility. Les Higher-Order Components React aussi.

---

## Proxy

### Problème résolu
Contrôler l'accès à un objet. Le Proxy se place entre l'appelant et l'objet réel pour ajouter une couche (cache, sécurité, lazy loading, logging).

```js
// Objet réel — requête BDD coûteuse
class UserRepository {
  findById(id) {
    // requête BDD lente
    return db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

// ✅ Proxy avec cache
class CachedUserRepository {
  constructor(repository) {
    this.repository = repository;
    this.cache = new Map();
  }

  findById(id) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const user = this.repository.findById(id);
    this.cache.set(id, user);
    return user;
  }
}
```

### Types de Proxy courants
- **Cache Proxy** : mise en cache des résultats
- **Protection Proxy** : vérification des droits avant d'accéder à l'objet
- **Virtual Proxy** : lazy loading (ne crée l'objet réel qu'au premier accès)
- **Logging Proxy** : journalisation des appels

### Différence avec Decorator
- **Decorator** : ajoute des comportements, même interface
- **Proxy** : contrôle l'accès, même interface — mais l'intention est le contrôle, pas l'enrichissement

---

## Composite

### Problème résolu
Traiter des **objets individuels et des groupes d'objets de la même manière**. Utile pour les structures arborescentes.

```js
// Exemple : système de fichiers — fichiers et dossiers traités pareil
class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
  getSize() { return this.size; }
}

class Folder {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  add(component) { this.children.push(component); }
  getSize() {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }
}

// Utilisation uniforme
const root = new Folder('root');
const src = new Folder('src');
src.add(new File('index.js', 10));
src.add(new File('app.js', 20));
root.add(src);
root.add(new File('package.json', 5));

root.getSize(); // 35 — traverse tout l'arbre
```

### Quand l'utiliser
- Structures arborescentes (menus, catégories, composants UI)
- Quand tu veux traiter uniformément feuilles et nœuds d'un arbre
- React : le Virtual DOM est une implémentation de Composite

---

## Tableau récapitulatif

| Pattern | Problème résolu | Signal d'usage |
|---|---|---|
| **Adapter** | Interfaces incompatibles | Intégration d'une librairie externe |
| **Facade** | Sous-système trop complexe | Trop de classes à connaître pour une action simple |
| **Decorator** | Ajouter des comportements dynamiquement | Explosion de sous-classes ou comportements transversaux |
| **Proxy** | Contrôler l'accès à un objet | Cache, sécurité, lazy loading |
| **Composite** | Arbres d'objets traités uniformément | Structures hiérarchiques (menu, filesystem, DOM) |
