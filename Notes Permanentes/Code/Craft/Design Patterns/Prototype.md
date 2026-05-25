---
tags: [SoftwareCraft, DesignPatterns, Creational]
---

Créer de nouveaux objets en **copiant un objet existant** plutôt qu'en instanciant depuis une classe. Utile quand l'initialisation est coûteuse ou quand tu veux des variantes d'un template.

En JavaScript, le pattern est natif. Le spread et `Object.assign` en sont des implémentations légères :

```js
const baseProduct = {
  currency: 'EUR',
  status: 'active',
  taxRate: 0.2
};

// Cloner avec variantes
const serum = { ...baseProduct, name: 'Sérum Vitamine C', price: 32 };
const creme = { ...baseProduct, name: 'Crème Hydratante', price: 24 };
```

Pour des objets plus complexes avec méthodes, tu implémentes une méthode `clone()` :

```js
class ProductTemplate {
  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}
```

### Attention à la copie superficielle

Le spread ne fait qu'une copie de surface. Les objets imbriqués sont partagés par référence :

```js
const base = { config: { region: 'FR' } };
const copy = { ...base };
copy.config.region = 'DE'; // modifie aussi base.config.region !
```

Pour une vraie copie profonde : `structuredClone()` (natif depuis Node 17) ou une lib dédiée.

### Signal d'usage

- Objets coûteux à initialiser (connexions, parsers, configs)
- Fixtures de test avec des variantes légères d'un objet de base
- Création de templates dans un éditeur (cloner une slide, un composant...)

---

- [[Design Patterns Creational]] — vue d'ensemble des patterns creational
