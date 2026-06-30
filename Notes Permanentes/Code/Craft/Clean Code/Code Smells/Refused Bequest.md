---
tags: [SoftwareCraft, CleanCode, Refactoring]
---

Une sous-classe qui hérite d'une classe parent mais refuse une partie de l'héritage, en général en levant une exception sur des méthodes héritées qu'elle ne supporte pas. C'est une violation du LSP : si on peut substituer le parent par l'enfant partout, une exception surprise brise cette garantie. Cf. [[Les Principes SOLID]].

```js
// ❌ Refused Bequest — ReadOnlyCollection refuse une méthode héritée
class Collection {
  add(item) { this.items.push(item); }
  remove(item) { /* ... */ }
  getAll() { return this.items; }
}

class ReadOnlyCollection extends Collection {
  add(item) {
    throw new Error("Cannot add to a read-only collection"); // refuse le bequest
  }
  remove(item) {
    throw new Error("Cannot remove from a read-only collection");
  }
}
```

Si un code reçoit une `Collection` et appelle `add()`, il a le droit de s'attendre à ce que ça fonctionne. Remplacer par une `ReadOnlyCollection` brise cette attente.

Le problème de fond : l'héritage a été utilisé pour réutiliser du code (`getAll()`), pas parce que la relation "est-un" est vraie. Une `ReadOnlyCollection` n'est pas vraiment une `Collection` si elle refuse ses comportements fondamentaux.

```js
// ✅ composition + interface commune explicite
class Collection {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  remove(item) { this.items = this.items.filter(i => i !== item); }
  getAll() { return [...this.items]; }
}

class ReadOnlyCollection {
  constructor(items) { this.items = items; }
  getAll() { return [...this.items]; } // partage seulement ce qu'il assume
}
```

Ou définir une interface commune explicite si les deux doivent être utilisées de manière interchangeable, mais uniquement pour les méthodes réellement partagées.

**Fix :** revoir la hiérarchie. Remplacer l'héritage par composition. N'hériter que lorsque la relation "est-un" est réellement vraie pour **tous** les comportements de la classe parent.

**Signal d'identification :** méthodes héritées qui lèvent `NotImplemented`, `UnsupportedOperation` ou équivalent, commentaires du type "// ne pas appeler cette méthode".
