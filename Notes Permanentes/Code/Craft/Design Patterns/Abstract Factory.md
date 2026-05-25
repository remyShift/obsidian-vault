---
tags: [SoftwareCraft, DesignPatterns, Creational]
---

Créer des **familles d'objets liés** en garantissant leur cohérence. Si tu instancies une factory `Dark`, tout ce qu'elle produit est `Dark`.

```js
// Deux factories, même interface
class DarkThemeFactory {
  createButton() { return new DarkButton(); }
  createModal() { return new DarkModal(); }
}

class LightThemeFactory {
  createButton() { return new LightButton(); }
  createModal() { return new LightModal(); }
}

// Le code appelant ne connaît que la factory, jamais les classes concrètes
function buildUI(factory) {
  const button = factory.createButton();
  const modal = factory.createModal();
  return { button, modal };
}

const ui = buildUI(new DarkThemeFactory());
```

Changer de thème = passer une autre factory. Zéro modification ailleurs.

### Différence avec Factory Method

[[Factory Method]] crée **un** type d'objet. Abstract Factory crée **plusieurs types liés** qui doivent être compatibles entre eux. Si tu as un seul type à créer, Factory Method suffit.

### Signal d'usage

Tu crées des groupes d'objets qui doivent être cohérents ensemble : themes UI, drivers de base de données (avec connection + query builder + migrator), providers cloud...

---

- [[Design Patterns Creational]] — vue d'ensemble des patterns creational
- [[Factory Method]] — créer un seul type d'objet
