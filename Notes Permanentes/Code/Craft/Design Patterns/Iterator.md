---
tags: [SoftwareCraft, DesignPatterns, Behavioral]
---

Parcourir les éléments d'une collection **sans exposer sa structure interne**. L'appelant itère de manière uniforme, peu importe si c'est un tableau, un arbre, une queue ou un générateur.

En JavaScript, c'est natif. Le protocole d'itération (`Symbol.iterator`) est intégré au langage.

```js
// Tout ce qui implémente Symbol.iterator est itérable
for (const item of array) { }
for (const char of string) { }
for (const [key, value] of map) { }

// Spread et destructuring utilisent le même protocole
const copy = [...myCollection];
const [first, ...rest] = myCollection;
```

## Implémenter un Iterator custom

```js
class ProductCatalog {
  constructor(products) {
    this.products = products;
  }

  // Rend la collection itérable avec for...of
  [Symbol.iterator]() {
    let index = 0;
    const products = this.products;

    return {
      next() {
        if (index < products.length) {
          return { value: products[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

const catalog = new ProductCatalog(products);
for (const product of catalog) {
  console.log(product.name);
}
```

## Generators — Iterator idiomatique en JS

```js
class ProductCatalog {
  *[Symbol.iterator]() {
    for (const product of this.products) {
      yield product;
    }
  }
}
```

Les generators (`function*` / `yield`) sont la façon la plus lisible d'implémenter Iterator en JavaScript. Ils gèrent automatiquement l'état de l'itération.

## Quand l'implémenter

En JS, rarement nécessaire sur des tableaux simples — `map`, `filter`, `forEach` suffisent. Iterator vaut le coup quand :

- Tu as une structure de données custom (arbre, graphe, pagination lazy)
- Tu veux une interface uniforme sur des collections hétérogènes
- Tu travailles avec des séquences infinies (generators + lazy evaluation)

---

- [[Design Patterns Behavioral]] — vue d'ensemble des patterns behavioral
