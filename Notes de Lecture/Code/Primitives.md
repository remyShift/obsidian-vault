---
tags: [SoftwareCraft, CleanCode, DDD]
---

En JavaScript, une **primitive** est une valeur non-objet sans méthodes propres : `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. Elles sont **immuables** et passées **par valeur** — copier une primitive, c'est copier sa valeur, pas une référence.

```js
let a = 5;
let b = a;
b = 10;
console.log(a); // toujours 5
```

C'est l'opposé des objets, passés par référence, où deux variables peuvent pointer sur la même chose en mémoire.

---

## Le problème : Primitive Obsession

Utiliser des primitives là où un concept métier devrait exister, c'est le smell [[Code Smells|Primitive Obsession]]. C'est un des smells les plus répandus et les plus insidieux parce qu'au départ ça "marche".

```js
// ❌ rien n'empêche de passer n'importe quoi
function applyDiscount(price, discountPercent) {
  return price - (price * discountPercent / 100);
}

applyDiscount(100, 110); // -10€, logiquement invalide, aucune erreur
applyDiscount(100, -5);  // aussi invalide
```

La règle métier "un discount est entre 0 et 100" est invisible dans la signature. Elle est soit absente, soit dispersée dans des `if` partout dans le code.

Le fix en DDD : remplacer les primitives par des [[Value Object|Value Objects]] qui encapsulent leurs invariants.

```js
class DiscountPercent {
  constructor(value) {
    if (value < 0 || value > 100) throw new Error('Discount invalide');
    this.value = value;
    Object.freeze(this);
  }
}

function applyDiscount(price, discount) {
  return price - (price * discount.value / 100);
}
```

---

## Autoboxing

JavaScript enveloppe automatiquement les primitives dans leurs objets wrappers (`String`, `Number`, `Boolean`) quand on appelle des méthodes dessus. C'est pour ça que `"hello".toUpperCase()` fonctionne même si `"hello"` est une primitive.

Ce comportement est transparent, mais ça vaut le coup de savoir que ce ne sont pas les mêmes choses :

```js
typeof "hello"        // "string" — primitive
typeof new String("hello") // "object" — wrapper object

"hello" === new String("hello") // false
```

Ne jamais utiliser `new String()`, `new Number()`, `new Boolean()` — aucun intérêt en pratique, source de confusion.

---

## `null` vs `undefined`

Deux valeurs "absentes" avec des sémantiques différentes : `undefined` veut dire "pas encore assigné" ou "n'existe pas", `null` veut dire "intentionnellement absent".

En pratique, les deux créent les mêmes crashs (`Cannot read property of null/undefined`). L'optional chaining `?.` et le nullish coalescing `??` sont les outils modernes pour y faire face proprement.

```js
const city = user?.address?.city ?? 'Non renseigné';
```

L'existence même de `null` et `undefined` en JS est un signal : un retour de fonction qui peut être `null` est souvent le symptôme qu'un [[Monad|Maybe/Option monad]] aurait du sens, pour forcer l'appelant à gérer l'absence explicitement.

---

## Lien avec l'immutabilité

Les primitives sont **nativement immuables** — on ne peut pas muter `5`, on peut seulement réassigner la variable qui le contenait. C'est le comportement qu'on veut reproduire sur nos objets métier avec `Object.freeze()` ou en rendant les propriétés non-réassignables. Cf. [[Immutabilité]].
