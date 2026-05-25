---
tags: [SoftwareCraft, DesignPatterns, Structural]
---

Traiter des **objets individuels et des compositions d'objets de la même manière**. Utile pour les structures arborescentes où feuilles et nœuds partagent la même interface.

```js
// Interface commune : getSize()
class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
  getSize() {
    return this.size;
  }
}

class Folder {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  add(child) {
    this.children.push(child);
    return this;
  }
  getSize() {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }
}

// Utilisation uniforme — pas besoin de savoir si c'est un File ou un Folder
const root = new Folder('root');
root.add(new File('readme.md', 12));
root.add(
  new Folder('src')
    .add(new File('app.js', 45))
    .add(new File('utils.js', 23))
);

console.log(root.getSize()); // 80 — récursif automatiquement
```

### En JavaScript — le Virtual DOM

React's Virtual DOM est une implémentation de Composite. Un `<div>` peut contenir d'autres composants ou des nœuds texte — tous exposent la même interface de rendu. React traverse l'arbre récursivement sans distinguer feuilles et nœuds.

### Cas d'usage concrets

- **Système de fichiers** — Folder et File avec la même interface
- **UI components** — un composant peut être un bouton ou un formulaire entier
- **Menus** — item et sous-menu traitables de la même façon
- **Catégories produit** — catégorie qui contient des produits ou d'autres catégories

### Sur Oli's Lab

Les catégories de produits sont souvent hiérarchiques (Soins > Visage > Sérums). Composite permet de calculer le nombre de produits, d'appliquer une réduction, ou de générer un sitemap récursivement sans cas particuliers.

### Signal d'usage

Structure arborescente où tu veux appliquer une opération uniformément sans if/else pour distinguer les feuilles des nœuds. Si tu te retrouves à écrire `if (node.children) { } else { }` partout, c'est le signal.

---

- [[Design Patterns Structural]] — vue d'ensemble des patterns structural
