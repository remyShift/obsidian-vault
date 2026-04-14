---
tags: [LangagesDeProgs, JS, ManipObj]
---

En JavaScript, les objets sont des structures de données composées de propriétés, qui sont des paires clé-valeur. Les méthodes de manipulations d'objets permettent d'interagir / modifier / influer directement sur un objet, on retrouve notamment :
- [[keys]],
- [[values]],
- [[entries]],
- [[assign]],
- [[freeze & seal]],
- [[create]],
- [[defineProperty]],
- [[fromEntries]],

De plus on peut boucler sur des objets :

`for ... in` :
Parcourt les propriétés énumérables d'un objet (héritées et propres).

```js
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key, obj[key]); // a 1, b 2, c 3
}
```


`for ... of`
Parcourt les paires clé-valeur d'un objet.

```js
const obj = { a: 1, b: 2, c: 3 };
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value); // a 1, b 2, c 3
}
```