---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Des données qui apparaissent toujours ensemble sans être regroupées dans une structure commune. Si tu vois les mêmes 3-4 variables voyager ensemble à travers plusieurs fonctions, elles constituent probablement un concept qui mérite son propre nom.

```js
// ❌ Data Clumps — street, city, postalCode, country voyagent toujours ensemble
function createUser(name, email, street, city, postalCode, country) { /* ... */ }
function updateUserAddress(userId, street, city, postalCode, country) { /* ... */ }
function calculateShipping(weight, street, city, postalCode, country) { /* ... */ }
function validateAddress(street, city, postalCode, country) { /* ... */ }
```

Quatre champs qui n'existent jamais séparément. Si un cinquième champ s'ajoute (ex: `region`), tu dois le rajouter dans chaque signature. Et à chaque appel.

```js
// ✅ Extract Class — le concept a un nom, une structure, potentiellement un comportement
class Address {
  constructor({ street, city, postalCode, country }) {
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    Object.freeze(this);
  }

  isInParis() {
    return this.country === 'FR' && this.postalCode.startsWith('75');
  }
}

function createUser(name, email, address) { /* ... */ }
function updateUserAddress(userId, address) { /* ... */ }
function calculateShipping(weight, address) { /* ... */ }
```

Le test : si tu retires un des champs du groupe, est-ce que les autres perdent leur sens ? `street` sans `city`, `postalCode` sans `country` — ça ne veut plus rien dire. C'est le signal que c'est un Data Clump.

Le lien avec [[Primitive Obsession]] : les Data Clumps sont souvent des cas de Primitive Obsession à plusieurs champs. La solution est la même : extraire un objet dédié. En DDD, cet objet sera souvent un [[Value Object]].

**Fix :** `Extract Class` pour créer une structure commune. Si le groupe de données a des comportements associés, il mérite une classe à part entière.

**Signal d'identification :** même groupe de paramètres dans plusieurs signatures de fonctions, copier-coller de plusieurs variables ensemble pour les passer à une fonction, conditions qui vérifient plusieurs champs du même groupe.
