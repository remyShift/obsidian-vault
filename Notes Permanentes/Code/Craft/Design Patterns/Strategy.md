---
tags: [SoftwareCraft, DesignPatterns, Behavioral]
---

Définir une **famille d'algorithmes interchangeables**, les encapsuler et les rendre substituables à l'exécution. L'appelant délègue l'exécution à la stratégie sans en connaître les détails.

```js
// ❌ Sans Strategy — le if/else grossit à chaque nouveau type
class Sorter {
  sort(data, type) {
    if (type === 'bubble') { /* ... */ }
    else if (type === 'quick') { /* ... */ }
    // nouveau algo = modification de cette classe
  }
}

// ✅ Avec Strategy
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }
  sort(data) {
    return this.strategy.sort(data);
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
}

class QuickSort {
  sort(data) { /* ... */ return sorted; }
}

class MergeSort {
  sort(data) { /* ... */ return sorted; }
}

const sorter = new Sorter(new QuickSort());
sorter.sort(data);
sorter.setStrategy(new MergeSort()); // changer d'algo sans toucher Sorter
```

Lien [[Les Principes SOLID|SOLID]] : [[Les Principes SOLID|OCP]] direct. Ajouter un algorithme = nouvelle classe, zéro modification de l'existant.

### Sur Oli's Lab

Calcul de frais de livraison selon le transporteur, stratégies de pricing selon le client (particulier, pro, influencer), règles de validation selon le type de produit. Tous ces cas sont des Strategy.

### Erreur classique

Utiliser Strategy quand il n'y a que 2 algorithmes qui ne changeront jamais. Un if/else reste alors plus lisible. Le pattern justifie son coût quand la liste est amenée à grandir.

### Différence avec Template Method

[[Template Method]] = seulement certaines **étapes** d'un algorithme varient, via héritage. Strategy = **l'algorithme entier** est interchangeable, via composition. Préférer Strategy : la composition est plus flexible que l'héritage.

---

- [[Design Patterns Behavioral]] — vue d'ensemble des patterns behavioral
- [[Les Principes SOLID]] — OCP
